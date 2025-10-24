package models

import (
	"time"

	"github.com/dstrigin/matcher/matcher-back/internal/domain"
)

type Session struct {
	UserID    domain.UserID
	SessionID domain.SessionID
	UserAgent string
	ExpiresAt time.Time
}
