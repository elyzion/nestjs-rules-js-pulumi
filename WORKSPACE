load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

###
# Setup rules_js
###

http_archive(
    name = "aspect_rules_js",
    sha256 = "08061ba5e5e7f4b1074538323576dac819f9337a0c7d75aee43afc8ae7cb6e18",
    strip_prefix = "rules_js-1.26.1",
    url = "https://github.com/aspect-build/rules_js/releases/download/v1.26.1/rules_js-v1.26.1.tar.gz",
)

http_archive(
    name = "aspect_rules_swc",
    sha256 = "b647c7c31feeb7f9330fff08b45f8afe7de674d3a9c89c712b8f9d1723d0c8f9",
    strip_prefix = "rules_swc-1.0.1",
    url = "https://github.com/aspect-build/rules_swc/releases/download/v1.0.1/rules_swc-v1.0.1.tar.gz",
)

http_archive(
    name = "aspect_rules_ts",
    sha256 = "ace5b609603d9b5b875d56c9c07182357c4ee495030f40dcefb10d443ba8c208",
    strip_prefix = "rules_ts-1.4.0",
    url = "https://github.com/aspect-build/rules_ts/releases/download/v1.4.0/rules_ts-v1.4.0.tar.gz",
)   

load("@aspect_rules_js//js:repositories.bzl", "rules_js_dependencies")

rules_js_dependencies()

load("@aspect_rules_ts//ts:repositories.bzl", "rules_ts_dependencies")

rules_ts_dependencies(ts_version_from = "//:package.json")

load("@rules_nodejs//nodejs:repositories.bzl", "DEFAULT_NODE_VERSION", "nodejs_register_toolchains")

nodejs_register_toolchains(
    name = "nodejs",
    node_version = DEFAULT_NODE_VERSION,
)

load("@aspect_rules_js//npm:npm_import.bzl", "npm_translate_lock")

# This needs to list all package.json files in the repository.
npm_translate_lock(
    name = "npm",
    npmrc = "//:.npmrc",
    pnpm_lock = "//:pnpm-lock.yaml",
    update_pnpm_lock = True,
    data = [
        "//:package.json",
        "//:pnpm-workspace.yaml",
        "//manifests:package.json",
    ],
    verify_node_modules_ignored = "//:.bazelignore",
)

load("@npm//:repositories.bzl", "npm_repositories")

npm_repositories()

load("@aspect_rules_swc//swc:dependencies.bzl", "rules_swc_dependencies")

rules_swc_dependencies()

load("@aspect_rules_swc//swc:repositories.bzl", "swc_register_toolchains", LATEST_SWC_VERSION = "LATEST_VERSION")

swc_register_toolchains(
    name = "swc",
    swc_version = LATEST_SWC_VERSION,
)

###
# Setup rules_oci
###

# https://github.com/bazel-contrib/rules_oci/releases
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "rules_oci",
    sha256 = "08d73a9bec22642ee12c0a38c23596cbddaba7422eede74edba3bb1044d579be",
    strip_prefix = "rules_oci-1.0.0-rc0",
    url = "https://github.com/bazel-contrib/rules_oci/releases/download/v1.0.0-rc0/rules_oci-v1.0.0-rc0.tar.gz",
)

load("@rules_oci//oci:dependencies.bzl", "rules_oci_dependencies")

rules_oci_dependencies()

load("@rules_oci//oci:repositories.bzl", "LATEST_CRANE_VERSION", "LATEST_ZOT_VERSION", "oci_register_toolchains")

oci_register_toolchains(
    name = "oci",
    crane_version = LATEST_CRANE_VERSION,
    # Uncommenting the zot toolchain will cause it to be used instead of crane for some tasks.
    # Note that it does not support docker-format images.
    # zot_version = LATEST_ZOT_VERSION,
)

# Optional, for oci_tarball rule
http_archive(
    name = "rules_pkg",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_pkg/releases/download/0.9.1/rules_pkg-0.9.1.tar.gz",
        "https://github.com/bazelbuild/rules_pkg/releases/download/0.9.1/rules_pkg-0.9.1.tar.gz",
    ],
    sha256 = "8f9ee2dc10c1ae514ee599a8b42ed99fa262b757058f65ad3c384289ff70c4b8",
)
load("@rules_pkg//:deps.bzl", "rules_pkg_dependencies")
rules_pkg_dependencies()

## Pull base images
load("@rules_oci//oci:pull.bzl", "oci_pull")

oci_pull(
    name = "debian",
    digest = "sha256:63d62ae233b588d6b426b7b072d79d1306bfd02a72bff1fc045b8511cc89ee09",
    image = "debian",
    platforms = [
        "linux/amd64",
        "linux/arm64/v8",
    ],
)

###
# Setup container_structure_test
###
http_archive(
    name = "container_structure_test",
    sha256 = "42edb647b51710cb917b5850380cc18a6c925ad195986f16e3b716887267a2d7",
    strip_prefix = "container-structure-test-104a53ede5f78fff72172639781ac52df9f5b18f",
    urls = ["https://github.com/GoogleContainerTools/container-structure-test/archive/104a53ede5f78fff72172639781ac52df9f5b18f.zip"],
)

load("@container_structure_test//:repositories.bzl", "container_structure_test_register_toolchain")

container_structure_test_register_toolchain(name = "container_structure_test_toolchain")