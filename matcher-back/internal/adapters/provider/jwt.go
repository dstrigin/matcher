package provider

import (
	"crypto"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/dstrigin/matcher/matcher-back/internal/config"
	"github.com/dstrigin/matcher/matcher-back/internal/domain"
	"github.com/dstrigin/matcher/matcher-back/internal/web"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

const (
	UserIdClaim    = "user_id"
	ExpiresAtClaim = "exp"
)

type JwtProvider struct {
	cfg *config.JWT

	parsedAccessToken *jwt.Token
	accessToken       string
	accessPubKey      crypto.PublicKey
	refreshToken      string
}

func NewJwtProvider(cfg *config.JWT) (*JwtProvider, error) {
	accessPubKey, err := jwt.ParseEdPublicKeyFromPEM([]byte(
		fmt.Sprintf("-----BEGIN PUBLIC KEY-----\n%s\n-----END PUBLIC KEY-----",
			cfg.PublicKeyAccess,
		)))
	if err != nil {
		return nil, fmt.Errorf("invalid public key for access token: %w", err)
	}
	return &JwtProvider{cfg: cfg, accessPubKey: accessPubKey}, nil
}

func (p *JwtProvider) WithHeaders(headers http.Header) {
	if authHeader := headers.Get("Authorization"); strings.HasPrefix(authHeader, "Bearer ") {
		p.accessToken = strings.TrimPrefix(authHeader, "Bearer ")
		return
	}

	cookieHeader := headers.Get("Cookie")
	if cookieHeader != "" {
		req := http.Request{Header: headers}
		cookies := req.Cookies()
		for _, c := range cookies {
			if c.Name == web.AccessToken {
				p.accessToken = c.Value
				return
			}
		}
	}
}

func (p *JwtProvider) IsAuth() bool {
	parsedAccessToken, err := p.parseToken(p.accessToken, p.accessPubKey)
	if err != nil {
		return false
	}
	p.parsedAccessToken = parsedAccessToken
	return true
}

func (p *JwtProvider) GetUserID() (domain.UserID, error) {
	claims, ok := p.parsedAccessToken.Claims.(jwt.MapClaims)
	if !ok {
		return domain.UserID{}, fmt.Errorf("invalid claims")
	}

	userIdStr, ok := claims[UserIdClaim].(string)
	if !ok {
		return domain.UserID{}, fmt.Errorf("invalid user id claim")
	}

	userId, err := uuid.Parse(userIdStr)
	if err != nil {
		return domain.UserID{}, fmt.Errorf("unable to parse user id from claims: %w", err)
	}

	return domain.UserID(userId), err
}

func (p *JwtProvider) GetSessionTTL() time.Duration {
	return p.cfg.TtlSession
}

func (p *JwtProvider) Provide(userID domain.UserID) (string, domain.SessionID, error) {
	accessPKBytes := []byte(fmt.Sprintf(
		"-----BEGIN PRIVATE KEY-----\n%s\n-----END PRIVATE KEY-----",
		p.cfg.PrivateKeyAccess,
	))
	accessToken, err := p.generateToken(userID, p.cfg.TtlAccess, accessPKBytes)
	if err != nil {
		return "", domain.SessionID{}, err
	}
	refreshToken := uuid.New()
	return accessToken, refreshToken, nil
}

func (p *JwtProvider) generateToken(userID domain.UserID, ttl time.Duration, privateKey []byte) (string, error) {
	pk, err := jwt.ParseEdPrivateKeyFromPEM(privateKey)
	if err != nil {
		return "", fmt.Errorf("failed to parse private key: %w", err)
	}
	token := jwt.NewWithClaims(jwt.SigningMethodEdDSA, jwt.MapClaims{
		ExpiresAtClaim: jwt.NewNumericDate(time.Now().Add(ttl)),
		UserIdClaim:    userID,
	})
	signedToken, err := token.SignedString(pk)
	if err != nil {
		return "", err
	}
	return signedToken, nil
}

func (p *JwtProvider) parseToken(raw string, pubKey any) (*jwt.Token, error) {
	return jwt.Parse(raw, func(t *jwt.Token) (any, error) {
		if _, ok := t.Method.(*jwt.SigningMethodEd25519); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
		}
		return pubKey, nil
	})
}
