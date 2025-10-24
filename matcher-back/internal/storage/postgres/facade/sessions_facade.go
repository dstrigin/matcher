package facade

import (
	"context"

	"github.com/dstrigin/matcher/matcher-back/internal/domain"
	"github.com/dstrigin/matcher/matcher-back/internal/domain/models"
)

type SessionsFacade interface {
	CreateSession(ctx context.Context, session models.Session) error
	GetSession(ctx context.Context, id domain.SessionID) (models.Session, error)
	DeleteSession(ctx context.Context, id domain.SessionID) error
}

type sessionsFacade struct {
}

func NewSessionsFacade() SessionsFacade {
	return &sessionsFacade{}
}

func (u *sessionsFacade) CreateSession(ctx context.Context, user models.Session) error {
	return nil
}

func (u *sessionsFacade) GetSession(ctx context.Context, id domain.SessionID) (models.Session, error) {
	return models.Session{}, nil
}

func (u *sessionsFacade) DeleteSession(ctx context.Context, id domain.SessionID) error {
	return nil
}
