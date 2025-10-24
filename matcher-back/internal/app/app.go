package app

import (
	"context"

	"github.com/dstrigin/matcher/matcher-back/internal/web"
	"github.com/gorilla/mux"
	"go.uber.org/zap"
)

type App struct {
	logger *zap.Logger
	router *mux.Router
}

func NewApp(ctx context.Context, logger *zap.Logger, router *mux.Router) (*App, error) {
	web.InitRouter(router)

	return &App{
		logger: logger,
		router: router,
	}, nil
}

func (app *App) Run() {

}
