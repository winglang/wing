# Wing SDK

## Design Guidelines

When designing APIs for Wing, we try to follow these tenets:

- **Focused on functional behavior**: our APIs are designed around the functional aspects that developers care about for building and testing their applications.
Implementations of resources in the SDK are guaranteed to be scalable, highly-available, and fault tolerant by default, so that developers do not need to customize security policies or scaling configuration within their application code.
Operational aspects of resources should not leak into the core API surface area, except when they are essential to the functional behavior of the resource and the user's mental model.
For example, while the timeout of a serverless function can be considered an operational detail, it is essential to the user's mental model of functions as an ephemeral, stateless resource that should not be used for long-running or stateful workloads.

- **Easy to understand**: our APIs are based on the mental model of the user, and not the mental model of cloud service APIs, which are frequently designed against the constraints of the backend system and the fact that these APIs are used through network requests.
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
* Tracer (P1) - a distributed tracing system, similar to AWS X-Ray, Azure Application Insights, GCP Stackdriver Trace
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
* OnDeploy (P2) - a variation of Function that runs every time the app is deployed

### Resources planned as third party libraries

* DynamoDBTable
* Redis
* MongoDB
* GithubRepo

## Bucket

The bucket resource represents an object store that can be used to store and retrieve arbitrary data.
A bucket can be used to store text files, images, videos, and any other type of data.
You can think of a bucket like hash map in the cloud whose data is typically distributed across multiple machines for high availability.

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

struct BucketOnUploadProps { /* elided */ }
struct BucketOnDeleteProps { /* elided */ }
struct BucketOnUpdateProps { /* elided */ }
struct BucketOnEventProps { /* elided */ }

interface IBucket {
  /**
   * Run a function whenever a file is uploaded to the bucket.
   */
  on_upload(fn: inflight (key: str) => void, opts: BucketOnUploadProps?): cloud.Function;

  /**
   * Run a function whenever a file is deleted from the bucket.
   */
  on_delete(fn: inflight (key: str) => void, opts: BucketOnDeleteProps?): cloud.Function;

  /**
   * Run a function whenever a file is updated in the bucket.
   */
  on_update(fn: inflight (key: str) => void, opts: BucketOnUpdateProps?): cloud.Function;

  /**
   * Run a function whenever a file is created, uploaded, or deleted from the bucket.
   */
  on_event(fn: inflight (event: BucketEvent) => void, opts: BucketOnEventProps?): cloud.Function;
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
  list(prefix: str?): Promise<Iterator<str>>;

  /**
   * Returns a url to the given object.
   * @throws Will throw if the public is not public.
   */
  public_url(key: str): Promise<str>;

  /**
   * Returns a presigned url to the given object. This URL can be used to access
   * the object by anyone until it expires (defaults to 24 hours).
   */
  presigned_url(key: str, duration: duration): Promise<str>;
}
```

Future extensions:
- `versioned` constructor property for object versioning

## Queue

<!-- WIP -->

The queue resource represents a message buffer that can be used to decouple workloads between a set of producers and a set of consumers.
Using a queue, you can send, store, and receive messages between software components at any volume, without losing messages or requiring other services to be available.

Any number of producers can push messages to the queue, and any number of consumers can pop messages from the queue.
When a consumer function receives a batch of messages, it is responsible for processing each message in the batch and acknowledging that the message has been processed by deleting it from the queue.
If a consumer function does not acknowledge a message, the message will be re-delivered to another consumer function.

A queue is not FIFO (first-in-first-out), so messages may be delivered out of order.

```ts
struct QueueProps {
  /**
   * How long a message is available for consumption before it's made available
   * for other consumers.
   */
  timeout: duration?;
}

struct QueueOnMessageProps { /* elided */ }

interface IQueue {
  /**
   * Run a function whenever a message is pushed to the queue.
   *
   * TODO: should we throw / warn the user if the function's timeout is greater than
   * the queue's timeout?
   */
  on_message(fn: inflight (message: Serializable) => void, opts: QueueOnMessageProps?): cloud.Function;
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

The function resource represents a stateless function that can run a snippet of code whenever invoked (and any number of times in parallel).
Functions are typically used to process data in response to events, such as a file being uploaded to a bucket, a message being pushed to a queue, or a timer expiring.

When a function is invoked on a cloud provider, it is typically executed in a container that is spun up on demand.
The container is then destroyed after the function finishes executing.
This makes them easy to scale and fault-tolerant.

Functions may be invoked more than once, and some cloud providers may automatically retry failed invocations.
In addition, it is possible for functions to be partially invoked (e.g. if a container is destroyed mid-execution).
For performance reasons, most cloud providers impose a timeout on functions, after which the function is automatically terminated.

```ts
struct FunctionProps {
  /**
   * The maximum amount of time the function can run, in seconds.
   * @default 1min
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
  env: Map<str, str>?;
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

The logger resource represents a service that can be used to log messages to a central location.

```ts
struct LoggerProps {}

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

Future extensions:
- log severity options?
- APIs for scanning/filtering logs?

## Tracer

TODO

<!--
Does this need to be a separate resource? Can we just use a logger?

Should this automatically hook into existing cloud tracing services like AWS
X-Ray, Azure Application Insights, or GCP Stackdriver Trace? Or should we
provide our own instrumentation with OpenTelemetry and use that across
all clouds? Or should/can we do both?
-->

## Counter

The counter resource represents a service that stores an integer value that can be (atomically) incremented or decremented.
Counters are useful for tracking the number of times a particular event has occurred.

```ts
struct CounterProps {
  /**
   * The initial value of the counter.
   * @default 0
   */
  initial: num?;
}

interface ICounter {}

interface ICounterClient {
  /**
   * Increment the counter, returning the previous value.
   * @default 1
   */
  inc(value: num?): Promise<void>;

  /**
   * Decrement the counter, returning the previous value.
   * @default 1
   */
  dec(value: num?): Promise<void>;

  /**
   * Get the current value of the counter. Using this API is prone to race
   * conditions since the value can change between the time it is read and the
   * time it is used in your code.
   */
  peek(): Promise<number>;
}
```

Future extensions:
- `on_change(fn: inflight (delta: num, new_value: num) => void): cloud.Function`

## Topic

The topic resource represents a service that can be used to publish and subscribe to messages.
A topic is similar to a queue, but messages are not persisted and all subscribers receive a copy of each message.

```ts
interface TopicProps {}

struct TopicOnPublishProps { /* elided */ }

interface ITopic {
  /**
   * Run a function whenever a message is published to the topic.
   */
  on_publish(fn: inflight (message: Serializable) => void, opts: TopicOnPublishProps?): cloud.Function;
}

interface ITopicClient {
  /**
   * Publish a message to the topic.
   */
  publish(message: Serializable): Promise<void>;
}
```

## Schedule

The schedule resource represents a service that can trigger events at a regular interval.
Schedules are useful for periodic tasks, such as running a backup or sending a daily report.

```ts
struct ScheduleProps {
  /**
   * Trigger events according to a cron schedule.
   * 
   * Only one of `cron` or `rate` can be specified.
   * 
   * @default "0 0 * * *" - midnight every day
   */
  cron: str?;

  /**
   * Trigger events at a fixed interval.
   * 
   * Only one of `cron` or `rate` can be specified.
   * 
   * @default 1 day
   */
  rate: duration?;
}

struct ScheduleOnTickProps { /* elided */ }

interface ISchedule {
  /**
   * Register a worker to run on the schedule.
   */
  on_tick(handler: inflight () => void, opts: ScheduleOnTickProps?): cloud.Function;
}

interface IScheduleClient {}
```

Future extensions: inflight `next_tick(): Duration` method?

## Website

The website resource represents a CDN-backed website.
It is useful for hosting static content, such as a blog or a single-page application.

```ts
struct WebsiteProps {
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

interface IWebsiteClient {}
```

Future extensions: domain and certificate props? support for edge functions?

## Api

The Api resource represents an API Gateway that can be used to manage HTTP routes and run functions in response to requests.

```ts
struct ApiProps {}

struct ApiOnGetProps { /* elided */ }
struct ApiOnPostProps { /* elided */ }
struct ApiOnPutProps { /* elided */ }
struct ApiOnDeleteProps { /* elided */ }
struct ApiOnPatchProps { /* elided */ }
struct ApiOnRequestProps { /* elided */ }

interface IApi {
  /**
   * The api's base url.
   */
  url: str;

  /**
   * Run a function whenever a GET request is made to the specified route.
   */
  on_get(route: str, fn: inflight (req: ApiRequest) => ApiResponse, opts: cloud.ApiOnGetProps?): cloud.Function;

  /**
   * Run a function whenever a POST request is made to the specified route.
   */
  on_post(route: str, fn: inflight (req: ApiRequest) => ApiResponse, opts: cloud.ApiOnPostProps?): cloud.Function;

  /**
   * Run a function whenever a PUT request is made to the specified route.
   */
  on_put(route: str, fn: inflight (req: ApiRequest) => ApiResponse, opts: cloud.ApiOnPutProps?): cloud.Function;

  /**
   * Run a function whenever a DELETE request is made to the specified route.
   */
  on_delete(route: str, fn: inflight (req: ApiRequest) => ApiResponse, opts: cloud.ApiOnDeleteProps?): cloud.Function;

  /**
   * Run a function whenever a PATCH request is made to the specified route.
   */
  on_patch(route: str, fn: inflight (req: ApiRequest) => ApiResponse, opts: cloud.ApiOnPatchProps?): cloud.Function;

  /**
   * Run a function whenever any request is made to the specified route.
   */
  on_request(route: str, fn: inflight (req: ApiRequest) => ApiResponse, opts: cloud.ApiOnRequestProps?): cloud.Function;
}

interface IApiClient {
  /**
   * Make a request to the specified route.
   */
  invoke(route: str, method: HttpMethod, payload: Serializable): Promise<Serializable>;
}

struct ApiRequest {
  /** The request's HTTP method. */
  method: HttpMethod;
  /** The request's path. */
  path: str;
  /** The request's query string. */
  query: str;
  /** The path variables. */
  vars: Map<str, str>;
  /** The request's payload. */
  payload: Serializable;
  /** The request's headers. */
  headers: Map<str, str>;
}

struct ApiResponse {
  /** The response's status code. */
  status: number;
  /** The response's payload. */
  payload: Serializable;
  /** The response's headers. */
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

## Metric

The metric resource represents a metric that can be used to trigger events when a threshold is exceeded.

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
   */
  description: str;
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

interface IMetric {
  /**
   * Trigger an event whenever the metric exceeds the specified threshold.
   */
  on_threshold(handler: inflight () => void, opts: MetricOnThresholdProps): cloud.Function;
}

interface IMetricClient {
  /**
   * Record a value for the metric.
   */
  record(value: number): Promise<void>;
}
```

## Service

The service resource represents a containerized workload that can run indefinitely.
Services are useful for long-running processes, like web servers and background workers.

A service is created from a buildpack, an open-source technology that makes it
fast and easy for you to create secure, production-ready container images from
source code and without a Dockerfile.

<!--
Implementation:

On AWS, this could be implemented using AWS AppRunner. Buildpack would be used
to generate an image at compile time, which would be uploaded to ECR during
Terraform deployment, and then AppRunner would be used to create a service.

(Why not ECS? ECS is a great service, but it introduces a lot of complexity and
isn't really necessary for the most common use cases (writing HTTP services
Using ECS with Fargate would require possibly creating a VPC, subnets,
routing table, internet gateway, security groups, load balancer, target group,
cluster, task definition, service, and scaling policy. That's a lot of
complexity to maintain in the SDK.)

On GCP, this could be implemented using Cloud Run. Buildpack would be used to
generate an image, which would be uploaded to GCR, and then Cloud Run would be
used to create a service.

On Azure, this could be implemented using Azure App Service. Buildpack would be
used to generate an image, which would be uploaded to ACR, and then App Service
would be used to create a service.

Links:
https://aws.amazon.com/blogs/containers/creating-container-images-with-cloud-native-buildpacks-using-aws-codebuild-and-aws-codepipeline/
https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apprunner_service#image-repository
https://github.com/buildpacks/community/blob/main/ADOPTERS.md
https://cloud.google.com/blog/products/containers-kubernetes/google-cloud-now-supports-buildpacks
-->

```ts
struct ServiceProps {
  /**
   * The directory containing the service's source code to package with
   * buildpack.
   */
  path: str;

  /**
   * The service's environment variables.
   * @default {}
   */
  env: Map<str, str>;

  /**
   * The service's command.
   * @default "start"
   */
  command: str?;

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

  /**
   * The service's number of replicas.
   * @default 1
   */
  replicas: number?;
}

interface IService {
  /**
   * The service's URL.
   */
  url: str;
}

interface IServiceClient {
  /**
   * Send a request to the service.
   */
  request(opts: ServiceRequestOptions): Promise<ServiceResponse>;
}

struct ServiceRequestOptions {
  /**
   * The request's method.
   * @default "GET"
   */
  method: str?;

  /**
   * The request's path.
   * @default "/"
   */
  path: str?;

  /**
   * The request's headers.
   * @default {}
   */
  headers: Map<str, str>;

  /**
   * The request's body.
   * @default ""
   */
  body: str?;
}

struct ServiceResponse {
  /**
   * The response's status code.
   */
  status_code: number;

  /**
   * The response's headers.
   */
  headers: Map<str, str>;

  /**
   * The response's body.
   */
  body: str;
}
```

## Table

The table resource represents a database table that can be used to store and query data.
Tables are useful for storing application state, like user profiles or blog posts.

Each table has a primary key that uniquely identifies each row.
The primary key can be any column, but it is recommended to use a `String` column named `id`.

```ts
struct TableProps {
  /**
   * The table's name.
   * @default "table"
   */
  name: str?;

  /**
   * The table's columns.
   */
  columns: Map<str, ColumnType>;

  /**
   * The table's primary key. No two rows can have the same value for the
   * primary key.
   * @default "id"
   */
  primary_key: str?;
}

enum ColumnType {
  String,
  Number,
  Boolean,
  Date,
  Json,
}

interface ITable {
  /**
   * The table's name.
   */
  name: str;

  /**
   * The table's columns.
   */
  columns: Map<str, ColumnType>;

  /**
   * The table's primary key.
   */
  primary_key: str;
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

Future extensions:
- `on_insert(fn: inflight (row: Map<str, Serializable>) => void): cloud.Function;`
- `on_update(fn: inflight (row: Map<str, Serializable>) => void): cloud.Function;`
- `on_delete(fn: inflight (row: Map<str, Serializable>) => void): cloud.Function;`
