# User Story 4 - Getting Started

> **Status**: Done

This is the story of Monada Sprint 4. It is told from the perspective of Mona
Lisa, a 28-year-old programmer who works at a successful startup in San
Francisco. Mona is the lead engineer at the backend team of her company. She
loves her job and is very passionate about software and technology. She believes
in the power of the cloud and open-source. She heard about Monada from a friend
and registered to the beta program. She is excited to try it out and see how it
can help her and her team.

**Damn, I am so excited!** Just got an email telling me that I was invited to
join beta program for Monada. Can't wait to see what these guys are up to! The
email links to https://github.com/monadahq/winglang, so I jump right in and this
is what I see...

---

# The Wing Programming Language

> Wing is currently in private beta and can only be used by invited users. Please
> avoid sharing any information about Wing with anyone outside of the beta
> program.

## Welcome!

Wing is the first cloud oriented programming language. It is a statically typed,
compiled language that allows developers to describe both the infrastructure and
the behavior of their cloud applications within a single codebase.

Wing allows developers to leverage the cloud naturally within their code without
having to understand the underlying infrastructure. Wing is designed to be a
general-purpose language that can be used to build any type of cloud
application.

The Wing compiler can target multiple cloud platforms, including AWS, Azure,
Google Cloud, and Kubernetes. It can also target a local cloud simulator,
allowing developers to run their applications locally for testing and debugging
using the Wing Console.

*This README is for *users* of the language. It contains information about how
to install the toolchain, and how to build Wing applications. If you wish to
*contribute* to the project, please jump over to our [contribution
guide](https://github.com/winglang/wing/blob/main/CONTRIBUTING.md).*

## Getting Started

### Prerequisites

To install Wing, you will need the following installed on your system:

1. [Node.js](https://nodejs.org/en/) (version 16.x or above).
1. [VSCode](https://code.visualstudio.com/) is our supported IDE.

In order to deploy the "Hello, World" example below to AWS, you will also need:

1. [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) 
   is only needed to configure local credentials.
1. [Terraform](https://terraform.io/downloads) is needed to deploy to the cloud.

#### Authenticate to GitHub Packages

Since Wing is currently in private beta and distributed through a Monada's
private npm registry, you will need to login to the registry before installing:

```sh
$ npm login --scope=@monadahq --registry=https://npm.pkg.github.com
Username: GITHUB USERNAME
Password: YOUR PERSONAL ACCESS TOKEN
Email: PUBLIC-EMAIL-ADDRESS
```

> To generate a token go to your GitHub account and select **Developer
settings** > **Personal access tokens** > **Generate new token**. Make sure to
include permissions for the **read:packages** scope (see
[docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)).

#### AWS Account and Credentials

To deploy Wing applications to the AWS Cloud, you'll need an [AWS
account](https://portal.aws.amazon.com/billing/signup) and [AWS
credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)
configured on your system.

### Installation

Now you should be able to install the **Wing CLI**:

```sh
npm install -g @monadahq/wing
```

Next, install the **Wing Extension for VSCode**:

> TBD

And last but not least, install the **Wing Console**:

> TBD

### Hello, Wing!

OK, we are ready to write our first Wing program!

Create a new file called `hello.w` with the following code:

```ts
bring cloud;

let queue = new cloud.Queue();

queue.add_consumer(inflight (message) => {
  log("Hello, ${message}!");
});
```

Now, let's test our program:

```sh
$ wing run hello.w
Compiling to target "sim"...
Starting Wing Console...
```

The **Wing Console** app will start and in the main view you'll see two
resources: a **Queue** and a **Function**. You'll also notice that the function
is connected to the queue through the `message` event.

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

Now, jump over to the [CloudWatch
Console](https://console.aws.amazon.com/cloudwatch) and under **Log groups** you
should see a log group called `/aws/lambda/...`. Click on it and you should see
the log message `Hello, cloud!`.

## Learning more

Now that you've written your first Wing program, what's next? Here are some
resources to help you get started:

- [Wing Language Specification](https://docs.winglang.io/reference/spec)
- [Wing SDK Reference](https://docs.winglang.io/reference/wingsdk-spec)

## Staying up to date

The entire Wing toolchain is continuously released. We follow [semantic
versioning](https://semver.org/) and release notes are available in the
[Releases](https://github.com/monadahq/winglang/releases) pages on GitHub.

To update the toolchain to the latest, run the following command:

```sh
$ npm update -g @monadahq/wing
```

Our VSCode extension has automatic updates, as well as the Wing Console.

## Contributing

We welcome and celebrate contributions from the community! Please see our
[contribution guide](https://github.com/winglang/wing/blob/main/CONTRIBUTING.md) for more information about setting up a
development environment, what we are working on, where we need help and other
guidelines for contributing to the project.

## Community

We all hang out at the [Wing Slack](https://t.winglang.io/slack). Come as you are, say hi, ask
questions, help friends, geek out!

## License

TBD

---

## Notes

The primary goal of sprint 4 is to allow us to start inviting external folks to join our private beta as users
and contributors to the project. 

As such, our focus for this sprint is:

- Consolidate everything related to Wing into the [monadahq/winglang](https://github.com/monadahq/winglang/) GitHub repo. This includes:
  - The [Wing SDK](https://github.com/monadahq/wingsdk)
  - The [language spec](https://github.com/monadahq/winglang-spec) - should go under `docs/winglang-spec.md`
  - The [language requirements RFC](https://github.com/monadahq/rfcs/blob/main/0044-winglang-requirements.md) - 
    should go under `rfcs/winglang-reqs.md`
  - All issues should also be transfered into this repository.
- Updating the main README file to match this RFC as close as possible.
- Update CONTRIBUTING.md to provide step-by-step instructions on how to setup a development environment, compile the toolchain, etc.
- Set up the workflows required for **continuous releases** - every commit to `main` should result in a full 
  release, with the appropriate version bump (based on conventional commits), release notes in GitHub and 
  artifacts pushed to the relevant repositories.
- Make sure `docs/wingsdk-api.md` is generated (basically it's projen's `API.md` of the Wing SDK).
- Continuous release of Wing Console (from its own repository), separate version line.
- Since we require node.js installed on your system, there is currently no immediate need to bundle the node 
  runtime into the compiler.
