# Wing SDK resources

## Design Guidelines

When designing APIs for Wing, we try to follow these tenets (unless you know better ones):

- **Meet developers where they are**: our APIs are based on the mental model of the user, and not the mental model of cloud service APIs, which are frequently designed against the constraints of the backend system and the fact that these APIs are used through network requests.
It's okay to enable multiple ways to achieve the same thing, in order to make it more natural for users who come from different mental models.
APIs should have sensible defaults, and should be easy to use correctly.
It's okay to make it possible to do the wrong thing, but it should be hard to do the wrong thing.

- **Cloud and target agnostic**: our APIs and their documentation should not have any assumptions about where resources are being deployed.
When possible, prefer mental models and terminology that are natural for operating with data structures for code running on your own machine (eg., choose "push" and "pop" over "send" and "receive").
Avoid APIs and options that may only be available on one or two major cloud providers.
In the case that an essential option or method is not available on a given cloud provider, then the resource's concrete implementation should throw when the option or method is used.

- **Focused on functional behavior**: our APIs are designed around the functional aspects that developers care about for building and testing their applications.
Implementations of resources in the SDK are assumed to be scalable, highly-available, and fault tolerant by default, so that developers do not need to customize security policies or scaling configuration within their application code.
Operational aspects of resources should not leak into the core API surface area.

- **Open**: The Wing SDK is an extensible framework.
It is also open source.
It heavily relies on interfaces to allow developers to extend its behavior and provide their own custom implementations targeting new cloud providers, or allow more customized behavior.

- **Deterministic**: The same code should always produce the same result.
Any non-determinism should be minimized and scoped to sources provided by the user (e.g. by letting the user specify input files or environment variables).
Non-determistic information should also ideally be managed by the provisioning engine's (for example, random IDs can be generated and managed with Terraform state).

## Concepts used throughout the RFC

### Serializable

A `Serializable` is any immutable value that can be serialized and sent over the wire.
This includes all primitive types, as well as any immutable collection types of `Serializable`s (such as `List`s and `Map`s).
The Wing language spec does not yet support `Serializable` as a type, but until it is supported we will rely on the `str` type and provide a set of utility methods for casting to `str`.

<!-- ### IEventObserver

An `IEventObserver` represents a resource that can listen for distributed events. In code, an `IEventObserver` is any resource that implements an `inflight update(event: Serializable)` method.

> In the future, if/when Wing supports generics, we can replace `Serializable` with a generic type parameter.
> For example, `IEventObserver<T>` represents a resource that can listen for events of type `T`. 
> This would allow us to type-check the `update` method, ensuring that e.g. a `cloud.Function` whose inflight code accepts `BucketEvent` in its first parameter can only be registered as a worker for a `cloud.Bucket` or some other source of `BucketEvent` notifications.

Examples:
- `cloud.Function` implements `IEventObserver`, so it is possible to register a function to be invoked when messages are available on a `cloud.Queue`, or whenever a notification is published to a `cloud.Topic`.
- `cloud.Queue` implements `IEventObserver`, so it is possible for events to be automatically pushed to a queue. -->

### Paginated APIs

Some APIs return a list of results that may be too large to fit in memory.
In these cases, the API returns an `Iterator` object with a `next()` method that returns a `Promise` for the next page of results and a `has_next()` method that returns a `Promise` for a boolean indicating whether there are more results to fetch.
The `Iterator` object also implements the [async iterator protocol in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_async_iterator_and_async_iterable_protocols), so it can be used within `for...of` loops.

## Planned resources

Resources planned for MVP:

* Bucket
* Queue
* Function
* Logger
* Counter
* Schedule
* Topic
* Website
* Api
* Table

Future resources planned for post-MVP:

* Key-value store
* Job
* Service
* Workflow
* Repo
* Secret
* Stream

## Bucket

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

interface BucketOnUp

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

> Note: AWS SQS imposes a (configurable) visibility timeout on all messages received from a queue.
> To abstract this away from the user, the implementation in Wing will automatically extend the visibility timeout of a message whenever a worker is processing it for an extended period of time, up to the 12 hour maximum.

```ts
interface QueueProps {}

interface IQueue {
  /**
   * Run a function whenever a message is pushed to the queue.
   */
  on_message(fn: inflight (message: Serializable) => void): cloud.Function;
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

## Function

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
   * The maximum number of times the function can be retried if it fails.
   * @default 0
   */
  retries?: num;

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

> Alternative names: `Timer`, `Cron`, `Schedule`

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
  on_tick(handler: inflight () => void): cloud.Function;
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
   * Run a function whenever a GET request is made to the specified path.
   */
  on_get(path: str, fn: inflight (req: ApiRequest) => void): cloud.Function;

  /**
   * Run a function whenever a HEAD request is made to the specified path.
   */
  on_head(path: str, fn: inflight (req: ApiRequest) => void): cloud.Function;

  /**
   * Run a function whenever a POST request is made to the specified path.
   */
  on_post(path: str, fn: inflight (req: ApiRequest) => void): cloud.Function;

  /**
   * Run a function whenever a PUT request is made to the specified path.
   */
  on_put(path: str, fn: inflight (req: ApiRequest) => void): cloud.Function;

  /**
   * Run a function whenever a DELETE request is made to the specified path.
   */
  on_delete(path: str, fn: inflight (req: ApiRequest) => void): cloud.Function;

  /**
   * Run a function whenever an OPTIONS request is made to the specified path.
   */
  on_options(path: str, fn: inflight (req: ApiRequest) => void): cloud.Function;

  /**
   * Run a function whenever a PATCH request is made to the specified path.
   */
  on_patch(path: str, fn: inflight (req: ApiRequest) => void): cloud.Function;

  /**
   * Run a function whenever any request is made to the specified path.
   */
  on_request(path: str, fn: inflight (req: ApiRequest) => void): cloud.Function;
}

interface IApiClient {
  /**
   * Make a request to the specified path.
   */
  invoke(path: str, method: HttpMethod, payload: Serializable): Promise<Serializable>;
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

Future extensions: support endpoint authorization?

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
  on_insert(fn: inflight (row: Map<str, Serializable>) => void): cloud.Function;

  /**
   * Run a function whenever a row is updated in the table.
   */
  on_update(fn: inflight (row: Map<str, Serializable>) => void): cloud.Function;

  /**
   * Run a function whenever a row is deleted from the table.
   */
  on_delete(fn: inflight (row: Map<str, Serializable>) => void): cloud.Function;
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
