FROM golang:1.24.6-alpine as builder

WORKDIR /app

ADD . .

RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target="/root/.cache/go-build" \
    go build -o /bin/users -trimpath -ldflags "-s -w" ./cmd/

FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/users .

CMD ["./users"]
