package ioc

import "github.com/dstrigin/matcher/matcher-back/internal/app/users"

type IoC struct {
	// facade
}

func (ioc *IoC) Login() users.Login {
	return users.Login{}
}
