<p align="center">
  <h1 align="center">The Wing Programming Language</h1>
</p>

> **:construction: Under heavy construction :construction:**
> 
> Wing is in active development. Many basic features as still missing. You are
> more than welcome to join the ride, but don't expect to be able to do much
> with it at the moment.
>
> Check out our [roadmap] for more information.


## Welcome! :wave:

Wing is the world's first [cloud-oriented programming
language](#what-is-cloud-oriented-programming). It allows developers to build
distributed systems that fully leverage the power of the cloud, without having
to worry about the underlying infrastructure.

```js
bring cloud;

let bucket = new cloud.Bucket();

new cloud.Function(() ~> {
  bucket.put("greeting.txt", "hello, world!");
});
```

Wing applications are compiled to [Terraform] and JavaScript, and can be
deployed to AWS, GCP or Azure or visualize and debug locally using the Wing
Console.

Read below about [what makes Wing special](#what-makes-wing-special) and [why
you should consider Wing](#why-wing).

This README is for *users* of the language. It contains information about how to
install the toolchain, and how to build Wing applications. If you wish to
*contribute* :pray: to the project, head over to our [contribution
guide](./CONTRIBUTING.md).

## Getting Started

### Prerequisites

To install Wing, you will need the following setup:

* [Node.js](https://nodejs.org/en/) version 18.x or above (we recommend
  [nvm](https://github.com/nvm-sh/nvm))
* [VSCode](https://code.visualstudio.com/) (recommended)

In order to deploy to AWS, you will also need:

* [Terraform](https://terraform.io/downloads)
* [AWS account] and the [AWS CLI] with [AWS credentials]

To access npm private packages (pre-release):

```sh
npm login --scope=@monadahq --registry=https://npm.pkg.github.com
```

> As a password, use a GitHub [personal access token] with **packages:read**
> scope.

[personal access token]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token


### Installation

Install the Wing CLI through npm:

```sh
npm install -g @monadahq/wing
```

Install the Wing VSCode extension (optional) by [downloading](https://github.com/monadahq/winglang/releases/download/development/vscode-wing.vsix)
the extension package and running:

```sh 
code --install-extension ~/Downloads/vscode-wing.vsix
```

### Hello, Wing!

We are ready to write our first Wing program!

Create a new file called `hello.w` with the following code:

```ts
bring cloud;

let queue = new cloud.Queue();

queue.on_message((message: str) ~> {
  print("Hello, ${message}!");
});
```

Now, let's test our program:

```sh
$ wing run hello.w
Compiling to target "sim"...
Starting Wing Console...
```

The **Wing Console** will start and in the main view you'll see two resources: a
**Queue** and a **Function**. You'll also notice that the function is connected
to the queue through the `message` event.

Now, right-click on the queue and choose **Push Message**. Type `world` and hit
**Send**.

You'll notice that the log window shows a few events and then prints your
`Hello, world!` log. ***Congratulations! You have just written and tested your
first Wing program!***

As you can see, so far we've tested our program locally using the simulator and
Wing Console. Next we'll see how you can deploy your program to AWS using
Terraform.

> Currently, our SDKs only support AWS, but the Wing compiler can target
> multiple cloud platforms, including AWS, Azure, Google Cloud, and Kubernetes.
> We are working on adding support for other cloud providers.

First, we need to compile our program to AWS:

```sh
$ wing build --target tf-aws hello.w
Build for target "tf-aws"...
```

Now, let's deploy our program to AWS:

> You will need to have AWS credentials configured on your system. See
> [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)
> for more information.

```sh
$ cd ./target/tf-aws
$ export AWS_REGION=us-east-1 # or any other region
$ terraform init
$ terraform apply
```

Now, if you open the [Amazon SQS Console](https://console.aws.amazon.com/sqs),
select your AWS region, and you should be able to see that you have a queue
there. Click **Send and receive messages**, in the **Message Body** box type
`cloud` and hit **Send message**.

Now, jump over to the [CloudWatch Console](https://console.aws.amazon.com/cloudwatch) 
and under **Log groups** you should see a log group called `/aws/lambda/...`. 
Click on it and you should see the log message `Hello, cloud!`.

### Staying up to date

The entire Wing toolchain is continuously released. We follow [semantic
versioning](https://semver.org/) and release notes are available in the
[Releases](https://github.com/monadahq/winglang/releases) pages on GitHub.

To update the toolchain to the latest, run the following command:

```sh
$ npm update -g @monadahq/wing
```

Our VSCode Extension and Wing Console have automatic updates.

## Rationale

### What is cloud-oriented programming?

Let's consider this example:

```js
bring cloud;

let bucket = new cloud.Bucket();
let counter = new cloud.Counter(initial_value: 100);
let queue = new cloud.Queue(timeout: 10s);

queue.on_message((body: str) ~> {
  let next = counter.increment();
  let key = "myfile-${next}.txt";
  bucket.put(key, body);
});
```

In this simple application, every message that goes into the queue is written to
a new object inside a cloud bucket. A counter is used to generate an
incrementing and unique key for each object.

**But don't let the simplicity of this example fool you!**

When deployed to a cloud provider such as AWS, GCP or Azure, this application
can handle an infinite amount of traffic, with no need for you to worry about
scaling, load balancing, or any other infrastructure-related concerns. For
example, when compiled for AWS, Wing will use Amazon S3 to implement the bucket,
Amazon SQS to implement the queue, Amazon DynamoDB to implement the atomic
counter, and AWS Lambda for the message handler.

In addition to targeting cloud providers, Wing applications can also be compiled
to run inside a local **Cloud Simulator**. This means that you can now iterate
on your code without having to deploy it to the cloud, write **unit tests** that
cover your complete cloud architecture and **debug** your code in a local
environment.

This is what we call **cloud-oriented programming**. It's a programming paradigm
which treats the cloud as a computer, and heavily relies on managed services and
distributed programming to build and deliver systems that are intrinsically
scalable, highly-available and robust.

### Why Wing?

The cloud has evolved to become a ubiquitous platform for running almost every
type of application. It allows individuals and teams to deliver value by
leveraging services and infrastructure, which take care of many of the
challenges of building and running software.

However, the cloud has also introduced a new set of challenges for developers.
The cloud is a complex environment, and writing applications often requires
understanding low-level details of cloud services. It is also difficult to build
applications that are portable across cloud providers, and to test and debug
applications locally. Furthermore, leaky abstractions and poor tooling can make
it hard to refactor cloud architectures into reusable components.

Wing is designed to address these challenges in the following ways:

* **Iteration speed** - Wing applications can run in a local cloud simulator.
  This allows developers to iterate at a much faster pace, and to see the
  effects of incremental changes at milliseconds latency.
* **High-level cloud primitives** - Wing allows developers to leverage the cloud
  to its full extent through a set of rich, high-level and cloud-independent
  resources. This allows developers build complete cloud applications without
  having to be infrastructure experts.
* **Cloud unit tests** - Wing allows developers to use the cloud simulator as
  a library inside unit tests, and test complete architectures without requiring
  deployments or heavy mocking.
* **Infrastructure as policy** - infrastructure concerns such as deployment,
  networking, security and observability can be applied horizontally through
  policies instead of inside the application code.

### What's special about the Wing language?

Wing includes all the features you would expect from a modern, object-oriented,
strongly-typed language. But in order to support [cloud
orientation](#what-is-cloud-oriented-programming), Wing includes the following
additional language primitives:

#### Resources

Resources represent cloud services that are part of the application. They expose
both a *preflight API* used to define their deployment configuration and an
*inflight API* used to interact with them at runtime. Resources are an extension
of the [construct programming model] and as such any [CDK construct] can be
natively used in Wing applications.

The following code defines a bucket resource:

```js
new cloud.Bucket();
```

The following code declares a new resource called `SafeQueue` which contains
a queue with a dead-letter-queue associated with it:

```js
resource SafeQueue extends cloud.Queue {
  init() {
    let dlq = new cloud.Queue();
    dlq.on_message((m: str) ~> {
      log.error("dead-letter: ${m}")
    });

    this.add_dead_letter_queue(dlq);
  }
}
```

#### Inflights

Inflights are Wing's distributed computing primitive. They are isolated code
blocks which can be packaged and executed on compute platforms in the cloud
(such as containers, CI/CD pipelines or FaaS).

Inflights can seamlessly interact with resources through the resource's inflight
API.

The following example shows how `my_inflight` is hosted inside a cloud function
and puts an object inside a bucket:

```js
let bucket = new cloud.Bucket();

let my_inflight = () ~> {
  bucket.put("hello.txt", "world");
};

new cloud.Function(my_inflight);
```

#### Dependency Injection

Wing allows writing code that defines complete architectures without having to
know in advance how these resources will be implemented. This mechanism allows
developers to write code that is portable across cloud providers, as well as can
run in a local simulator for testing and development.

## Learning more

Now that you've written your first Wing program, what's next? Here are some
resources to help you get started:

- [Wing Language Specification](./docs/winglang-spec.md)
- [Wing SDK Reference](./docs/wingsdk-api.md)

## Community

We all hang out at the [Wing Slack] workspace. Come as you are, say hi, ask
questions, help friends, geek out!

## Contributing

We welcome and celebrate contributions from the community! Please see our
[contribution guide](./CONTRIBUTING.md) for more information about setting up a
development environment, what we are working on, where we need help and other
guidelines for contributing to the project.

## License

This project is licensed under the [MIT License](./LICENSE.md).

[roadmap]: https://github.com/monadahq/winglang/issues/194
[Wing Slack]: https://join.slack.com/t/winglang/shared_invite/zt-1i7jb3pt3-lb0RKOSoLA1~pl6cBnP2tA
[Terraform]: https://www.terraform.io/
[AWS account]: portal.aws.amazon.com/billing/signup
[AWS CLI]: https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html
[AWS credentials]: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html
[construct programming model]: https://github.com/aws/constructs
[CDK construct]: https://constructs.dev
