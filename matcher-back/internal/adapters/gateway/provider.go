package gateway

import (
	"time"

	"github.com/dstrigin/matcher/matcher-back/internal/domain"
)

type AuthProvider interface {
	IsAuth() bool
	GetUserID() (domain.UserID, error)
	GetSessionTTL() time.Duration
	Provide(userID domain.UserID) (string, domain.SessionID, error)
}
