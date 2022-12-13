# Wing SDK

## Design Guidelines

When designing APIs for Wing, we try to follow these tenets (unless you know better ones):

- **Focused on functional behavior**: our APIs are designed around the functional aspects that developers care about for building and testing their applications.
Implementations of resources in the SDK are assumed to be scalable, highly-available, and fault tolerant by default, so that developers do not need to customize security policies or scaling configuration within their application code.
Operational aspects of resources should not leak into the core API surface area, except when they are essential to the functional behavior of the resource and the user's mental model.
For example, while the timeout of a serverless function can be considered an operational detail, it is essential to the user's mental model of functions as an ephemeral, stateless resource that should not be used for long-running or stateful workloads.

- **Meet developers where they are**: our APIs are based on the mental model of the user, and not the mental model of cloud service APIs, which are frequently designed against the constraints of the backend system and the fact that these APIs are used through network requests.
It's okay to enable multiple ways to achieve the same thing, in order to make it more natural for users who come from different mental models.
APIs should have sensible defaults, and should be easy to use correctly.
It's okay to make it possible to do the wrong thing, but it should be hard to do the wrong thing.

- **Cloud and target agnostic**: our APIs and their documentation should not have any assumptions about where resources are being deployed.
When possible, prefer mental models and terminology that are natural for operating with data structures for code running on your own machine (eg., choose "push" and "pop" over "send" and "receive").
Avoid APIs and options that may only be available on one or two major cloud providers.
In the case that an essential option or method is not available on a given cloud provider, then the resource's concrete implementation should throw when the option or method is used.

- **Open**: The Wing SDK is an extensible framework.
It is also open source.
It heavily relies on interfaces to allow developers to extend its behavior and provide their own custom implementations targeting new cloud providers, or allow more customized behavior.

- **Deterministic**: The same code should always produce the same result.
Any non-determinism should be minimized and scoped to sources provided by the user (e.g. by letting the user specify input files or environment variables).
Non-determistic information should also ideally be managed by the provisioning engine's (for example, random IDs can be generated and managed with Terraform state).

- **Built with jsii**: The Wing SDK is designed first and foremost for the Wing language, but it is compiled with jsii to allow the resources to be created as CDK constructs in all jsii-supported programming languages. 
jsii poses restrictions on language features that cannot be idiomatically represented in target languages, and encourages good practices for object-oriented design.
Features that are specific to Wing (such as inflight functions) may not be available in other jsii languages.

## Concepts used throughout the SDK

### Serializable

A `Serializable` is any immutable value that can be serialized and sent over the wire.
This includes all primitive types, as well as any immutable collection types of `Serializable`s (such as `List`s and `Map`s).
The Wing language spec does not yet support `Serializable` as a type, but until it is supported we will rely on the `str` type and provide a set of utility methods for casting to and from `str`.

### Paginated APIs

Some APIs return a list of results that may be too large to fit in memory.
In these cases, the API returns an `Iterator` object with a `next()` method that returns a `Promise` for the next page of results and a `has_next()` method that returns a `Promise` for a boolean indicating whether there are more results to fetch.
The `Iterator` object also implements the [async iterator protocol in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_async_iterator_and_async_iterable_protocols), so it can be used within `for...of` loops.

## Planned resources

* Bucket (P1) - object storage, similar to AWS S3, Azure Blob Storage, GCP Storage
* Queue (P1) - a message queue, similar to AWS SQS, Azure Storage Queues, GCP Pub/Sub
* Function (P1) - a serverless function, similar to AWS Lambda, Azure Functions, GCP Cloud Functions
* Topic (P1) - a pub/sub topic, similar to AWS SNS, Azure Event Grid, GCP Pub/Sub
* Logger (P1) - a log aggregator
* Counter (P1) - an atomic counter
* Schedule (P1) - a cron job / scheduled task trigger
* Website (P1) - a CDN-backed static website
* Api (P1) - a REST API
* Metric (P1) - a metric for monitoring system performance
* Alarm (P1) - an alarm that triggers when a metric crosses a threshold
* Service (P1) - a long-running service, similar to AWS ECS, Azure Container Instances, GCP Cloud Run
* Table (P2) - a relational database table
* Key-value store (P2) - a lightweight key-value store, similar to Redis or Memcached
* Job (P2) - a long-running compute workload that can be run on demand
* Workflow (P2) - a task orchestration engine, similar to AWS Step Functions, Azure Logic Apps, GCP Workflows
* Secret (P2) - a secret value, similar to AWS Secrets Manager, Azure Key Vault, GCP Secret Manager
* Stream (P2) - a stream of events, similar to AWS Kinesis, Azure Event Hubs, GCP Pub/Sub and Dataflow

### Resources planned as third party libraries

* DynamoDBTable
* Redis
* MongoDB
* GithubRepo

## Bucket

The bucket resource represents an object store that can be used to store and
retrieve arbitrary data. A bucket can be used to store text files, images,
videos, and any other type of data. You can think of a bucket as a file system
or hash map in the cloud whose data is usually distributed across multiple
machines for high availability.

<!--
All code snippets should be in Wing - it just says "ts" for syntax highlighting
-->

```ts
interface BucketProps {
  /**
   * Whether the bucket is public.
   * @default false
   */
  public?: bool;
}

interface IBucket {
  /**
   * Run a function whenever a file is uploaded to the bucket.
   */
  on_upload(fn: inflight (key: str) => void, opts: cloud.FunctionProps): cloud.Function;

  /**
   * Run a function whenever a file is deleted from the bucket.
   */
  on_delete(fn: inflight (key: str) => void, opts: cloud.FunctionProps): cloud.Function;

  /**
   * Run a function whenever a file is updated in the bucket.
   */
  on_update(fn: inflight (key: str) => void, opts: cloud.FunctionProps): cloud.Function;

  /**
   * Run a function whenever a file is created, uploaded, or deleted from the bucket.
   */
  on_event(fn: inflight (event: BucketEvent) => void, opts: cloud.FunctionProps): cloud.Function;
}

interface IBucketClient {
  /**
   * Upload a file to the bucket.
   */
  put(key: str, value: Serializable): Promise<void>;

  /**
   * Get a file from the bucket.
   */
  get(key: str): Promise<Serializable>;

  /**
   * Delete a file from the bucket.
   */
  delete(key: str): Promise<void>;

  /**
   * List all files in the bucket with the given prefix.
   */
  list(prefix?: str): Promise<Iterator<str>>;

  /**
   * Get the URL for a file in the bucket.
   * @throws Will throw if the bucket is not public.
   */
  download_url(key: str): Promise<str>;
}
```

Future extensions:
- `versioned` constructor property for object versioning

## Queue

The queue resource represents a buffer for messages which can help create more
predictable load between a set of producers and a set of consumers. Using a
queue, you can send, store, and receive messages between software components at
any volume, without losing messages or requiring other services to be available.

Any number of producers can push messages to the queue, and any number of consumers
can pop messages from the queue. When a consumer function receives a batch of
messages, it is responsible for processing each message in the batch and
acknowledging that the message has been processed by deleting it from the queue.
If a consumer function does not acknowledge a message, the message will be
re-delivered to another consumer function.

```ts
interface QueueProps {}

interface IQueue {
  /**
   * Run a function whenever a message is pushed to the queue.
   *
   * The visibility timeout for messages (amount of time a consumer is given to
   * process a message before it's made available for other consumers) is the
   * same as the function's timeout, which is 1 minute by default. If the function
   * returns successfully, the message is deleted from the queue.
   */
  on_message(fn: inflight (message: Serializable) => void, opts: cloud.FunctionProps): cloud.Function;
}

interface IQueueClient {
  /**
   * Push a message to the queue.
   */
  push(message: Serializable): Promise<void>;
  /**
   * Pops (deletes and returns) a message from the queue.
   */
  pop(): Promise<Serializable>;
}
```

Future extensions:
- automatic dead-letter queue configuration

## Function

The function resource represents a highly-distributed, stateless function that
can be used to run code only when needed. Functions are typically used to
process data in response to events, such as a file being uploaded to a bucket,
a message being pushed to a queue, or a timer expiring.

When a function is invoked on a cloud provider, it is typically executed in a
container that is spun up on demand. The container is then destroyed after the
function finishes executing. This allows functions to be highly-distributed
and stateless, which makes them easy to scale and fault-tolerant.

Functions are guaranteed to be invoked at least once, but may be invoked more
than once (and some cloud providers may automatically retry failed invocations).

```ts
interface FunctionProps {
  /**
   * The maximum amount of time the function can run, in seconds.
   * @default 1min
   */
  timeout?: duration;

  /**
   * The maximum number of concurrent invocations of the function.
   * @default 10
   */
  concurrency?: num;

  /**
   * The environment variables to pass to the function.
   * @default {}
   */
  env?: Map<str, str>;
}

interface IFunction {
  /**
   * Add an environment variable to the function.
   */
  add_env(key: str, value: str): void;
}

interface IFunctionClient {
  /**
   * Invoke the function.
   */
  invoke(payload: Serializable): Promise<Serializable>;
}
```

Future extensions:
- `on_invoke(fn: inflight (payload: Serializable) => void): cloud.Function`
- `on_resolve(fn: inflight(result: Serializable) => void): cloud.Function`

## Logger

```ts
interface ILogger {
  /**
   * Log a message.
   */
  log(message: str): void;
}

interface ILoggerClient {
  /**
   * Log a message.
   */
  log(message: str): Promise<void>;
}
```

Future extensions: log severity options?

## Counter

```ts
interface CounterProps {
  /**
   * The initial value of the counter.
   * @default 0
   */
  initial?: num;
}

interface ICounter {}

interface ICounterClient {
  /**
   * Increment the counter, returning the previous value.
   */
  inc(): Promise<void>;

  /**
   * Decrement the counter, returning the previous value.
   */
  dec(): Promise<void>;

  /**
   * Get the current value of the counter. Using this API is prone to race
   * conditions since the value can change between the time it is read and the
   * time it is used in your code.
   */
  peek(): Promise<number>;
}
```

## Schedule

```ts
interface ScheduleProps {
  /**
   * Trigger events according to a cron schedule.
   * 
   * Only one of `cron` or `rate` can be specified.
   * 
   * @default "0 0 * * *" - midnight every day
   */
  cron?: str;

  /**
   * Trigger events at a fixed interval.
   * 
   * Only one of `cron` or `rate` can be specified.
   * 
   * @default 1 day
   */
  rate?: duration;
}

interface ISchedule {
  /**
   * Register a worker to run on the schedule.
   */
  on_tick(handler: inflight () => void, opts: cloud.FunctionProps): cloud.Function;
}

interface IScheduleClient {}
```

Future extensions: inflight `next_tick(): Duration` method?

## Topic

```ts
interface TopicProps {}

interface ITopic {
  /**
   * Run a function whenever a message is published to the topic.
   */
  on_message(fn: inflight (message: Serializable) => void): cloud.Function;
}

interface ITopicClient {
  /**
   * Publish a message to the topic.
   */
  publish(message: Serializable): Promise<void>;
}
```

> Alternative names: `PubSub`, `EventBus`

## Website

A CDN-backed website.

```ts
interface WebsiteProps {
  /**
   * Path to the website's static files.
   */
  path: str;
}

interface IWebsite {
  /**
   * The website's url.
   */
  url: str;
}

interface IWebsiteClient {
  /**
   * Make a GET request to the website, and verify it returns a 200 status code.
   */
  ping(): Promise<bool>;
}
```

Future extensions: domain and certificate props? support for edge functions?

## Api

```ts
interface ApiProps {}

interface IApi {
  /**
   * The api's base url.
   */
  url: str;

  /**
   * Run a function whenever a GET request is made to the specified route.
   */
  on_get(route: str, fn: inflight (req: ApiRequest) => void, opts: cloud.FunctionProps): cloud.Function;

  /**
   * Run a function whenever a POST request is made to the specified route.
   */
  on_post(route: str, fn: inflight (req: ApiRequest) => void, opts: cloud.FunctionProps): cloud.Function;

  /**
   * Run a function whenever a PUT request is made to the specified route.
   */
  on_put(route: str, fn: inflight (req: ApiRequest) => void, opts: cloud.FunctionProps): cloud.Function;

  /**
   * Run a function whenever a DELETE request is made to the specified route.
   */
  on_delete(route: str, fn: inflight (req: ApiRequest) => void, opts: cloud.FunctionProps): cloud.Function;

  /**
   * Run a function whenever a PATCH request is made to the specified route.
   */
  on_patch(route: str, fn: inflight (req: ApiRequest) => void, opts: cloud.FunctionProps): cloud.Function;

  /**
   * Run a function whenever any request is made to the specified route.
   */
  on_request(route: str, fn: inflight (req: ApiRequest) => void, opts: cloud.FunctionProps): cloud.Function;
}

interface IApiClient {
  /**
   * Make a request to the specified route.
   */
  invoke(route: str, method: HttpMethod, payload: Serializable): Promise<Serializable>;
}

interface ApiRequest {
  path: str;
  method: HttpMethod;
  payload: Serializable;
  headers: Map<str, str>;
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

Future extensions: support endpoint authorization? cors?

## Table

```ts
interface TableProps {
  /**
   * The table's primary key. No two rows can have the same primary key.
   * @default "id"
   */
  primary_key?: str;
}

interface ITable {
  /**
   * Run a function whenever a row is inserted into the table.
   */
  on_insert(fn: inflight (row: Map<str, Serializable>) => void, opts: cloud.FunctionProps): cloud.Function;

  /**
   * Run a function whenever a row is updated in the table.
   */
  on_update(fn: inflight (row: Map<str, Serializable>) => void, opts: cloud.FunctionProps): cloud.Function;

  /**
   * Run a function whenever a row is deleted from the table.
   */
  on_delete(fn: inflight (row: Map<str, Serializable>) => void, opts: cloud.FunctionProps): cloud.Function;
}

interface ITableClient {
  /**
   * Insert a row into the table.
   */
  insert(row: Map<str, Serializable>): Promise<void>;

  /**
   * Update a row in the table.
   */
  update(row: Map<str, Serializable>): Promise<void>;

  /**
   * Delete a row from the table.
   */
  delete(row: Map<str, Serializable>): Promise<void>;

  /**
   * Get a row from the table, by primary key.
   */
  get(key: str): Promise<Map<str, Serializable>>;

  /**
   * List all rows in the table.
   */
  list(): Promise<Iterator<Map<str, Serializable>>>;
}
```
