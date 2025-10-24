package cmd

import (
	"context"
	"log"

	"github.com/dstrigin/matcher/matcher-back/internal/app"
	"github.com/gorilla/mux"
	"go.uber.org/zap"
)

func main() {
	ctx := context.Background()

	logger, err := zap.NewProduction()

	router := mux.NewRouter()

	app, err := app.NewApp(ctx, logger, router)
	if err != nil {
		log.Fatalf("Error initializing app: %s", err)
	}

	app.Run()
}
