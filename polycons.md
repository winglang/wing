# Polycons

> A dependency injection framework for [constructs]

## README (inspirational)

Polycons (from "[polymorphic] constructs") are constructs that can take
different shapes in different applications. Polycons are a powerful way to write
portable code.

### Using Polycons

Let's take a look at a simple example:

```ts
import * as std from 'pocix';
import { Construct } from 'constructs';

export interface WebGrepProps {
  readonly rootUrl: string;
  readonly pattern: string;
  readonly results: std.Topic;
}

export class WebGrep extends Construct {
  constructor(scope: Construct, id: string, props: WebGrepProps) {
    super(scope, id);

    const urlQueue = new std.Queue(this, 'Queue');
    
    const worker = new std.Function(this, 'Function', {
      code: __dirname + '/worker.ts',
      env: {
        RESULTS_TOPIC: props.topic,
        PATTERN: props.pattern,
      }
    });

    urlQueue.addWorkerFunction(worker, { concurrency: 100 });
    urlQueue.enqueue(props.rootUrl);
  }
}
```

The above example shows the code for a construct that searches a graph of
websites for a specific textual pattern. It starts from `rootUrl` and publishes
the URLs of all the pages accessible from this URL to a topic called `results`.

You will notice that this construct uses a fictitional library called `pocix`
(stands for "portable cloud interface", homage to [POSIX] which stands for
"portable operating system interface"). This library exports a set of
**polycons** which represent commonly used cloud resources such as `Bucket`,
`Topic`, `Queue` and `Function` which are used by `WebGrep` to implement its
algorithm.

Now, let's see how `WebGrep` can is used in an application:

```ts
import * as awscdk from '@pocix/aws-cdk';
import * as std from 'pocix';
import { WebGrep } from 'my-webgrep';

const app = new awscdk.App();

const results = new std.Topic(app, 'Results');

new WebGrep(app, 'WebGrep', {
  rootUrl: 'https://en.wikipedia.org/wiki/POSIX',
  pattern: 'UNIX',
  results: results
});

app.synth();
```

### Concretization

In Polycons, the process of "concretization" is when we assign a concrete
implementation to an abstract construct. For example, we can configure
the framework to concretize `std.Queue` as an `aws_sqs.Queue` from the AWS CDK:

In the example above, we've used an `App` construct from `@pocix/aws-cdk` which
basically means that we want to use default concretization of all the POCIX
resources to AWS CDK L2 constructs. This means that the application be
synthezize to an AWS CDK output (i.e. `cdk.out`). Alternatively we could have
used `@pocix/terraform-gcp` or `@pocix/pulumi-azure` to target different
providers and provisioning engines.

You can also explicitly concretize polycons like this:

```ts
import { Resolver } from 'polycons';
import * as rabbit from 'rabbit-mq';

Resolver.addRule(std.Queue, 
    (scope, id, props) => new rabbit.Queue(scope, id, { ... }));
```

### Operational Stylesheets

It is also possible to define resolver rules using a CSS-like syntax:

`hipaa.css`:

```css
aws-cdk-lib.aws_sqs.Queue {
    encrypted: true
}
```

And then apply it like so:

```ts
Resolver.addSheet('./hipaa`);
```

The above example will make sure to that all SQS queues are encrypted.

### Creating Polycons

TBD

* Use projen code generation


[constructs]: https://github.com/aws/constructs
[polymorphic]: https://en.wikipedia.org/wiki/Polymorphism_(computer_science)
[POSIX]: https://en.wikipedia.org/wiki/POSIX
