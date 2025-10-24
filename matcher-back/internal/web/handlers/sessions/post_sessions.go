package sessions

import (
	"context"
	"net/http"
)

type postSessionsRequest struct {
}

func PostSessionsHandler(ctx context.Context, w http.ResponseWriter, r *http.Request) error {
	// interactor = ioc.Login()
	// interactor.Execute()
	return nil
}
