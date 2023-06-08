# NestJS example

You can run with `bazelisk run //:bin` and then perform a `GET` on http://localhost:8080/hello-world

## Prerequisites

Install `bazelisk`, that should be all that is needed.

## Commands

Push images to ECR:
 `bazelisk run //:push_image_index`

The above will push both amd64 and arm64 images. When pulling an image there is not need to specify architecture. Bazel will automatically detect the host platform for anything that you do locally.

Run locally:
 `bazelisk run //:bin`

Test:
 `bazelisk test //...`

Build everything:
 `bazelisk build //...`

List all actions:
 `bazelisk query //...``

Build a docker image tarball for your platform (Currently borked!!!):
 `bazelisk build //:tarball`

Load tarball into local docker (Currently borked!):
 `docker load -i bazel-bin/tarball/tarball_YOURPLATFORM.tar`

Authenticate docker:  

`aws-vault exec {my_credentials_here} -- aws ecr get-login-password --region af-south-1 | docker login --username AWS --password-stdin {account_number_here}.dkr.ecr.af-south-1.amazonaws.com`

This should be replaced with an authentication helper.

Execute Pulumi:

`aws-vault exec {my_credentials_here} -- bazelisk run //manifests:deploy`

Update pnpm lock file after adding a dep:
`bazelisk run -- @pnpm//:pnpm --dir $PWD install --lockfile-only`

* Always remember to add any added dependencies to the ts_project deps declaration in BUILD.bazel.

# Aspect Bazel Automatic Updates

https://docs.aspect.build/guides/bazelrc#automatic-updates

# Migrating to rules_js
https://docs.aspect.build/guides/rules_js_migration

# Others

- https://github.com/aspect-build/rules_js/blob/f30fcce4b14d502dba854360b74ad29a544a0723/e2e/js_image_oci/src/BUILD.bazel
- https://github.com/bazel-contrib/rules_oci
- https://docs.aspect.build/rules/contrib_rules_oci/
- https://github.com/GoogleContainerTools/container-structure-test#file-existence-tests