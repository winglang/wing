---
title: Container
id: container
description: Runs a container in the Wing Simulator
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    docker,
    container,
    docker compose,
    simulator
  ]
---

The `sim.Container` resource allows running containers in the Wing Simulator:

```js
bring sim;
bring http;

let c = new sim.Container(
  name: "http-echo",
  image: "hashicorp/http-echo",
  containerPort: 5678,
  args: ["-text=bang"],
);

test "send request" {
  http.get("http://localhost:{c.hostPort}");
}
```

There is also support for building containers from a local directory with a `Dockerfile`:

```js
new sim.Container(
  name: "my-service",
  image: "./my-service",
  containerPort: 8080,
);
```

### Retaining state

When the Wing Console is closed, all containers are stopped and removed.
To retain the state of a container across console restarts, you can mount an anonymous volume:

```js
new sim.Container(
  name: "my-service",
  image: "./my-service",
  containerPort: 8080,
  volumes: ["/var/data"],
);
```

Wing will automatically name each unnamed volume in `volumes`, and reuse the named
volumes across console restarts.

## API

* `name` - a name for the container.
* `image` - a name of a public Docker image to pull and run or a path to a local directory with a
  `Dockerfile`.
* `containerPort` - a TCP port to expose from the container (optional).
* `env` - environment variables to set in the container.
* `args` - container entrypoint arguments
* `sourcePattern` - a glob pattern to use to match the files for calculating the source hash when
  determining if a rebuild is needed. By default this is all the files in the docker build context
  directory (and below).
* `sourceHash` - An explicit source hash that represents the container source. if not set, and
  `sourcePattern` is set, the hash will be calculated based on the content of the source files.

