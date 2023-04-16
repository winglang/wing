---
title: SDK Spec
description: Specification for the Wing SDK
---

:::caution Not fully implemented yet

This document is a _specification_ of the Wing SDK, and many features
are still not implemented (see [project board](https://github.com/orgs/winglang/projects/3)).

:::

## Overview

This document describes the design of the Wing SDK, which is the set of batteries-included APIs available for developers for building applications in Wing.

The primary goal of this document is to provide a high level overview of the resources we would like to support in Wing, and to provide a framework for discussing the design of these APIs and how they interact with each other.
This document is not intended to be a complete specification of the APIs, but rather a starting point for discussion.
In writing this, we are hoping to provide a jumping-off point for contributors looking to add new resources and capabilities to Wing, and to provide a map that can be used to understand the scope of the Wing SDK.

## Design Guidelines

When designing APIs for Wing, we try to follow these tenets:

- **Focused on functional behavior**: our APIs are designed around the functional aspects that developers care about for building and testing their applications.
  Implementations of resources in the SDK are guaranteed to be scalable, highly-available, and fault tolerant by default, so that developers do not need to customize security policies or scaling configuration within their application code.
  Operational aspects of resources should not leak into the core API surface area, except when they are essential to the functional behavior of the resource and the user's mental model.
  For example, while the timeout of a serverless function can be considered an operational detail, it is essential to the user's mental model of functions as an ephemeral, stateless resource that should not be used for long-running or stateful workloads.

- **Easy to understand, with sensible defaults**: our APIs are based on the mental model of the user, and not the mental model of cloud service APIs, which are frequently designed against the constraints of the backend system and the fact that these APIs are used through network requests.
  It's okay to enable multiple ways to achieve the same thing, in order to make it more natural for users who come from different mental models.
  APIs should have sensible defaults, and should be easy to use correctly.
  APIs should make it easy to do the right thing, and hard to do the wrong thing.

- **All clouds are equal**: our APIs and their documentation should not have any assumptions about where resources are being deployed.
  When possible, prefer mental models and terminology that are natural for operating with data structures for code running on your own machine (eg., choose "push" and "pop" over "send" and "receive").
  Avoid APIs and options that may only be supported on one or two major cloud providers.
  In the case that an essential option or method is not available on a given cloud provider, then the resource's concrete implementation should throw when the option or method is used.
  Resources that are difficult to abstract across cloud providers should be implemented as third party Wing libraries.

- **Open**: The Wing SDK is an extensible framework.
  It is also open source, and designed to be easy to contribute to.
  It heavily relies on interfaces to allow developers to extend its behavior and provide their own custom implementations targeting new cloud providers, or allow more customized behavior.

- **Deterministic**: The same code should always produce the same result.
  Any non-determinism should be minimized and scoped to inputs provided by the user (e.g. by letting the user provide file sources or environment variables).
  Non-determistic information can also be managed by the provisioning engine (for example, in Terraform state) in the form of late-bound values.

- **Built with jsii, designed for Wing**: The Wing SDK is designed first and foremost for the Wing language, but it is compiled with jsii to allow resources to be created as (preflight) CDK constructs in all jsii-supported programming languages.
  jsii poses restrictions on language features that cannot be idiomatically represented in target languages, and encourages good practices for object-oriented design.
  Features that are specific to Wing (such as inflight functions) may not be supported in other jsii languages.

## Concepts used throughout the SDK

### Stateful resources

> Reqtag: `sdk:stateful`

A stateful resource is a resource that has application state associated with it.
By contrast, a non-stateful resource does not remember information about past transactions or events, and can typically be replaced by a cloud provider with a fresh copy without any consequences.

The SDK identifies each resource as stateful or stateless through a public instance property named `stateful`.
This property can be overridden by users as needed.

In the future, Wing will be able to use this information to provide an improved experience when deploying applications.
See [this issue](https://github.com/winglang/wing/discussions/1054) for more details.

### Serializing data

> Reqtag: `sdk:serializable`
> <span id="sdk:serializable"/>

Several APIs in the SDK accept or return values that need to be serialized and sent over the wire, and deserialized on the other side.

For example, `bucket.get()` returns the contents of an object in the bucket, and `bucket.put()` accepts the contents of an object to be stored in the bucket.

The SDK specification currently models these APIs using the `Json` or `Blob` types, though it may be possible for the language to support more serializable types in the future.

### Paginated APIs

> Reqtag: `sdk:pagination`
> <span id="sdk:pagination"/>

Some APIs return a list of results that may be too large to fit in memory, or too large to fetch from the cloud all at once.
In these cases, APIs can return an `Iterator` object.
An `Iterator` is an object with a `next()` method and a `has_next()` method, which return the next page of results and whether there are more results to fetch, respectively.
The `Iterator` object also implements the [async iterator protocol in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_async_iterator_and_async_iterable_protocols), so it can be used within `for...of` loops in TypeScript or in Wing.

### Event handlers

Some resources can automatically emit events as a result of an action or a change to their state.
These events are "fire-and-forget" notifications which may not always be delivered in order, and which don't expect a response to be sent back by the listener(s).

Resources that emit events in a "fire-and-forget" fashion should make their events listenable through a method named `on_<event>`.

> Reqtag: `sdk:on-event-name`
> <span id="sdk:on-event-name"/>

For example, a `cloud.Bucket` can emit events whenever an object is uploaded, and these events can be listened to by calling `on_upload` on the bucket:

```ts
// wing
let bucket = new cloud.Bucket();
bucket.on_upload(inflight (file: str) => {
  log.info("File uploaded: " + file);
});
```

The argument to an `on_<event>` method is called an event handler.
An event handler is any resource that implements an interface with a single `handle_<event>` method.
For example:

```ts
// wing

interface IOnUploadEventHandler {
  inflight handle_upload_event(event: BucketUploadEvent);
}
```

An inflight closure can also be used as an event handler, since the compiler will automatically convert it into a resource that implements any required interfaces.
For example, the definitions of `x1` and `x2` are equivalent:

```ts
// wing
let x1 = inflight (event: MyEvent) => {
  log.info("Event received: " + event);
};

resource X implements IMyEventHandler {
  inflight handle_myevent(event: MyEvent) {
    log.info("Event received: " + event);
  }
}
let x2 = new X();
```

> Reqtag: `sdk:event-handler-conversion`
> <span id="sdk:event-handler-conversion"/>

In the example with `bucket.on_upload` from earlier this section, when the method is called, cloud infrastructure is automatically added to invoke the event handler's `handle` method whenever an object is added to the bucket.

Users can define their own event-based APIs by making use of the `Topic` resource.
For example, suppose you want to extend `cloud.Counter` so that it triggers an event whenever a threshold is reached or exceeded:

```ts
// wing

let counter = new CounterWithThreshold(threshold: 10);
counter.on_threshold(inflight (event: ThresholdReachedEvent) => {
  log.info("Threshold reached: " + event.value);
});
```

You can implement this by defining a `CounterWithThreshold` resource with an `on_threshold` method, and use a `Topic` to publish events:

```ts
// wing

struct CounterWithThresholdProps extends cloud.CounterProps {
  threshold: num;
}

resource CounterWithThreshold extends cloud.Counter {
  _threshold: num;
  _topic: cloud.Topic;

  init(props: CounterWithThresholdProps) {
    super(props);
    this._threshold = props.threshold;
    this._topic = new cloud.Topic();
  }

  inflight inc(amount?: num) {
    let new_value = super.inc(amount);
    if new_value >= this._threshold {
      this._topic.publish(ThresholdReachedEvent {
        value: new_value,
        time_reached: time.now(),
      });
    }
    return value;
  }

  // or: on_threshold(handler: EventHandler<ThresholdReachedEvent>)
  on_threshold(handler: inflight (event: ThresholdReachedEvent) => void) {
    return this._topic.on_message(handler);
  }
}

struct ThresholdReachedEvent {
  value: num;
  time_reached: Time;
}
```

## Planned resources

- Bucket (P1) [[issue](https://github.com/winglang/wing/issues/600)] - object storage, similar to AWS S3, Azure Blob Storage, GCP Storage
- Queue (P1) [[issue](https://github.com/winglang/wing/issues/604)] - a message queue, similar to AWS SQS, Azure Storage Queues
- Function (P1) [[issue](https://github.com/winglang/wing/issues/602)] - a serverless function, similar to AWS Lambda, Azure Functions, GCP Cloud Functions
- Topic (P1) [[issue](https://github.com/winglang/wing/issues/592)] - a pub/sub topic, similar to AWS SNS, Azure Event Grid, GCP Pub/Sub
- Counter (P1) [[issue](https://github.com/winglang/wing/issues/609)] - an atomic counter
- Schedule (P1) [[issue](https://github.com/winglang/wing/issues/1289)] - a cron job / scheduled task trigger
- Api (P1) [[issue](https://github.com/winglang/wing/issues/623)] - a REST API
- Service (P1) [[issue](https://github.com/winglang/wing/issues/1305)] - a long-running service, similar to AWS ECS, Azure Container Instances, GCP Cloud Run
- SqlDatabase (P1) [[issue](https://github.com/winglang/wing/issues/1309)] - a relational database that lets you execute arbitrary SQL queries, similar to AWS RDS, Azure SQL Database, GCP Cloud SQL
- Website (P2) [[issue](https://github.com/winglang/wing/issues/1293)] - a CDN-backed static website
- Metric (P2) [[issue](https://github.com/winglang/wing/issues/1297)] - a metric for monitoring system performance
- Alarm (P2) [[issue](https://github.com/winglang/wing/issues/1301)] - an alarm that triggers when a metric crosses a threshold
- Table (P2) [[issue](https://github.com/winglang/wing/issues/1314)] - a NoSQL database table
- Key-value store (P2) [[issue](https://github.com/winglang/wing/issues/1317)] - a lightweight key-value store, similar to Redis or Memcached
- Job (P2) [[issue](https://github.com/winglang/wing/issues/1321)] - a long-running compute workload that can be run on demand
- Workflow (P2) [[issue](https://github.com/winglang/wing/issues/1325)] - a task orchestration engine, similar to AWS Step Functions, Azure Logic Apps, GCP Workflows
- Secret (P2) [[issue](https://github.com/winglang/wing/issues/1329)] - a secret value, similar to AWS Secrets Manager, Azure Key Vault, GCP Secret Manager
- Stream (P2) [[issue](https://github.com/winglang/wing/issues/1333)] - a stream of events, similar to AWS Kinesis, Azure Event Hubs, GCP Pub/Sub and Dataflow
- OnDeploy (P2) [[issue](https://github.com/winglang/wing/issues/1337)] - a variation of Function that runs every time the app is deployed
- GraphQLApi (P2) [[issue](https://github.com/winglang/wing/issues/1341)] - a GraphQL API, similar to AWS AppSync

### Resources planned as third party libraries

- Redis (P1) [[issue](https://github.com/winglang/wing/issues/611)]
- DynamoDBTable [[issue](https://github.com/winglang/wing/issues/1345)]
- MongoDB [[issue](https://github.com/winglang/wing/issues/1349)]
- GithubRepo [[issue](https://github.com/winglang/wing/issues/1353)]
- Authorization/authentication related resources [[issue](https://github.com/winglang/wing/issues/1216)]

## Bucket

The bucket resource represents an object store that can be used to store and retrieve arbitrary data.
A bucket can be used to store text files, images, videos, and any other type of data.
You can think of a bucket like hash map in the cloud whose data is typically distributed across multiple machines for high availability.

**Stateful:** Yes

<!--
All code snippets should be in Wing - it just says "ts" for syntax highlighting
-->

```ts
struct BucketProps {
  /**
   * Whether the bucket is public.
   * @default false
   */
  public: bool?;
}

resource Bucket {
  init(props: BucketProps = {});

  /**
   * Whether the bucket is public.
   */
  get public(): bool;

  /**
   * Run an inflight whenever an object is uploaded to the bucket.
   */
  on_upload(fn: inflight (key: str) => void, opts: BucketOnUploadProps?): void;

  /**
   * Run an inflight whenever an object is deleted from the bucket.
   */
  on_delete(fn: inflight (key: str) => void, opts: BucketOnDeleteProps?): void;

  /**
   * Run an inflight whenever an object is updated in the bucket.
   */
  on_update(fn: inflight (key: str) => void, opts: BucketOnUpdateProps?): void;

  /**
   * Run an inflight whenever an object is uploaded, modified, or deleted from the bucket.
   */
  on_event(fn: inflight (event: BucketEvent) => void, opts: BucketOnEventProps?): void;

  /**
   * Add an object to the bucket that is uploaded when the app is deployed.
   */
  add_object(key: str, value: Blob): void;

  /**
   * Upload an object to the bucket.
   */
  inflight put(key: str, value: Blob): void;

  /**
   * Upload a Json object to bucket
   */
  inflight put_json(key: str, value: Json): void;

  /**
   * Get an object from the bucket.
   *
   * @throws Will throw if the object doesn't exist.
   */
  inflight get(key: str): Blob;

  /**
   * Get an object from the bucket if it exists.
   */
  inflight try_get(key: str): Blob?;

  /**
   * Delete an object from the bucket.
   *
   * @throws Will throw if the object doesn't exist.
   */
  inflight delete(key: str): void;

  /**
   * Delete an object from the bucket if it exists.
   */
  inflight try_delete(key: str): bool;

  /**
   * Check if an object exists in the bucket.
   */
  inflight exists(key: str): bool;

  /**
   * Get the metadata of an object in the bucket.
   */
  inflight metadata(key: str): ObjectMetadata;

  /**
   * Move an object to a new location in the bucket. If an object already exists
   * at the destination key, it will be overwritten.
   *
   * @throws Will throw if the `src` object doesn't exist.
   */
  inflight rename(src: str, dst: str): void;

  /**
   * Copy an object to a new location in the bucket. If the destination object
   * already exists, it will be overwritten.
   *
   * @throws Will throw if the `src` object doesn't exist.
   */
  inflight copy(src: str, dst: str): void;

  /**
   * List all objects in the bucket with the given prefix.
   */
  inflight list(prefix: str?): Iterator<str>;

  /**
   * Returns a url to the given object key. Does not check if the object exists.
   *
   * @throws Will throw if the bucket is not public.
   */
  inflight public_url(key: str): str;

  /**
   * Returns a signed url to the given object. This URL can be used by anyone to
   * access the object until the link expires (defaults to 24 hours).
   */
  inflight signed_url(key: str, duration?: duration): str;
}

struct ObjectMetadata {
  /** The size of the object in bytes. */
  size: Size;
  /** The time the object was last modified. */
  last_modified: Date; // or an ISO timestamp `str` until we have Date API support
  /** The content type of the object, if it is known. */
  content_type: str?;
}

struct BucketOnUploadProps { /* elided */ }
struct BucketOnDeleteProps { /* elided */ }
struct BucketOnUpdateProps { /* elided */ }
struct BucketOnEventProps { /* elided */ }

struct BucketEvent {
  key: str;
  type: BucketEventType;
}

enum BucketEventType {
  PUT,
  DELETE,
  UPDATE,
}
```

Future extensions:

- `versioned` constructor property for object versioning

## Queue

> Note: this API is WIP, and needs more research for multi-cloud support.
> Open questions:
>
> - How are messages acknowledged?
> - What is the API for FIFO queues?
> - What is the API for dead-letter queues?
> - What is the API for message visibility timeouts?
> - What is the API for message retention periods?
> - What is the API for message deduplication?
> - Should the API use "push"/"pop" terminology or "send"/"receive" terminology?

The queue resource represents a message buffer that can be used to decouple workloads between a set of producers and a set of consumers.
Using a queue, you can send, store, and receive messages between software components at any volume, without losing messages or requiring other services to be available.

Any number of producers can push messages to the queue, and any number of consumers can pop messages from the queue.
When a consumer function receives a batch of messages, it is responsible for processing each message in the batch and acknowledging that the message has been processed by deleting it from the queue.
If a consumer function does not acknowledge a message, the message will be re-delivered to another consumer function.

A queue is not FIFO (first-in-first-out), so messages may be delivered out of order.

**Stateful:** Yes

```ts
struct QueueProps {
  /**
   * How long a message is available for consumption before it's made available
   * for other consumers.
   * @default 30s
   */
  timeout: duration?;
}

resource Queue {
  init(props: QueueProps = {});

  /**
   * How long a message is available for consumption before it's made available
   * for other consumers.
   */
  get timeout(): duration;

  /**
   * Run an inflight in a cloud function whenever a message is pushed to the queue.
   */
  add_consumer(fn: inflight (message: Json) => void, opts: QueueAddConsumerProps?): void;

  /**
   * Return the approximate message count of the queue.
   */
  inflight get approx_size(): num;

  /**
   * Push a message to the queue.
   */
  inflight push(message: Json): void;

  /**
   * Pops (deletes and returns) a message from the queue.
   */
  inflight pop(): Json;

  /**
   * Remove all messages from the queue.
   */
  inflight purge(): void;
}

struct QueueAddConsumerProps { /* elided */ }
```

Future extensions:

- automatic dead-letter queue configuration

## Function

The function resource represents a stateless function that can run a snippet of code whenever invoked (and any number of times in parallel).
Functions are typically used to process data in response to events, such as a file being uploaded to a bucket, a message being pushed to a queue, or a timer expiring.

When a function is invoked on a cloud provider, it is typically executed in a container that is spun up on demand.
The container is then destroyed after the function finishes executing.
This makes them easy to scale and fault-tolerant.

Functions may be invoked more than once, and some cloud providers may automatically retry failed invocations.
In addition, it is possible for functions to be partially invoked (e.g. if a container is destroyed mid-execution).
For performance reasons, most cloud providers impose a timeout on functions, after which the function is automatically terminated.

**Stateful:** No

```ts
struct FunctionProps {
  /**
   * The maximum amount of time the function can run.
   * @default 1m
   */
  timeout: duration?;

  /**
   * The amount of memory to allocate to the function, in MB.
   * @default 128
   */
  memory: num?;

  /**
   * The maximum number of concurrent invocations of the function.
   * @default 10
   */
  concurrency: num?;

  /**
   * The environment variables to pass to the function.
   * @default {}
   */
  env: Map<str>?;
}

resource Function {
  init(handler: inflight (input: any): any, props: FunctionProps = {});

  /**
   * The maximum amount of time the function can run.
   */
  get timeout(): duration;

  /**
   * The amount of memory to allocate to the function, in MB.
   */
  get memory(): num;

  /**
   * The maximum number of concurrent invocations of the function.
   */
  get concurrency(): num;

  /**
   * Add an environment variable to the function.
   */
  add_env(key: str, value: str): void;

  /**
   * Invoke the function.
   * @returns the value returned by `handler`, or `nil` if it doesn't return anything.
   */
  inflight invoke(payload: Json): Json;

  /**
   * Invoke the function, but do not wait for the result.
   */
  inflight invoke_async(payload: Json): void;
}
```

Future extensions:

- `on_invoke(fn: inflight (payload: Json) => void): cloud.Function`
- `on_resolve(fn: inflight(result: Json) => void): cloud.Function`

## Counter

The counter resource represents a service that stores one or more integer values that can be (atomically) incremented or decremented.
Counters are useful for tracking the number of times a particular event has occurred.

Most operations provide a `key` parameter that can be used to identify different counters.

**Stateful:** Yes

```ts
struct CounterProps {
  /**
   * The initial value of the counter(s).
   * @default 0
   */
  initial: num?;
}

resource Counter {
  init(props: CounterProps = {});

  /**
   * Increment a counter, returning the previous value.
   * The `key` parameter can be used to update different counters.
   * @default - value: 1, key: "default"
   */
  inflight inc(value: num?, key: string?): num;

  /**
   * Decrement tahe counter, returning the previous value.
   * The `key` parameter can be used to update different counters.
   * @default - value: 1, key: "default"
   */
  inflight dec(value: num?, key: string?): num;

  /**
   * Get the current value of a counter. Using this API is prone to race
   * conditions since the value can change between the time it is read and the
   * time it is used in your code.
   * @default - key: "default"
   */
  inflight peek(key: string?): number;

  /**
   * Reset a counter to a given value.
   * @default - value: 0, key: "default"
   */
  inflight reset(value?: num, key: string?): void;
}
```

Example:

```ts
const counter = new cloud.Counter();
counter.inc();
counter.inc(1, "foo");
counter.inc(2, "bar");
counter.inc(3, "foo");
assert(counter.peek() == 1);
assert(counter.peek("foo") == 4);
assert(counter.peek("bar") == 2);
```

Future extensions:

- `on_change(fn: inflight (delta: num, new_value: num) => void): cloud.Function`

## Topic

The topic resource represents a service that can be used to publish and subscribe to messages.
A topic resembles a queue, but messages are not persisted, do not need to be acknowledged, and all subscribers receive a copy of each message.

**Stateful:** No

```ts
struct TopicProps {}

resource Topic {
  init(props: TopicProps = {});

  /**
   * Run an inflight whenever a message is published to the topic.
   */
  on_message(fn: inflight (message: Json) => void, opts: TopicOnPublishProps?): void;

  /**
   * Publish a message to the topic.
   */
  inflight publish(message: Json): void;
}

struct TopicOnMessageProps { /* elided */ }
```

## Schedule

The schedule resource represents a service that can trigger events at a regular interval.
Schedules are useful for periodic tasks, such as running backups or sending daily reports.

**Stateful:** No

```ts
resource Schedule {
  /**
   * Trigger events according to a cron schedule.
   * @example "0 0 * * *" - midnight every day
   */
  static from_cron(cron: str): Schedule;

  /**
   * Trigger events at a periodic rate.
   * @example 1 hour
   */
  static from_rate(rate: duration): Schedule;

  private init(/* elided */): Schedule;

  /**
   * Run an inflight whenever the schedule triggers.
   */
  on_tick(fn: inflight () => void, opts: ScheduleOnTickProps?): void;
}

struct ScheduleOnTickProps { /* elided */ }
```

Example:

```ts
// wing
bring cloud;

// Run a function every hour.
let every_hour = new cloud.Schedule.fromRate(1h); // implicit scope and id?

every_hour.on_tick(inflight () => {
  // ...
});
```

Future extensions: inflight `next_tick(): Duration` method?

## Website

The website resource represents a CDN-backed website.
It is useful for hosting static content, such as a blog or a single-page application.

**Stateful:** No

```ts
struct WebsiteProps {
  /**
   * Local path to the website's static files, relative to the Wing source file.
   * @example "./dist"
   */
  path: str;

  /**
   * The website's custom domain name.
   * @example "example.com"
   * @default - a domain is generated by the cloud provider
   */
  domain: str?;
}

resource Website {
  init(props: WebsiteProps);

  /**
   * Local path to the website's static files, relative to the Wing source file.
   * @example "./dist"
   */
  get path(): str;

  /**
   * The website's url.
   */
  get url(): str;
}
```

Future extensions: domain and certificate props? support for edge functions?

## Api

The Api resource represents an API Gateway that can be used to manage HTTP routes and run functions in response to requests.

**Stateful:** No

```ts
struct ApiProps {
  /**
   * Options for configuring the API's CORS behavior across all routes.
   * Options can also be overridden on a per-route basis.
   * @default - CORS is disabled
   */
  cors: ApiCorsProps?;
}

resource Api {
  init(props: ApiProps = {});

  /**
   * The api's base url.
   */
  url: str;

  /**
   * Default CORS configuration options that are used for new routes.
   * These can be overridden on a per-route basis.
   */
  cors: ApiCorsProps;

  /**
   * Run an inflight whenever a GET request is made to the specified route.
   */
  get(route: str, fn: inflight (req: ApiRequest) => ApiResponse, opts: cloud.ApiOnGetProps?): void;

  /**
   * Run an inflight whenever a POST request is made to the specified route.
   */
  post(route: str, fn: inflight (req: ApiRequest) => ApiResponse, opts: cloud.ApiOnPostProps?): void;

  /**
   * Run an inflight whenever a PUT request is made to the specified route.
   */
  put(route: str, fn: inflight (req: ApiRequest) => ApiResponse, opts: cloud.ApiOnPutProps?): void;

  /**
   * Run an inflight whenever a DELETE request is made to the specified route.
   */
  delete(route: str, fn: inflight (req: ApiRequest) => ApiResponse, opts: cloud.ApiOnDeleteProps?): void;

  /**
   * Run an inflight whenever a PATCH request is made to the specified route.
   */
  patch(route: str, fn: inflight (req: ApiRequest) => ApiResponse, opts: cloud.ApiOnPatchProps?): void;

  /**
   * Run an inflight whenever any request is made to the specified route.
   */
  any(route: str, fn: inflight (req: ApiRequest) => ApiResponse, opts: cloud.ApiOnAnyProps?): void;

  /**
   * Make a request to the specified route. Throws if the route hasn't been
   * defined.
   */
  inflight request(req: ApiRequest): ApiResponse;
}

struct ApiOnGetProps { /* elided */ }
struct ApiOnPostProps { /* elided */ }
struct ApiOnPutProps { /* elided */ }
struct ApiOnDeleteProps { /* elided */ }
struct ApiOnPatchProps { /* elided */ }
struct ApiOnAnyProps { /* elided */ }

struct ApiCorsProps {
  /**
   * The list of allowed origins.
   * @example ["https://example.com"]
   */
  origins: Array<str>;

  /**
   * The list of allowed methods.
   * @example [HttpMethod.GET, HttpMethod.POST]
   */
  methods: Array<HttpMethod>;

  /**
   * The list of allowed headers.
   * @example ["Content-Type"]
   */
  headers: Array<str>;

  /**
   * The list of exposed headers.
   * @example ["Content-Type"]
   */
  exposed_headers: Array<str>;

  /**
   * Whether to allow credentials.
   */
  allow_credentials: bool;
}

struct ApiRequest {
  /** The request's HTTP method. */
  method: HttpMethod;
  /** The request's path. */
  path: str;
  /** The request's query parameters. */
  query: Map<str>?;
  /** The path variables. */
  vars: Map<str>?;
  /** The request's body. */
  body: Json?;
  /** The request's headers. */
  headers: Map<str>?;
}

struct ApiResponse {
  /** The response's status code. */
  status: number;
  /** The response's body. */
  body: Json?;
  /** The response's headers. */
  headers: Map<str>?;
}

enum HttpMethod {
  GET,
  HEAD,
  POST,
  PUT,
  DELETE,
  CONNECT,
  OPTIONS,
  PATCH,
}
```

Example:

```ts
// wing
let api = new cloud.Api();

api.get("/hello", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    status: 200,
    body: "Hello, world!"
  };
});

api.post("/hello", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    status: 200,
    body: "Hello, " + req.body + "!"
  };
});

// curl
$ curl https://api.example.com/hello
Hello, world!

$ curl -X POST -d "world" https://api.example.com/hello
Hello, world!
```

Future extensions:

- endpoint authorization?
- APIs for creating paginated APIs / responses?

## Metric

The metric resource represents a metric that can be used to trigger events when a threshold is exceeded.

**Stateful:** Yes

```ts
struct MetricProps {
  /**
   * The metric's name.
   * @example "bytes_uploaded"
   */
  name: str;

  /**
   * The metric's unit.
   * @example "bytes"
   */
  unit: str;

  /**
   * The metric's description.
   * @example "The number of bytes uploaded to the website."
   * @default - no description
   */
  description?: str;
}

resource Metric {
  init(props: MetricProps);

  /**
   * The metric's name.
   * @example "bytes_uploaded"
   */
  name: str;

  /**
   * The metric's unit.
   * @example "bytes"
   */
  unit: str;

  /**
   * The metric's description, if any.
   * @example "The number of bytes uploaded to the website."
   */
  description: str?;

  /**
   * Run an inflight whenever the metric exceeds the specified threshold.
   */
  on_threshold(fn: inflight () => void, opts: MetricOnThresholdProps): void;

  /**
   * Record a value for the metric at the current point in time.
   */
  inflight record(value: number): void;
}

struct MetricOnThresholdProps {
  /**
   * The threshold to trigger the event at.
   */
  threshold: number;

  /**
   * The number of consecutive periods the threshold must be exceeded for.
   * @default 1
   */
  periods: number?;

  /**
   * The comparison operator to use.
   * @default ComparisonOperator.GreaterThanThreshold
   */
  comparison_operator: ComparisonOperator;
}

// operators available on AWS: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudwatch-alarm.html#aws-resource-cloudwatch-alarm-properties
// derived metrics can be used to achieve "equal" or "not equal"
// operators available on Azure: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/monitor_metric_alert#operator
// operators available on GCP: https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/monitoring_alert_policy#comparison
enum ComparisonOperator {
  GreaterThan,
  GreaterThanOrEqual,
  LessThan,
  LessThanOrEqual,
  Equal,
  NotEqual,
}
```

Future extensions:

- support for derived metrics? (e.g. `metric1 + metric2`)

## Service

The service resource represents a containerized workload that can run indefinitely.
Services are useful for long-running processes, like web servers and background workers.

A service is created from a buildpack, an open-source technology that makes it
fast and easy for you to create secure, production-ready container images from
source code and without a Dockerfile.

**Stateful:** No

> **Implementation notes**:
>
> On AWS, this could be implemented using AWS AppRunner. Buildpack would be used
> to generate an image at compile time, which would be uploaded to ECR during
> Terraform deployment, and then AppRunner would be used to create a service.
>
> (Why not ECS? ECS is a great service, but it introduces a lot of complexity and
> isn't really necessary for the most common use cases (writing HTTP services
> using ECS with Fargate would require possibly creating a VPC, subnets,
> routing table, internet gateway, security groups, load balancer, target group,
> cluster, task definition, service, and scaling policy. That's a lot of
> complexity to maintain in the SDK.)
>
> On GCP, this could be implemented using Cloud Run. Buildpack would be used to
> generate an image, which would be uploaded to GCR, and then Cloud Run would be
> used to create a service.
>
> On Azure, this could be implemented using Azure App Service. Buildpack would be
> used to generate an image, which would be uploaded to ACR, and then App Service
> would be used to create a service.
>
> Links:
> https://aws.amazon.com/blogs/containers/creating-container-images-with-cloud-native-buildpacks-using-aws-codebuild-and-aws-codepipeline/ > https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apprunner_service#image-repository > https://github.com/buildpacks/community/blob/main/ADOPTERS.md > https://cloud.google.com/blog/products/containers-kubernetes/google-cloud-now-supports-buildpacks

TODO: How should autoscaling be configured?

```ts
struct ServiceProps {
  /**
   * The directory containing the service's source code to package with
   * buildpack.
   */
  buildpack_path: str;

  /**
   * The service's environment variables.
   * @default {}
   */
  env: Map<str>;

  /**
   * The service's command.
   */
  command: str;

  /**
   * The service's port.
   * @default 8080
   */
  port: number?;

  /**
   * The service's memory limit.
   * @default 512
   */
  memory: number?;

  /**
   * The service's CPU limit.
   * @default 0.5
   */
  cpu: number?;
}

resource Service {
  init(props: ServiceProps);

  /**
   * The service's URL.
   */
  url: str;

  /**
   * The directory containing the service's source code to package with
   * buildpack.
   */
  buildpack_path: str;

  /**
   * The service's command.
   */
  command: str;

  /**
   * The service's port.
   */
  port: number?;

  /**
   * The service's memory limit.
   */
  memory: number?;

  /**
   * The service's CPU limit.
   */
  cpu: number?;

  /**
   * The service's number of replicas.
   */
  replicas: number?;

  /**
   * Add an environment variable to the service.
   */
  add_env(key: str, value: str): void;

  /**
   * Send a request to the service.
   */
  inflight request(opts: ServiceRequestOptions): ServiceResponse;
}

struct ServiceRequestOptions {
  /**
   * The request's method.
   */
  method: HttpMethod;

  /**
   * The request's path.
   */
  path: str;

  /**
   * The request's headers.
   * @default {}
   */
  headers: Map<str>;

  /**
   * The request's body.
   * @default ""
   */
  body: Json?;
}

struct ServiceResponse {
  /**
   * The response's status code.
   */
  status_code: number;

  /**
   * The response's headers.
   */
  headers: Map<str>;

  /**
   * The response's body.
   */
  body: Json?;
}
```

## Table

The table resource represents a NoSQL database table that can be used to store and query data.
Tables are useful for storing application state, like user profiles or blog posts.

Each table has a primary key that uniquely identifies each row.
The primary key can be any column, but it is recommended to use a `String` column named `id`.

On AWS, tables are implemented using DynamoDB.
On Azure, tables are implemented using CosmosDB.
On GCP, tables are implemented using Cloud Firestore.

**Stateful:** Yes

```ts
struct TableProps {
  /**
   * The table's name.
   */
  name: str;

  /**
   * The table's columns.
   */
  columns: Map<ColumnType>;

  /**
   * The table's primary key. No two rows can have the same value for the
   * primary key.
   */
  primary_key: str;
}

enum ColumnType {
  String,
  Number,
  Boolean,
  Date,
  Json,
}

resource Table {
  init(props: TableProps);

  /**
   * The table's name.
   */
  name: str;

  /**
   * The table's columns.
   */
  columns: Map<ColumnType>;

  /**
   * The table's primary key.
   */
  primary_key: str;

  /**
   * Insert a row into the table.
   */
  inflight insert(row: Map<Json>): void;

  /**
   * Update a row in the table.
   */
  inflight update(row: Map<Json>): void;

  /**
   * Delete a row from the table, by primary key.
   */
  inflight delete(key: str): void;

  /**
   * Get a row from the table, by primary key.
   */
  inflight get(key: str): Map<Json>;

  /**
   * List all rows in the table.
   */
  inflight list(): Iterator<Map<Json>>;
}
```

Future extensions:

- `on_insert(fn: inflight (row: Map<Json>) => void): cloud.Function;`
- `on_update(fn: inflight (row: Map<Json>) => void): cloud.Function;`
- `on_delete(fn: inflight (row: Map<Json>) => void): cloud.Function;`
