# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### App <a name="App" id="@monadahq/wingsdk.core.App"></a>

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.core.App.Initializer"></a>

```typescript
import { core } from '@monadahq/wingsdk'

new core.App(props: AppProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.App.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.core.AppProps</code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@monadahq/wingsdk.core.App.Initializer.parameter.props"></a>

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


### App <a name="App" id="@monadahq/wingsdk.local.App"></a>

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.local.App.Initializer"></a>

```typescript
import { local } from '@monadahq/wingsdk'

new local.App(props: AppProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.local.App.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.local.AppProps</code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@monadahq/wingsdk.local.App.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.local.AppProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.local.App.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.local.App.synth">synth</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.local.App.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `synth` <a name="synth" id="@monadahq/wingsdk.local.App.synth"></a>

```typescript
public synth(): void
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.local.App.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.local.App.isConstruct"></a>

```typescript
import { local } from '@monadahq/wingsdk'

local.App.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.local.App.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.local.App.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.local.App.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### Bucket <a name="Bucket" id="@monadahq/wingsdk.cloud.Bucket"></a>

Represents a cloud object store.

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.cloud.Bucket.Initializer"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

new cloud.Bucket(scope: Construct, id: string, props?: BucketProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Bucket.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.cloud.Bucket.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.cloud.Bucket.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.cloud.BucketProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.cloud.Bucket.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.cloud.Bucket.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="@monadahq/wingsdk.cloud.Bucket.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.cloud.BucketProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Bucket.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.cloud.Bucket.capture">capture</a></code> | Captures the resource for a given consumer so that it can be used in a Process. |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.cloud.Bucket.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `capture` <a name="capture" id="@monadahq/wingsdk.cloud.Bucket.capture"></a>

```typescript
public capture(_consumer: any, _capture: Capture): Code
```

Captures the resource for a given consumer so that it can be used in a Process.

###### `_consumer`<sup>Required</sup> <a name="_consumer" id="@monadahq/wingsdk.cloud.Bucket.capture.parameter._consumer"></a>

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
| <code><a href="#@monadahq/wingsdk.cloud.Bucket.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.cloud.Bucket.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@monadahq/wingsdk.cloud.Bucket.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### Bucket <a name="Bucket" id="@monadahq/wingsdk.local.Bucket"></a>

- *Implements:* @monadahq/wingsdk.cloud.IBucket, @monadahq/wingsdk.local.IResource

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.local.Bucket.Initializer"></a>

```typescript
import { local } from '@monadahq/wingsdk'

new local.Bucket(scope: Construct, id: string, props: BucketProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.local.Bucket.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.local.Bucket.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.local.Bucket.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.cloud.BucketProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.local.Bucket.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.local.Bucket.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@monadahq/wingsdk.local.Bucket.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.cloud.BucketProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.local.Bucket.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.local.Bucket.capture">capture</a></code> | Captures the resource for a given consumer so that it can be used in a Process. |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.local.Bucket.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `capture` <a name="capture" id="@monadahq/wingsdk.local.Bucket.capture"></a>

```typescript
public capture(consumer: any, _capture: Capture): Code
```

Captures the resource for a given consumer so that it can be used in a Process.

###### `consumer`<sup>Required</sup> <a name="consumer" id="@monadahq/wingsdk.local.Bucket.capture.parameter.consumer"></a>

- *Type:* any

---

###### `_capture`<sup>Required</sup> <a name="_capture" id="@monadahq/wingsdk.local.Bucket.capture.parameter._capture"></a>

- *Type:* @monadahq/wingsdk.core.Capture

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.local.Bucket.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.local.Bucket.isConstruct"></a>

```typescript
import { local } from '@monadahq/wingsdk'

local.Bucket.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.local.Bucket.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.local.Bucket.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@monadahq/wingsdk.local.Bucket.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.local.Bucket.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@monadahq/wingsdk.local.Bucket.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### Bucket <a name="Bucket" id="@monadahq/wingsdk.tfaws.Bucket"></a>

- *Implements:* @monadahq/wingsdk.cloud.IBucket

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.tfaws.Bucket.Initializer"></a>

```typescript
import { tfaws } from '@monadahq/wingsdk'

new tfaws.Bucket(scope: Construct, id: string, props: BucketProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.tfaws.Bucket.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.tfaws.Bucket.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.tfaws.Bucket.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.cloud.BucketProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.tfaws.Bucket.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.tfaws.Bucket.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@monadahq/wingsdk.tfaws.Bucket.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.cloud.BucketProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.tfaws.Bucket.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.tfaws.Bucket.capture">capture</a></code> | Captures the resource for a given consumer so that it can be used in a Process. |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.tfaws.Bucket.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `capture` <a name="capture" id="@monadahq/wingsdk.tfaws.Bucket.capture"></a>

```typescript
public capture(consumer: any, capture: Capture): Code
```

Captures the resource for a given consumer so that it can be used in a Process.

###### `consumer`<sup>Required</sup> <a name="consumer" id="@monadahq/wingsdk.tfaws.Bucket.capture.parameter.consumer"></a>

- *Type:* any

---

###### `capture`<sup>Required</sup> <a name="capture" id="@monadahq/wingsdk.tfaws.Bucket.capture.parameter.capture"></a>

- *Type:* @monadahq/wingsdk.core.Capture

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.tfaws.Bucket.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.tfaws.Bucket.isConstruct"></a>

```typescript
import { tfaws } from '@monadahq/wingsdk'

tfaws.Bucket.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.tfaws.Bucket.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.tfaws.Bucket.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@monadahq/wingsdk.tfaws.Bucket.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.tfaws.Bucket.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@monadahq/wingsdk.tfaws.Bucket.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### BucketBase <a name="BucketBase" id="@monadahq/wingsdk.cloud.BucketBase"></a>

- *Implements:* @monadahq/wingsdk.cloud.IBucket

Functionality shared between all `Bucket` implementations.

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.cloud.BucketBase.Initializer"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

new cloud.BucketBase(scope: Construct, id: string, props: BucketProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.BucketBase.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.cloud.BucketBase.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.cloud.BucketBase.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.cloud.BucketProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.cloud.BucketBase.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.cloud.BucketBase.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@monadahq/wingsdk.cloud.BucketBase.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.cloud.BucketProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.BucketBase.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.cloud.BucketBase.capture">capture</a></code> | Captures the resource for a given consumer so that it can be used in a Process. |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.cloud.BucketBase.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `capture` <a name="capture" id="@monadahq/wingsdk.cloud.BucketBase.capture"></a>

```typescript
public capture(consumer: any, capture: Capture): Code
```

Captures the resource for a given consumer so that it can be used in a Process.

###### `consumer`<sup>Required</sup> <a name="consumer" id="@monadahq/wingsdk.cloud.BucketBase.capture.parameter.consumer"></a>

- *Type:* any

---

###### `capture`<sup>Required</sup> <a name="capture" id="@monadahq/wingsdk.cloud.BucketBase.capture.parameter.capture"></a>

- *Type:* @monadahq/wingsdk.core.Capture

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.BucketBase.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.cloud.BucketBase.isConstruct"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

cloud.BucketBase.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.cloud.BucketBase.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.BucketBase.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@monadahq/wingsdk.cloud.BucketBase.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.cloud.BucketBase.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@monadahq/wingsdk.cloud.BucketBase.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

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

Represents a serverless function.

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
| <code><a href="#@monadahq/wingsdk.cloud.Function.capture">capture</a></code> | Captures the resource for a given consumer so that it can be used in a Process. |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.cloud.Function.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `capture` <a name="capture" id="@monadahq/wingsdk.cloud.Function.capture"></a>

```typescript
public capture(_consumer: any, _capture: Capture): Code
```

Captures the resource for a given consumer so that it can be used in a Process.

###### `_consumer`<sup>Required</sup> <a name="_consumer" id="@monadahq/wingsdk.cloud.Function.capture.parameter._consumer"></a>

- *Type:* any

---

###### `_capture`<sup>Required</sup> <a name="_capture" id="@monadahq/wingsdk.cloud.Function.capture.parameter._capture"></a>

- *Type:* @monadahq/wingsdk.core.Capture

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
| <code><a href="#@monadahq/wingsdk.cloud.Function.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.cloud.Function.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@monadahq/wingsdk.cloud.Function.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### Function <a name="Function" id="@monadahq/wingsdk.local.Function"></a>

- *Implements:* @monadahq/wingsdk.local.IResource

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.local.Function.Initializer"></a>

```typescript
import { local } from '@monadahq/wingsdk'

new local.Function(scope: Construct, id: string, process: Process)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.local.Function.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.local.Function.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.local.Function.Initializer.parameter.process">process</a></code> | <code>@monadahq/wingsdk.core.Process</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.local.Function.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.local.Function.Initializer.parameter.id"></a>

- *Type:* string

---

##### `process`<sup>Required</sup> <a name="process" id="@monadahq/wingsdk.local.Function.Initializer.parameter.process"></a>

- *Type:* @monadahq/wingsdk.core.Process

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.local.Function.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.local.Function.capture">capture</a></code> | Captures the resource for a given consumer so that it can be used in a Process. |
| <code><a href="#@monadahq/wingsdk.local.Function.addEnvironment">addEnvironment</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.local.Function.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `capture` <a name="capture" id="@monadahq/wingsdk.local.Function.capture"></a>

```typescript
public capture(_consumer: any, _capture: Capture): Code
```

Captures the resource for a given consumer so that it can be used in a Process.

###### `_consumer`<sup>Required</sup> <a name="_consumer" id="@monadahq/wingsdk.local.Function.capture.parameter._consumer"></a>

- *Type:* any

---

###### `_capture`<sup>Required</sup> <a name="_capture" id="@monadahq/wingsdk.local.Function.capture.parameter._capture"></a>

- *Type:* @monadahq/wingsdk.core.Capture

---

##### `addEnvironment` <a name="addEnvironment" id="@monadahq/wingsdk.local.Function.addEnvironment"></a>

```typescript
public addEnvironment(name: string, value: string): void
```

###### `name`<sup>Required</sup> <a name="name" id="@monadahq/wingsdk.local.Function.addEnvironment.parameter.name"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@monadahq/wingsdk.local.Function.addEnvironment.parameter.value"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.local.Function.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.local.Function.isConstruct"></a>

```typescript
import { local } from '@monadahq/wingsdk'

local.Function.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.local.Function.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.local.Function.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@monadahq/wingsdk.local.Function.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.local.Function.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@monadahq/wingsdk.local.Function.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### Function <a name="Function" id="@monadahq/wingsdk.tfaws.Function"></a>

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.tfaws.Function.Initializer"></a>

```typescript
import { tfaws } from '@monadahq/wingsdk'

new tfaws.Function(scope: Construct, id: string, process: Process)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.tfaws.Function.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.tfaws.Function.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.tfaws.Function.Initializer.parameter.process">process</a></code> | <code>@monadahq/wingsdk.core.Process</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.tfaws.Function.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.tfaws.Function.Initializer.parameter.id"></a>

- *Type:* string

---

##### `process`<sup>Required</sup> <a name="process" id="@monadahq/wingsdk.tfaws.Function.Initializer.parameter.process"></a>

- *Type:* @monadahq/wingsdk.core.Process

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.tfaws.Function.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.tfaws.Function.capture">capture</a></code> | Captures the resource for a given consumer so that it can be used in a Process. |
| <code><a href="#@monadahq/wingsdk.tfaws.Function.addEnvironment">addEnvironment</a></code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.tfaws.Function.addPolicyStatements">addPolicyStatements</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.tfaws.Function.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `capture` <a name="capture" id="@monadahq/wingsdk.tfaws.Function.capture"></a>

```typescript
public capture(_consumer: any, _capture: Capture): Code
```

Captures the resource for a given consumer so that it can be used in a Process.

###### `_consumer`<sup>Required</sup> <a name="_consumer" id="@monadahq/wingsdk.tfaws.Function.capture.parameter._consumer"></a>

- *Type:* any

---

###### `_capture`<sup>Required</sup> <a name="_capture" id="@monadahq/wingsdk.tfaws.Function.capture.parameter._capture"></a>

- *Type:* @monadahq/wingsdk.core.Capture

---

##### `addEnvironment` <a name="addEnvironment" id="@monadahq/wingsdk.tfaws.Function.addEnvironment"></a>

```typescript
public addEnvironment(name: string, value: string): void
```

###### `name`<sup>Required</sup> <a name="name" id="@monadahq/wingsdk.tfaws.Function.addEnvironment.parameter.name"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@monadahq/wingsdk.tfaws.Function.addEnvironment.parameter.value"></a>

- *Type:* string

---

##### `addPolicyStatements` <a name="addPolicyStatements" id="@monadahq/wingsdk.tfaws.Function.addPolicyStatements"></a>

```typescript
public addPolicyStatements(statements: PolicyStatement): void
```

###### `statements`<sup>Required</sup> <a name="statements" id="@monadahq/wingsdk.tfaws.Function.addPolicyStatements.parameter.statements"></a>

- *Type:* @monadahq/wingsdk.tfaws.PolicyStatement

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.tfaws.Function.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.tfaws.Function.isConstruct"></a>

```typescript
import { tfaws } from '@monadahq/wingsdk'

tfaws.Function.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.tfaws.Function.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.tfaws.Function.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@monadahq/wingsdk.tfaws.Function.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.tfaws.Function.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@monadahq/wingsdk.tfaws.Function.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### FunctionBase <a name="FunctionBase" id="@monadahq/wingsdk.cloud.FunctionBase"></a>

- *Implements:* @monadahq/wingsdk.cloud.IFunction

Functionality shared between all `Function` implementations.

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.cloud.FunctionBase.Initializer"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

new cloud.FunctionBase(scope: Construct, id: string, process: Process)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.FunctionBase.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.cloud.FunctionBase.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.cloud.FunctionBase.Initializer.parameter.process">process</a></code> | <code>@monadahq/wingsdk.core.Process</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.cloud.FunctionBase.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.cloud.FunctionBase.Initializer.parameter.id"></a>

- *Type:* string

---

##### `process`<sup>Required</sup> <a name="process" id="@monadahq/wingsdk.cloud.FunctionBase.Initializer.parameter.process"></a>

- *Type:* @monadahq/wingsdk.core.Process

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.FunctionBase.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.cloud.FunctionBase.capture">capture</a></code> | Captures the resource for a given consumer so that it can be used in a Process. |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.cloud.FunctionBase.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `capture` <a name="capture" id="@monadahq/wingsdk.cloud.FunctionBase.capture"></a>

```typescript
public capture(consumer: any, capture: Capture): Code
```

Captures the resource for a given consumer so that it can be used in a Process.

###### `consumer`<sup>Required</sup> <a name="consumer" id="@monadahq/wingsdk.cloud.FunctionBase.capture.parameter.consumer"></a>

- *Type:* any

---

###### `capture`<sup>Required</sup> <a name="capture" id="@monadahq/wingsdk.cloud.FunctionBase.capture.parameter.capture"></a>

- *Type:* @monadahq/wingsdk.core.Capture

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.FunctionBase.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.cloud.FunctionBase.isConstruct"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

cloud.FunctionBase.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.cloud.FunctionBase.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.FunctionBase.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@monadahq/wingsdk.cloud.FunctionBase.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.cloud.FunctionBase.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@monadahq/wingsdk.cloud.FunctionBase.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

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

Represents a serverless queue.

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.cloud.Queue.Initializer"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

new cloud.Queue(scope: Construct, id: string, props: QueueProps)
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

##### `props`<sup>Required</sup> <a name="props" id="@monadahq/wingsdk.cloud.Queue.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.cloud.QueueProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Queue.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.cloud.Queue.capture">capture</a></code> | Captures the resource for a given consumer so that it can be used in a Process. |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.cloud.Queue.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `capture` <a name="capture" id="@monadahq/wingsdk.cloud.Queue.capture"></a>

```typescript
public capture(_consumer: any, _capture: Capture): Code
```

Captures the resource for a given consumer so that it can be used in a Process.

###### `_consumer`<sup>Required</sup> <a name="_consumer" id="@monadahq/wingsdk.cloud.Queue.capture.parameter._consumer"></a>

- *Type:* any

---

###### `_capture`<sup>Required</sup> <a name="_capture" id="@monadahq/wingsdk.cloud.Queue.capture.parameter._capture"></a>

- *Type:* @monadahq/wingsdk.core.Capture

---

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
| <code><a href="#@monadahq/wingsdk.cloud.Queue.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.cloud.Queue.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@monadahq/wingsdk.cloud.Queue.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### Queue <a name="Queue" id="@monadahq/wingsdk.tfaws.Queue"></a>

- *Implements:* @monadahq/wingsdk.cloud.IQueue

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.tfaws.Queue.Initializer"></a>

```typescript
import { tfaws } from '@monadahq/wingsdk'

new tfaws.Queue(scope: Construct, id: string, props?: QueueProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.tfaws.Queue.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.tfaws.Queue.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.tfaws.Queue.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.cloud.QueueProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.tfaws.Queue.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.tfaws.Queue.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="@monadahq/wingsdk.tfaws.Queue.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.cloud.QueueProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.tfaws.Queue.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.tfaws.Queue.capture">capture</a></code> | Captures the resource for a given consumer so that it can be used in a Process. |
| <code><a href="#@monadahq/wingsdk.tfaws.Queue.addWorker">addWorker</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.tfaws.Queue.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `capture` <a name="capture" id="@monadahq/wingsdk.tfaws.Queue.capture"></a>

```typescript
public capture(_consumer: any, _capture: Capture): Code
```

Captures the resource for a given consumer so that it can be used in a Process.

###### `_consumer`<sup>Required</sup> <a name="_consumer" id="@monadahq/wingsdk.tfaws.Queue.capture.parameter._consumer"></a>

- *Type:* any

---

###### `_capture`<sup>Required</sup> <a name="_capture" id="@monadahq/wingsdk.tfaws.Queue.capture.parameter._capture"></a>

- *Type:* @monadahq/wingsdk.core.Capture

---

##### `addWorker` <a name="addWorker" id="@monadahq/wingsdk.tfaws.Queue.addWorker"></a>

```typescript
public addWorker(fn: IFunction): void
```

###### `fn`<sup>Required</sup> <a name="fn" id="@monadahq/wingsdk.tfaws.Queue.addWorker.parameter.fn"></a>

- *Type:* @monadahq/wingsdk.cloud.IFunction

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.tfaws.Queue.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.tfaws.Queue.isConstruct"></a>

```typescript
import { tfaws } from '@monadahq/wingsdk'

tfaws.Queue.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.tfaws.Queue.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.tfaws.Queue.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@monadahq/wingsdk.tfaws.Queue.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.tfaws.Queue.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@monadahq/wingsdk.tfaws.Queue.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### QueueBase <a name="QueueBase" id="@monadahq/wingsdk.cloud.QueueBase"></a>

- *Implements:* @monadahq/wingsdk.cloud.IQueue

Functionality shared between all `Queue` implementations.

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.cloud.QueueBase.Initializer"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

new cloud.QueueBase(scope: Construct, id: string, props: QueueProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.QueueBase.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.cloud.QueueBase.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.cloud.QueueBase.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.cloud.QueueProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.cloud.QueueBase.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.cloud.QueueBase.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@monadahq/wingsdk.cloud.QueueBase.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.cloud.QueueProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.QueueBase.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.cloud.QueueBase.capture">capture</a></code> | Captures the resource for a given consumer so that it can be used in a Process. |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.cloud.QueueBase.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `capture` <a name="capture" id="@monadahq/wingsdk.cloud.QueueBase.capture"></a>

```typescript
public capture(consumer: any, capture: Capture): Code
```

Captures the resource for a given consumer so that it can be used in a Process.

###### `consumer`<sup>Required</sup> <a name="consumer" id="@monadahq/wingsdk.cloud.QueueBase.capture.parameter.consumer"></a>

- *Type:* any

---

###### `capture`<sup>Required</sup> <a name="capture" id="@monadahq/wingsdk.cloud.QueueBase.capture.parameter.capture"></a>

- *Type:* @monadahq/wingsdk.core.Capture

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.QueueBase.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.cloud.QueueBase.isConstruct"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

cloud.QueueBase.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.cloud.QueueBase.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.QueueBase.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@monadahq/wingsdk.cloud.QueueBase.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.cloud.QueueBase.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@monadahq/wingsdk.cloud.QueueBase.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### Resource <a name="Resource" id="@monadahq/wingsdk.cloud.Resource"></a>

- *Implements:* @monadahq/wingsdk.cloud.IResource, @monadahq/wingsdk.core.ICapturable

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.cloud.Resource.Initializer"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

new cloud.Resource(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Resource.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The scope in which to define this construct. |
| <code><a href="#@monadahq/wingsdk.cloud.Resource.Initializer.parameter.id">id</a></code> | <code>string</code> | The scoped construct ID. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.cloud.Resource.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The scope in which to define this construct.

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.cloud.Resource.Initializer.parameter.id"></a>

- *Type:* string

The scoped construct ID.

Must be unique amongst siblings. If
the ID includes a path separator (`/`), then it will be replaced by double
dash `--`.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Resource.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.cloud.Resource.capture">capture</a></code> | Captures the resource for a given consumer so that it can be used in a Process. |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.cloud.Resource.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `capture` <a name="capture" id="@monadahq/wingsdk.cloud.Resource.capture"></a>

```typescript
public capture(consumer: any, capture: Capture): Code
```

Captures the resource for a given consumer so that it can be used in a Process.

###### `consumer`<sup>Required</sup> <a name="consumer" id="@monadahq/wingsdk.cloud.Resource.capture.parameter.consumer"></a>

- *Type:* any

---

###### `capture`<sup>Required</sup> <a name="capture" id="@monadahq/wingsdk.cloud.Resource.capture.parameter.capture"></a>

- *Type:* @monadahq/wingsdk.core.Capture

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Resource.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.cloud.Resource.isConstruct"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

cloud.Resource.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.cloud.Resource.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Resource.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@monadahq/wingsdk.cloud.Resource.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.cloud.Resource.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@monadahq/wingsdk.cloud.Resource.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

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
| <code><a href="#@monadahq/wingsdk.core.AppProps.property.synthesizer">synthesizer</a></code> | <code>@monadahq/wingsdk.core.Synthesizer</code> | A synthesizer that handles setting up a CDK framework and registering a polycon factory. |
| <code><a href="#@monadahq/wingsdk.core.AppProps.property.stateFile">stateFile</a></code> | <code>string</code> | The path to a state file which will track all synthesized files. |

---

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="@monadahq/wingsdk.core.AppProps.property.synthesizer"></a>

```typescript
public readonly synthesizer: Synthesizer;
```

- *Type:* @monadahq/wingsdk.core.Synthesizer

A synthesizer that handles setting up a CDK framework and registering a polycon factory.

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

### AppProps <a name="AppProps" id="@monadahq/wingsdk.local.AppProps"></a>

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.local.AppProps.Initializer"></a>

```typescript
import { local } from '@monadahq/wingsdk'

const appProps: local.AppProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.local.AppProps.property.outdir">outdir</a></code> | <code>string</code> | *No description.* |

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="@monadahq/wingsdk.local.AppProps.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

---

### BucketProps <a name="BucketProps" id="@monadahq/wingsdk.cloud.BucketProps"></a>

Properties for `Bucket`.

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.cloud.BucketProps.Initializer"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

const bucketProps: cloud.BucketProps = { ... }
```


### Capture <a name="Capture" id="@monadahq/wingsdk.core.Capture"></a>

Capture information.

A capture is a reference from a Process to a
construction-time object or value.

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

### PolicyStatement <a name="PolicyStatement" id="@monadahq/wingsdk.tfaws.PolicyStatement"></a>

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.tfaws.PolicyStatement.Initializer"></a>

```typescript
import { tfaws } from '@monadahq/wingsdk'

const policyStatement: tfaws.PolicyStatement = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.tfaws.PolicyStatement.property.action">action</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.tfaws.PolicyStatement.property.effect">effect</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.tfaws.PolicyStatement.property.resource">resource</a></code> | <code>string[]</code> | *No description.* |

---

##### `action`<sup>Optional</sup> <a name="action" id="@monadahq/wingsdk.tfaws.PolicyStatement.property.action"></a>

```typescript
public readonly action: string[];
```

- *Type:* string[]

---

##### `effect`<sup>Optional</sup> <a name="effect" id="@monadahq/wingsdk.tfaws.PolicyStatement.property.effect"></a>

```typescript
public readonly effect: string;
```

- *Type:* string

---

##### `resource`<sup>Optional</sup> <a name="resource" id="@monadahq/wingsdk.tfaws.PolicyStatement.property.resource"></a>

```typescript
public readonly resource: string[];
```

- *Type:* string[]

---

### ProcessProps <a name="ProcessProps" id="@monadahq/wingsdk.core.ProcessProps"></a>

Options for `Process`.

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.core.ProcessProps.Initializer"></a>

```typescript
import { core } from '@monadahq/wingsdk'

const processProps: core.ProcessProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.ProcessProps.property.code">code</a></code> | <code>@monadahq/wingsdk.core.Code</code> | Reference to code containing the entrypoint function. |
| <code><a href="#@monadahq/wingsdk.core.ProcessProps.property.entrypoint">entrypoint</a></code> | <code>string</code> | Name of the exported function which will be run. |
| <code><a href="#@monadahq/wingsdk.core.ProcessProps.property.captures">captures</a></code> | <code>{[ key: string ]: @monadahq/wingsdk.core.Capture}</code> | Capture information. |

---

##### `code`<sup>Required</sup> <a name="code" id="@monadahq/wingsdk.core.ProcessProps.property.code"></a>

```typescript
public readonly code: Code;
```

- *Type:* @monadahq/wingsdk.core.Code

Reference to code containing the entrypoint function.

---

##### `entrypoint`<sup>Required</sup> <a name="entrypoint" id="@monadahq/wingsdk.core.ProcessProps.property.entrypoint"></a>

```typescript
public readonly entrypoint: string;
```

- *Type:* string

Name of the exported function which will be run.

---

##### `captures`<sup>Optional</sup> <a name="captures" id="@monadahq/wingsdk.core.ProcessProps.property.captures"></a>

```typescript
public readonly captures: {[ key: string ]: Capture};
```

- *Type:* {[ key: string ]: @monadahq/wingsdk.core.Capture}

Capture information.

During runtime, a map containing all captured values
will be passed as the first argument of the entrypoint function.

Each key here will be the key for the final value in the map.

---

### QueueProps <a name="QueueProps" id="@monadahq/wingsdk.cloud.QueueProps"></a>

Properties for `Queue`.

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

### ResourceSpec <a name="ResourceSpec" id="@monadahq/wingsdk.local.ResourceSpec"></a>

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.local.ResourceSpec.Initializer"></a>

```typescript
import { local } from '@monadahq/wingsdk'

const resourceSpec: local.ResourceSpec = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.local.ResourceSpec.property.kind">kind</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.local.ResourceSpec.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.local.ResourceSpec.property.props">props</a></code> | <code>any</code> | *No description.* |

---

##### `kind`<sup>Required</sup> <a name="kind" id="@monadahq/wingsdk.local.ResourceSpec.property.kind"></a>

```typescript
public readonly kind: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="@monadahq/wingsdk.local.ResourceSpec.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@monadahq/wingsdk.local.ResourceSpec.property.props"></a>

```typescript
public readonly props: any;
```

- *Type:* any

---

### SynthesizerProps <a name="SynthesizerProps" id="@monadahq/wingsdk.core.SynthesizerProps"></a>

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.core.SynthesizerProps.Initializer"></a>

```typescript
import { core } from '@monadahq/wingsdk'

const synthesizerProps: core.SynthesizerProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.SynthesizerProps.property.customFactory">customFactory</a></code> | <code>@monadahq/polycons.IPolyconFactory</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.core.SynthesizerProps.property.outdir">outdir</a></code> | <code>string</code> | *No description.* |

---

##### `customFactory`<sup>Optional</sup> <a name="customFactory" id="@monadahq/wingsdk.core.SynthesizerProps.property.customFactory"></a>

```typescript
public readonly customFactory: IPolyconFactory;
```

- *Type:* @monadahq/polycons.IPolyconFactory

---

##### `outdir`<sup>Optional</sup> <a name="outdir" id="@monadahq/wingsdk.core.SynthesizerProps.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

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

### Code <a name="Code" id="@monadahq/wingsdk.core.Code"></a>

Reference to a piece of code.

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.core.Code.Initializer"></a>

```typescript
import { core } from '@monadahq/wingsdk'

new core.Code()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.Code.property.language">language</a></code> | <code>@monadahq/wingsdk.core.Language</code> | The language of the code. |
| <code><a href="#@monadahq/wingsdk.core.Code.property.path">path</a></code> | <code>string</code> | A path to the code in the user's file system that can be referenced for bundling purposes. |
| <code><a href="#@monadahq/wingsdk.core.Code.property.text">text</a></code> | <code>string</code> | The code contents. |

---

##### `language`<sup>Required</sup> <a name="language" id="@monadahq/wingsdk.core.Code.property.language"></a>

```typescript
public readonly language: Language;
```

- *Type:* @monadahq/wingsdk.core.Language

The language of the code.

---

##### `path`<sup>Required</sup> <a name="path" id="@monadahq/wingsdk.core.Code.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

A path to the code in the user's file system that can be referenced for bundling purposes.

---

##### `text`<sup>Required</sup> <a name="text" id="@monadahq/wingsdk.core.Code.property.text"></a>

```typescript
public readonly text: string;
```

- *Type:* string

The code contents.

---


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


### NodeJsCode <a name="NodeJsCode" id="@monadahq/wingsdk.core.NodeJsCode"></a>

Reference to a piece of Node.js code.


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.core.NodeJsCode.fromFile">fromFile</a></code> | Reference code from a file path. |
| <code><a href="#@monadahq/wingsdk.core.NodeJsCode.fromInline">fromInline</a></code> | Reference code directly from a string. |

---

##### `fromFile` <a name="fromFile" id="@monadahq/wingsdk.core.NodeJsCode.fromFile"></a>

```typescript
import { core } from '@monadahq/wingsdk'

core.NodeJsCode.fromFile(path: string)
```

Reference code from a file path.

###### `path`<sup>Required</sup> <a name="path" id="@monadahq/wingsdk.core.NodeJsCode.fromFile.parameter.path"></a>

- *Type:* string

---

##### `fromInline` <a name="fromInline" id="@monadahq/wingsdk.core.NodeJsCode.fromInline"></a>

```typescript
import { core } from '@monadahq/wingsdk'

core.NodeJsCode.fromInline(text: string)
```

Reference code directly from a string.

###### `text`<sup>Required</sup> <a name="text" id="@monadahq/wingsdk.core.NodeJsCode.fromInline.parameter.text"></a>

- *Type:* string

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.NodeJsCode.property.language">language</a></code> | <code>@monadahq/wingsdk.core.Language</code> | The language of the code. |
| <code><a href="#@monadahq/wingsdk.core.NodeJsCode.property.path">path</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.core.NodeJsCode.property.text">text</a></code> | <code>string</code> | The code contents. |

---

##### `language`<sup>Required</sup> <a name="language" id="@monadahq/wingsdk.core.NodeJsCode.property.language"></a>

```typescript
public readonly language: Language;
```

- *Type:* @monadahq/wingsdk.core.Language

The language of the code.

---

##### `path`<sup>Required</sup> <a name="path" id="@monadahq/wingsdk.core.NodeJsCode.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

---

##### `text`<sup>Required</sup> <a name="text" id="@monadahq/wingsdk.core.NodeJsCode.property.text"></a>

```typescript
public readonly text: string;
```

- *Type:* string

The code contents.

---


### PolyconFactory <a name="PolyconFactory" id="@monadahq/wingsdk.local.PolyconFactory"></a>

- *Implements:* @monadahq/polycons.IPolyconFactory

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.local.PolyconFactory.Initializer"></a>

```typescript
import { local } from '@monadahq/wingsdk'

new local.PolyconFactory()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.local.PolyconFactory.resolve">resolve</a></code> | Resolve the parameters needed for creating a specific polycon into a concrete construct. |

---

##### `resolve` <a name="resolve" id="@monadahq/wingsdk.local.PolyconFactory.resolve"></a>

```typescript
public resolve(polyconId: string, scope: IConstruct, id: string, props?: any): IConstruct
```

Resolve the parameters needed for creating a specific polycon into a concrete construct.

###### `polyconId`<sup>Required</sup> <a name="polyconId" id="@monadahq/wingsdk.local.PolyconFactory.resolve.parameter.polyconId"></a>

- *Type:* string

---

###### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.local.PolyconFactory.resolve.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

###### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.local.PolyconFactory.resolve.parameter.id"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="@monadahq/wingsdk.local.PolyconFactory.resolve.parameter.props"></a>

- *Type:* any

---




### PolyconFactory <a name="PolyconFactory" id="@monadahq/wingsdk.tfaws.PolyconFactory"></a>

- *Implements:* @monadahq/polycons.IPolyconFactory

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.tfaws.PolyconFactory.Initializer"></a>

```typescript
import { tfaws } from '@monadahq/wingsdk'

new tfaws.PolyconFactory()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.tfaws.PolyconFactory.resolve">resolve</a></code> | Resolve the parameters needed for creating a specific polycon into a concrete construct. |

---

##### `resolve` <a name="resolve" id="@monadahq/wingsdk.tfaws.PolyconFactory.resolve"></a>

```typescript
public resolve(polyconId: string, scope: IConstruct, id: string, props?: any): IConstruct
```

Resolve the parameters needed for creating a specific polycon into a concrete construct.

###### `polyconId`<sup>Required</sup> <a name="polyconId" id="@monadahq/wingsdk.tfaws.PolyconFactory.resolve.parameter.polyconId"></a>

- *Type:* string

---

###### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.tfaws.PolyconFactory.resolve.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

###### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.tfaws.PolyconFactory.resolve.parameter.id"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="@monadahq/wingsdk.tfaws.PolyconFactory.resolve.parameter.props"></a>

- *Type:* any

---




### Process <a name="Process" id="@monadahq/wingsdk.core.Process"></a>

Runtime code with a named entrypoint.

Typically this represents code
that exists to be run outside of the scope of a `constructs` application.

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
| <code><a href="#@monadahq/wingsdk.core.Process.property.captures">captures</a></code> | <code>{[ key: string ]: @monadahq/wingsdk.core.Capture}</code> | Capture information. |
| <code><a href="#@monadahq/wingsdk.core.Process.property.code">code</a></code> | <code>@monadahq/wingsdk.core.Code</code> | Reference to code containing the entrypoint function. |
| <code><a href="#@monadahq/wingsdk.core.Process.property.entrypoint">entrypoint</a></code> | <code>string</code> | Name of the exported function which will be run. |

---

##### `captures`<sup>Required</sup> <a name="captures" id="@monadahq/wingsdk.core.Process.property.captures"></a>

```typescript
public readonly captures: {[ key: string ]: Capture};
```

- *Type:* {[ key: string ]: @monadahq/wingsdk.core.Capture}

Capture information.

During runtime, a map containing all captured values
will be passed as the first argument of the entrypoint function.

Each key here will be the key for the final value in the map.

---

##### `code`<sup>Required</sup> <a name="code" id="@monadahq/wingsdk.core.Process.property.code"></a>

```typescript
public readonly code: Code;
```

- *Type:* @monadahq/wingsdk.core.Code

Reference to code containing the entrypoint function.

---

##### `entrypoint`<sup>Required</sup> <a name="entrypoint" id="@monadahq/wingsdk.core.Process.property.entrypoint"></a>

```typescript
public readonly entrypoint: string;
```

- *Type:* string

Name of the exported function which will be run.

---


### Synthesizer <a name="Synthesizer" id="@monadahq/wingsdk.core.Synthesizer"></a>

Handles the initialization and synthesis of constructs for a given CDK framework.

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.core.Synthesizer.Initializer"></a>

```typescript
import { core } from '@monadahq/wingsdk'

new core.Synthesizer(props: SynthesizerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.Synthesizer.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.core.SynthesizerProps</code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@monadahq/wingsdk.core.Synthesizer.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.core.SynthesizerProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.core.Synthesizer.synth">synth</a></code> | Synthesize the app. |

---

##### `synth` <a name="synth" id="@monadahq/wingsdk.core.Synthesizer.synth"></a>

```typescript
public synth(): void
```

Synthesize the app.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.Synthesizer.property.outdir">outdir</a></code> | <code>string</code> | Path to the output directory. |
| <code><a href="#@monadahq/wingsdk.core.Synthesizer.property.root">root</a></code> | <code>constructs.Construct</code> | Place in the construct tree where all users constructs will get added. |

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="@monadahq/wingsdk.core.Synthesizer.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

Path to the output directory.

For example, if synthesizing to terraform,
`cdktf.out` will be created in here.

---

##### `root`<sup>Required</sup> <a name="root" id="@monadahq/wingsdk.core.Synthesizer.property.root"></a>

```typescript
public readonly root: Construct;
```

- *Type:* constructs.Construct

Place in the construct tree where all users constructs will get added.

---


### Synthesizer <a name="Synthesizer" id="@monadahq/wingsdk.local.Synthesizer"></a>

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.local.Synthesizer.Initializer"></a>

```typescript
import { local } from '@monadahq/wingsdk'

new local.Synthesizer(props: SynthesizerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.local.Synthesizer.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.core.SynthesizerProps</code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@monadahq/wingsdk.local.Synthesizer.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.core.SynthesizerProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.local.Synthesizer.synth">synth</a></code> | Synthesize the app. |

---

##### `synth` <a name="synth" id="@monadahq/wingsdk.local.Synthesizer.synth"></a>

```typescript
public synth(): void
```

Synthesize the app.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.local.Synthesizer.property.outdir">outdir</a></code> | <code>string</code> | Path to the output directory. |
| <code><a href="#@monadahq/wingsdk.local.Synthesizer.property.root">root</a></code> | <code>constructs.Construct</code> | Place in the construct tree where all users constructs will get added. |

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="@monadahq/wingsdk.local.Synthesizer.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

Path to the output directory.

For example, if synthesizing to terraform,
`cdktf.out` will be created in here.

---

##### `root`<sup>Required</sup> <a name="root" id="@monadahq/wingsdk.local.Synthesizer.property.root"></a>

```typescript
public readonly root: Construct;
```

- *Type:* constructs.Construct

Place in the construct tree where all users constructs will get added.

---


### Synthesizer <a name="Synthesizer" id="@monadahq/wingsdk.tfaws.Synthesizer"></a>

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.tfaws.Synthesizer.Initializer"></a>

```typescript
import { tfaws } from '@monadahq/wingsdk'

new tfaws.Synthesizer(props: SynthesizerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.tfaws.Synthesizer.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.core.SynthesizerProps</code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@monadahq/wingsdk.tfaws.Synthesizer.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.core.SynthesizerProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.tfaws.Synthesizer.synth">synth</a></code> | Synthesize the app. |

---

##### `synth` <a name="synth" id="@monadahq/wingsdk.tfaws.Synthesizer.synth"></a>

```typescript
public synth(): void
```

Synthesize the app.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.tfaws.Synthesizer.property.outdir">outdir</a></code> | <code>string</code> | Path to the output directory. |
| <code><a href="#@monadahq/wingsdk.tfaws.Synthesizer.property.root">root</a></code> | <code>constructs.Construct</code> | Place in the construct tree where all users constructs will get added. |

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="@monadahq/wingsdk.tfaws.Synthesizer.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

Path to the output directory.

For example, if synthesizing to terraform,
`cdktf.out` will be created in here.

---

##### `root`<sup>Required</sup> <a name="root" id="@monadahq/wingsdk.tfaws.Synthesizer.property.root"></a>

```typescript
public readonly root: Construct;
```

- *Type:* constructs.Construct

Place in the construct tree where all users constructs will get added.

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IBucket <a name="IBucket" id="@monadahq/wingsdk.cloud.IBucket"></a>

- *Extends:* @monadahq/wingsdk.cloud.IResource

- *Implemented By:* @monadahq/wingsdk.cloud.Bucket, @monadahq/wingsdk.cloud.BucketBase, @monadahq/wingsdk.local.Bucket, @monadahq/wingsdk.tfaws.Bucket, @monadahq/wingsdk.cloud.IBucket


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.IBucket.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@monadahq/wingsdk.cloud.IBucket.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---

### ICapturable <a name="ICapturable" id="@monadahq/wingsdk.core.ICapturable"></a>

- *Implemented By:* @monadahq/wingsdk.cloud.Bucket, @monadahq/wingsdk.cloud.BucketBase, @monadahq/wingsdk.cloud.Function, @monadahq/wingsdk.cloud.FunctionBase, @monadahq/wingsdk.cloud.Queue, @monadahq/wingsdk.cloud.QueueBase, @monadahq/wingsdk.cloud.Resource, @monadahq/wingsdk.local.Bucket, @monadahq/wingsdk.local.Function, @monadahq/wingsdk.tfaws.Bucket, @monadahq/wingsdk.tfaws.Function, @monadahq/wingsdk.tfaws.Queue, @monadahq/wingsdk.core.ICapturable

Represents something that is capturable.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.core.ICapturable.capture">capture</a></code> | Captures the resource for a given consumer so that it can be used in a Process. |

---

##### `capture` <a name="capture" id="@monadahq/wingsdk.core.ICapturable.capture"></a>

```typescript
public capture(consumer: any, capture: Capture): Code
```

Captures the resource for a given consumer so that it can be used in a Process.

###### `consumer`<sup>Required</sup> <a name="consumer" id="@monadahq/wingsdk.core.ICapturable.capture.parameter.consumer"></a>

- *Type:* any

---

###### `capture`<sup>Required</sup> <a name="capture" id="@monadahq/wingsdk.core.ICapturable.capture.parameter.capture"></a>

- *Type:* @monadahq/wingsdk.core.Capture

---


### IFunction <a name="IFunction" id="@monadahq/wingsdk.cloud.IFunction"></a>

- *Extends:* @monadahq/wingsdk.cloud.IResource

- *Implemented By:* @monadahq/wingsdk.cloud.Function, @monadahq/wingsdk.cloud.FunctionBase, @monadahq/wingsdk.local.Function, @monadahq/wingsdk.tfaws.Function, @monadahq/wingsdk.cloud.IFunction


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.IFunction.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@monadahq/wingsdk.cloud.IFunction.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---

### IQueue <a name="IQueue" id="@monadahq/wingsdk.cloud.IQueue"></a>

- *Extends:* @monadahq/wingsdk.cloud.IResource

- *Implemented By:* @monadahq/wingsdk.cloud.Queue, @monadahq/wingsdk.cloud.QueueBase, @monadahq/wingsdk.tfaws.Queue, @monadahq/wingsdk.cloud.IQueue


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.IQueue.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@monadahq/wingsdk.cloud.IQueue.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---

### IResource <a name="IResource" id="@monadahq/wingsdk.cloud.IResource"></a>

- *Implemented By:* @monadahq/wingsdk.cloud.Bucket, @monadahq/wingsdk.cloud.BucketBase, @monadahq/wingsdk.cloud.Function, @monadahq/wingsdk.cloud.FunctionBase, @monadahq/wingsdk.cloud.Queue, @monadahq/wingsdk.cloud.QueueBase, @monadahq/wingsdk.cloud.Resource, @monadahq/wingsdk.local.Bucket, @monadahq/wingsdk.local.Function, @monadahq/wingsdk.tfaws.Bucket, @monadahq/wingsdk.tfaws.Function, @monadahq/wingsdk.tfaws.Queue, @monadahq/wingsdk.cloud.IBucket, @monadahq/wingsdk.cloud.IFunction, @monadahq/wingsdk.cloud.IQueue, @monadahq/wingsdk.cloud.IResource


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.IResource.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@monadahq/wingsdk.cloud.IResource.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---

### IResource <a name="IResource" id="@monadahq/wingsdk.local.IResource"></a>

- *Extends:* constructs.IConstruct

- *Implemented By:* @monadahq/wingsdk.local.Bucket, @monadahq/wingsdk.local.Function, @monadahq/wingsdk.local.IResource


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.local.IResource.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.local.IResource.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

## Enums <a name="Enums" id="Enums"></a>

### Language <a name="Language" id="@monadahq/wingsdk.core.Language"></a>

The language of a piece of code.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.core.Language.NODE_JS">NODE_JS</a></code> | *No description.* |

---

##### `NODE_JS` <a name="NODE_JS" id="@monadahq/wingsdk.core.Language.NODE_JS"></a>

---

