#!/usr/bin/env bash
# See https://bazel.build/docs/user-manual#workspace-status

TAG=`git describe --long 2> /dev/null | sed -e 's/^v//;s/-/./;s/-g/+/'`
LOCAL_CHANGES=`git status --untracked-files=no --porcelain`
GIT_COMMIT=$(git rev-parse HEAD)

# Starts with the STABLE_ prefix so that Bazel will always rebuild stamped outputs if the git tag changes.
echo "STABLE_BUILD_VERSION ${TAG:-$GIT_COMMIT.$USER}$(if [[ $LOCAL_CHANGES == "" ]]; then echo ''; else echo '.dirty'; fi)"
echo "STABLE_GIT_COMMIT $GIT_COMMIT"
echo "STABLE_USER_NAME $USER"
echo "BUILD_SCM_USER $(git config user.email)"
echo "BUILD_SCM_BRANCH $(git symbolic-ref --short HEAD)"
echo "BUILD_CURRENT_TIME $(date +%s)"
echo "BUILD_RANDOM_HASH $(cat /proc/sys/kernel/random/uuid)"
