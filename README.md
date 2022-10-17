# The Wing Programming Language

> Wing is currently in private beta and can only be used by invited users. Please
> avoid sharing any information about Wing with anyone outside the beta
> program.

## Welcome!

Wing is the first cloud oriented programming language. It is a statically typed,
compiled language that allows developers to write their application and the infrastructure flows from code.

```wing
bring cloud;

let queue = new cloud.Queue();

queue.on_message((message: str) ~> {
  print("Hello, ${message}!");
});
```

Wing allows developers to leverage the cloud naturally within their code. 
Wing is designed to be a general-purpose language that can be used to build any type of cloud application.

The Wing compiler can target multiple cloud platforms, including AWS, Azure,
Google Cloud, and Kubernetes. It can also target a local cloud simulator,
allowing developers to run their applications locally for testing and debugging
using the Wing Console.

*This README is for *users* of the language. It contains information about how
to install the toolchain, and how to build Wing applications. If you wish to
*contribute* to the project, please jump over to our [contribution
guide](./CONTRIBUTING.md).*

## Getting Started

If you want to try out Wing without having to get anything installed locally, 
check out the [wing playground](https://wing-playground.vercel.app/).

### Prerequisites

To install Wing, you will need the following installed on your system:

1. [Node.js](https://nodejs.org/en/) (version 18.x or above). We recommend using [NVM](https://github.com/nvm-sh/nvm) to install Node.js.
1. [VSCode](https://code.visualstudio.com/) is our supported IDE. You can use other IDEs, but we have a VSCode extension to make development easier.

In order to deploy the "Hello, World" example below to AWS, you will also need:

1. [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
   is only needed to configure local credentials.
1. [Terraform](https://terraform.io/downloads) is needed to deploy to the cloud.

#### Authenticate to GitHub Packages

Since Wing is currently in private beta and distributed through a Monada's
private npm registry, you will need to login to the registry before installing:

```sh
$ npm login --scope=@monadahq --registry=https://npm.pkg.github.com
Username: YOUR GITHUB USERNAME
Password: YOUR PERSONAL ACCESS TOKEN
Email: PUBLIC-EMAIL-ADDRESS
```

> To generate a token go to your GitHub account and select **Developer
settings** > **Personal access tokens** > **Generate new token**. Make sure to
include permissions for the **read:packages** scope (see
[docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)).

#### AWS Account and Credentials

To deploy Wing applications to the AWS Cloud, you'll need an [AWS
account](portal.aws.amazon.com/billing/signup) and [AWS
credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)
configured on your system. You'll know you have it set up correctly when you can run this command and get back a successful result:

```shell
$ aws sts get-caller-identity
```

### Installation

Now you should be able to install the **Wing CLI**:

```sh
$ npm install -g @monadahq/wing
```

Next, install the **Wing Extension for VSCode**:

Download the extension [here](https://github.com/monadahq/winglang/releases/download/development/vscode-wing.vsix).

You can install it using the command line:

```shell 
$ code --install-extension ~/Downloads/vscode-wing.vsix
```

*Change the location in the command to where ever you saved the extension at.*

### Hello, Wing!

OK, we are ready to write our first Wing program!

Create a new file called `hello.w` with the following code:

```ts
bring cloud;

let queue = new cloud.Queue();

queue.on_message((message) ~> {
  print("Hello, ${message}!");
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

- [Wing Language Specification](./docs/winglang-spec.md)
- [Wing SDK Reference](./docs/wingsdk-api.md)

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
[contribution guide](./CONTRIBUTING.md) for more information about setting up a
development environment, what we are working on, where we need help and other
guidelines for contributing to the project.

## Community

We all hang out at the [Wing Discord](https://discord.gg/HEKYFXm6U6) server.
Come as you are, say hi, ask questions, help friends, geek out!

## License

Wing is licensed under the MIT License.
