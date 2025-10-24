package facade

import (
	"context"

	"github.com/dstrigin/matcher/matcher-back/internal/domain/models"
)

type UsersFacade interface {
	CreateUser(ctx context.Context, user models.User) error
	GetUser(ctx context.Context, id string) (models.User, error)
}

type usersFacade struct {
}

func NewUsersFacade() UsersFacade {
	return &usersFacade{}
}

func (u *usersFacade) CreateUser(ctx context.Context, user models.User) error {
	return nil
}

func (u *usersFacade) GetUser(ctx context.Context, id string) (models.User, error) {
	return models.User{}, nil
}
