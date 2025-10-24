MIGRATION_FOLDER=$(CURDIR)/migrations

.PHONY: build
## build app in docker
build:
	docker build -t users .

.PHONY: update
## updates dependencies
update:
	go get -u ./...

.PHONY: tidy
## runs go mod tidy
tidy:
	go mod tidy

.PHONY: cache
## runs go clean -modcache
cache:
	go clean -modcache

.PHONY: migration-create
## creates migration with first param as name
migration-create:
	goose -dir "$(MIGRATION_FOLDER)" create $(name) sql

.PHONY: migration-up
## applies latest migration
migration-up:
	goose -dir "$(MIGRATION_FOLDER)" postgres "$(POSTGRES_SETUP_TEST)" up

.PHONY: migration-down
## rolls back latest migration
migration-down:
	goose -dir "$(MIGRATION_FOLDER)" postgres "$(POSTGRES_SETUP_TEST)" down

.PHONY: migration-status
## checks migration status
migration-status:
	goose -dir "$(MIGRATION_FOLDER)" postgres "$(POSTGRES_SETUP_TEST)" status

.PHONY: help
## prints help about all targets
help:
	@echo ""
	@echo "Usage:"
	@echo "  make <target>"
	@echo ""
	@echo "Targets:"
	@awk '                                \
		BEGIN { comment=""; }             \
		/^\s*##/ {                         \
		    comment = substr($$0, index($$0,$$2)); next; \
		}                                  \
		/^[a-zA-Z0-9_-]+:/ {               \
		    target = $$1;                  \
		    sub(":", "", target);          \
		    if (comment != "") {           \
		        printf "  %-17s %s\n", target, comment; \
		        comment="";                \
		    }                              \
		}' $(MAKEFILE_LIST)
	@echo ""