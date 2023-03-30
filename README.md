# NestJS example

You can run with `bazelisk run //:bin` and then perform a `GET` on http://localhost:3000/hello-world

## Prerequisites

Install `bazelisk`, that should be all that is needed.

## Commands

Push images to ECR:
 `bazelisk run //:push_image_index --stamp --embed_label=0.0.1`

Run locally:
 `bazelisk run //:bin`

Test:
 `bazelisk test //...`

Build everything:
 `bazelisk build //...`

List all actions:
 `bazelisk query //...``

Build a docker image tarball for your platform:
 `bazelisk build //:tarball_arm64`
 `bazelisk build //:tarball_amd64`

Load tarball into local docker:
 `docker load -i bazel-bin/tarball/tarball_YOURPLATFORM.tar`

# Aspect Bazel Automatic Updates

https://docs.aspect.build/guides/bazelrc#automatic-updates


# Migrating to rules_js
https://docs.aspect.build/guides/rules_js_migration


# Others

- https://github.com/aspect-build/rules_js/blob/f30fcce4b14d502dba854360b74ad29a544a0723/e2e/js_image_oci/src/BUILD.bazel
- https://github.com/bazel-contrib/rules_oci
- https://docs.aspect.build/rules/contrib_rules_oci/
- https://github.com/GoogleContainerTools/container-structure-test#file-existence-tests