package web

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func InitRouter(router *mux.Router) {
	router.HandleFunc("/users", nil).Methods(http.MethodGet)
	router.HandleFunc("/users", nil).Methods(http.MethodPost)

	router.HandleFunc(fmt.Sprintf("/users/{%s:[0-9]+}", userID), nil).Methods(http.MethodGet)
	router.HandleFunc(fmt.Sprintf("/users/{%s:[0-9]+}", userID), nil).Methods(http.MethodPost)
	router.HandleFunc(fmt.Sprintf("/users/{%s:[0-9]+}", userID), nil).Methods(http.MethodDelete)

	router.HandleFunc(fmt.Sprintf("/users/{%s:[0-9]+}/likes", userID), nil).Methods(http.MethodGet)
	router.HandleFunc(fmt.Sprintf("/users/{%s:[0-9]+}/likes", userID), nil).Methods(http.MethodPost)
}
