-- +goose Up
-- +goose StatementBegin
CREATE TABLE users(
    id UUID PRIMARY KEY,
    number SERIAL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    telegram TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    picture_url TEXT NOT NULL,
    gender SMALLINT NOT NULL,
    age SMALLINT NOT NULL,
    about TEXT NOT NULL,
    score float,
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE users;
-- +goose StatementEnd
