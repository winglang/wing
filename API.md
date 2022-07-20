# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### App <a name="App" id="@monadahq/wingsdk.core.App"></a>

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.core.App.Initializer"></a>

```typescript
import { core } from '@monadahq/wingsdk'

new core.App(props?: AppProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.App.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.core.AppProps</code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@monadahq/wingsdk.core.App.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.core.AppProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.core.App.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.core.App.synth">synth</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.core.App.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `synth` <a name="synth" id="@monadahq/wingsdk.core.App.synth"></a>

```typescript
public synth(): void
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.core.App.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.core.App.isConstruct"></a>

```typescript
import { core } from '@monadahq/wingsdk'

core.App.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.core.App.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.App.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@monadahq/wingsdk.core.App.property.outdir">outdir</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.core.App.property.root">root</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.core.App.property.stateFile">stateFile</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.core.App.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="@monadahq/wingsdk.core.App.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

---

##### `root`<sup>Required</sup> <a name="root" id="@monadahq/wingsdk.core.App.property.root"></a>

```typescript
public readonly root: Construct;
```

- *Type:* constructs.Construct

---

##### `stateFile`<sup>Optional</sup> <a name="stateFile" id="@monadahq/wingsdk.core.App.property.stateFile"></a>

```typescript
public readonly stateFile: string;
```

- *Type:* string

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
public capture(consumer: any, _capture: Capture): string
```

###### `consumer`<sup>Required</sup> <a name="consumer" id="@monadahq/wingsdk.cloud.Bucket.capture.parameter.consumer"></a>

- *Type:* any

---

###### `_capture`<sup>Required</sup> <a name="_capture" id="@monadahq/wingsdk.cloud.Bucket.capture.parameter._capture"></a>

- *Type:* @monadahq/wingsdk.core.Capture

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


### FileBase <a name="FileBase" id="@monadahq/wingsdk.fs.FileBase"></a>

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.fs.FileBase.Initializer"></a>

```typescript
import { fs } from '@monadahq/wingsdk'

new fs.FileBase(scope: Construct, id: string, filePath: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.fs.FileBase.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | construct scope. |
| <code><a href="#@monadahq/wingsdk.fs.FileBase.Initializer.parameter.id">id</a></code> | <code>string</code> | construct id. |
| <code><a href="#@monadahq/wingsdk.fs.FileBase.Initializer.parameter.filePath">filePath</a></code> | <code>string</code> | relative file path. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.fs.FileBase.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

construct scope.

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.fs.FileBase.Initializer.parameter.id"></a>

- *Type:* string

construct id.

---

##### `filePath`<sup>Required</sup> <a name="filePath" id="@monadahq/wingsdk.fs.FileBase.Initializer.parameter.filePath"></a>

- *Type:* string

relative file path.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.fs.FileBase.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.fs.FileBase.save">save</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.fs.FileBase.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `save` <a name="save" id="@monadahq/wingsdk.fs.FileBase.save"></a>

```typescript
public save(outdir: string): void
```

###### `outdir`<sup>Required</sup> <a name="outdir" id="@monadahq/wingsdk.fs.FileBase.save.parameter.outdir"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.fs.FileBase.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.fs.FileBase.isConstruct"></a>

```typescript
import { fs } from '@monadahq/wingsdk'

fs.FileBase.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.fs.FileBase.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.fs.FileBase.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@monadahq/wingsdk.fs.FileBase.property.filePath">filePath</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.fs.FileBase.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `filePath`<sup>Required</sup> <a name="filePath" id="@monadahq/wingsdk.fs.FileBase.property.filePath"></a>

```typescript
public readonly filePath: string;
```

- *Type:* string

---


### Function <a name="Function" id="@monadahq/wingsdk.cloud.Function"></a>

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.cloud.Function.Initializer"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

new cloud.Function(scope: Construct, id: string, process: Process)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Function.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.cloud.Function.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.cloud.Function.Initializer.parameter.process">process</a></code> | <code>@monadahq/wingsdk.core.Process</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.cloud.Function.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.cloud.Function.Initializer.parameter.id"></a>

- *Type:* string

---

##### `process`<sup>Required</sup> <a name="process" id="@monadahq/wingsdk.cloud.Function.Initializer.parameter.process"></a>

- *Type:* @monadahq/wingsdk.core.Process

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Function.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.cloud.Function.addEnvironment">addEnvironment</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.cloud.Function.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addEnvironment` <a name="addEnvironment" id="@monadahq/wingsdk.cloud.Function.addEnvironment"></a>

```typescript
public addEnvironment(name: string, value: string): void
```

###### `name`<sup>Required</sup> <a name="name" id="@monadahq/wingsdk.cloud.Function.addEnvironment.parameter.name"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@monadahq/wingsdk.cloud.Function.addEnvironment.parameter.value"></a>

- *Type:* string

---

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


### JsonFile <a name="JsonFile" id="@monadahq/wingsdk.fs.JsonFile"></a>

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.fs.JsonFile.Initializer"></a>

```typescript
import { fs } from '@monadahq/wingsdk'

new fs.JsonFile(scope: Construct, id: string, filePath: string, props: JsonFileProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.fs.JsonFile.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.fs.JsonFile.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.fs.JsonFile.Initializer.parameter.filePath">filePath</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.fs.JsonFile.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.fs.JsonFileProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.fs.JsonFile.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.fs.JsonFile.Initializer.parameter.id"></a>

- *Type:* string

---

##### `filePath`<sup>Required</sup> <a name="filePath" id="@monadahq/wingsdk.fs.JsonFile.Initializer.parameter.filePath"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@monadahq/wingsdk.fs.JsonFile.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.fs.JsonFileProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.fs.JsonFile.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.fs.JsonFile.save">save</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.fs.JsonFile.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `save` <a name="save" id="@monadahq/wingsdk.fs.JsonFile.save"></a>

```typescript
public save(outdir: string): void
```

###### `outdir`<sup>Required</sup> <a name="outdir" id="@monadahq/wingsdk.fs.JsonFile.save.parameter.outdir"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.fs.JsonFile.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.fs.JsonFile.isConstruct"></a>

```typescript
import { fs } from '@monadahq/wingsdk'

fs.JsonFile.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.fs.JsonFile.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.fs.JsonFile.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@monadahq/wingsdk.fs.JsonFile.property.filePath">filePath</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.fs.JsonFile.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `filePath`<sup>Required</sup> <a name="filePath" id="@monadahq/wingsdk.fs.JsonFile.property.filePath"></a>

```typescript
public readonly filePath: string;
```

- *Type:* string

---


### Queue <a name="Queue" id="@monadahq/wingsdk.cloud.Queue"></a>

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


### TextFile <a name="TextFile" id="@monadahq/wingsdk.fs.TextFile"></a>

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.fs.TextFile.Initializer"></a>

```typescript
import { fs } from '@monadahq/wingsdk'

new fs.TextFile(scope: Construct, id: string, filePath: string, props?: TextFileProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.fs.TextFile.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.fs.TextFile.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.fs.TextFile.Initializer.parameter.filePath">filePath</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.fs.TextFile.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.fs.TextFileProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.fs.TextFile.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.fs.TextFile.Initializer.parameter.id"></a>

- *Type:* string

---

##### `filePath`<sup>Required</sup> <a name="filePath" id="@monadahq/wingsdk.fs.TextFile.Initializer.parameter.filePath"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="@monadahq/wingsdk.fs.TextFile.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.fs.TextFileProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.fs.TextFile.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.fs.TextFile.save">save</a></code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.fs.TextFile.addLine">addLine</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.fs.TextFile.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `save` <a name="save" id="@monadahq/wingsdk.fs.TextFile.save"></a>

```typescript
public save(outdir: string): void
```

###### `outdir`<sup>Required</sup> <a name="outdir" id="@monadahq/wingsdk.fs.TextFile.save.parameter.outdir"></a>

- *Type:* string

---

##### `addLine` <a name="addLine" id="@monadahq/wingsdk.fs.TextFile.addLine"></a>

```typescript
public addLine(line: string): void
```

###### `line`<sup>Required</sup> <a name="line" id="@monadahq/wingsdk.fs.TextFile.addLine.parameter.line"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.fs.TextFile.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.fs.TextFile.isConstruct"></a>

```typescript
import { fs } from '@monadahq/wingsdk'

fs.TextFile.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.fs.TextFile.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.fs.TextFile.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@monadahq/wingsdk.fs.TextFile.property.filePath">filePath</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.fs.TextFile.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `filePath`<sup>Required</sup> <a name="filePath" id="@monadahq/wingsdk.fs.TextFile.property.filePath"></a>

```typescript
public readonly filePath: string;
```

- *Type:* string

---


## Structs <a name="Structs" id="Structs"></a>

### AppProps <a name="AppProps" id="@monadahq/wingsdk.core.AppProps"></a>

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.core.AppProps.Initializer"></a>

```typescript
import { core } from '@monadahq/wingsdk'

const appProps: core.AppProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.AppProps.property.outdir">outdir</a></code> | <code>string</code> | The root output directory of the app. |
| <code><a href="#@monadahq/wingsdk.core.AppProps.property.stateFile">stateFile</a></code> | <code>string</code> | The path to a state file which will track all synthesized files. |

---

##### `outdir`<sup>Optional</sup> <a name="outdir" id="@monadahq/wingsdk.core.AppProps.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string
- *Default:* "."

The root output directory of the app.

---

##### `stateFile`<sup>Optional</sup> <a name="stateFile" id="@monadahq/wingsdk.core.AppProps.property.stateFile"></a>

```typescript
public readonly stateFile: string;
```

- *Type:* string

The path to a state file which will track all synthesized files.

If a
statefile is not specified, we won't be able to remove extrenous files.

---

### Capture <a name="Capture" id="@monadahq/wingsdk.core.Capture"></a>

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.core.Capture.Initializer"></a>

```typescript
import { core } from '@monadahq/wingsdk'

const capture: core.Capture = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.Capture.property.obj">obj</a></code> | <code>any</code> | The captured object. |
| <code><a href="#@monadahq/wingsdk.core.Capture.property.methods">methods</a></code> | <code>string[]</code> | Which methods are called on the captured object. |

---

##### `obj`<sup>Required</sup> <a name="obj" id="@monadahq/wingsdk.core.Capture.property.obj"></a>

```typescript
public readonly obj: any;
```

- *Type:* any

The captured object.

---

##### `methods`<sup>Optional</sup> <a name="methods" id="@monadahq/wingsdk.core.Capture.property.methods"></a>

```typescript
public readonly methods: string[];
```

- *Type:* string[]

Which methods are called on the captured object.

---

### JsonFileProps <a name="JsonFileProps" id="@monadahq/wingsdk.fs.JsonFileProps"></a>

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.fs.JsonFileProps.Initializer"></a>

```typescript
import { fs } from '@monadahq/wingsdk'

const jsonFileProps: fs.JsonFileProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.fs.JsonFileProps.property.obj">obj</a></code> | <code>any</code> | The object that will be serialized into the file during synthesis. |

---

##### `obj`<sup>Required</sup> <a name="obj" id="@monadahq/wingsdk.fs.JsonFileProps.property.obj"></a>

```typescript
public readonly obj: any;
```

- *Type:* any

The object that will be serialized into the file during synthesis.

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
| <code><a href="#@monadahq/wingsdk.core.ProcessProps.property.captures">captures</a></code> | <code>{[ key: string ]: @monadahq/wingsdk.core.Capture}</code> | *No description.* |

---

##### `path`<sup>Required</sup> <a name="path" id="@monadahq/wingsdk.core.ProcessProps.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

---

##### `captures`<sup>Optional</sup> <a name="captures" id="@monadahq/wingsdk.core.ProcessProps.property.captures"></a>

```typescript
public readonly captures: {[ key: string ]: Capture};
```

- *Type:* {[ key: string ]: @monadahq/wingsdk.core.Capture}

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

### TextFileProps <a name="TextFileProps" id="@monadahq/wingsdk.fs.TextFileProps"></a>

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.fs.TextFileProps.Initializer"></a>

```typescript
import { fs } from '@monadahq/wingsdk'

const textFileProps: fs.TextFileProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.fs.TextFileProps.property.lines">lines</a></code> | <code>string[]</code> | *No description.* |

---

##### `lines`<sup>Optional</sup> <a name="lines" id="@monadahq/wingsdk.fs.TextFileProps.property.lines"></a>

```typescript
public readonly lines: string[];
```

- *Type:* string[]

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
| <code><a href="#@monadahq/wingsdk.core.Process.property.captures">captures</a></code> | <code>{[ key: string ]: @monadahq/wingsdk.core.Capture}</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.core.Process.property.path">path</a></code> | <code>string</code> | *No description.* |

---

##### `captures`<sup>Required</sup> <a name="captures" id="@monadahq/wingsdk.core.Process.property.captures"></a>

```typescript
public readonly captures: {[ key: string ]: Capture};
```

- *Type:* {[ key: string ]: @monadahq/wingsdk.core.Capture}

---

##### `path`<sup>Required</sup> <a name="path" id="@monadahq/wingsdk.core.Process.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

---


## Protocols <a name="Protocols" id="Protocols"></a>

### ICapturable <a name="ICapturable" id="@monadahq/wingsdk.core.ICapturable"></a>

- *Implemented By:* @monadahq/wingsdk.cloud.Bucket, @monadahq/wingsdk.core.ICapturable

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.core.ICapturable.capture">capture</a></code> | *No description.* |

---

##### `capture` <a name="capture" id="@monadahq/wingsdk.core.ICapturable.capture"></a>

```typescript
public capture(consumer: any, capture: Capture): string
```

###### `consumer`<sup>Required</sup> <a name="consumer" id="@monadahq/wingsdk.core.ICapturable.capture.parameter.consumer"></a>

- *Type:* any

---

###### `capture`<sup>Required</sup> <a name="capture" id="@monadahq/wingsdk.core.ICapturable.capture.parameter.capture"></a>

- *Type:* @monadahq/wingsdk.core.Capture

---


