-- +goose Up
-- +goose StatementBegin
CREATE TABLE groups(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
);

INSERT INTO groups(name)
VALUES
    ('Интересы'),
    ('Навыки'),
    ('Цели'),
    ('Личностные черты'),
    ('Город');
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE groups;
-- +goose StatementEnd
