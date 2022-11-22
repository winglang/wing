---
title: Compiling your application
id: compile
---

## Wing supports multiple targets

The Wing compiler supports multiple compilation targets. Each resource in the
Wing ecosystem can support any number of *backends*. For example, the
`cloud.Queue` resource we used in our app can be backed by [Amazon
SQS](https://aws.amazon.com/sqs/) by [Azure Queue
Storage](https://azure.microsoft.com/en-us/products/storage/queues/) or by
[RabbitMQ by CloudAMQP](https://www.cloudamqp.com/).

## The Simulator target (`sim`)

In addition to cloud services as backends, the Wing SDK is shipped with built-in
support for a **simulator backend** for each resource. The simulator provides a
fully-functional implementation for the cloud resources you use in your
application.

For example, the simulated implementation of `cloud.Queue` is simply an
in-memory array of items.

## Compiling your program

So now, we will compile our app and target the cloud simulator using the following command:

```sh
wing compile -t sim hello.w
```

## Compilation output

This would create a new file called `target/hello.wx` which is the simulated
version of your entire cloud application.

:::info
The "wx" extension stands for "wing executable".
:::

Now that we have an `hello.wx` file, we can either interact with through the Wing
Console or load it into a `Simulator` class and use it programmatically.

---

In the next section we will interact with our application using the Wing
Console.