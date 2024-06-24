---
id: inflights
title: Preflight and Inflight 
description: "Wing's two execution phases: preflight and inflight"
keywords: [Inflights, Inflight functions, Preflight, Preflight code]
---

> This content is also available in an [interactive tutorial](https://www.winglang.io/learn/preflight-inflight)

<div style={{ textAlign: "center" }}>
  <img
    src={require('./preflight-inflight-visual.png').default}
    width="500"
  />
</div>

<br />

One of the main differences between Wing and other languages is that it unifies both infrastructure definitions and application logic under the same programming model. 
This is enabled by the concepts of the *preflight* and *inflight* execution phases:

- **Preflight**: Code that runs once, at compile time, and generates the infrastructure configuration of your cloud application. For example, setting up databases, queues, storage buckets, API endpoints, etc.
- **Inflight**: Code that runs at runtime and implements your application's behavior. For example, handling API requests, processing queue messages, etc. Inflight code can be executed on various compute platforms in the cloud, such as function services (such as AWS Lambda or Azure Functions), containers (such as ECS or Kubernetes), VMs or even physical servers.

## Preflight code

Your preflight code runs once, at compile time, and defines your application's infrastructure configuration. This configuration is then consumed by an infrastructure provisioning engine such as Terraform, CloudFormation, Pulumi or Kubernetes.

For example, this code snippet defines a storage bucket using a class from the standard library:

```js playground example
bring cloud;

let bucket = new cloud.Bucket();
```

**There is no special annotation to define that this is preflight code because preflight is Wing's default execution phase.**

Compiling the program with the [Wing CLI](../tools/cli) will synthesize the configuration files which can be used to create the bucket and initialize its contents on a cloud provider.

Preflight code can be also used to configure services or set up more complex event listeners.

In this code snippet, we've specified the bucket's contents will be publicly accessible, and it will be pre-populated with a file during the app's deployment (not while the app is running).

```js playground example
bring cloud;

let bucket = new cloud.Bucket(public: true);
bucket.addObject("file1.txt", "Hello world!");
```

There are a few global functions with specific behaviors in preflight.
For example, adding a `log()` statement to your preflight code will result in Wing printing a message to the console after compilation.

```js example
// hello.w
log("7 * 6 = {7 * 6}");
```

```bash
$ wing compile hello.w
7 * 6 = 42
```

Likewise, `assert()` statements can be evaluated during preflight, and will cause compilation to fail if the assertion fails.

```js playground
// hello.w
assert(2 + 2 == 5);
```

```bash
$ wing compile hello.w
error: assertion failed: 2 + 2 == 5
```

## Inflight code

Inflight blocks are where you write asynchronous runtime code that can directly interact with resources through their inflight APIs.
Inflight functions can be easily packaged and executed onto compute platforms like containers, CI/CD pipelines or FaaS.
Inflight code can also be executed multiple times and on different machines in parallel.

Let's walk through some examples.

Inflight code is always contained inside a block that starts with the word `inflight`.

```js example
let greeting = inflight () => {
  log("Hello from the cloud!");
};
```

Inflight code can call other inflight functions and methods.
For example, `cloud.Bucket` has an inflight method named `list()` that can be called inside inflight contexts:

```js playground example
bring cloud;

let bucket = new cloud.Bucket();

let firstObject = inflight (): str => {
  let items = bucket.list();
  return items.at(0);
};
```

Even though `bucket` is defined in preflight, it's okay to use its inflight method in inflight code because it will always refer to the same bucket "instance" after deployment.

### Executing inflight code

For an inflight function to actually get executed, it must be provided to an API that expects inflight code. For example, we can provide it to a `cloud.Function`:

```js playground example
bring cloud;

let func = new cloud.Function(inflight () => {
  log("Hello from the cloud!");
});
```

`cloud.Function` represents an ephemeral, short-lived function, and it expects an inflight function as its first argument. It's responsible for packaging the code (as well as any any other inflight code it calls) so that it can be executed on cloud compute platforms.

Today, inflights are typically compiled into JavaScript, but Wing may also be able to compile them into state machines, orchestrated workflows, and other formats in the future.

### Restrictions on inflight code

Inflight code cannot be executed during preflight, because inflight APIs assume all resources have already been deployed.

```js
firstObject(); // error: Cannot call into inflight phase while preflight
```

Likewise, inflight code cannot call preflight code, because preflight code has the capability to modify your application's infrastructure configuration, which is disallowed after deployment.
For example, since `addObject` is a preflight method, it cannot be called in inflight:

```js playground example{valid: false}
bring cloud;

let bucket = new cloud.Bucket();

let saveCalculation = inflight () => {
  bucket.addObject("file1", "{2 ** 10}"); // error: Cannot call into preflight phase while inflight
};
```

Instead, to insert an object into the bucket at runtime you would have to use an inflight method from the `Bucket` class, like `put`.

Since a class's initializer is just a special kind of preflight function, it also isn't possible to initialize regular classes during preflight:

```js playground example{valid: false}
bring cloud;

inflight () => {
  new cloud.Bucket(); // error: Cannot create preflight class "Bucket" in inflight phase
};
```

## Combining preflight and inflight code

Preflight and inflight functions can be grouped together using classes.
A preflight class (the default kind of class) can contain both preflight and inflight methods, as well as preflight and inflight properties.

Here's a class that models a queue that can replay its messages.
A `cloud.Bucket` stores the history of messages, and a `cloud.Counter` helps with sequencing each new message as it's added to the queue.

```js playground example
bring cloud;

class ReplayableQueue {
  queue: cloud.Queue;
  bucket: cloud.Bucket; 
  counter: cloud.Counter;
  
  new() {
    this.queue = new cloud.Queue();
    this.bucket = new cloud.Bucket();
    this.counter = new cloud.Counter();
  }

  setConsumer(fn: inflight (str): str){
    this.queue.setConsumer(fn);
  }
  
  inflight push(m: str) {
    this.queue.push(m);
    this.bucket.put("messages/{this.counter.inc()}", m);
  }
  
  inflight replay(){
    for i in this.bucket.list() {
      this.queue.push(this.bucket.get(i));
    }
  }
}

let rq = new ReplayableQueue();
```

It's also possible to define inflight classes.
An inflight class can only contain inflight methods and properties.
Inflight classes are safe to create in inflight contexts.

For example, this inflight class can be created in an inflight contexts, and its methods can be called in inflight contexts:

```js playground example
inflight () => {
  class Person {
    name: str;
    age: num;

    new(name: str, age: num) {
      this.name = name;
      this.age = age;
    }

    pub greet() {
      log("Hello, {this.name}!");
    }
  }

  let p = new Person("John", 30);
  p.greet();
};
```

## Using preflight data from inflight

While inflight code can't call preflight code, it's perfectly ok to reference data from preflight.

For example, the `cloud.Api` class has a preflight field named `url`.
Since the URL is a string, it can be directly referenced inflight:

```js example
bring cloud;
bring http;

let api = new cloud.Api();
api.get("/test", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    status: 200,
    body: "success!"
  };
});

let checkEndpoint = inflight () => {
  let url = api.url; // this is OK
  let path = "{url}/test";
  let response = http.get(path);
  assert(response.status == 200);
};
new cloud.Function(checkEndpoint);
```

However, mutation to preflight data is not allowed.
This mean means that variables from preflight cannot be reassigned to, and mutable collections like `MutArray` and `MutMap` cannot be modified (they're turned into their immutable counterparts, `Array` and `Map`, respectively when accessed inflight).

```js playground example{valid: false}
let var count = 3;
let names = MutArray<str>["John", "Jane", "Joe"];

count = count + 1; // OK
names.push("Jack"); // OK

inflight () => {
  count = count + 1; // error: Variable cannot be reassigned from inflight
  names.push("Jill"); // error: push doesn't exist in Array
};
```

### Lift qualification

Preflight objects referenced inflight are called "lifted" objects:

```js playground example
let preflight_str = "hello from preflight"; 
inflight () => {
  log(preflight_str); // `preflight_str` is "lifted" into inflight.
};
```

During the lifting process the compiler tries to figure out in what way the lifted objects are being used. 
This is how Winglang generates least privilage permissions. Consider the case of lifting a [`cloud.Bucket`](../04-standard-library/cloud/bucket.md) object:

```js playground example
bring cloud;
let bucket = new cloud.Bucket();
new cloud.Function(inflight () => {
  bucket.put("key", "value"); // `bucket` is lifted and `put` is being used on it
});
```

In this example the compiler generates the correct _write_ access permissions for the [`cloud.Function`](../04-standard-library/cloud/function.md) on `bucket` based on the fact we're `put`ing into it. We say `bucket`'s lift is qualified with `put`. 

#### Explicit lift qualification
In some cases the compiler can't figure out (yet) the lift qualifications, and therefore will report an error:

```js playground example{valid: false}
bring cloud;
let main_bucket = new cloud.Bucket() as "main";
let secondary_bucket = new cloud.Bucket() as "backup";
let use_main = true;
new cloud.Function(inflight () => {
  let var b = main_bucket;
  if !use_main {
    b = secondary_bucket;
  }
  b.put("key", "value"); // Error: the compiler doesn't know the possible values for `b` and therefore can't qualify the lift.
});
```

To explicitly qualify lifts in an inflight closure or inflight method and suppress the above compiler error, create a `lift` block:

```js playground
bring cloud;
let main_bucket = new cloud.Bucket() as "main";
let secondary_bucket = new cloud.Bucket() as "backup";
let use_main = true;
new cloud.Function(inflight () => {
  let var b = main_bucket;
  if !use_main {
    b = secondary_bucket;
  }
  // Explicitly state that methods named `put` may be used on `main_bucket` and `secondary_bucket`
  lift {main_bucket: [put], secondary_bucket: [put]} {
    // Error is supressed in this block and all possible values of `b` are explicitly qualified with `put`
    b.put("key1", "value"); 
    b.put("key2", "value");
  }
});
```

Within the first clause of the `lift` block, a list of qualifications on preflight objects can be added.

Statements within a `lift` block are exempt from the compiler's analyzer that tries to determine preflight object usage automatically.
If an inflight method is directly or indirectly called within a `lift` block without sufficient resource qualifications, it may result in errors at runtime.

## Phase-independent code

The global functions `log`, `assert`, and `throw` can all be used in both preflight and inflight code.

Issue [#435](https://github.com/winglang/wing/issues/435) is tracking support for the capability to define phase-independent functions.

## Summary

- Preflight code is code that runs once, at compile time, to generate the infrastructure configuration of your cloud application.
- Inflight code is code that runs at runtime to handle your application logic.
- Wing programs start in preflight, but can switch to inflight using the `inflight` keyword.
- Classes can be used to group preflight and inflight code together.
- Inflight functions can only be called in inflight contexts, and preflight functions can only be called in preflight contexts.
- Inflight code can reference data like global variables and class fields from preflight, but the data cannot be mutated.
