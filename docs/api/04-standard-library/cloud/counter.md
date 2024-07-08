---
title: Counter
id: counter
description: A built-in resource for representing an container for numbers in the cloud.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    Counter,
  ]
sidebar_position: 1
---

The `cloud.Counter` resource represents a stateful container for one or more numbers in the cloud.

## Usage

### Defining a counter

```js example
bring cloud;

let counter = new cloud.Counter(
  initial: 123, // optional, defaults to 0
);
```

### Using a counter inflight

```js playground example
bring cloud;

let counter = new cloud.Counter();

let counterFunc = inflight () => {
  let prev = counter.inc(); // increment by 1 and return previous value
  counter.inc(5); // increment by 5
  counter.dec(); // decrement by 1
  counter.dec(2); // decrement by 2

  assert(counter.peek() == 3); // check the current value

  counter.set(100); // set to a specific value
};

new cloud.Function(counterFunc);
```

### Using keys to manage multiple counter values

```js playground example
bring cloud;

let counter = new cloud.Counter(initial: 100);

let counterFunc = inflight () => {
  let k1 = "key-1";
  let k2 = "key-2";

  counter.dec(1, k1); // decrement k1 by 1
  counter.inc(11, k2); // increment k2 by 11

  assert(counter.peek(k1) == 99); // check the current value of k1
  assert(counter.peek(k2) == 111); // check the current value of k2
};

new cloud.Function(counterFunc);
```

## Target-specific details

### Simulator (`sim`)

Under the hood, the simulator stores the counter value in memory.

Note that counter data is not persisted between simulator runs.

### AWS (`tf-aws` and `awscdk`)

The AWS implementation of `cloud.Counter` uses [Amazon DynamoDB](https://aws.amazon.com/dynamodb/).

### Azure (`tf-azure`)

🚧 Not supported yet (tracking issue: [#629](https://github.com/winglang/wing/issues/629))

### GCP (`tf-gcp`)

🚧 Not supported yet (tracking issue: [#628](https://github.com/winglang/wing/issues/628))
## API Reference <a name="API Reference" id="API Reference"></a>

### Counter <a name="Counter" id="@winglang/sdk.cloud.Counter"></a>

A distributed atomic counter.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Counter.Initializer"></a>

```wing
bring cloud;

new cloud.Counter(props?: CounterProps);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Counter.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.CounterProps">CounterProps</a></code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Counter.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.CounterProps">CounterProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

##### Inflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.ICounterClient.dec">dec</a></code> | Decrement the counter, returning the previous value. |
| <code><a href="#@winglang/sdk.cloud.ICounterClient.inc">inc</a></code> | Increments the counter atomically by a certain amount and returns the previous value. |
| <code><a href="#@winglang/sdk.cloud.ICounterClient.peek">peek</a></code> | Get the current value of the counter. |
| <code><a href="#@winglang/sdk.cloud.ICounterClient.set">set</a></code> | Set a counter to a given value. |

---

##### `dec` <a name="dec" id="@winglang/sdk.cloud.ICounterClient.dec"></a>

```wing
inflight dec(amount?: num, key?: str): num
```

Decrement the counter, returning the previous value.

###### `amount`<sup>Optional</sup> <a name="amount" id="@winglang/sdk.cloud.ICounterClient.dec.parameter.amount"></a>

- *Type:* num

amount to decrement (default is 1).

---

###### `key`<sup>Optional</sup> <a name="key" id="@winglang/sdk.cloud.ICounterClient.dec.parameter.key"></a>

- *Type:* str

specify the key to be decremented.

---

##### `inc` <a name="inc" id="@winglang/sdk.cloud.ICounterClient.inc"></a>

```wing
inflight inc(amount?: num, key?: str): num
```

Increments the counter atomically by a certain amount and returns the previous value.

###### `amount`<sup>Optional</sup> <a name="amount" id="@winglang/sdk.cloud.ICounterClient.inc.parameter.amount"></a>

- *Type:* num

amount to increment (default is 1).

---

###### `key`<sup>Optional</sup> <a name="key" id="@winglang/sdk.cloud.ICounterClient.inc.parameter.key"></a>

- *Type:* str

specify the key to be incremented.

---

##### `peek` <a name="peek" id="@winglang/sdk.cloud.ICounterClient.peek"></a>

```wing
inflight peek(key?: str): num
```

Get the current value of the counter.

Using this API may introduce race conditions since the value can change between
the time it is read and the time it is used in your code.

###### `key`<sup>Optional</sup> <a name="key" id="@winglang/sdk.cloud.ICounterClient.peek.parameter.key"></a>

- *Type:* str

specify the key to be retrieved.

---

##### `set` <a name="set" id="@winglang/sdk.cloud.ICounterClient.set"></a>

```wing
inflight set(value: num, key?: str): void
```

Set a counter to a given value.

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.cloud.ICounterClient.set.parameter.value"></a>

- *Type:* num

new value.

---

###### `key`<sup>Optional</sup> <a name="key" id="@winglang/sdk.cloud.ICounterClient.set.parameter.key"></a>

- *Type:* str

specify the key to be set.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Counter.onLiftType">onLiftType</a></code> | A hook called by the Wing compiler once for each inflight host that needs to use this type inflight. |
| <code><a href="#@winglang/sdk.cloud.Counter.toInflight">toInflight</a></code> | Generates an asynchronous JavaScript statement which can be used to create an inflight client for a resource. |

---

##### `onLiftType` <a name="onLiftType" id="@winglang/sdk.cloud.Counter.onLiftType"></a>

```wing
bring cloud;

cloud.Counter.onLiftType(host: IInflightHost, ops: MutArray<str>);
```

A hook called by the Wing compiler once for each inflight host that needs to use this type inflight.

The list of requested inflight methods
needed by the inflight host are given by `ops`.

This method is commonly used for adding permissions, environment variables, or
other capabilities to the inflight host.

###### `host`<sup>Required</sup> <a name="host" id="@winglang/sdk.cloud.Counter.onLiftType.parameter.host"></a>

- *Type:* <a href="#@winglang/sdk.std.IInflightHost">IInflightHost</a>

---

###### `ops`<sup>Required</sup> <a name="ops" id="@winglang/sdk.cloud.Counter.onLiftType.parameter.ops"></a>

- *Type:* MutArray&lt;str&gt;

---

##### `toInflight` <a name="toInflight" id="@winglang/sdk.cloud.Counter.toInflight"></a>

```wing
bring cloud;

cloud.Counter.toInflight(obj: IResource);
```

Generates an asynchronous JavaScript statement which can be used to create an inflight client for a resource.

NOTE: This statement must be executed within an async context.

###### `obj`<sup>Required</sup> <a name="obj" id="@winglang/sdk.cloud.Counter.toInflight.parameter.obj"></a>

- *Type:* <a href="#@winglang/sdk.std.IResource">IResource</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Counter.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Counter.property.initial">initial</a></code> | <code>num</code> | The initial value of the counter. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Counter.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `initial`<sup>Required</sup> <a name="initial" id="@winglang/sdk.cloud.Counter.property.initial"></a>

```wing
initial: num;
```

- *Type:* num

The initial value of the counter.

---



## Structs <a name="Structs" id="Structs"></a>

### CounterProps <a name="CounterProps" id="@winglang/sdk.cloud.CounterProps"></a>

Options for `Counter`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.CounterProps.Initializer"></a>

```wing
bring cloud;

let CounterProps = cloud.CounterProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.CounterProps.property.initial">initial</a></code> | <code>num</code> | The initial value of the counter. |

---

##### `initial`<sup>Optional</sup> <a name="initial" id="@winglang/sdk.cloud.CounterProps.property.initial"></a>

```wing
initial: num;
```

- *Type:* num
- *Default:* 0

The initial value of the counter.

---


