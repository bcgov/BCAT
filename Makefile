#!make

####################################################################
## Define default environment variables for local development
####################################################################

-include .env

export $(shell sed 's/=.*//' .env)

export GIT_LOCAL_BRANCH?=$(shell git rev-parse --abbrev-ref HEAD)
export DEPLOY_DATE?=$(shell date '+%Y%m%d%H%M')
export COMMIT_SHA?=$(shell git rev-parse --short=7 HEAD)
export IMAGE_TAG=${COMMIT_SHA}

export PROJECT := $(or $(PROJECT),bcat)
export DB_USER := $(or $(DB_USER),db2inst1)
export DB_PASSWORD := $(or $(DB_PASSWORD),development)
export DB_NAME := $(or $(DB_NAME),bcat)
export DB_SERVER := $(or $(DB_SERVER),database)
export DB_PORT := $(or $(DB_PORT),5432)
export GIT_LOCAL_BRANCH := $(or $(GIT_LOCAL_BRANCH),dev)

export KC_AUTH_URL := $(or $(KC_AUTH_URL), https://dev.loginproxy.gov.bc.ca/auth)
export KC_AUTH_REALM := $(or $(KC_AUTH_REALM), standard)
export KC_AUTH_CLIENT_ID := $(or $(KC_AUTH_CLIENT_ID), bcat-standard-4952)

export APP_NAME:=bcat
export OS_NAMESPACE_PREFIX:=bfe2da
export OS_NAMESPACE_SUFFIX?=dev
export TARGET_NAMESPACE=$(OS_NAMESPACE_PREFIX)-$(OS_NAMESPACE_SUFFIX)
export TOOLS_NAMESPACE=$(OS_NAMESPACE_PREFIX)-tools

export NEXT_PUBLIC_REDIRECT_URI = 
export NEXT_PUBLIC_SERVER_URL = 

export BUILD_REF?=test-deployment

define deployTag
"${PROJECT}-${DEPLOY_DATE}"
endef

####################################################################
## Status Output
####################################################################

print-status:
	@echo " +---------------------------------------------------------+ "
	@echo " | Current Settings                                        | "
	@echo " +---------------------------------------------------------+ "
	@echo " | GIT LOCAL BRANCH: $(GIT_LOCAL_BRANCH) "
	@echo " | PROJECT: $(PROJECT) "
	@echo " | DB_NAME: $(DB_NAME) "
	@echo " | DB_SERVER: $(DB_SERVER) "
	@echo " | DB_USER: $(DB_USER) "
	@echo " +---------------------------------------------------------+ "

####################################################################
## Local Development
####################################################################

run-local:
	@echo "+\n++ Make: Running locally ...\n+"
	@docker-compose -f docker-compose.dev.yml up --build -d

run-local-client:
	@echo "+\n++ Make: Running locally ...\n+"
	@docker-compose -f docker-compose.dev.yml up client --build

run-local-api:
	@echo "+\n++ Make: Running locally ...\n+"
	@docker-compose -f docker-compose.dev.yml up api --build

run-local-db:
	@echo "+\n++ Make: Running db locally ...\n+"
	@docker-compose -f docker-compose.dev.yml up database

close-local:
	@echo "+\n++ Make: Closing local container ...\n+"
	@docker-compose -f docker-compose.dev.yml down

local-client-workspace:
	@docker exec -it $(PROJECT)_client sh

local-server-workspace:
	@docker exec -it $(PROJECT)-api sh

local-db-workspace:
	@docker exec -it $(PROJECT)_db bash

migrate-database-up:
	@docker exec -i $(PROJECT)-api npm run migrations-up
	
migrate-database-down:
	@docker exec -i $(PROJECT)-api npm run migrations-down

local-server-logs:
	@docker logs $(PROJECT)-api --tail 25 --follow

local-client-logs:
	@docker logs $(PROJECT)_client --tail 25 --follow

local-db-logs:
	@docker logs $(PROJECT)_db --tail 25 --follow

curl-client:
	@docker exec -i $(PROJECT)-api curl localhost:3000

add-role:
	@oc policy add-role-to-user admin system:serviceaccount:$(TARGET_NAMESPACE):default -n $(TOOLS_NAMESPACE)
