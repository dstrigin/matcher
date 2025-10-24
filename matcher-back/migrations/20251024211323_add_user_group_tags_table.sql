-- +goose Up
-- +goose StatementBegin
CREATE TABLE user_group_tags(
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    group_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE user_group_tags;
-- +goose StatementEnd
