load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

###
# Setup rules_js
###

http_archive(
    name = "aspect_rules_js",
    sha256 = "a592fafd8a27b2828318cebbda0003686c6da3318df366b563e8beeffa05a02c",
    strip_prefix = "rules_js-1.21.0",
    url = "https://github.com/aspect-build/rules_js/releases/download/v1.21.0/rules_js-v1.21.0.tar.gz",
)

http_archive(
    name = "aspect_rules_swc",
    sha256 = "c35e633c2c90a4cd6796e66d66bcf37d31a81737afc76030201a9ef8599abc58",
    strip_prefix = "rules_swc-0.21.3",
    url = "https://github.com/aspect-build/rules_swc/archive/refs/tags/v0.21.3.tar.gz",
)

http_archive(
    name = "aspect_rules_ts",
    sha256 = "58b6c0ad158fc42883dafa157f1a25cddd65bcd788a772620192ac9ceefa0d78",
    strip_prefix = "rules_ts-1.3.2",
    url = "https://github.com/aspect-build/rules_ts/releases/download/v1.3.2/rules_ts-v1.3.2.tar.gz",
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

npm_translate_lock(
    name = "npm",
    npmrc = "//:.npmrc",
    pnpm_lock = "//:pnpm-lock.yaml",
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
    sha256 = "4a738bdbeacb0e1df070209dddfa7b55fed9bbc553b905cf3d2dd25115e0b598",
    strip_prefix = "rules_oci-0.3.8",
    url = "https://github.com/bazel-contrib/rules_oci/releases/download/v0.3.8/rules_oci-v0.3.8.tar.gz",
)

load("@rules_oci//oci:dependencies.bzl", "rules_oci_dependencies")

rules_oci_dependencies()

load("@rules_oci//oci:repositories.bzl", "LATEST_CRANE_VERSION", "LATEST_ZOT_VERSION", "oci_register_toolchains")

oci_register_toolchains(
    name = "oci",
    crane_version = LATEST_CRANE_VERSION,
    # If a docker media types compatible registry is desired, just omit `zot_version` and crane registry will be used instead.
    zot_version = LATEST_ZOT_VERSION,
)

# Optional, for oci_tarball rule
load("@rules_pkg//:deps.bzl", "rules_pkg_dependencies")

rules_pkg_dependencies()

## Pull base images
load("//:tools/pull.bzl", "oci_pull")

oci_pull(
    name = "debian_amd64",
    architecture = "amd64",
    image = "thesayyn/debian:oci",
)

oci_pull(
    name = "debian_arm64",
    architecture = "arm64",
    image = "thesayyn/debian:oci",
)