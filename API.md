# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### App <a name="App" id="@monadahq/wingsdk.App"></a>

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.App.Initializer"></a>

```typescript
import { App } from '@monadahq/wingsdk'

new App()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.App.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.App.synth">synth</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.App.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `synth` <a name="synth" id="@monadahq/wingsdk.App.synth"></a>

```typescript
public synth(): void
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.App.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.App.isConstruct"></a>

```typescript
import { App } from '@monadahq/wingsdk'

App.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.App.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.App.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.App.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### Bucket <a name="Bucket" id="@monadahq/wingsdk.Bucket"></a>

- *Implements:* <a href="#@monadahq/wingsdk.ICapturable">ICapturable</a>

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.Bucket.Initializer"></a>

```typescript
import { Bucket } from '@monadahq/wingsdk'

new Bucket(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.Bucket.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.Bucket.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.Bucket.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.Bucket.Initializer.parameter.id"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.Bucket.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.Bucket.capture">capture</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.Bucket.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `capture` <a name="capture" id="@monadahq/wingsdk.Bucket.capture"></a>

```typescript
public capture(_symbol: string, _binding: Binding): ICaptureSource
```

###### `_symbol`<sup>Required</sup> <a name="_symbol" id="@monadahq/wingsdk.Bucket.capture.parameter._symbol"></a>

- *Type:* string

---

###### `_binding`<sup>Required</sup> <a name="_binding" id="@monadahq/wingsdk.Bucket.capture.parameter._binding"></a>

- *Type:* <a href="#@monadahq/wingsdk.Binding">Binding</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.Bucket.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.Bucket.isConstruct"></a>

```typescript
import { Bucket } from '@monadahq/wingsdk'

Bucket.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.Bucket.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.Bucket.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.Bucket.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### Endpoint <a name="Endpoint" id="@monadahq/wingsdk.Endpoint"></a>

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.Endpoint.Initializer"></a>

```typescript
import { Endpoint } from '@monadahq/wingsdk'

new Endpoint(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.Endpoint.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.Endpoint.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.Endpoint.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.Endpoint.Initializer.parameter.id"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.Endpoint.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.Endpoint.onGet">onGet</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.Endpoint.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `onGet` <a name="onGet" id="@monadahq/wingsdk.Endpoint.onGet"></a>

```typescript
public onGet(route: string, proc: Process): void
```

###### `route`<sup>Required</sup> <a name="route" id="@monadahq/wingsdk.Endpoint.onGet.parameter.route"></a>

- *Type:* string

---

###### `proc`<sup>Required</sup> <a name="proc" id="@monadahq/wingsdk.Endpoint.onGet.parameter.proc"></a>

- *Type:* <a href="#@monadahq/wingsdk.Process">Process</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.Endpoint.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.Endpoint.isConstruct"></a>

```typescript
import { Endpoint } from '@monadahq/wingsdk'

Endpoint.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.Endpoint.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.Endpoint.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.Endpoint.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### Function <a name="Function" id="@monadahq/wingsdk.Function"></a>

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.Function.Initializer"></a>

```typescript
import { Function } from '@monadahq/wingsdk'

new Function(scope: Construct, id: string, props: FunctionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.Function.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.Function.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.Function.Initializer.parameter.props">props</a></code> | <code><a href="#@monadahq/wingsdk.FunctionProps">FunctionProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.Function.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.Function.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@monadahq/wingsdk.Function.Initializer.parameter.props"></a>

- *Type:* <a href="#@monadahq/wingsdk.FunctionProps">FunctionProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.Function.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.Function.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.Function.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.Function.isConstruct"></a>

```typescript
import { Function } from '@monadahq/wingsdk'

Function.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.Function.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.Function.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.Function.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### Queue <a name="Queue" id="@monadahq/wingsdk.Queue"></a>

- *Implements:* <a href="#@monadahq/wingsdk.ICapturable">ICapturable</a>

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.Queue.Initializer"></a>

```typescript
import { Queue } from '@monadahq/wingsdk'

new Queue(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.Queue.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.Queue.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.Queue.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.Queue.Initializer.parameter.id"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.Queue.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.Queue.addWorker">addWorker</a></code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.Queue.capture">capture</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.Queue.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addWorker` <a name="addWorker" id="@monadahq/wingsdk.Queue.addWorker"></a>

```typescript
public addWorker(fn: Function): void
```

###### `fn`<sup>Required</sup> <a name="fn" id="@monadahq/wingsdk.Queue.addWorker.parameter.fn"></a>

- *Type:* <a href="#@monadahq/wingsdk.Function">Function</a>

---

##### `capture` <a name="capture" id="@monadahq/wingsdk.Queue.capture"></a>

```typescript
public capture(_symbol: string, _binding: Binding): ICaptureSource
```

###### `_symbol`<sup>Required</sup> <a name="_symbol" id="@monadahq/wingsdk.Queue.capture.parameter._symbol"></a>

- *Type:* string

---

###### `_binding`<sup>Required</sup> <a name="_binding" id="@monadahq/wingsdk.Queue.capture.parameter._binding"></a>

- *Type:* <a href="#@monadahq/wingsdk.Binding">Binding</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.Queue.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.Queue.isConstruct"></a>

```typescript
import { Queue } from '@monadahq/wingsdk'

Queue.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.Queue.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.Queue.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.Queue.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### Binding <a name="Binding" id="@monadahq/wingsdk.Binding"></a>

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.Binding.Initializer"></a>

```typescript
import { Binding } from '@monadahq/wingsdk'

const binding: Binding = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.Binding.property.obj">obj</a></code> | <code><a href="#@monadahq/wingsdk.ICapturable">ICapturable</a></code> | The captured object. |
| <code><a href="#@monadahq/wingsdk.Binding.property.methods">methods</a></code> | <code>string[]</code> | Which methods are called on the captured object. |

---

##### `obj`<sup>Required</sup> <a name="obj" id="@monadahq/wingsdk.Binding.property.obj"></a>

```typescript
public readonly obj: ICapturable;
```

- *Type:* <a href="#@monadahq/wingsdk.ICapturable">ICapturable</a>

The captured object.

---

##### `methods`<sup>Optional</sup> <a name="methods" id="@monadahq/wingsdk.Binding.property.methods"></a>

```typescript
public readonly methods: string[];
```

- *Type:* string[]

Which methods are called on the captured object.

---

### FunctionProps <a name="FunctionProps" id="@monadahq/wingsdk.FunctionProps"></a>

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.FunctionProps.Initializer"></a>

```typescript
import { FunctionProps } from '@monadahq/wingsdk'

const functionProps: FunctionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.FunctionProps.property.handler">handler</a></code> | <code><a href="#@monadahq/wingsdk.Process">Process</a></code> | *No description.* |

---

##### `handler`<sup>Required</sup> <a name="handler" id="@monadahq/wingsdk.FunctionProps.property.handler"></a>

```typescript
public readonly handler: Process;
```

- *Type:* <a href="#@monadahq/wingsdk.Process">Process</a>

---

### ProcessProps <a name="ProcessProps" id="@monadahq/wingsdk.ProcessProps"></a>

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.ProcessProps.Initializer"></a>

```typescript
import { ProcessProps } from '@monadahq/wingsdk'

const processProps: ProcessProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.ProcessProps.property.path">path</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.ProcessProps.property.bindings">bindings</a></code> | <code>{[ key: string ]: <a href="#@monadahq/wingsdk.Binding">Binding</a>}</code> | *No description.* |

---

##### `path`<sup>Required</sup> <a name="path" id="@monadahq/wingsdk.ProcessProps.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

---

##### `bindings`<sup>Optional</sup> <a name="bindings" id="@monadahq/wingsdk.ProcessProps.property.bindings"></a>

```typescript
public readonly bindings: {[ key: string ]: Binding};
```

- *Type:* {[ key: string ]: <a href="#@monadahq/wingsdk.Binding">Binding</a>}

---

## Classes <a name="Classes" id="Classes"></a>

### Duration <a name="Duration" id="@monadahq/wingsdk.Duration"></a>


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.Duration.fromHours">fromHours</a></code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.Duration.fromMinutes">fromMinutes</a></code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.Duration.fromSeconds">fromSeconds</a></code> | *No description.* |

---

##### `fromHours` <a name="fromHours" id="@monadahq/wingsdk.Duration.fromHours"></a>

```typescript
import { Duration } from '@monadahq/wingsdk'

Duration.fromHours(amount: number)
```

###### `amount`<sup>Required</sup> <a name="amount" id="@monadahq/wingsdk.Duration.fromHours.parameter.amount"></a>

- *Type:* number

---

##### `fromMinutes` <a name="fromMinutes" id="@monadahq/wingsdk.Duration.fromMinutes"></a>

```typescript
import { Duration } from '@monadahq/wingsdk'

Duration.fromMinutes(amount: number)
```

###### `amount`<sup>Required</sup> <a name="amount" id="@monadahq/wingsdk.Duration.fromMinutes.parameter.amount"></a>

- *Type:* number

---

##### `fromSeconds` <a name="fromSeconds" id="@monadahq/wingsdk.Duration.fromSeconds"></a>

```typescript
import { Duration } from '@monadahq/wingsdk'

Duration.fromSeconds(amount: number)
```

###### `amount`<sup>Required</sup> <a name="amount" id="@monadahq/wingsdk.Duration.fromSeconds.parameter.amount"></a>

- *Type:* number

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.Duration.property.hours">hours</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.Duration.property.minutes">minutes</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.Duration.property.seconds">seconds</a></code> | <code>number</code> | *No description.* |

---

##### `hours`<sup>Required</sup> <a name="hours" id="@monadahq/wingsdk.Duration.property.hours"></a>

```typescript
public readonly hours: number;
```

- *Type:* number

---

##### `minutes`<sup>Required</sup> <a name="minutes" id="@monadahq/wingsdk.Duration.property.minutes"></a>

```typescript
public readonly minutes: number;
```

- *Type:* number

---

##### `seconds`<sup>Required</sup> <a name="seconds" id="@monadahq/wingsdk.Duration.property.seconds"></a>

```typescript
public readonly seconds: number;
```

- *Type:* number

---


### Process <a name="Process" id="@monadahq/wingsdk.Process"></a>

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.Process.Initializer"></a>

```typescript
import { Process } from '@monadahq/wingsdk'

new Process(props: ProcessProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.Process.Initializer.parameter.props">props</a></code> | <code><a href="#@monadahq/wingsdk.ProcessProps">ProcessProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@monadahq/wingsdk.Process.Initializer.parameter.props"></a>

- *Type:* <a href="#@monadahq/wingsdk.ProcessProps">ProcessProps</a>

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.Process.property.captures">captures</a></code> | <code><a href="#@monadahq/wingsdk.ICaptureSource">ICaptureSource</a>[]</code> | The captures of this proc. |

---

##### `captures`<sup>Required</sup> <a name="captures" id="@monadahq/wingsdk.Process.property.captures"></a>

```typescript
public readonly captures: ICaptureSource[];
```

- *Type:* <a href="#@monadahq/wingsdk.ICaptureSource">ICaptureSource</a>[]

The captures of this proc.

---


## Protocols <a name="Protocols" id="Protocols"></a>

### ICapturable <a name="ICapturable" id="@monadahq/wingsdk.ICapturable"></a>

- *Implemented By:* <a href="#@monadahq/wingsdk.Bucket">Bucket</a>, <a href="#@monadahq/wingsdk.Queue">Queue</a>, <a href="#@monadahq/wingsdk.ICapturable">ICapturable</a>

Indicates that a construct can be captured.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.ICapturable.capture">capture</a></code> | *No description.* |

---

##### `capture` <a name="capture" id="@monadahq/wingsdk.ICapturable.capture"></a>

```typescript
public capture(symbol: string, binding: Binding): ICaptureSource
```

###### `symbol`<sup>Required</sup> <a name="symbol" id="@monadahq/wingsdk.ICapturable.capture.parameter.symbol"></a>

- *Type:* string

---

###### `binding`<sup>Required</sup> <a name="binding" id="@monadahq/wingsdk.ICapturable.capture.parameter.binding"></a>

- *Type:* <a href="#@monadahq/wingsdk.Binding">Binding</a>

---


### ICaptureSource <a name="ICaptureSource" id="@monadahq/wingsdk.ICaptureSource"></a>

- *Implemented By:* <a href="#@monadahq/wingsdk.ICaptureSource">ICaptureSource</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.ICaptureSource.bind">bind</a></code> | *No description.* |

---

##### `bind` <a name="bind" id="@monadahq/wingsdk.ICaptureSource.bind"></a>

```typescript
public bind(target: ICaptureTarget): void
```

###### `target`<sup>Required</sup> <a name="target" id="@monadahq/wingsdk.ICaptureSource.bind.parameter.target"></a>

- *Type:* <a href="#@monadahq/wingsdk.ICaptureTarget">ICaptureTarget</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.ICaptureSource.property.factoryCode">factoryCode</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.ICaptureSource.property.requireCode">requireCode</a></code> | <code>string</code> | *No description.* |

---

##### `factoryCode`<sup>Required</sup> <a name="factoryCode" id="@monadahq/wingsdk.ICaptureSource.property.factoryCode"></a>

```typescript
public readonly factoryCode: string;
```

- *Type:* string

---

##### `requireCode`<sup>Required</sup> <a name="requireCode" id="@monadahq/wingsdk.ICaptureSource.property.requireCode"></a>

```typescript
public readonly requireCode: string;
```

- *Type:* string

---

### ICaptureTarget <a name="ICaptureTarget" id="@monadahq/wingsdk.ICaptureTarget"></a>

- *Implemented By:* <a href="#@monadahq/wingsdk.ICaptureTarget">ICaptureTarget</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.ICaptureTarget.addEnvironment">addEnvironment</a></code> | *No description.* |

---

##### `addEnvironment` <a name="addEnvironment" id="@monadahq/wingsdk.ICaptureTarget.addEnvironment"></a>

```typescript
public addEnvironment(key: string, value: string): void
```

###### `key`<sup>Required</sup> <a name="key" id="@monadahq/wingsdk.ICaptureTarget.addEnvironment.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@monadahq/wingsdk.ICaptureTarget.addEnvironment.parameter.value"></a>

- *Type:* string

---


