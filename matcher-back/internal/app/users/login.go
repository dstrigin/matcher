package users

import "context"

type LoginInput struct {
	Username string
	Password string
}

type Login struct {
}

func (l *Login) Execute(ctx context.Context, input LoginInput) error {
	// TODO check if matches db
	// TODO provide access & refresh token cookie
	// TODO add session to db
	return nil
}
