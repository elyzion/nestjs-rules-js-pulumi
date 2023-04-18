import { InlineProgramArgs, LocalWorkspace } from "@pulumi/pulumi/automation";
import * as pulumi from "@pulumi/pulumi";
import * as kubernetes from "@pulumi/kubernetes";

const process = require('process');

const args = process.argv.slice(2);
let destroy = false;
if (args.length > 0 && args[0]) {
    destroy = args[0] === "destroy";
}

const run = async () => {
    // This is our pulumi program in "inline function" form
    const pulumiProgram = async () => {

        const echo_1_echo_serviceService = new kubernetes.core.v1.Service("echo_1_echo_serviceService", {
            apiVersion: "v1",
            kind: "Service",
            metadata: {
                name: "echo-1-echo-service",
                labels: {
                    "helm.sh/chart": "echo-service-0.1.0",
                    "app.kubernetes.io/name": "echo-service",
                    "app.kubernetes.io/instance": "echo-1",
                    "app.kubernetes.io/version": "0.1.0",
                    "app.kubernetes.io/managed-by": "Helm",
                },
            },
            spec: {
                type: "NodePort",
                ports: [{
                    port: 80,
                    targetPort: "http",
                    protocol: "TCP",
                    name: "http",
                }],
                selector: {
                    "app.kubernetes.io/name": "echo-service",
                    "app.kubernetes.io/instance": "echo-1",
                },
            },
        });

        const echo_1_echo_serviceDeployment = new kubernetes.apps.v1.Deployment("echo_1_echo_serviceDeployment", {
            apiVersion: "apps/v1",
            kind: "Deployment",
            metadata: {
                name: "echo-1-echo-service",
                labels: {
                    "helm.sh/chart": "echo-service-0.1.0",
                    "app.kubernetes.io/name": "echo-service",
                    "app.kubernetes.io/instance": "echo-1",
                    "app.kubernetes.io/version": "0.1.0",
                    "app.kubernetes.io/managed-by": "Helm",
                },
            },
            spec: {
                replicas: 1,
                selector: {
                    matchLabels: {
                        "app.kubernetes.io/name": "echo-service",
                        "app.kubernetes.io/instance": "echo-1",
                    },
                },
                template: {
                    metadata: {
                        labels: {
                            "app.kubernetes.io/name": "echo-service",
                            "app.kubernetes.io/instance": "echo-1",
                        },
                    },
                    spec: {
                        serviceAccountName: "default",
                        imagePullSecrets: [],
                        containers: [{
                            name: "echo-service",
                            image: "k8s.gcr.io/e2e-test-images/echoserver:2.5",
                            imagePullPolicy: "IfNotPresent",
                            ports: [{
                                name: "http",
                                containerPort: 8080,
                                protocol: "TCP",
                            }],
                            livenessProbe: {
                                httpGet: {
                                    path: "/",
                                    port: "http",
                                },
                            },
                            readinessProbe: {
                                httpGet: {
                                    path: "/",
                                    port: "http",
                                },
                            },
                        }],
                    },
                },
            },
        });
        const echo_1_echo_serviceIngress = new kubernetes.networking.v1.Ingress("echo_1_echo_serviceIngress", {
            apiVersion: "networking.k8s.io/v1",
            kind: "Ingress",
            metadata: {
                name: "echo-1-echo-service",
                annotations: {
                    "alb.ingress.kubernetes.io/scheme": "internet-facing",
                    "alb.ingress.kubernetes.io/target-type": "ip",
                    "alb.ingress.kubernetes.io/listen-ports": "[{\"HTTP\": 80}, {\"HTTPS\":443}]",
                    "alb.ingress.kubernetes.io/ssl-redirect": "443",
                    "alb.ingress.kubernetes.io/group.name": "echo",
                },
            },
            spec: {
                ingressClassName: "alb",
                rules: [{
                    host: "echo-1.dev.eaas.wassha.org",
                    http: {
                        paths: [{
                            path: "/",
                            pathType: "Prefix",
                            backend: {
                                service: {
                                    name: "echo-1-echo-service",
                                    port: {
                                        number: 80,
                                    },
                                },
                            },
                        }],
                    },
                }],
            },
        });
    };

    // Create our stack 
    const args: InlineProgramArgs = {
        stackName: "echo-1",
        projectName: "inlineNode",
        program: pulumiProgram
    };

    // create (or select if one already exists) a stack that uses our inline program
    const stack = await LocalWorkspace.createOrSelectStack(args);

    console.info("successfully initialized stack");
    console.info("installing plugins...");
    await stack.workspace.installPlugin("kubernetes", "v3.25.0");
    console.info("plugins installed");
    console.info("setting up config");
    await stack.setConfig("aws:region", { value: "af-south-1" });
    console.info("config set");
    console.info("refreshing stack...");
    await stack.refresh({ onOutput: console.info });
    console.info("refresh complete");

    if (destroy) {
        console.info("destroying stack...");
        await stack.destroy({ onOutput: console.info });
        console.info("stack destroy complete");
        process.exit(0);
    }

    console.info("previewing stack...");
    const previewRes = await stack.preview({ onOutput: console.info });
    console.log(`preview summary: \n${JSON.stringify(previewRes.changeSummary, null, 4)}`);
};

run().catch(err => console.log(err));