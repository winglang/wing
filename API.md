# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### App <a name="App" id="@monadahq/wingsdk.cloud.App"></a>

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.cloud.App.Initializer"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

new cloud.App()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.App.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.cloud.App.synth">synth</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.cloud.App.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `synth` <a name="synth" id="@monadahq/wingsdk.cloud.App.synth"></a>

```typescript
public synth(): void
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.App.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.cloud.App.isConstruct"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

cloud.App.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.cloud.App.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.App.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.cloud.App.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### Bucket <a name="Bucket" id="@monadahq/wingsdk.cloud.Bucket"></a>

- *Implements:* @monadahq/wingsdk.core.ICapturable

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.cloud.Bucket.Initializer"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

new cloud.Bucket(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Bucket.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.cloud.Bucket.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.cloud.Bucket.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.cloud.Bucket.Initializer.parameter.id"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Bucket.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.cloud.Bucket.capture">capture</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.cloud.Bucket.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `capture` <a name="capture" id="@monadahq/wingsdk.cloud.Bucket.capture"></a>

```typescript
public capture(_symbol: string, _binding: Binding): ICaptureSource
```

###### `_symbol`<sup>Required</sup> <a name="_symbol" id="@monadahq/wingsdk.cloud.Bucket.capture.parameter._symbol"></a>

- *Type:* string

---

###### `_binding`<sup>Required</sup> <a name="_binding" id="@monadahq/wingsdk.cloud.Bucket.capture.parameter._binding"></a>

- *Type:* @monadahq/wingsdk.core.Binding

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Bucket.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.cloud.Bucket.isConstruct"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

cloud.Bucket.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.cloud.Bucket.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Bucket.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.cloud.Bucket.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### Endpoint <a name="Endpoint" id="@monadahq/wingsdk.cloud.Endpoint"></a>

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.cloud.Endpoint.Initializer"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

new cloud.Endpoint(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Endpoint.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.cloud.Endpoint.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.cloud.Endpoint.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.cloud.Endpoint.Initializer.parameter.id"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Endpoint.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.cloud.Endpoint.onGet">onGet</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.cloud.Endpoint.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `onGet` <a name="onGet" id="@monadahq/wingsdk.cloud.Endpoint.onGet"></a>

```typescript
public onGet(route: string, proc: Process): void
```

###### `route`<sup>Required</sup> <a name="route" id="@monadahq/wingsdk.cloud.Endpoint.onGet.parameter.route"></a>

- *Type:* string

---

###### `proc`<sup>Required</sup> <a name="proc" id="@monadahq/wingsdk.cloud.Endpoint.onGet.parameter.proc"></a>

- *Type:* @monadahq/wingsdk.core.Process

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Endpoint.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.cloud.Endpoint.isConstruct"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

cloud.Endpoint.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.cloud.Endpoint.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Endpoint.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.cloud.Endpoint.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### File <a name="File" id="@monadahq/wingsdk.fs.File"></a>

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.fs.File.Initializer"></a>

```typescript
import { fs } from '@monadahq/wingsdk'

new fs.File(scope: Construct, id: string, filename: string, props: FileProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.fs.File.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.fs.File.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.fs.File.Initializer.parameter.filename">filename</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.fs.File.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.fs.FileProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.fs.File.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.fs.File.Initializer.parameter.id"></a>

- *Type:* string

---

##### `filename`<sup>Required</sup> <a name="filename" id="@monadahq/wingsdk.fs.File.Initializer.parameter.filename"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@monadahq/wingsdk.fs.File.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.fs.FileProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.fs.File.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.fs.File.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.fs.File.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.fs.File.isConstruct"></a>

```typescript
import { fs } from '@monadahq/wingsdk'

fs.File.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.fs.File.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.fs.File.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.fs.File.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### Function <a name="Function" id="@monadahq/wingsdk.cloud.Function"></a>

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.cloud.Function.Initializer"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

new cloud.Function(scope: Construct, id: string, props: FunctionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Function.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.cloud.Function.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.cloud.Function.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.cloud.FunctionProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.cloud.Function.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.cloud.Function.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@monadahq/wingsdk.cloud.Function.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.cloud.FunctionProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Function.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.cloud.Function.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Function.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.cloud.Function.isConstruct"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

cloud.Function.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.cloud.Function.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Function.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.cloud.Function.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### Queue <a name="Queue" id="@monadahq/wingsdk.cloud.Queue"></a>

- *Implements:* @monadahq/wingsdk.core.ICapturable

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.cloud.Queue.Initializer"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

new cloud.Queue(scope: Construct, id: string, props?: QueueProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Queue.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.cloud.Queue.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.cloud.Queue.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.cloud.QueueProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.cloud.Queue.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.cloud.Queue.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="@monadahq/wingsdk.cloud.Queue.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.cloud.QueueProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Queue.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.cloud.Queue.addWorker">addWorker</a></code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.cloud.Queue.capture">capture</a></code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.cloud.Queue.hello">hello</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.cloud.Queue.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addWorker` <a name="addWorker" id="@monadahq/wingsdk.cloud.Queue.addWorker"></a>

```typescript
public addWorker(fn: Function): void
```

###### `fn`<sup>Required</sup> <a name="fn" id="@monadahq/wingsdk.cloud.Queue.addWorker.parameter.fn"></a>

- *Type:* @monadahq/wingsdk.cloud.Function

---

##### `capture` <a name="capture" id="@monadahq/wingsdk.cloud.Queue.capture"></a>

```typescript
public capture(_symbol: string, _binding: Binding): ICaptureSource
```

###### `_symbol`<sup>Required</sup> <a name="_symbol" id="@monadahq/wingsdk.cloud.Queue.capture.parameter._symbol"></a>

- *Type:* string

---

###### `_binding`<sup>Required</sup> <a name="_binding" id="@monadahq/wingsdk.cloud.Queue.capture.parameter._binding"></a>

- *Type:* @monadahq/wingsdk.core.Binding

---

##### `hello` <a name="hello" id="@monadahq/wingsdk.cloud.Queue.hello"></a>

```typescript
public hello(): void
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Queue.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.cloud.Queue.isConstruct"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

cloud.Queue.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.cloud.Queue.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Queue.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.cloud.Queue.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### Binding <a name="Binding" id="@monadahq/wingsdk.core.Binding"></a>

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.core.Binding.Initializer"></a>

```typescript
import { core } from '@monadahq/wingsdk'

const binding: core.Binding = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.Binding.property.obj">obj</a></code> | <code>@monadahq/wingsdk.core.ICapturable</code> | The captured object. |
| <code><a href="#@monadahq/wingsdk.core.Binding.property.methods">methods</a></code> | <code>string[]</code> | Which methods are called on the captured object. |

---

##### `obj`<sup>Required</sup> <a name="obj" id="@monadahq/wingsdk.core.Binding.property.obj"></a>

```typescript
public readonly obj: ICapturable;
```

- *Type:* @monadahq/wingsdk.core.ICapturable

The captured object.

---

##### `methods`<sup>Optional</sup> <a name="methods" id="@monadahq/wingsdk.core.Binding.property.methods"></a>

```typescript
public readonly methods: string[];
```

- *Type:* string[]

Which methods are called on the captured object.

---

### FileProps <a name="FileProps" id="@monadahq/wingsdk.fs.FileProps"></a>

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.fs.FileProps.Initializer"></a>

```typescript
import { fs } from '@monadahq/wingsdk'

const fileProps: fs.FileProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.fs.FileProps.property.contents">contents</a></code> | <code>string</code> | *No description.* |

---

##### `contents`<sup>Optional</sup> <a name="contents" id="@monadahq/wingsdk.fs.FileProps.property.contents"></a>

```typescript
public readonly contents: string;
```

- *Type:* string

---

### FunctionProps <a name="FunctionProps" id="@monadahq/wingsdk.cloud.FunctionProps"></a>

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.cloud.FunctionProps.Initializer"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

const functionProps: cloud.FunctionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.FunctionProps.property.handler">handler</a></code> | <code>@monadahq/wingsdk.core.Process</code> | *No description.* |

---

##### `handler`<sup>Required</sup> <a name="handler" id="@monadahq/wingsdk.cloud.FunctionProps.property.handler"></a>

```typescript
public readonly handler: Process;
```

- *Type:* @monadahq/wingsdk.core.Process

---

### ProcessProps <a name="ProcessProps" id="@monadahq/wingsdk.core.ProcessProps"></a>

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.core.ProcessProps.Initializer"></a>

```typescript
import { core } from '@monadahq/wingsdk'

const processProps: core.ProcessProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.ProcessProps.property.path">path</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.core.ProcessProps.property.bindings">bindings</a></code> | <code>{[ key: string ]: @monadahq/wingsdk.core.Binding}</code> | *No description.* |

---

##### `path`<sup>Required</sup> <a name="path" id="@monadahq/wingsdk.core.ProcessProps.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

---

##### `bindings`<sup>Optional</sup> <a name="bindings" id="@monadahq/wingsdk.core.ProcessProps.property.bindings"></a>

```typescript
public readonly bindings: {[ key: string ]: Binding};
```

- *Type:* {[ key: string ]: @monadahq/wingsdk.core.Binding}

---

### QueueProps <a name="QueueProps" id="@monadahq/wingsdk.cloud.QueueProps"></a>

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.cloud.QueueProps.Initializer"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

const queueProps: cloud.QueueProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.QueueProps.property.timeout">timeout</a></code> | <code>@monadahq/wingsdk.core.Duration</code> | *No description.* |

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@monadahq/wingsdk.cloud.QueueProps.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* @monadahq/wingsdk.core.Duration

---

## Classes <a name="Classes" id="Classes"></a>

### Duration <a name="Duration" id="@monadahq/wingsdk.core.Duration"></a>


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.core.Duration.fromHours">fromHours</a></code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.core.Duration.fromMinutes">fromMinutes</a></code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.core.Duration.fromSeconds">fromSeconds</a></code> | *No description.* |

---

##### `fromHours` <a name="fromHours" id="@monadahq/wingsdk.core.Duration.fromHours"></a>

```typescript
import { core } from '@monadahq/wingsdk'

core.Duration.fromHours(amount: number)
```

###### `amount`<sup>Required</sup> <a name="amount" id="@monadahq/wingsdk.core.Duration.fromHours.parameter.amount"></a>

- *Type:* number

---

##### `fromMinutes` <a name="fromMinutes" id="@monadahq/wingsdk.core.Duration.fromMinutes"></a>

```typescript
import { core } from '@monadahq/wingsdk'

core.Duration.fromMinutes(amount: number)
```

###### `amount`<sup>Required</sup> <a name="amount" id="@monadahq/wingsdk.core.Duration.fromMinutes.parameter.amount"></a>

- *Type:* number

---

##### `fromSeconds` <a name="fromSeconds" id="@monadahq/wingsdk.core.Duration.fromSeconds"></a>

```typescript
import { core } from '@monadahq/wingsdk'

core.Duration.fromSeconds(amount: number)
```

###### `amount`<sup>Required</sup> <a name="amount" id="@monadahq/wingsdk.core.Duration.fromSeconds.parameter.amount"></a>

- *Type:* number

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.Duration.property.hours">hours</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.core.Duration.property.minutes">minutes</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.core.Duration.property.seconds">seconds</a></code> | <code>number</code> | *No description.* |

---

##### `hours`<sup>Required</sup> <a name="hours" id="@monadahq/wingsdk.core.Duration.property.hours"></a>

```typescript
public readonly hours: number;
```

- *Type:* number

---

##### `minutes`<sup>Required</sup> <a name="minutes" id="@monadahq/wingsdk.core.Duration.property.minutes"></a>

```typescript
public readonly minutes: number;
```

- *Type:* number

---

##### `seconds`<sup>Required</sup> <a name="seconds" id="@monadahq/wingsdk.core.Duration.property.seconds"></a>

```typescript
public readonly seconds: number;
```

- *Type:* number

---


### Process <a name="Process" id="@monadahq/wingsdk.core.Process"></a>

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.core.Process.Initializer"></a>

```typescript
import { core } from '@monadahq/wingsdk'

new core.Process(props: ProcessProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.Process.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.core.ProcessProps</code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@monadahq/wingsdk.core.Process.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.core.ProcessProps

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.Process.property.captures">captures</a></code> | <code>@monadahq/wingsdk.core.ICaptureSource[]</code> | The captures of this proc. |

---

##### `captures`<sup>Required</sup> <a name="captures" id="@monadahq/wingsdk.core.Process.property.captures"></a>

```typescript
public readonly captures: ICaptureSource[];
```

- *Type:* @monadahq/wingsdk.core.ICaptureSource[]

The captures of this proc.

---


## Protocols <a name="Protocols" id="Protocols"></a>

### ICapturable <a name="ICapturable" id="@monadahq/wingsdk.core.ICapturable"></a>

- *Implemented By:* @monadahq/wingsdk.cloud.Bucket, @monadahq/wingsdk.cloud.Queue, @monadahq/wingsdk.core.ICapturable

Indicates that a construct can be captured.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.core.ICapturable.capture">capture</a></code> | *No description.* |

---

##### `capture` <a name="capture" id="@monadahq/wingsdk.core.ICapturable.capture"></a>

```typescript
public capture(symbol: string, binding: Binding): ICaptureSource
```

###### `symbol`<sup>Required</sup> <a name="symbol" id="@monadahq/wingsdk.core.ICapturable.capture.parameter.symbol"></a>

- *Type:* string

---

###### `binding`<sup>Required</sup> <a name="binding" id="@monadahq/wingsdk.core.ICapturable.capture.parameter.binding"></a>

- *Type:* @monadahq/wingsdk.core.Binding

---


### ICaptureSource <a name="ICaptureSource" id="@monadahq/wingsdk.core.ICaptureSource"></a>

- *Implemented By:* @monadahq/wingsdk.core.ICaptureSource

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.core.ICaptureSource.bind">bind</a></code> | *No description.* |

---

##### `bind` <a name="bind" id="@monadahq/wingsdk.core.ICaptureSource.bind"></a>

```typescript
public bind(target: ICaptureTarget): void
```

###### `target`<sup>Required</sup> <a name="target" id="@monadahq/wingsdk.core.ICaptureSource.bind.parameter.target"></a>

- *Type:* @monadahq/wingsdk.core.ICaptureTarget

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.ICaptureSource.property.factoryCode">factoryCode</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.core.ICaptureSource.property.requireCode">requireCode</a></code> | <code>string</code> | *No description.* |

---

##### `factoryCode`<sup>Required</sup> <a name="factoryCode" id="@monadahq/wingsdk.core.ICaptureSource.property.factoryCode"></a>

```typescript
public readonly factoryCode: string;
```

- *Type:* string

---

##### `requireCode`<sup>Required</sup> <a name="requireCode" id="@monadahq/wingsdk.core.ICaptureSource.property.requireCode"></a>

```typescript
public readonly requireCode: string;
```

- *Type:* string

---

### ICaptureTarget <a name="ICaptureTarget" id="@monadahq/wingsdk.core.ICaptureTarget"></a>

- *Implemented By:* @monadahq/wingsdk.core.ICaptureTarget

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.core.ICaptureTarget.addEnvironment">addEnvironment</a></code> | *No description.* |

---

##### `addEnvironment` <a name="addEnvironment" id="@monadahq/wingsdk.core.ICaptureTarget.addEnvironment"></a>

```typescript
public addEnvironment(key: string, value: string): void
```

###### `key`<sup>Required</sup> <a name="key" id="@monadahq/wingsdk.core.ICaptureTarget.addEnvironment.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@monadahq/wingsdk.core.ICaptureTarget.addEnvironment.parameter.value"></a>

- *Type:* string

---


