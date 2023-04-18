# General ops

Seems like it will be a bit of a slog to set up proper Pulumi/JS toolchain, so skipping the integration part for now. More important to set up basic workflow and example.

Log

1. Created reference project.
2. Added `manifests` directory. This contains all manifests, both for Kubernetes and for infra resources.
   Some discussion should be had on how we structure this folder.
   Something like `manifests/{aws, k8s}`, should be fine, where AWS contains AWS resources, and k8s contains Kubernetes resources. 
   The question is if it even makes sense to split these resources. It does, since you might want to apply only k8s changes, but you can handle this with programming logic. Spliting the folder makes this divide clearer however, and is probably safer, although you have to double the dependencies, or have to do a better setup job in this case.
3. Created `reference-project` folder in the older terraform bucket via the UI.
4. Bootstrapped empty Pulumi project in the manifests dir.
5. Logged in with `aws-vault exec wassha-eaas-dev -- pulumi login 's3://terraform-wassha-eaas-dev/reference-project?region=af-south-1&awssdk=v2'`
6. Had to run `pnpm install --lockfile-only` in order to reflect changes to workspace. This seems to be a real gotcha, and we need a way to have bazel automatically run it.
7. Found that I can use the `update_pnpm_lock` attribute to automate lockfile updates, as per https://docs.aspect.build/rules/aspect_rules_js/docs/pnpm#update_pnpm_lock. I am enabling this for now, as we don't follow a "standard" frontend developer workflow.

