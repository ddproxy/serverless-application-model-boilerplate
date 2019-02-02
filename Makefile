#!make
.PHONY: compile validate build package deploy down

BUCKET = sam-stereotype
BUCKET_PREFIX = stereotype-files

STACK = sam-stereotype-stack

# EXECUTABLES are expected in your path - install if not present
EXECUTABLES = npm aws sam
K := $(foreach exec,$(EXECUTABLES),\
	$(if $(shell which $(exec)),some string,$(error "No $(exec) in PATH)))

compile:
	./node_modules/.bin/webpack
	echo ./dist/* | xargs -n 1 cp ./src/package.json

validate:
	sam validate

build:
	sam build

package: build
	sam package --template-file .aws-sam/build/template.yaml \
	--s3-bucket=$(BUCKET) \
	--s3-prefix=$(BUCKET_PREFIX) \
	--output-template-file deployment.yaml

deploy:
	sam deploy --template-file deployment.yaml \
	--stack-name $(STACK) \
	--capabilities CAPABILITY_IAM

down:
	aws cloudformation delete-stack \
	--stack-name $(STACK)
