package web

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func InitRouter(router *mux.Router) {
	router.HandleFunc(fmt.Sprintf("%s", UsersGroup), nil).Methods(http.MethodGet)
	router.HandleFunc(fmt.Sprintf("%s", UsersGroup), nil).Methods(http.MethodPost)

	router.HandleFunc(fmt.Sprintf("%s/{%s:[0-9]+}", UsersGroup, userID), nil).Methods(http.MethodGet)
	router.HandleFunc(fmt.Sprintf("%s/{%s:[0-9]+}", UsersGroup, userID), nil).Methods(http.MethodPost)
	router.HandleFunc(fmt.Sprintf("%s/{%s:[0-9]+}", UsersGroup, userID), nil).Methods(http.MethodDelete)

	router.HandleFunc(fmt.Sprintf("%s/{%s:[0-9]+}/likes", UsersGroup, userID), nil).Methods(http.MethodGet)
	router.HandleFunc(fmt.Sprintf("%s/{%s:[0-9]+}/likes", UsersGroup, userID), nil).Methods(http.MethodPost)

	router.HandleFunc(fmt.Sprintf("%s", SessionsGroup), nil).Methods(http.MethodPost)
}
