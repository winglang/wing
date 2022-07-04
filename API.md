# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### App <a name="App" id="wing-sdk.App"></a>

#### Initializers <a name="Initializers" id="wing-sdk.App.Initializer"></a>

```typescript
import { App } from 'wing-sdk'

new App()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#wing-sdk.App.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#wing-sdk.App.synth">synth</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="wing-sdk.App.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `synth` <a name="synth" id="wing-sdk.App.synth"></a>

```typescript
public synth(): void
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#wing-sdk.App.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="wing-sdk.App.isConstruct"></a>

```typescript
import { App } from 'wing-sdk'

App.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="wing-sdk.App.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#wing-sdk.App.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="wing-sdk.App.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### Bucket <a name="Bucket" id="wing-sdk.Bucket"></a>

- *Implements:* <a href="#wing-sdk.ICapturable">ICapturable</a>

#### Initializers <a name="Initializers" id="wing-sdk.Bucket.Initializer"></a>

```typescript
import { Bucket } from 'wing-sdk'

new Bucket(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#wing-sdk.Bucket.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#wing-sdk.Bucket.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="wing-sdk.Bucket.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="wing-sdk.Bucket.Initializer.parameter.id"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#wing-sdk.Bucket.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#wing-sdk.Bucket.capture">capture</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="wing-sdk.Bucket.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `capture` <a name="capture" id="wing-sdk.Bucket.capture"></a>

```typescript
public capture(_symbol: string, _binding: Binding): ICaptureSource
```

###### `_symbol`<sup>Required</sup> <a name="_symbol" id="wing-sdk.Bucket.capture.parameter._symbol"></a>

- *Type:* string

---

###### `_binding`<sup>Required</sup> <a name="_binding" id="wing-sdk.Bucket.capture.parameter._binding"></a>

- *Type:* <a href="#wing-sdk.Binding">Binding</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#wing-sdk.Bucket.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="wing-sdk.Bucket.isConstruct"></a>

```typescript
import { Bucket } from 'wing-sdk'

Bucket.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="wing-sdk.Bucket.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#wing-sdk.Bucket.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="wing-sdk.Bucket.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### Endpoint <a name="Endpoint" id="wing-sdk.Endpoint"></a>

#### Initializers <a name="Initializers" id="wing-sdk.Endpoint.Initializer"></a>

```typescript
import { Endpoint } from 'wing-sdk'

new Endpoint(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#wing-sdk.Endpoint.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#wing-sdk.Endpoint.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="wing-sdk.Endpoint.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="wing-sdk.Endpoint.Initializer.parameter.id"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#wing-sdk.Endpoint.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#wing-sdk.Endpoint.onGet">onGet</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="wing-sdk.Endpoint.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `onGet` <a name="onGet" id="wing-sdk.Endpoint.onGet"></a>

```typescript
public onGet(route: string, proc: Process): void
```

###### `route`<sup>Required</sup> <a name="route" id="wing-sdk.Endpoint.onGet.parameter.route"></a>

- *Type:* string

---

###### `proc`<sup>Required</sup> <a name="proc" id="wing-sdk.Endpoint.onGet.parameter.proc"></a>

- *Type:* <a href="#wing-sdk.Process">Process</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#wing-sdk.Endpoint.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="wing-sdk.Endpoint.isConstruct"></a>

```typescript
import { Endpoint } from 'wing-sdk'

Endpoint.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="wing-sdk.Endpoint.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#wing-sdk.Endpoint.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="wing-sdk.Endpoint.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### Function <a name="Function" id="wing-sdk.Function"></a>

#### Initializers <a name="Initializers" id="wing-sdk.Function.Initializer"></a>

```typescript
import { Function } from 'wing-sdk'

new Function(scope: Construct, id: string, props: FunctionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#wing-sdk.Function.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#wing-sdk.Function.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#wing-sdk.Function.Initializer.parameter.props">props</a></code> | <code><a href="#wing-sdk.FunctionProps">FunctionProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="wing-sdk.Function.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="wing-sdk.Function.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="wing-sdk.Function.Initializer.parameter.props"></a>

- *Type:* <a href="#wing-sdk.FunctionProps">FunctionProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#wing-sdk.Function.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="wing-sdk.Function.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#wing-sdk.Function.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="wing-sdk.Function.isConstruct"></a>

```typescript
import { Function } from 'wing-sdk'

Function.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="wing-sdk.Function.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#wing-sdk.Function.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="wing-sdk.Function.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### Queue <a name="Queue" id="wing-sdk.Queue"></a>

- *Implements:* <a href="#wing-sdk.ICapturable">ICapturable</a>

#### Initializers <a name="Initializers" id="wing-sdk.Queue.Initializer"></a>

```typescript
import { Queue } from 'wing-sdk'

new Queue(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#wing-sdk.Queue.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#wing-sdk.Queue.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="wing-sdk.Queue.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="wing-sdk.Queue.Initializer.parameter.id"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#wing-sdk.Queue.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#wing-sdk.Queue.addWorker">addWorker</a></code> | *No description.* |
| <code><a href="#wing-sdk.Queue.capture">capture</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="wing-sdk.Queue.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addWorker` <a name="addWorker" id="wing-sdk.Queue.addWorker"></a>

```typescript
public addWorker(fn: Function): void
```

###### `fn`<sup>Required</sup> <a name="fn" id="wing-sdk.Queue.addWorker.parameter.fn"></a>

- *Type:* <a href="#wing-sdk.Function">Function</a>

---

##### `capture` <a name="capture" id="wing-sdk.Queue.capture"></a>

```typescript
public capture(_symbol: string, _binding: Binding): ICaptureSource
```

###### `_symbol`<sup>Required</sup> <a name="_symbol" id="wing-sdk.Queue.capture.parameter._symbol"></a>

- *Type:* string

---

###### `_binding`<sup>Required</sup> <a name="_binding" id="wing-sdk.Queue.capture.parameter._binding"></a>

- *Type:* <a href="#wing-sdk.Binding">Binding</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#wing-sdk.Queue.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="wing-sdk.Queue.isConstruct"></a>

```typescript
import { Queue } from 'wing-sdk'

Queue.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="wing-sdk.Queue.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#wing-sdk.Queue.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="wing-sdk.Queue.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### Binding <a name="Binding" id="wing-sdk.Binding"></a>

#### Initializer <a name="Initializer" id="wing-sdk.Binding.Initializer"></a>

```typescript
import { Binding } from 'wing-sdk'

const binding: Binding = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#wing-sdk.Binding.property.obj">obj</a></code> | <code><a href="#wing-sdk.ICapturable">ICapturable</a></code> | The captured object. |
| <code><a href="#wing-sdk.Binding.property.methods">methods</a></code> | <code>string[]</code> | Which methods are called on the captured object. |

---

##### `obj`<sup>Required</sup> <a name="obj" id="wing-sdk.Binding.property.obj"></a>

```typescript
public readonly obj: ICapturable;
```

- *Type:* <a href="#wing-sdk.ICapturable">ICapturable</a>

The captured object.

---

##### `methods`<sup>Optional</sup> <a name="methods" id="wing-sdk.Binding.property.methods"></a>

```typescript
public readonly methods: string[];
```

- *Type:* string[]

Which methods are called on the captured object.

---

### FunctionProps <a name="FunctionProps" id="wing-sdk.FunctionProps"></a>

#### Initializer <a name="Initializer" id="wing-sdk.FunctionProps.Initializer"></a>

```typescript
import { FunctionProps } from 'wing-sdk'

const functionProps: FunctionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#wing-sdk.FunctionProps.property.handler">handler</a></code> | <code><a href="#wing-sdk.Process">Process</a></code> | *No description.* |

---

##### `handler`<sup>Required</sup> <a name="handler" id="wing-sdk.FunctionProps.property.handler"></a>

```typescript
public readonly handler: Process;
```

- *Type:* <a href="#wing-sdk.Process">Process</a>

---

### ProcessProps <a name="ProcessProps" id="wing-sdk.ProcessProps"></a>

#### Initializer <a name="Initializer" id="wing-sdk.ProcessProps.Initializer"></a>

```typescript
import { ProcessProps } from 'wing-sdk'

const processProps: ProcessProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#wing-sdk.ProcessProps.property.path">path</a></code> | <code>string</code> | *No description.* |
| <code><a href="#wing-sdk.ProcessProps.property.bindings">bindings</a></code> | <code>{[ key: string ]: <a href="#wing-sdk.Binding">Binding</a>}</code> | *No description.* |

---

##### `path`<sup>Required</sup> <a name="path" id="wing-sdk.ProcessProps.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

---

##### `bindings`<sup>Optional</sup> <a name="bindings" id="wing-sdk.ProcessProps.property.bindings"></a>

```typescript
public readonly bindings: {[ key: string ]: Binding};
```

- *Type:* {[ key: string ]: <a href="#wing-sdk.Binding">Binding</a>}

---

## Classes <a name="Classes" id="Classes"></a>

### Duration <a name="Duration" id="wing-sdk.Duration"></a>


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#wing-sdk.Duration.fromHours">fromHours</a></code> | *No description.* |
| <code><a href="#wing-sdk.Duration.fromMinutes">fromMinutes</a></code> | *No description.* |
| <code><a href="#wing-sdk.Duration.fromSeconds">fromSeconds</a></code> | *No description.* |

---

##### `fromHours` <a name="fromHours" id="wing-sdk.Duration.fromHours"></a>

```typescript
import { Duration } from 'wing-sdk'

Duration.fromHours(amount: number)
```

###### `amount`<sup>Required</sup> <a name="amount" id="wing-sdk.Duration.fromHours.parameter.amount"></a>

- *Type:* number

---

##### `fromMinutes` <a name="fromMinutes" id="wing-sdk.Duration.fromMinutes"></a>

```typescript
import { Duration } from 'wing-sdk'

Duration.fromMinutes(amount: number)
```

###### `amount`<sup>Required</sup> <a name="amount" id="wing-sdk.Duration.fromMinutes.parameter.amount"></a>

- *Type:* number

---

##### `fromSeconds` <a name="fromSeconds" id="wing-sdk.Duration.fromSeconds"></a>

```typescript
import { Duration } from 'wing-sdk'

Duration.fromSeconds(amount: number)
```

###### `amount`<sup>Required</sup> <a name="amount" id="wing-sdk.Duration.fromSeconds.parameter.amount"></a>

- *Type:* number

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#wing-sdk.Duration.property.hours">hours</a></code> | <code>number</code> | *No description.* |
| <code><a href="#wing-sdk.Duration.property.minutes">minutes</a></code> | <code>number</code> | *No description.* |
| <code><a href="#wing-sdk.Duration.property.seconds">seconds</a></code> | <code>number</code> | *No description.* |

---

##### `hours`<sup>Required</sup> <a name="hours" id="wing-sdk.Duration.property.hours"></a>

```typescript
public readonly hours: number;
```

- *Type:* number

---

##### `minutes`<sup>Required</sup> <a name="minutes" id="wing-sdk.Duration.property.minutes"></a>

```typescript
public readonly minutes: number;
```

- *Type:* number

---

##### `seconds`<sup>Required</sup> <a name="seconds" id="wing-sdk.Duration.property.seconds"></a>

```typescript
public readonly seconds: number;
```

- *Type:* number

---


### Process <a name="Process" id="wing-sdk.Process"></a>

#### Initializers <a name="Initializers" id="wing-sdk.Process.Initializer"></a>

```typescript
import { Process } from 'wing-sdk'

new Process(props: ProcessProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#wing-sdk.Process.Initializer.parameter.props">props</a></code> | <code><a href="#wing-sdk.ProcessProps">ProcessProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="wing-sdk.Process.Initializer.parameter.props"></a>

- *Type:* <a href="#wing-sdk.ProcessProps">ProcessProps</a>

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#wing-sdk.Process.property.captures">captures</a></code> | <code><a href="#wing-sdk.ICaptureSource">ICaptureSource</a>[]</code> | The captures of this proc. |

---

##### `captures`<sup>Required</sup> <a name="captures" id="wing-sdk.Process.property.captures"></a>

```typescript
public readonly captures: ICaptureSource[];
```

- *Type:* <a href="#wing-sdk.ICaptureSource">ICaptureSource</a>[]

The captures of this proc.

---


## Protocols <a name="Protocols" id="Protocols"></a>

### ICapturable <a name="ICapturable" id="wing-sdk.ICapturable"></a>

- *Implemented By:* <a href="#wing-sdk.Bucket">Bucket</a>, <a href="#wing-sdk.Queue">Queue</a>, <a href="#wing-sdk.ICapturable">ICapturable</a>

Indicates that a construct can be captured.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#wing-sdk.ICapturable.capture">capture</a></code> | *No description.* |

---

##### `capture` <a name="capture" id="wing-sdk.ICapturable.capture"></a>

```typescript
public capture(symbol: string, binding: Binding): ICaptureSource
```

###### `symbol`<sup>Required</sup> <a name="symbol" id="wing-sdk.ICapturable.capture.parameter.symbol"></a>

- *Type:* string

---

###### `binding`<sup>Required</sup> <a name="binding" id="wing-sdk.ICapturable.capture.parameter.binding"></a>

- *Type:* <a href="#wing-sdk.Binding">Binding</a>

---


### ICaptureSource <a name="ICaptureSource" id="wing-sdk.ICaptureSource"></a>

- *Implemented By:* <a href="#wing-sdk.ICaptureSource">ICaptureSource</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#wing-sdk.ICaptureSource.bind">bind</a></code> | *No description.* |

---

##### `bind` <a name="bind" id="wing-sdk.ICaptureSource.bind"></a>

```typescript
public bind(target: ICaptureTarget): void
```

###### `target`<sup>Required</sup> <a name="target" id="wing-sdk.ICaptureSource.bind.parameter.target"></a>

- *Type:* <a href="#wing-sdk.ICaptureTarget">ICaptureTarget</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#wing-sdk.ICaptureSource.property.factoryCode">factoryCode</a></code> | <code>string</code> | *No description.* |
| <code><a href="#wing-sdk.ICaptureSource.property.requireCode">requireCode</a></code> | <code>string</code> | *No description.* |

---

##### `factoryCode`<sup>Required</sup> <a name="factoryCode" id="wing-sdk.ICaptureSource.property.factoryCode"></a>

```typescript
public readonly factoryCode: string;
```

- *Type:* string

---

##### `requireCode`<sup>Required</sup> <a name="requireCode" id="wing-sdk.ICaptureSource.property.requireCode"></a>

```typescript
public readonly requireCode: string;
```

- *Type:* string

---

### ICaptureTarget <a name="ICaptureTarget" id="wing-sdk.ICaptureTarget"></a>

- *Implemented By:* <a href="#wing-sdk.ICaptureTarget">ICaptureTarget</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#wing-sdk.ICaptureTarget.addEnvironment">addEnvironment</a></code> | *No description.* |

---

##### `addEnvironment` <a name="addEnvironment" id="wing-sdk.ICaptureTarget.addEnvironment"></a>

```typescript
public addEnvironment(key: string, value: string): void
```

###### `key`<sup>Required</sup> <a name="key" id="wing-sdk.ICaptureTarget.addEnvironment.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="wing-sdk.ICaptureTarget.addEnvironment.parameter.value"></a>

- *Type:* string

---


