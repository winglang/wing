---
title: Workload
id: workload
description: A built-in resource for handling containerized workloads
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    Kubernetes,
    Containers,
    Docker,
    EKS,
    ECS,
    AKS
    GKE
  ]
sidebar_position: 1
---

The `Workload` resource represents a scalable containerized service deployed and managed by a
container orchestration system such as Kubernetes.

When running locally within the **Wing Simulator**, either during development or during builds,
workloads are implemented using local docker images.

When running on the cloud, workloads become [Kubernetes](https://kubernetes.io/) applications, built
and published to an image registry and deployed to a Kubernetes cluster using
[Helm](https://helm.sh/). We currently only support AWS/EKS but support for other platforms are
planned.

It will also be possible for platforms to implement workloads using any other compatible container
orchestration system such as [Amazon ECS](https://aws.amazon.com/ecs/), [fly.io](https://fly.io) or
[ControlPlane](https://controlplane.com/).

> :warning: This resource is still experimental. Please ping the team on [Wing
> Discord](https://t.winglang.io/discord) if you encounter any issues or have any questions and let us
> know what you think. See [roadmap](#roadmap) below for more details about our plans.

## Installation

For the time being, in order to use this resource you will first first need to install
[@winglibs/containers](https://www.npmjs.com/package/@winglibs/containers) from npm:

```sh
npm i @winglibs/containers
```

You will also need [Docker](https://www.docker.com/) or [OrbStack](https://orbstack.dev/) installed
on your system in order for workloads to work in the Wing Simulator.

## Usage

In your code, just `bring containers` and define workloads using the `containers.Workload` class.

Check out a few examples below or jump to the full [API Reference](#api-reference).

### Using an image from a registry

Let's start with a simple example which defines a workload based on the
[hashicorp/http-echo](https://github.com/hashicorp/http-echo) image. It is a simple HTTP server
listening on port 5678 that responds with a message.

```js
bring containers;

let hello = new containers.Workload(
  name: "hello",
  image: "hashicorp/http-echo",
  port: 5678,
  public: true,
  args: ["-text=hello, wingnuts!"],
);
```

In order to test this workload, we can use `publicUrl` which resolves to a publicly accessible route
into your container. And if you were wondering: Yes, this also works on the cloud! Every workload
with `public: true` will have a URL that can be used to access it from the web.

```js
bring http;
bring expect;

test "message is returned in http body" {
  let url = hello.publicUrl ?? "FAIL";
  let body = http.get(url).body ?? "FAIL";
  log(body);
  expect.equal(body, "hello, wingnuts!\n");
}
```

### Building an image from source

Workloads can also be be based on an image defined through a dockerfile within your project. The
image is automatically built during compilation and published to a container registry during
deployment.

Let's define a workload which based on the docker image built from the dockerfile in the `./backend`
directory:

```js
bring containers;

new containers.Workload(
  name: "backend",
  image: "./backend",
  port: 3000,
  public: true
);
```

Under `./backend`, create:

`backend/Dockerfile`:

```dockerfile
FROM node:20.8.0-alpine
EXPOSE 3000
ADD index.js /app/index.js
ENTRYPOINT [ "node", "/app/index.js" ]
```

`backend/index.js`:

```js
const http = require('http');

process.on('SIGINT', () => process.exit(0));

const server = http.createServer((req, res) => {
  console.log(`request received: ${req.method} ${req.url}`);
  res.end('Hello, Wingnuts!');
});

console.log('listening on port 3000');
server.listen(3000);
```

### Defining multiple workloads as microservices

Using `privateUrl`, it is possible to reach workloads without having to expose them publicly.

Let's combine the last two examples by deploying the `http-echo` container and ping it from within
our docker image:

```js
bring containers;

let echo = new containers.Workload(
  name: "echo",
  image: "hashicorp/http-echo",
  port: 5678,
  args: ["-text=hello, wingnuts!"],
) as "echo";

let backend = new containers.Workload(
  name: "backend",
  image: "./backend",
  port: 3000,
  public: true,
  env: {
    ECHO_URL: echo.internalUrl
  }
) as "backend";
```

In `backend/index.js` file, we can access the internal URL of the `echo` workload
through `process.env.ECHO_URL`.

Check out the full microservice example
[here](https://github.com/winglang/containers/blob/main/test/microservices.test.w).

## API Reference

### `name: str`

This is a required option and must be a a unique name for the workload within the application. 

In the `tf-aws` target, this name will be used as the name of the Helm chart and the name of all the
resources associated with the workload in your Kubernetes cluster.

### `image: str`

This is another required option and can either be the name of a publicly available docker image or a
relative path to a docker build context directory (with a Dockerfile in it).

### `port: num?`

* `port: num?` (optional): internal port number listening. This is required to connect to a server
  running inside the container.

### `public: bool?`

If this option is enabled, this workload will be accessible from the public internet through the URL
returned from `publicUrl`.  When disabled, the container can only be accessed by other workloads in
the application via its `privateUrl`.

When running in `sim`, the container will be accessible through a `localhost` port.

When running on tf-aws (EKS), an
[Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) resource will be defined
for this workload and an ALB (Application Load Balancer) will be allocated. The `publicUrl` of this
workload will contain the fully qualified host name that can be used to access the container from
the public internet.

By default, containers are only accessible from within the same application through their
`privateUrl`.

When `public` is enabled, `port` must also be set.

### `readiness: str?`

If this is specified, it is the URL path to send HTTP GET requests to in order to determine that the
workload has finished initialization.

When deployed to Kubernetes, this is implemented using a [readiness
probe](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-readiness-probes).

By default, readiness probes are disabled.

### `replicas: num?`

Defines the number of container instances needed for this workload.

When running in the simulator, this option is ignored and there is always a single container.

When running in Kubernetes, this is implemented by setting `replicas` in the [Deployment
resource](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) that defines this
workload.

By default this is set to 1 replica.

### `sources: Array<str>?`

A list of [glob patterns](https://en.wikipedia.org/wiki/Glob_(programming)) which are used to match
the source files of the container. If any of these files change, the image is rebuilt and
invalidated. This is only relevant if the image is built from source.

By default, this is all the files under the image directory.

### `args` and `env`

* `args: Array<str>?` (optional): arguments to pass to the entrypoint.
* `env: Map<str>?` (optional): environment variables.

## Target-specific details

### Simulator (`sim`)

When executed in the Wing Simulator, the workload is started within a local Docker container.

### AWS (`tf-aws`)

Workloads are deployed to a Kubernetes cluster running on [Amazon EKS](https://aws.amazon.com/eks/).

For each application, a Helm chart is synthesized with a
[Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/),
[Service](https://kubernetes.io/docs/concepts/services-networking/service/) and if the workload is
public, an [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) as well.

By default, a new Amazon EKS cluster will be provisioned *for each Wing application*. This might be
okay in a situation where your cluster hosts only a single application, but it is very common to
share a single cluster across multiple applications.

#### Creating a new EKS cluster

To share a single EKS cluster across multiple Wing applications, you will first need to create a
cluster in your AWS account. If you already have a cluster, jump to [Deploying into an existing
cluster](#deploying-into-an-existing-eks-cluster) below.

To create a compatible EKS cluster manually, we recommend to use use the `tfaws.Cluster` resource:

`eks.main.w`:

```js
bring containers;
new containers.Cluster("my-wing-cluster");
```

And provision it using Terraform (this operation could take up to 20 minutes...):

```sh
wing compile -t tf-aws eks.main.w
cd target/eks.main.tfaws
terraform init
terraform apply
```

To connect to our new cluster through `kubectl`, use `update-kubeconfig`:

```sh
aws eks update-kubeconfig --name my-wing-cluster
```

Then:

```sh
$ kubectl get all
NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   172.20.0.1   <none>        443/TCP   36m
```

#### Deploying into an existing EKS cluster

To deploy a workload into an the EKS cluster you just created or to an already existing cluster, you
will need to set the following platform values (this can be done using `-v X=Y` or `--values
values.yml`):

* `eks.cluster_name`: The name of the cluster
* `eks.endpoint`: The URL of the Kubernetes API endpoint of the cluster
* `eks.certificate`: The certificate authority of this cluster.

You can use the [eks-values.sh](https://github.com/winglang/containers/blob/main/eks-values.sh)
script to obtain the attributes of your EKS cluster.

Install:

```sh
$ curl https://raw.githubusercontent.com/winglang/containers/main/eks-values.sh > eks-values.sh
$ chmod +x ./eks-values.sh
```

Use:

```sh
$ ./eks-values.sh CLUSTER-NAME > values.yaml
$ wing compile -t tf-aws --values ./values.yaml main.w
```

### Azure (`tf-azure`)

Not supported yet.

### GCP (`tf-gcp`)

Not supported yet.

## Roadmap

The following is a non-exhaustive list of capabilities we are looking to add to this resource:

### Scaling

- [ ] Constraints
- [ ] Autoscaling

### Networking

- [ ] Access `cloud.*` resources from workloads (e.g. put an object in a bucket, poll a queue).
- [ ] Access something like `Redis` from a workload (unify VPCs)
- [ ] Access non-public workloads from `cloud.Function`

### API

- [ ] Allow defining workloads using inflights (`cloud.Service`)

### Runtime

- [ ] Logs
- [ ] Sidecar containers

### Endpoints

- [ ] SSL
- [ ] Custom domains

### Platforms

- [ ] ECS
- [ ] GKE
- [ ] AKS
- [ ] fly.io
- [ ] ControlPlane



