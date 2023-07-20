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

```js
bring cloud;

let counter = new cloud.Counter(
  initial: 123, // optional, defaults to 0
);
```

### Using a counter inflight

```js playground
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

🚧 Not implemented yet (tracking issue: [#1375](https://github.com/winglang/wing/issues/1375))

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


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Counter.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Counter.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |
| <code><a href="#@winglang/sdk.cloud.Counter.property.initial">initial</a></code> | <code>num</code> | The initial value of the counter. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Counter.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.Counter.property.display"></a>

```wing
display: Display;
```

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

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

Properties for `Counter`.

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


