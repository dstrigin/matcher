package main

import (
	"context"
	"log"

	"github.com/dstrigin/matcher/matcher-back/internal/app"
	"github.com/dstrigin/matcher/matcher-back/internal/config"
	"github.com/gorilla/mux"
	"go.uber.org/zap"
)

func main() {
	ctx := context.Background()

	logger, err := zap.NewProduction()

	_, err = config.LoadConfig("./config.yaml")
	if err != nil {
		log.Fatalf("config error: %v", err)
	}

	router := mux.NewRouter()

	app, err := app.NewApp(ctx, logger, router)
	if err != nil {
		log.Fatalf("Error initializing app: %s", err)
	}

	app.Run()
}
