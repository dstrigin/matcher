package postgres

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

// NewDB creates new connect to db
func NewDB(ctx context.Context, dsn string) (*Database, error) {
	pool, err := pgxpool.New(ctx, dsn)
	if err != nil {
		return nil, err
	}

	return newDatabase(pool), nil
}
