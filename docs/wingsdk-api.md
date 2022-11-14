# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### App <a name="App" id="@winglang/wingsdk.sim.App"></a>

- *Implements:* @winglang/wingsdk.core.IApp

A construct that knows how to synthesize simulator resources into a Wing simulator (.wx) file.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.sim.App.Initializer"></a>

```typescript
import { sim } from '@winglang/wingsdk'

new sim.App(props: AppProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.sim.App.Initializer.parameter.props">props</a></code> | <code>@winglang/wingsdk.sim.AppProps</code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/wingsdk.sim.App.Initializer.parameter.props"></a>

- *Type:* @winglang/wingsdk.sim.AppProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.sim.App.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/wingsdk.sim.App.synth">synth</a></code> | Synthesize the app into an `app.wx` file. Return the path to the file. |

---

##### `toString` <a name="toString" id="@winglang/wingsdk.sim.App.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `synth` <a name="synth" id="@winglang/wingsdk.sim.App.synth"></a>

```typescript
public synth(): string
```

Synthesize the app into an `app.wx` file. Return the path to the file.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.sim.App.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@winglang/wingsdk.sim.App.isConstruct"></a>

```typescript
import { sim } from '@winglang/wingsdk'

sim.App.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.sim.App.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.sim.App.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.sim.App.property.outdir">outdir</a></code> | <code>string</code> | Directory where artifacts are synthesized to. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.sim.App.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="@winglang/wingsdk.sim.App.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

Directory where artifacts are synthesized to.

---


### App <a name="App" id="@winglang/wingsdk.tfaws.App"></a>

- *Implements:* @winglang/wingsdk.core.IApp

An app that knows how to synthesize constructs into a Terraform configuration for AWS resources.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.tfaws.App.Initializer"></a>

```typescript
import { tfaws } from '@winglang/wingsdk'

new tfaws.App(props?: AppProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.tfaws.App.Initializer.parameter.props">props</a></code> | <code>@winglang/wingsdk.tfaws.AppProps</code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/wingsdk.tfaws.App.Initializer.parameter.props"></a>

- *Type:* @winglang/wingsdk.tfaws.AppProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.tfaws.App.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/wingsdk.tfaws.App.synth">synth</a></code> | Synthesize the app into Terraform configuration in a `cdktf.out` directory. |

---

##### `toString` <a name="toString" id="@winglang/wingsdk.tfaws.App.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `synth` <a name="synth" id="@winglang/wingsdk.tfaws.App.synth"></a>

```typescript
public synth(): string
```

Synthesize the app into Terraform configuration in a `cdktf.out` directory.

This method eturn a cleaned snapshot of the resulting Terraform manifest
for unit testing.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.tfaws.App.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@winglang/wingsdk.tfaws.App.isConstruct"></a>

```typescript
import { tfaws } from '@winglang/wingsdk'

tfaws.App.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.tfaws.App.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.tfaws.App.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.tfaws.App.property.outdir">outdir</a></code> | <code>string</code> | Directory where artifacts are synthesized to. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.tfaws.App.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="@winglang/wingsdk.tfaws.App.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

Directory where artifacts are synthesized to.

---


### Bucket <a name="Bucket" id="@winglang/wingsdk.cloud.Bucket"></a>

**Inflight client:** [@winglang/wingsdk.cloud.IBucketClient](#@winglang/wingsdk.cloud.IBucketClient)

Represents a cloud object store.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.cloud.Bucket.Initializer"></a>

```typescript
import { cloud } from '@winglang/wingsdk'

new cloud.Bucket(scope: Construct, id: string, props?: BucketProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Bucket.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.cloud.Bucket.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.cloud.Bucket.Initializer.parameter.props">props</a></code> | <code>@winglang/wingsdk.cloud.BucketProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@winglang/wingsdk.cloud.Bucket.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@winglang/wingsdk.cloud.Bucket.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/wingsdk.cloud.Bucket.Initializer.parameter.props"></a>

- *Type:* @winglang/wingsdk.cloud.BucketProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Bucket.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@winglang/wingsdk.cloud.Bucket.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Bucket.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@winglang/wingsdk.cloud.Bucket.isConstruct"></a>

```typescript
import { cloud } from '@winglang/wingsdk'

cloud.Bucket.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.cloud.Bucket.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Bucket.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.cloud.Bucket.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.cloud.Bucket.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/wingsdk.cloud.Bucket.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### Bucket <a name="Bucket" id="@winglang/wingsdk.sim.Bucket"></a>

- *Implements:* @winglang/wingsdk.sim.IResource

**Inflight client:** [@winglang/wingsdk.sim.IBucketClient](#@winglang/wingsdk.sim.IBucketClient)

Simulator implementation of `cloud.Bucket`.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.sim.Bucket.Initializer"></a>

```typescript
import { sim } from '@winglang/wingsdk'

new sim.Bucket(scope: Construct, id: string, props: BucketProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.sim.Bucket.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.sim.Bucket.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.sim.Bucket.Initializer.parameter.props">props</a></code> | <code>@winglang/wingsdk.cloud.BucketProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@winglang/wingsdk.sim.Bucket.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@winglang/wingsdk.sim.Bucket.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/wingsdk.sim.Bucket.Initializer.parameter.props"></a>

- *Type:* @winglang/wingsdk.cloud.BucketProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.sim.Bucket.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@winglang/wingsdk.sim.Bucket.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.sim.Bucket.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@winglang/wingsdk.sim.Bucket.isConstruct"></a>

```typescript
import { sim } from '@winglang/wingsdk'

sim.Bucket.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.sim.Bucket.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.sim.Bucket.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.sim.Bucket.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.sim.Bucket.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/wingsdk.sim.Bucket.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### Bucket <a name="Bucket" id="@winglang/wingsdk.tfaws.Bucket"></a>

**Inflight client:** [@winglang/wingsdk.tfaws.IBucketClient](#@winglang/wingsdk.tfaws.IBucketClient)

AWS implementation of `cloud.Bucket`.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.tfaws.Bucket.Initializer"></a>

```typescript
import { tfaws } from '@winglang/wingsdk'

new tfaws.Bucket(scope: Construct, id: string, props: BucketProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.tfaws.Bucket.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.tfaws.Bucket.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.tfaws.Bucket.Initializer.parameter.props">props</a></code> | <code>@winglang/wingsdk.cloud.BucketProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@winglang/wingsdk.tfaws.Bucket.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@winglang/wingsdk.tfaws.Bucket.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/wingsdk.tfaws.Bucket.Initializer.parameter.props"></a>

- *Type:* @winglang/wingsdk.cloud.BucketProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.tfaws.Bucket.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@winglang/wingsdk.tfaws.Bucket.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.tfaws.Bucket.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@winglang/wingsdk.tfaws.Bucket.isConstruct"></a>

```typescript
import { tfaws } from '@winglang/wingsdk'

tfaws.Bucket.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.tfaws.Bucket.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.tfaws.Bucket.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.tfaws.Bucket.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.tfaws.Bucket.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/wingsdk.tfaws.Bucket.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### BucketBase <a name="BucketBase" id="@winglang/wingsdk.cloud.BucketBase"></a>

Functionality shared between all `Bucket` implementations.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.cloud.BucketBase.Initializer"></a>

```typescript
import { cloud } from '@winglang/wingsdk'

new cloud.BucketBase(scope: Construct, id: string, props: BucketProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.BucketBase.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.cloud.BucketBase.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.cloud.BucketBase.Initializer.parameter.props">props</a></code> | <code>@winglang/wingsdk.cloud.BucketProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@winglang/wingsdk.cloud.BucketBase.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@winglang/wingsdk.cloud.BucketBase.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/wingsdk.cloud.BucketBase.Initializer.parameter.props"></a>

- *Type:* @winglang/wingsdk.cloud.BucketProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.BucketBase.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@winglang/wingsdk.cloud.BucketBase.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.BucketBase.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@winglang/wingsdk.cloud.BucketBase.isConstruct"></a>

```typescript
import { cloud } from '@winglang/wingsdk'

cloud.BucketBase.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.cloud.BucketBase.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.BucketBase.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.cloud.BucketBase.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.cloud.BucketBase.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/wingsdk.cloud.BucketBase.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### FileBase <a name="FileBase" id="@winglang/wingsdk.fs.FileBase"></a>

Represents a file to be synthesized in the app's output directory.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.fs.FileBase.Initializer"></a>

```typescript
import { fs } from '@winglang/wingsdk'

new fs.FileBase(scope: Construct, id: string, filePath: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.fs.FileBase.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | construct scope. |
| <code><a href="#@winglang/wingsdk.fs.FileBase.Initializer.parameter.id">id</a></code> | <code>string</code> | construct id. |
| <code><a href="#@winglang/wingsdk.fs.FileBase.Initializer.parameter.filePath">filePath</a></code> | <code>string</code> | relative file path. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@winglang/wingsdk.fs.FileBase.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

construct scope.

---

##### `id`<sup>Required</sup> <a name="id" id="@winglang/wingsdk.fs.FileBase.Initializer.parameter.id"></a>

- *Type:* string

construct id.

---

##### `filePath`<sup>Required</sup> <a name="filePath" id="@winglang/wingsdk.fs.FileBase.Initializer.parameter.filePath"></a>

- *Type:* string

relative file path.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.fs.FileBase.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/wingsdk.fs.FileBase.save">save</a></code> | Render the contents of the file and save it to the user's file system. |

---

##### `toString` <a name="toString" id="@winglang/wingsdk.fs.FileBase.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `save` <a name="save" id="@winglang/wingsdk.fs.FileBase.save"></a>

```typescript
public save(outdir: string): void
```

Render the contents of the file and save it to the user's file system.

###### `outdir`<sup>Required</sup> <a name="outdir" id="@winglang/wingsdk.fs.FileBase.save.parameter.outdir"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.fs.FileBase.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@winglang/wingsdk.fs.FileBase.isConstruct"></a>

```typescript
import { fs } from '@winglang/wingsdk'

fs.FileBase.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.fs.FileBase.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.fs.FileBase.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.fs.FileBase.property.filePath">filePath</a></code> | <code>string</code> | The file's relative path to the output directory. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.fs.FileBase.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `filePath`<sup>Required</sup> <a name="filePath" id="@winglang/wingsdk.fs.FileBase.property.filePath"></a>

```typescript
public readonly filePath: string;
```

- *Type:* string

The file's relative path to the output directory.

---


### Function <a name="Function" id="@winglang/wingsdk.cloud.Function"></a>

**Inflight client:** [@winglang/wingsdk.cloud.IFunctionClient](#@winglang/wingsdk.cloud.IFunctionClient)

Represents a serverless function.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.cloud.Function.Initializer"></a>

```typescript
import { cloud } from '@winglang/wingsdk'

new cloud.Function(scope: Construct, id: string, inflight: Inflight, props?: FunctionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Function.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.cloud.Function.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.cloud.Function.Initializer.parameter.inflight">inflight</a></code> | <code>@winglang/wingsdk.core.Inflight</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.cloud.Function.Initializer.parameter.props">props</a></code> | <code>@winglang/wingsdk.cloud.FunctionProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@winglang/wingsdk.cloud.Function.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@winglang/wingsdk.cloud.Function.Initializer.parameter.id"></a>

- *Type:* string

---

##### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/wingsdk.cloud.Function.Initializer.parameter.inflight"></a>

- *Type:* @winglang/wingsdk.core.Inflight

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/wingsdk.cloud.Function.Initializer.parameter.props"></a>

- *Type:* @winglang/wingsdk.cloud.FunctionProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Function.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/wingsdk.cloud.Function.addEnvironment">addEnvironment</a></code> | Add an environment variable to the function. |

---

##### `toString` <a name="toString" id="@winglang/wingsdk.cloud.Function.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addEnvironment` <a name="addEnvironment" id="@winglang/wingsdk.cloud.Function.addEnvironment"></a>

```typescript
public addEnvironment(_key: string, _value: string): void
```

Add an environment variable to the function.

###### `_key`<sup>Required</sup> <a name="_key" id="@winglang/wingsdk.cloud.Function.addEnvironment.parameter._key"></a>

- *Type:* string

---

###### `_value`<sup>Required</sup> <a name="_value" id="@winglang/wingsdk.cloud.Function.addEnvironment.parameter._value"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Function.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@winglang/wingsdk.cloud.Function.isConstruct"></a>

```typescript
import { cloud } from '@winglang/wingsdk'

cloud.Function.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.cloud.Function.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Function.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.cloud.Function.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.cloud.Function.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/wingsdk.cloud.Function.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### Function <a name="Function" id="@winglang/wingsdk.sim.Function"></a>

- *Implements:* @winglang/wingsdk.sim.IResource

**Inflight client:** [@winglang/wingsdk.sim.IFunctionClient](#@winglang/wingsdk.sim.IFunctionClient)

Simulator implementation of `cloud.Function`.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.sim.Function.Initializer"></a>

```typescript
import { sim } from '@winglang/wingsdk'

new sim.Function(scope: Construct, id: string, inflight: Inflight, props: FunctionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.sim.Function.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.sim.Function.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.sim.Function.Initializer.parameter.inflight">inflight</a></code> | <code>@winglang/wingsdk.core.Inflight</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.sim.Function.Initializer.parameter.props">props</a></code> | <code>@winglang/wingsdk.cloud.FunctionProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@winglang/wingsdk.sim.Function.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@winglang/wingsdk.sim.Function.Initializer.parameter.id"></a>

- *Type:* string

---

##### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/wingsdk.sim.Function.Initializer.parameter.inflight"></a>

- *Type:* @winglang/wingsdk.core.Inflight

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/wingsdk.sim.Function.Initializer.parameter.props"></a>

- *Type:* @winglang/wingsdk.cloud.FunctionProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.sim.Function.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/wingsdk.sim.Function.addEnvironment">addEnvironment</a></code> | Add an environment variable to the function. |

---

##### `toString` <a name="toString" id="@winglang/wingsdk.sim.Function.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addEnvironment` <a name="addEnvironment" id="@winglang/wingsdk.sim.Function.addEnvironment"></a>

```typescript
public addEnvironment(name: string, value: string): void
```

Add an environment variable to the function.

###### `name`<sup>Required</sup> <a name="name" id="@winglang/wingsdk.sim.Function.addEnvironment.parameter.name"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/wingsdk.sim.Function.addEnvironment.parameter.value"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.sim.Function.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@winglang/wingsdk.sim.Function.isConstruct"></a>

```typescript
import { sim } from '@winglang/wingsdk'

sim.Function.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.sim.Function.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.sim.Function.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.sim.Function.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.sim.Function.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/wingsdk.sim.Function.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### Function <a name="Function" id="@winglang/wingsdk.tfaws.Function"></a>

**Inflight client:** [@winglang/wingsdk.tfaws.IFunctionClient](#@winglang/wingsdk.tfaws.IFunctionClient)

AWS implementation of `cloud.Function`.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.tfaws.Function.Initializer"></a>

```typescript
import { tfaws } from '@winglang/wingsdk'

new tfaws.Function(scope: Construct, id: string, inflight: Inflight, props: FunctionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.tfaws.Function.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.tfaws.Function.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.tfaws.Function.Initializer.parameter.inflight">inflight</a></code> | <code>@winglang/wingsdk.core.Inflight</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.tfaws.Function.Initializer.parameter.props">props</a></code> | <code>@winglang/wingsdk.cloud.FunctionProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@winglang/wingsdk.tfaws.Function.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@winglang/wingsdk.tfaws.Function.Initializer.parameter.id"></a>

- *Type:* string

---

##### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/wingsdk.tfaws.Function.Initializer.parameter.inflight"></a>

- *Type:* @winglang/wingsdk.core.Inflight

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/wingsdk.tfaws.Function.Initializer.parameter.props"></a>

- *Type:* @winglang/wingsdk.cloud.FunctionProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.tfaws.Function.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/wingsdk.tfaws.Function.addEnvironment">addEnvironment</a></code> | Add an environment variable to the function. |
| <code><a href="#@winglang/wingsdk.tfaws.Function.addPolicyStatements">addPolicyStatements</a></code> | Add a policy statement to the Lambda role. |

---

##### `toString` <a name="toString" id="@winglang/wingsdk.tfaws.Function.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addEnvironment` <a name="addEnvironment" id="@winglang/wingsdk.tfaws.Function.addEnvironment"></a>

```typescript
public addEnvironment(name: string, value: string): void
```

Add an environment variable to the function.

###### `name`<sup>Required</sup> <a name="name" id="@winglang/wingsdk.tfaws.Function.addEnvironment.parameter.name"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/wingsdk.tfaws.Function.addEnvironment.parameter.value"></a>

- *Type:* string

---

##### `addPolicyStatements` <a name="addPolicyStatements" id="@winglang/wingsdk.tfaws.Function.addPolicyStatements"></a>

```typescript
public addPolicyStatements(statements: PolicyStatement): void
```

Add a policy statement to the Lambda role.

###### `statements`<sup>Required</sup> <a name="statements" id="@winglang/wingsdk.tfaws.Function.addPolicyStatements.parameter.statements"></a>

- *Type:* @winglang/wingsdk.tfaws.PolicyStatement

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.tfaws.Function.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@winglang/wingsdk.tfaws.Function.isConstruct"></a>

```typescript
import { tfaws } from '@winglang/wingsdk'

tfaws.Function.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.tfaws.Function.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.tfaws.Function.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.tfaws.Function.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.tfaws.Function.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/wingsdk.tfaws.Function.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### FunctionBase <a name="FunctionBase" id="@winglang/wingsdk.cloud.FunctionBase"></a>

Functionality shared between all `Function` implementations.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.cloud.FunctionBase.Initializer"></a>

```typescript
import { cloud } from '@winglang/wingsdk'

new cloud.FunctionBase(scope: Construct, id: string, inflight: Inflight, props: FunctionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.FunctionBase.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.cloud.FunctionBase.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.cloud.FunctionBase.Initializer.parameter.inflight">inflight</a></code> | <code>@winglang/wingsdk.core.Inflight</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.cloud.FunctionBase.Initializer.parameter.props">props</a></code> | <code>@winglang/wingsdk.cloud.FunctionProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@winglang/wingsdk.cloud.FunctionBase.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@winglang/wingsdk.cloud.FunctionBase.Initializer.parameter.id"></a>

- *Type:* string

---

##### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/wingsdk.cloud.FunctionBase.Initializer.parameter.inflight"></a>

- *Type:* @winglang/wingsdk.core.Inflight

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/wingsdk.cloud.FunctionBase.Initializer.parameter.props"></a>

- *Type:* @winglang/wingsdk.cloud.FunctionProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.FunctionBase.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/wingsdk.cloud.FunctionBase.addEnvironment">addEnvironment</a></code> | Add an environment variable to the function. |

---

##### `toString` <a name="toString" id="@winglang/wingsdk.cloud.FunctionBase.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addEnvironment` <a name="addEnvironment" id="@winglang/wingsdk.cloud.FunctionBase.addEnvironment"></a>

```typescript
public addEnvironment(key: string, value: string): void
```

Add an environment variable to the function.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/wingsdk.cloud.FunctionBase.addEnvironment.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/wingsdk.cloud.FunctionBase.addEnvironment.parameter.value"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.FunctionBase.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@winglang/wingsdk.cloud.FunctionBase.isConstruct"></a>

```typescript
import { cloud } from '@winglang/wingsdk'

cloud.FunctionBase.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.cloud.FunctionBase.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.FunctionBase.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.cloud.FunctionBase.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.cloud.FunctionBase.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/wingsdk.cloud.FunctionBase.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### JsonFile <a name="JsonFile" id="@winglang/wingsdk.fs.JsonFile"></a>

Represents a text file that should be synthesized in the app's outdir.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.fs.JsonFile.Initializer"></a>

```typescript
import { fs } from '@winglang/wingsdk'

new fs.JsonFile(scope: Construct, id: string, filePath: string, props: JsonFileProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.fs.JsonFile.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.fs.JsonFile.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.fs.JsonFile.Initializer.parameter.filePath">filePath</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.fs.JsonFile.Initializer.parameter.props">props</a></code> | <code>@winglang/wingsdk.fs.JsonFileProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@winglang/wingsdk.fs.JsonFile.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@winglang/wingsdk.fs.JsonFile.Initializer.parameter.id"></a>

- *Type:* string

---

##### `filePath`<sup>Required</sup> <a name="filePath" id="@winglang/wingsdk.fs.JsonFile.Initializer.parameter.filePath"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/wingsdk.fs.JsonFile.Initializer.parameter.props"></a>

- *Type:* @winglang/wingsdk.fs.JsonFileProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.fs.JsonFile.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/wingsdk.fs.JsonFile.save">save</a></code> | Render the contents of the file and save it to the user's file system. |

---

##### `toString` <a name="toString" id="@winglang/wingsdk.fs.JsonFile.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `save` <a name="save" id="@winglang/wingsdk.fs.JsonFile.save"></a>

```typescript
public save(outdir: string): void
```

Render the contents of the file and save it to the user's file system.

###### `outdir`<sup>Required</sup> <a name="outdir" id="@winglang/wingsdk.fs.JsonFile.save.parameter.outdir"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.fs.JsonFile.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@winglang/wingsdk.fs.JsonFile.isConstruct"></a>

```typescript
import { fs } from '@winglang/wingsdk'

fs.JsonFile.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.fs.JsonFile.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.fs.JsonFile.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.fs.JsonFile.property.filePath">filePath</a></code> | <code>string</code> | The file's relative path to the output directory. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.fs.JsonFile.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `filePath`<sup>Required</sup> <a name="filePath" id="@winglang/wingsdk.fs.JsonFile.property.filePath"></a>

```typescript
public readonly filePath: string;
```

- *Type:* string

The file's relative path to the output directory.

---


### Logger <a name="Logger" id="@winglang/wingsdk.cloud.Logger"></a>

**Inflight client:** [@winglang/wingsdk.cloud.ILoggerClient](#@winglang/wingsdk.cloud.ILoggerClient)

A cloud logging facility.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Logger.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/wingsdk.cloud.Logger.print">print</a></code> | Logs a message. |

---

##### `toString` <a name="toString" id="@winglang/wingsdk.cloud.Logger.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `print` <a name="print" id="@winglang/wingsdk.cloud.Logger.print"></a>

```typescript
public print(message: string): void
```

Logs a message.

###### `message`<sup>Required</sup> <a name="message" id="@winglang/wingsdk.cloud.Logger.print.parameter.message"></a>

- *Type:* string

The message to log.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Logger.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@winglang/wingsdk.cloud.Logger.of">of</a></code> | Returns the logger registered to the given scope, throwing an error if there is none. |
| <code><a href="#@winglang/wingsdk.cloud.Logger.register">register</a></code> | Create a logger and register it to the given scope. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@winglang/wingsdk.cloud.Logger.isConstruct"></a>

```typescript
import { cloud } from '@winglang/wingsdk'

cloud.Logger.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.cloud.Logger.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `of` <a name="of" id="@winglang/wingsdk.cloud.Logger.of"></a>

```typescript
import { cloud } from '@winglang/wingsdk'

cloud.Logger.of(scope: IConstruct)
```

Returns the logger registered to the given scope, throwing an error if there is none.

###### `scope`<sup>Required</sup> <a name="scope" id="@winglang/wingsdk.cloud.Logger.of.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

##### `register` <a name="register" id="@winglang/wingsdk.cloud.Logger.register"></a>

```typescript
import { cloud } from '@winglang/wingsdk'

cloud.Logger.register(scope: IConstruct)
```

Create a logger and register it to the given scope.

###### `scope`<sup>Required</sup> <a name="scope" id="@winglang/wingsdk.cloud.Logger.register.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Logger.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.cloud.Logger.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.cloud.Logger.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/wingsdk.cloud.Logger.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### Logger <a name="Logger" id="@winglang/wingsdk.sim.Logger"></a>

- *Implements:* @winglang/wingsdk.sim.IResource

**Inflight client:** [@winglang/wingsdk.sim.ILoggerClient](#@winglang/wingsdk.sim.ILoggerClient)

Simulator implementation of `cloud.Logger`.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.sim.Logger.Initializer"></a>

```typescript
import { sim } from '@winglang/wingsdk'

new sim.Logger(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.sim.Logger.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.sim.Logger.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@winglang/wingsdk.sim.Logger.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@winglang/wingsdk.sim.Logger.Initializer.parameter.id"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.sim.Logger.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/wingsdk.sim.Logger.print">print</a></code> | Logs a message. |

---

##### `toString` <a name="toString" id="@winglang/wingsdk.sim.Logger.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `print` <a name="print" id="@winglang/wingsdk.sim.Logger.print"></a>

```typescript
public print(message: string): void
```

Logs a message.

###### `message`<sup>Required</sup> <a name="message" id="@winglang/wingsdk.sim.Logger.print.parameter.message"></a>

- *Type:* string

The message to log.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.sim.Logger.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@winglang/wingsdk.sim.Logger.isConstruct"></a>

```typescript
import { sim } from '@winglang/wingsdk'

sim.Logger.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.sim.Logger.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.sim.Logger.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.sim.Logger.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.sim.Logger.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/wingsdk.sim.Logger.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### LoggerBase <a name="LoggerBase" id="@winglang/wingsdk.cloud.LoggerBase"></a>

Functionality shared between all `Logger` implementations.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.cloud.LoggerBase.Initializer"></a>

```typescript
import { cloud } from '@winglang/wingsdk'

new cloud.LoggerBase(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.LoggerBase.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The scope in which to define this construct. |
| <code><a href="#@winglang/wingsdk.cloud.LoggerBase.Initializer.parameter.id">id</a></code> | <code>string</code> | The scoped construct ID. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@winglang/wingsdk.cloud.LoggerBase.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The scope in which to define this construct.

---

##### `id`<sup>Required</sup> <a name="id" id="@winglang/wingsdk.cloud.LoggerBase.Initializer.parameter.id"></a>

- *Type:* string

The scoped construct ID.

Must be unique amongst siblings. If
the ID includes a path separator (`/`), then it will be replaced by double
dash `--`.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.LoggerBase.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/wingsdk.cloud.LoggerBase.print">print</a></code> | Logs a message. |

---

##### `toString` <a name="toString" id="@winglang/wingsdk.cloud.LoggerBase.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `print` <a name="print" id="@winglang/wingsdk.cloud.LoggerBase.print"></a>

```typescript
public print(message: string): void
```

Logs a message.

###### `message`<sup>Required</sup> <a name="message" id="@winglang/wingsdk.cloud.LoggerBase.print.parameter.message"></a>

- *Type:* string

The message to log.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.LoggerBase.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@winglang/wingsdk.cloud.LoggerBase.isConstruct"></a>

```typescript
import { cloud } from '@winglang/wingsdk'

cloud.LoggerBase.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.cloud.LoggerBase.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.LoggerBase.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.cloud.LoggerBase.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.cloud.LoggerBase.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/wingsdk.cloud.LoggerBase.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### Queue <a name="Queue" id="@winglang/wingsdk.cloud.Queue"></a>

**Inflight client:** [@winglang/wingsdk.cloud.IQueueClient](#@winglang/wingsdk.cloud.IQueueClient)

Represents a serverless queue.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.cloud.Queue.Initializer"></a>

```typescript
import { cloud } from '@winglang/wingsdk'

new cloud.Queue(scope: Construct, id: string, props?: QueueProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Queue.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.cloud.Queue.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.cloud.Queue.Initializer.parameter.props">props</a></code> | <code>@winglang/wingsdk.cloud.QueueProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@winglang/wingsdk.cloud.Queue.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@winglang/wingsdk.cloud.Queue.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/wingsdk.cloud.Queue.Initializer.parameter.props"></a>

- *Type:* @winglang/wingsdk.cloud.QueueProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Queue.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/wingsdk.cloud.Queue.onMessage">onMessage</a></code> | Create a function to consume messages from this queue. |

---

##### `toString` <a name="toString" id="@winglang/wingsdk.cloud.Queue.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `onMessage` <a name="onMessage" id="@winglang/wingsdk.cloud.Queue.onMessage"></a>

```typescript
public onMessage(inflight: Inflight, props?: QueueOnMessageProps): Function
```

Create a function to consume messages from this queue.

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/wingsdk.cloud.Queue.onMessage.parameter.inflight"></a>

- *Type:* @winglang/wingsdk.core.Inflight

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/wingsdk.cloud.Queue.onMessage.parameter.props"></a>

- *Type:* @winglang/wingsdk.cloud.QueueOnMessageProps

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Queue.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@winglang/wingsdk.cloud.Queue.isConstruct"></a>

```typescript
import { cloud } from '@winglang/wingsdk'

cloud.Queue.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.cloud.Queue.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Queue.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.cloud.Queue.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.cloud.Queue.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/wingsdk.cloud.Queue.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### Queue <a name="Queue" id="@winglang/wingsdk.sim.Queue"></a>

- *Implements:* @winglang/wingsdk.sim.IResource

**Inflight client:** [@winglang/wingsdk.sim.IQueueClient](#@winglang/wingsdk.sim.IQueueClient)

Simulator implementation of `cloud.Queue`.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.sim.Queue.Initializer"></a>

```typescript
import { sim } from '@winglang/wingsdk'

new sim.Queue(scope: Construct, id: string, props?: QueueProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.sim.Queue.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.sim.Queue.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.sim.Queue.Initializer.parameter.props">props</a></code> | <code>@winglang/wingsdk.cloud.QueueProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@winglang/wingsdk.sim.Queue.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@winglang/wingsdk.sim.Queue.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/wingsdk.sim.Queue.Initializer.parameter.props"></a>

- *Type:* @winglang/wingsdk.cloud.QueueProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.sim.Queue.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/wingsdk.sim.Queue.onMessage">onMessage</a></code> | Create a function to consume messages from this queue. |

---

##### `toString` <a name="toString" id="@winglang/wingsdk.sim.Queue.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `onMessage` <a name="onMessage" id="@winglang/wingsdk.sim.Queue.onMessage"></a>

```typescript
public onMessage(inflight: Inflight, props?: QueueOnMessageProps): Function
```

Create a function to consume messages from this queue.

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/wingsdk.sim.Queue.onMessage.parameter.inflight"></a>

- *Type:* @winglang/wingsdk.core.Inflight

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/wingsdk.sim.Queue.onMessage.parameter.props"></a>

- *Type:* @winglang/wingsdk.cloud.QueueOnMessageProps

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.sim.Queue.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@winglang/wingsdk.sim.Queue.isConstruct"></a>

```typescript
import { sim } from '@winglang/wingsdk'

sim.Queue.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.sim.Queue.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.sim.Queue.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.sim.Queue.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.sim.Queue.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/wingsdk.sim.Queue.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### Queue <a name="Queue" id="@winglang/wingsdk.tfaws.Queue"></a>

**Inflight client:** [@winglang/wingsdk.tfaws.IQueueClient](#@winglang/wingsdk.tfaws.IQueueClient)

AWS implementation of `cloud.Queue`.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.tfaws.Queue.Initializer"></a>

```typescript
import { tfaws } from '@winglang/wingsdk'

new tfaws.Queue(scope: Construct, id: string, props?: QueueProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.tfaws.Queue.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.tfaws.Queue.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.tfaws.Queue.Initializer.parameter.props">props</a></code> | <code>@winglang/wingsdk.cloud.QueueProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@winglang/wingsdk.tfaws.Queue.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@winglang/wingsdk.tfaws.Queue.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/wingsdk.tfaws.Queue.Initializer.parameter.props"></a>

- *Type:* @winglang/wingsdk.cloud.QueueProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.tfaws.Queue.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/wingsdk.tfaws.Queue.onMessage">onMessage</a></code> | Create a function to consume messages from this queue. |

---

##### `toString` <a name="toString" id="@winglang/wingsdk.tfaws.Queue.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `onMessage` <a name="onMessage" id="@winglang/wingsdk.tfaws.Queue.onMessage"></a>

```typescript
public onMessage(inflight: Inflight, props?: QueueOnMessageProps): Function
```

Create a function to consume messages from this queue.

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/wingsdk.tfaws.Queue.onMessage.parameter.inflight"></a>

- *Type:* @winglang/wingsdk.core.Inflight

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/wingsdk.tfaws.Queue.onMessage.parameter.props"></a>

- *Type:* @winglang/wingsdk.cloud.QueueOnMessageProps

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.tfaws.Queue.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@winglang/wingsdk.tfaws.Queue.isConstruct"></a>

```typescript
import { tfaws } from '@winglang/wingsdk'

tfaws.Queue.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.tfaws.Queue.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.tfaws.Queue.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.tfaws.Queue.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.tfaws.Queue.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/wingsdk.tfaws.Queue.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### QueueBase <a name="QueueBase" id="@winglang/wingsdk.cloud.QueueBase"></a>

Functionality shared between all `Queue` implementations.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.cloud.QueueBase.Initializer"></a>

```typescript
import { cloud } from '@winglang/wingsdk'

new cloud.QueueBase(scope: Construct, id: string, props?: QueueProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.QueueBase.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.cloud.QueueBase.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.cloud.QueueBase.Initializer.parameter.props">props</a></code> | <code>@winglang/wingsdk.cloud.QueueProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@winglang/wingsdk.cloud.QueueBase.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@winglang/wingsdk.cloud.QueueBase.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/wingsdk.cloud.QueueBase.Initializer.parameter.props"></a>

- *Type:* @winglang/wingsdk.cloud.QueueProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.QueueBase.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/wingsdk.cloud.QueueBase.onMessage">onMessage</a></code> | Create a function to consume messages from this queue. |

---

##### `toString` <a name="toString" id="@winglang/wingsdk.cloud.QueueBase.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `onMessage` <a name="onMessage" id="@winglang/wingsdk.cloud.QueueBase.onMessage"></a>

```typescript
public onMessage(inflight: Inflight, props?: QueueOnMessageProps): Function
```

Create a function to consume messages from this queue.

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/wingsdk.cloud.QueueBase.onMessage.parameter.inflight"></a>

- *Type:* @winglang/wingsdk.core.Inflight

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/wingsdk.cloud.QueueBase.onMessage.parameter.props"></a>

- *Type:* @winglang/wingsdk.cloud.QueueOnMessageProps

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.QueueBase.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@winglang/wingsdk.cloud.QueueBase.isConstruct"></a>

```typescript
import { cloud } from '@winglang/wingsdk'

cloud.QueueBase.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.cloud.QueueBase.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.QueueBase.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.cloud.QueueBase.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.cloud.QueueBase.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/wingsdk.cloud.QueueBase.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### Resource <a name="Resource" id="@winglang/wingsdk.cloud.Resource"></a>

- *Implements:* @winglang/wingsdk.core.ICapturable

Shared behavior between all Wing SDK resources.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.cloud.Resource.Initializer"></a>

```typescript
import { cloud } from '@winglang/wingsdk'

new cloud.Resource(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Resource.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The scope in which to define this construct. |
| <code><a href="#@winglang/wingsdk.cloud.Resource.Initializer.parameter.id">id</a></code> | <code>string</code> | The scoped construct ID. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@winglang/wingsdk.cloud.Resource.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The scope in which to define this construct.

---

##### `id`<sup>Required</sup> <a name="id" id="@winglang/wingsdk.cloud.Resource.Initializer.parameter.id"></a>

- *Type:* string

The scoped construct ID.

Must be unique amongst siblings. If
the ID includes a path separator (`/`), then it will be replaced by double
dash `--`.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Resource.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@winglang/wingsdk.cloud.Resource.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Resource.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@winglang/wingsdk.cloud.Resource.isConstruct"></a>

```typescript
import { cloud } from '@winglang/wingsdk'

cloud.Resource.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.cloud.Resource.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Resource.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.cloud.Resource.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.cloud.Resource.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/wingsdk.cloud.Resource.property.stateful"></a>

```typescript
public readonly stateful: boolean;
```

- *Type:* boolean

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### TextFile <a name="TextFile" id="@winglang/wingsdk.fs.TextFile"></a>

Represents a text file that should be synthesized in the app's outdir.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.fs.TextFile.Initializer"></a>

```typescript
import { fs } from '@winglang/wingsdk'

new fs.TextFile(scope: Construct, id: string, filePath: string, props?: TextFileProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.fs.TextFile.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.fs.TextFile.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.fs.TextFile.Initializer.parameter.filePath">filePath</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.fs.TextFile.Initializer.parameter.props">props</a></code> | <code>@winglang/wingsdk.fs.TextFileProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@winglang/wingsdk.fs.TextFile.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@winglang/wingsdk.fs.TextFile.Initializer.parameter.id"></a>

- *Type:* string

---

##### `filePath`<sup>Required</sup> <a name="filePath" id="@winglang/wingsdk.fs.TextFile.Initializer.parameter.filePath"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/wingsdk.fs.TextFile.Initializer.parameter.props"></a>

- *Type:* @winglang/wingsdk.fs.TextFileProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.fs.TextFile.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/wingsdk.fs.TextFile.save">save</a></code> | Render the contents of the file and save it to the user's file system. |
| <code><a href="#@winglang/wingsdk.fs.TextFile.addLine">addLine</a></code> | Append a line to the text file's contents. |

---

##### `toString` <a name="toString" id="@winglang/wingsdk.fs.TextFile.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `save` <a name="save" id="@winglang/wingsdk.fs.TextFile.save"></a>

```typescript
public save(outdir: string): void
```

Render the contents of the file and save it to the user's file system.

###### `outdir`<sup>Required</sup> <a name="outdir" id="@winglang/wingsdk.fs.TextFile.save.parameter.outdir"></a>

- *Type:* string

---

##### `addLine` <a name="addLine" id="@winglang/wingsdk.fs.TextFile.addLine"></a>

```typescript
public addLine(line: string): void
```

Append a line to the text file's contents.

###### `line`<sup>Required</sup> <a name="line" id="@winglang/wingsdk.fs.TextFile.addLine.parameter.line"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.fs.TextFile.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@winglang/wingsdk.fs.TextFile.isConstruct"></a>

```typescript
import { fs } from '@winglang/wingsdk'

fs.TextFile.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.fs.TextFile.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.fs.TextFile.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.fs.TextFile.property.filePath">filePath</a></code> | <code>string</code> | The file's relative path to the output directory. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.fs.TextFile.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `filePath`<sup>Required</sup> <a name="filePath" id="@winglang/wingsdk.fs.TextFile.property.filePath"></a>

```typescript
public readonly filePath: string;
```

- *Type:* string

The file's relative path to the output directory.

---


## Structs <a name="Structs" id="Structs"></a>

### AddLogProps <a name="AddLogProps" id="@winglang/wingsdk.testing.AddLogProps"></a>

Props for `ISimulatorContext.addLog`.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.testing.AddLogProps.Initializer"></a>

```typescript
import { testing } from '@winglang/wingsdk'

const addLogProps: testing.AddLogProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.testing.AddLogProps.property.message">message</a></code> | <code>string</code> | A message logged by the application. |
| <code><a href="#@winglang/wingsdk.testing.AddLogProps.property.resourcePath">resourcePath</a></code> | <code>string</code> | An optional resource path. |

---

##### `message`<sup>Required</sup> <a name="message" id="@winglang/wingsdk.testing.AddLogProps.property.message"></a>

```typescript
public readonly message: string;
```

- *Type:* string

A message logged by the application.

---

##### `resourcePath`<sup>Optional</sup> <a name="resourcePath" id="@winglang/wingsdk.testing.AddLogProps.property.resourcePath"></a>

```typescript
public readonly resourcePath: string;
```

- *Type:* string
- *Default:* the path of the resource that called `addLog`

An optional resource path.

This is needed in cases where a logging resource
operates on behalf of other resources.

---

### AddTraceProps <a name="AddTraceProps" id="@winglang/wingsdk.testing.AddTraceProps"></a>

Props for `ISimulatorContext.addTrace`.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.testing.AddTraceProps.Initializer"></a>

```typescript
import { testing } from '@winglang/wingsdk'

const addTraceProps: testing.AddTraceProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.testing.AddTraceProps.property.message">message</a></code> | <code>string</code> | A message specified by the resource. |

---

##### `message`<sup>Required</sup> <a name="message" id="@winglang/wingsdk.testing.AddTraceProps.property.message"></a>

```typescript
public readonly message: string;
```

- *Type:* string

A message specified by the resource.

---

### AppProps <a name="AppProps" id="@winglang/wingsdk.sim.AppProps"></a>

Props for `App`.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.sim.AppProps.Initializer"></a>

```typescript
import { sim } from '@winglang/wingsdk'

const appProps: sim.AppProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.sim.AppProps.property.customFactory">customFactory</a></code> | <code>@winglang/polycons.IPolyconFactory</code> | A custom factory to resolve polycons. |
| <code><a href="#@winglang/wingsdk.sim.AppProps.property.outdir">outdir</a></code> | <code>string</code> | Directory where artifacts are synthesized to. |

---

##### `customFactory`<sup>Optional</sup> <a name="customFactory" id="@winglang/wingsdk.sim.AppProps.property.customFactory"></a>

```typescript
public readonly customFactory: IPolyconFactory;
```

- *Type:* @winglang/polycons.IPolyconFactory
- *Default:* use the default polycon factory included in the Wing SDK

A custom factory to resolve polycons.

---

##### `outdir`<sup>Optional</sup> <a name="outdir" id="@winglang/wingsdk.sim.AppProps.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string
- *Default:* current working directory

Directory where artifacts are synthesized to.

---

### AppProps <a name="AppProps" id="@winglang/wingsdk.tfaws.AppProps"></a>

Props for `App`.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.tfaws.AppProps.Initializer"></a>

```typescript
import { tfaws } from '@winglang/wingsdk'

const appProps: tfaws.AppProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.tfaws.AppProps.property.customFactory">customFactory</a></code> | <code>@winglang/polycons.IPolyconFactory</code> | A custom factory to resolve polycons. |
| <code><a href="#@winglang/wingsdk.tfaws.AppProps.property.outdir">outdir</a></code> | <code>string</code> | Directory where artifacts are synthesized to. |
| <code><a href="#@winglang/wingsdk.tfaws.AppProps.property.stateFile">stateFile</a></code> | <code>string</code> | The path to a state file which will track all synthesized files. |

---

##### `customFactory`<sup>Optional</sup> <a name="customFactory" id="@winglang/wingsdk.tfaws.AppProps.property.customFactory"></a>

```typescript
public readonly customFactory: IPolyconFactory;
```

- *Type:* @winglang/polycons.IPolyconFactory
- *Default:* use the default polycon factory included in the Wing SDK

A custom factory to resolve polycons.

---

##### `outdir`<sup>Optional</sup> <a name="outdir" id="@winglang/wingsdk.tfaws.AppProps.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string
- *Default:* current working directory

Directory where artifacts are synthesized to.

---

##### `stateFile`<sup>Optional</sup> <a name="stateFile" id="@winglang/wingsdk.tfaws.AppProps.property.stateFile"></a>

```typescript
public readonly stateFile: string;
```

- *Type:* string
- *Default:* no state file

The path to a state file which will track all synthesized files.

If a
statefile is not specified, we won't be able to remove extrenous files.

---

### BaseResourceAttributes <a name="BaseResourceAttributes" id="@winglang/wingsdk.sim.BaseResourceAttributes"></a>

Schema for resource attributes.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.sim.BaseResourceAttributes.Initializer"></a>

```typescript
import { sim } from '@winglang/wingsdk'

const baseResourceAttributes: sim.BaseResourceAttributes = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.sim.BaseResourceAttributes.property.handle">handle</a></code> | <code>string</code> | The resource's simulator-unique id. |

---

##### `handle`<sup>Required</sup> <a name="handle" id="@winglang/wingsdk.sim.BaseResourceAttributes.property.handle"></a>

```typescript
public readonly handle: string;
```

- *Type:* string

The resource's simulator-unique id.

---

### BaseResourceSchema <a name="BaseResourceSchema" id="@winglang/wingsdk.sim.BaseResourceSchema"></a>

Schema for individual resources.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.sim.BaseResourceSchema.Initializer"></a>

```typescript
import { sim } from '@winglang/wingsdk'

const baseResourceSchema: sim.BaseResourceSchema = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.sim.BaseResourceSchema.property.type">type</a></code> | <code>string</code> | The type of the resource. |
| <code><a href="#@winglang/wingsdk.sim.BaseResourceSchema.property.attrs">attrs</a></code> | <code>@winglang/wingsdk.sim.BaseResourceAttributes</code> | The resource-specific attributes that are set after the resource is created. |
| <code><a href="#@winglang/wingsdk.sim.BaseResourceSchema.property.children">children</a></code> | <code>{[ key: string ]: @winglang/wingsdk.sim.BaseResourceSchema}</code> | The resource's children indexed by their IDs. |
| <code><a href="#@winglang/wingsdk.sim.BaseResourceSchema.property.inbound">inbound</a></code> | <code>string[]</code> | IDs of resources that this resource is called, triggered, or referenced by. |
| <code><a href="#@winglang/wingsdk.sim.BaseResourceSchema.property.outbound">outbound</a></code> | <code>string[]</code> | IDs of resources that this resource calls, triggers, or references. |
| <code><a href="#@winglang/wingsdk.sim.BaseResourceSchema.property.path">path</a></code> | <code>string</code> | The full path of the resource in the construct tree. |
| <code><a href="#@winglang/wingsdk.sim.BaseResourceSchema.property.props">props</a></code> | <code>{[ key: string ]: any}</code> | The resource-specific properties needed to create this resource. |

---

##### `type`<sup>Required</sup> <a name="type" id="@winglang/wingsdk.sim.BaseResourceSchema.property.type"></a>

```typescript
public readonly type: string;
```

- *Type:* string

The type of the resource.

---

##### `attrs`<sup>Optional</sup> <a name="attrs" id="@winglang/wingsdk.sim.BaseResourceSchema.property.attrs"></a>

```typescript
public readonly attrs: BaseResourceAttributes;
```

- *Type:* @winglang/wingsdk.sim.BaseResourceAttributes

The resource-specific attributes that are set after the resource is created.

---

##### `children`<sup>Optional</sup> <a name="children" id="@winglang/wingsdk.sim.BaseResourceSchema.property.children"></a>

```typescript
public readonly children: {[ key: string ]: BaseResourceSchema};
```

- *Type:* {[ key: string ]: @winglang/wingsdk.sim.BaseResourceSchema}

The resource's children indexed by their IDs.

---

##### `inbound`<sup>Optional</sup> <a name="inbound" id="@winglang/wingsdk.sim.BaseResourceSchema.property.inbound"></a>

```typescript
public readonly inbound: string[];
```

- *Type:* string[]

IDs of resources that this resource is called, triggered, or referenced by.

---

##### `outbound`<sup>Optional</sup> <a name="outbound" id="@winglang/wingsdk.sim.BaseResourceSchema.property.outbound"></a>

```typescript
public readonly outbound: string[];
```

- *Type:* string[]

IDs of resources that this resource calls, triggers, or references.

---

##### `path`<sup>Optional</sup> <a name="path" id="@winglang/wingsdk.sim.BaseResourceSchema.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

The full path of the resource in the construct tree.

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/wingsdk.sim.BaseResourceSchema.property.props"></a>

```typescript
public readonly props: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

The resource-specific properties needed to create this resource.

---

### BucketProps <a name="BucketProps" id="@winglang/wingsdk.cloud.BucketProps"></a>

Properties for `Bucket`.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.cloud.BucketProps.Initializer"></a>

```typescript
import { cloud } from '@winglang/wingsdk'

const bucketProps: cloud.BucketProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.BucketProps.property.public">public</a></code> | <code>boolean</code> | Whether the bucket's objects should be publicly accessible. |

---

##### `public`<sup>Optional</sup> <a name="public" id="@winglang/wingsdk.cloud.BucketProps.property.public"></a>

```typescript
public readonly public: boolean;
```

- *Type:* boolean
- *Default:* false

Whether the bucket's objects should be publicly accessible.

---

### Capture <a name="Capture" id="@winglang/wingsdk.core.Capture"></a>

Capture information.

A capture is a reference from an Inflight to a
construction-time resource or value. Either the "resource" or "value" field
will be set, but not both.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.core.Capture.Initializer"></a>

```typescript
import { core } from '@winglang/wingsdk'

const capture: core.Capture = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.Capture.property.methods">methods</a></code> | <code>string[]</code> | Which methods are called on the captured resource. |
| <code><a href="#@winglang/wingsdk.core.Capture.property.resource">resource</a></code> | <code>@winglang/wingsdk.core.ICapturableConstruct</code> | A captured resource. |
| <code><a href="#@winglang/wingsdk.core.Capture.property.value">value</a></code> | <code>any</code> | A captured immutable value (like string, number, boolean, a struct, or null). |

---

##### `methods`<sup>Optional</sup> <a name="methods" id="@winglang/wingsdk.core.Capture.property.methods"></a>

```typescript
public readonly methods: string[];
```

- *Type:* string[]

Which methods are called on the captured resource.

---

##### `resource`<sup>Optional</sup> <a name="resource" id="@winglang/wingsdk.core.Capture.property.resource"></a>

```typescript
public readonly resource: ICapturableConstruct;
```

- *Type:* @winglang/wingsdk.core.ICapturableConstruct

A captured resource.

---

##### `value`<sup>Optional</sup> <a name="value" id="@winglang/wingsdk.core.Capture.property.value"></a>

```typescript
public readonly value: any;
```

- *Type:* any

A captured immutable value (like string, number, boolean, a struct, or null).

---

### CaptureMetadata <a name="CaptureMetadata" id="@winglang/wingsdk.core.CaptureMetadata"></a>

Extra metadata associated with a captured resource.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.core.CaptureMetadata.Initializer"></a>

```typescript
import { core } from '@winglang/wingsdk'

const captureMetadata: core.CaptureMetadata = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.CaptureMetadata.property.methods">methods</a></code> | <code>string[]</code> | Which methods are called on the captured resource. |

---

##### `methods`<sup>Optional</sup> <a name="methods" id="@winglang/wingsdk.core.CaptureMetadata.property.methods"></a>

```typescript
public readonly methods: string[];
```

- *Type:* string[]

Which methods are called on the captured resource.

---

### FilesProps <a name="FilesProps" id="@winglang/wingsdk.core.FilesProps"></a>

Props for `Files`.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.core.FilesProps.Initializer"></a>

```typescript
import { core } from '@winglang/wingsdk'

const filesProps: core.FilesProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.FilesProps.property.app">app</a></code> | <code>@winglang/wingsdk.core.IApp</code> | The app with files to synthesize. |
| <code><a href="#@winglang/wingsdk.core.FilesProps.property.stateFile">stateFile</a></code> | <code>string</code> | The path to a state file which will track all synthesized files. |

---

##### `app`<sup>Required</sup> <a name="app" id="@winglang/wingsdk.core.FilesProps.property.app"></a>

```typescript
public readonly app: IApp;
```

- *Type:* @winglang/wingsdk.core.IApp

The app with files to synthesize.

---

##### `stateFile`<sup>Optional</sup> <a name="stateFile" id="@winglang/wingsdk.core.FilesProps.property.stateFile"></a>

```typescript
public readonly stateFile: string;
```

- *Type:* string
- *Default:* no state file

The path to a state file which will track all synthesized files.

If a
statefile is not specified, we won't be able to remove extrenous files.

---

### FunctionProps <a name="FunctionProps" id="@winglang/wingsdk.cloud.FunctionProps"></a>

Properties for `Function`.

This is the type users see when constructing a cloud.Function instance.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.cloud.FunctionProps.Initializer"></a>

```typescript
import { cloud } from '@winglang/wingsdk'

const functionProps: cloud.FunctionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.FunctionProps.property.env">env</a></code> | <code>{[ key: string ]: string}</code> | Environment variables to pass to the function. |

---

##### `env`<sup>Optional</sup> <a name="env" id="@winglang/wingsdk.cloud.FunctionProps.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* No environment variables.

Environment variables to pass to the function.

---

### InflightBundleOptions <a name="InflightBundleOptions" id="@winglang/wingsdk.core.InflightBundleOptions"></a>

Options for `Inflight.bundle`.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.core.InflightBundleOptions.Initializer"></a>

```typescript
import { core } from '@winglang/wingsdk'

const inflightBundleOptions: core.InflightBundleOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.InflightBundleOptions.property.captureClients">captureClients</a></code> | <code>{[ key: string ]: @winglang/wingsdk.core.Code}</code> | A map of capture clients that can be bundled with the Inflight's code. |
| <code><a href="#@winglang/wingsdk.core.InflightBundleOptions.property.captureScope">captureScope</a></code> | <code>constructs.IConstruct</code> | Associate the inflight bundle with a given capture scope. |
| <code><a href="#@winglang/wingsdk.core.InflightBundleOptions.property.external">external</a></code> | <code>string[]</code> | List of dependencies to exclude from the bundle. |

---

##### `captureClients`<sup>Required</sup> <a name="captureClients" id="@winglang/wingsdk.core.InflightBundleOptions.property.captureClients"></a>

```typescript
public readonly captureClients: {[ key: string ]: Code};
```

- *Type:* {[ key: string ]: @winglang/wingsdk.core.Code}

A map of capture clients that can be bundled with the Inflight's code.

---

##### `captureScope`<sup>Optional</sup> <a name="captureScope" id="@winglang/wingsdk.core.InflightBundleOptions.property.captureScope"></a>

```typescript
public readonly captureScope: IConstruct;
```

- *Type:* constructs.IConstruct

Associate the inflight bundle with a given capture scope.

---

##### `external`<sup>Optional</sup> <a name="external" id="@winglang/wingsdk.core.InflightBundleOptions.property.external"></a>

```typescript
public readonly external: string[];
```

- *Type:* string[]

List of dependencies to exclude from the bundle.

---

### InflightProps <a name="InflightProps" id="@winglang/wingsdk.core.InflightProps"></a>

Options for `Inflight`.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.core.InflightProps.Initializer"></a>

```typescript
import { core } from '@winglang/wingsdk'

const inflightProps: core.InflightProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.InflightProps.property.code">code</a></code> | <code>@winglang/wingsdk.core.Code</code> | Reference to code containing the entrypoint function. |
| <code><a href="#@winglang/wingsdk.core.InflightProps.property.entrypoint">entrypoint</a></code> | <code>string</code> | Name of the exported function to run. |
| <code><a href="#@winglang/wingsdk.core.InflightProps.property.captures">captures</a></code> | <code>{[ key: string ]: @winglang/wingsdk.core.Capture}</code> | Capture information. |

---

##### `code`<sup>Required</sup> <a name="code" id="@winglang/wingsdk.core.InflightProps.property.code"></a>

```typescript
public readonly code: Code;
```

- *Type:* @winglang/wingsdk.core.Code

Reference to code containing the entrypoint function.

---

##### `entrypoint`<sup>Required</sup> <a name="entrypoint" id="@winglang/wingsdk.core.InflightProps.property.entrypoint"></a>

```typescript
public readonly entrypoint: string;
```

- *Type:* string

Name of the exported function to run.

---

*Example*

```typescript
"exports.handler"
```


##### `captures`<sup>Optional</sup> <a name="captures" id="@winglang/wingsdk.core.InflightProps.property.captures"></a>

```typescript
public readonly captures: {[ key: string ]: Capture};
```

- *Type:* {[ key: string ]: @winglang/wingsdk.core.Capture}
- *Default:* No captures

Capture information.

During runtime, a map containing all captured values
will be passed as the first argument of the entrypoint function.

Each key here will be the key for the final value in the map.

---

### JsonFileProps <a name="JsonFileProps" id="@winglang/wingsdk.fs.JsonFileProps"></a>

Props for `JsonFile`.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.fs.JsonFileProps.Initializer"></a>

```typescript
import { fs } from '@winglang/wingsdk'

const jsonFileProps: fs.JsonFileProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.fs.JsonFileProps.property.obj">obj</a></code> | <code>any</code> | The object that will be serialized into the file during synthesis. |

---

##### `obj`<sup>Required</sup> <a name="obj" id="@winglang/wingsdk.fs.JsonFileProps.property.obj"></a>

```typescript
public readonly obj: any;
```

- *Type:* any

The object that will be serialized into the file during synthesis.

---

### LogEvent <a name="LogEvent" id="@winglang/wingsdk.cloud.LogEvent"></a>

Represents a log event.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.cloud.LogEvent.Initializer"></a>

```typescript
import { cloud } from '@winglang/wingsdk'

const logEvent: cloud.LogEvent = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.LogEvent.property.message">message</a></code> | <code>string</code> | The log message. |
| <code><a href="#@winglang/wingsdk.cloud.LogEvent.property.timestamp">timestamp</a></code> | <code>number</code> | The log timestamp, in milliseconds since the epoch. |

---

##### `message`<sup>Required</sup> <a name="message" id="@winglang/wingsdk.cloud.LogEvent.property.message"></a>

```typescript
public readonly message: string;
```

- *Type:* string

The log message.

---

##### `timestamp`<sup>Required</sup> <a name="timestamp" id="@winglang/wingsdk.cloud.LogEvent.property.timestamp"></a>

```typescript
public readonly timestamp: number;
```

- *Type:* number

The log timestamp, in milliseconds since the epoch.

---

### PolicyStatement <a name="PolicyStatement" id="@winglang/wingsdk.tfaws.PolicyStatement"></a>

AWS IAM Policy Statement.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.tfaws.PolicyStatement.Initializer"></a>

```typescript
import { tfaws } from '@winglang/wingsdk'

const policyStatement: tfaws.PolicyStatement = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.tfaws.PolicyStatement.property.action">action</a></code> | <code>string[]</code> | Actions. |
| <code><a href="#@winglang/wingsdk.tfaws.PolicyStatement.property.effect">effect</a></code> | <code>string</code> | Effect ("Allow" or "Deny"). |
| <code><a href="#@winglang/wingsdk.tfaws.PolicyStatement.property.resource">resource</a></code> | <code>string \| string[]</code> | Resources. |

---

##### `action`<sup>Optional</sup> <a name="action" id="@winglang/wingsdk.tfaws.PolicyStatement.property.action"></a>

```typescript
public readonly action: string[];
```

- *Type:* string[]

Actions.

---

##### `effect`<sup>Optional</sup> <a name="effect" id="@winglang/wingsdk.tfaws.PolicyStatement.property.effect"></a>

```typescript
public readonly effect: string;
```

- *Type:* string

Effect ("Allow" or "Deny").

---

##### `resource`<sup>Optional</sup> <a name="resource" id="@winglang/wingsdk.tfaws.PolicyStatement.property.resource"></a>

```typescript
public readonly resource: string | string[];
```

- *Type:* string | string[]

Resources.

---

### QueueOnMessageProps <a name="QueueOnMessageProps" id="@winglang/wingsdk.cloud.QueueOnMessageProps"></a>

Options for Queue.onMessage.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.cloud.QueueOnMessageProps.Initializer"></a>

```typescript
import { cloud } from '@winglang/wingsdk'

const queueOnMessageProps: cloud.QueueOnMessageProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.QueueOnMessageProps.property.env">env</a></code> | <code>{[ key: string ]: string}</code> | Environment variables to pass to the function. |
| <code><a href="#@winglang/wingsdk.cloud.QueueOnMessageProps.property.batchSize">batchSize</a></code> | <code>number</code> | The maximum number of messages to send to subscribers at once. |

---

##### `env`<sup>Optional</sup> <a name="env" id="@winglang/wingsdk.cloud.QueueOnMessageProps.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* No environment variables.

Environment variables to pass to the function.

---

##### `batchSize`<sup>Optional</sup> <a name="batchSize" id="@winglang/wingsdk.cloud.QueueOnMessageProps.property.batchSize"></a>

```typescript
public readonly batchSize: number;
```

- *Type:* number
- *Default:* 1

The maximum number of messages to send to subscribers at once.

---

### QueueProps <a name="QueueProps" id="@winglang/wingsdk.cloud.QueueProps"></a>

Properties for `Queue`.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.cloud.QueueProps.Initializer"></a>

```typescript
import { cloud } from '@winglang/wingsdk'

const queueProps: cloud.QueueProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.QueueProps.property.initialMessages">initialMessages</a></code> | <code>string[]</code> | Initialize the queue with a set of messages. |
| <code><a href="#@winglang/wingsdk.cloud.QueueProps.property.timeout">timeout</a></code> | <code>@winglang/wingsdk.core.Duration</code> | How long a queue's consumers have to process a message. |

---

##### `initialMessages`<sup>Optional</sup> <a name="initialMessages" id="@winglang/wingsdk.cloud.QueueProps.property.initialMessages"></a>

```typescript
public readonly initialMessages: string[];
```

- *Type:* string[]
- *Default:* []

Initialize the queue with a set of messages.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/wingsdk.cloud.QueueProps.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* @winglang/wingsdk.core.Duration
- *Default:* Duration.fromSeconds(10)

How long a queue's consumers have to process a message.

---

### SimulatorEvent <a name="SimulatorEvent" id="@winglang/wingsdk.testing.SimulatorEvent"></a>

Represents an event logged during simulation.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.testing.SimulatorEvent.Initializer"></a>

```typescript
import { testing } from '@winglang/wingsdk'

const simulatorEvent: testing.SimulatorEvent = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.testing.SimulatorEvent.property.message">message</a></code> | <code>string</code> | A message associated with the event. |
| <code><a href="#@winglang/wingsdk.testing.SimulatorEvent.property.resourcePath">resourcePath</a></code> | <code>string</code> | The resource that generated the event. |
| <code><a href="#@winglang/wingsdk.testing.SimulatorEvent.property.timestamp">timestamp</a></code> | <code>number</code> | The timestamp of the event, in milliseconds since the epoch. |
| <code><a href="#@winglang/wingsdk.testing.SimulatorEvent.property.type">type</a></code> | <code>string</code> | The event type - either "trace" or "log". |

---

##### `message`<sup>Required</sup> <a name="message" id="@winglang/wingsdk.testing.SimulatorEvent.property.message"></a>

```typescript
public readonly message: string;
```

- *Type:* string

A message associated with the event.

---

##### `resourcePath`<sup>Required</sup> <a name="resourcePath" id="@winglang/wingsdk.testing.SimulatorEvent.property.resourcePath"></a>

```typescript
public readonly resourcePath: string;
```

- *Type:* string

The resource that generated the event.

---

##### `timestamp`<sup>Required</sup> <a name="timestamp" id="@winglang/wingsdk.testing.SimulatorEvent.property.timestamp"></a>

```typescript
public readonly timestamp: number;
```

- *Type:* number

The timestamp of the event, in milliseconds since the epoch.

---

##### `type`<sup>Required</sup> <a name="type" id="@winglang/wingsdk.testing.SimulatorEvent.property.type"></a>

```typescript
public readonly type: string;
```

- *Type:* string

The event type - either "trace" or "log".

Trace events are for breadcrumbs of information about resource operations
that occurred during simulation, useful for understanding how resources
interact.

Log events are for information the user adds within their inflight code,
useful for understanding application logic.

---

### SimulatorProps <a name="SimulatorProps" id="@winglang/wingsdk.testing.SimulatorProps"></a>

Props for `Simulator`.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.testing.SimulatorProps.Initializer"></a>

```typescript
import { testing } from '@winglang/wingsdk'

const simulatorProps: testing.SimulatorProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.testing.SimulatorProps.property.simfile">simfile</a></code> | <code>string</code> | Path to a Wing simulator file (.wx). |
| <code><a href="#@winglang/wingsdk.testing.SimulatorProps.property.factory">factory</a></code> | <code>@winglang/wingsdk.testing.ISimulatorFactory</code> | The factory that produces resource simulations. |

---

##### `simfile`<sup>Required</sup> <a name="simfile" id="@winglang/wingsdk.testing.SimulatorProps.property.simfile"></a>

```typescript
public readonly simfile: string;
```

- *Type:* string

Path to a Wing simulator file (.wx).

---

##### `factory`<sup>Optional</sup> <a name="factory" id="@winglang/wingsdk.testing.SimulatorProps.property.factory"></a>

```typescript
public readonly factory: ISimulatorFactory;
```

- *Type:* @winglang/wingsdk.testing.ISimulatorFactory
- *Default:* a factory that produces simulations for built-in Wing SDK resources

The factory that produces resource simulations.

---

### TextFileProps <a name="TextFileProps" id="@winglang/wingsdk.fs.TextFileProps"></a>

Props for `TextFile`.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.fs.TextFileProps.Initializer"></a>

```typescript
import { fs } from '@winglang/wingsdk'

const textFileProps: fs.TextFileProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.fs.TextFileProps.property.lines">lines</a></code> | <code>string[]</code> | The lines of text that will be serialized into the file during synthesis. |

---

##### `lines`<sup>Optional</sup> <a name="lines" id="@winglang/wingsdk.fs.TextFileProps.property.lines"></a>

```typescript
public readonly lines: string[];
```

- *Type:* string[]
- *Default:* []

The lines of text that will be serialized into the file during synthesis.

They will be joined with newline characters.

---

### WingSimulatorSchema <a name="WingSimulatorSchema" id="@winglang/wingsdk.sim.WingSimulatorSchema"></a>

Schema for simulator.json.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.sim.WingSimulatorSchema.Initializer"></a>

```typescript
import { sim } from '@winglang/wingsdk'

const wingSimulatorSchema: sim.WingSimulatorSchema = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.sim.WingSimulatorSchema.property.root">root</a></code> | <code>@winglang/wingsdk.sim.BaseResourceSchema</code> | The resource at the root of the tree. |
| <code><a href="#@winglang/wingsdk.sim.WingSimulatorSchema.property.sdkVersion">sdkVersion</a></code> | <code>string</code> | The version of the Wing SDK used to synthesize the .wx file. |
| <code><a href="#@winglang/wingsdk.sim.WingSimulatorSchema.property.startOrder">startOrder</a></code> | <code>string[]</code> | The order resources in which resources should be initialized based on dependency relationships. |

---

##### `root`<sup>Required</sup> <a name="root" id="@winglang/wingsdk.sim.WingSimulatorSchema.property.root"></a>

```typescript
public readonly root: BaseResourceSchema;
```

- *Type:* @winglang/wingsdk.sim.BaseResourceSchema

The resource at the root of the tree.

---

##### `sdkVersion`<sup>Required</sup> <a name="sdkVersion" id="@winglang/wingsdk.sim.WingSimulatorSchema.property.sdkVersion"></a>

```typescript
public readonly sdkVersion: string;
```

- *Type:* string

The version of the Wing SDK used to synthesize the .wx file.

---

##### `startOrder`<sup>Required</sup> <a name="startOrder" id="@winglang/wingsdk.sim.WingSimulatorSchema.property.startOrder"></a>

```typescript
public readonly startOrder: string[];
```

- *Type:* string[]

The order resources in which resources should be initialized based on dependency relationships.

---

## Classes <a name="Classes" id="Classes"></a>

### Code <a name="Code" id="@winglang/wingsdk.core.Code"></a>

Reference to a piece of code.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.core.Code.Initializer"></a>

```typescript
import { core } from '@winglang/wingsdk'

new core.Code()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.Code.property.hash">hash</a></code> | <code>string</code> | Generate a hash of the code contents. |
| <code><a href="#@winglang/wingsdk.core.Code.property.language">language</a></code> | <code>@winglang/wingsdk.core.Language</code> | The language of the code. |
| <code><a href="#@winglang/wingsdk.core.Code.property.path">path</a></code> | <code>string</code> | A path to the code in the user's file system that can be referenced for bundling purposes. |
| <code><a href="#@winglang/wingsdk.core.Code.property.text">text</a></code> | <code>string</code> | The code contents. |

---

##### `hash`<sup>Required</sup> <a name="hash" id="@winglang/wingsdk.core.Code.property.hash"></a>

```typescript
public readonly hash: string;
```

- *Type:* string

Generate a hash of the code contents.

---

##### `language`<sup>Required</sup> <a name="language" id="@winglang/wingsdk.core.Code.property.language"></a>

```typescript
public readonly language: Language;
```

- *Type:* @winglang/wingsdk.core.Language

The language of the code.

---

##### `path`<sup>Required</sup> <a name="path" id="@winglang/wingsdk.core.Code.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

A path to the code in the user's file system that can be referenced for bundling purposes.

---

##### `text`<sup>Required</sup> <a name="text" id="@winglang/wingsdk.core.Code.property.text"></a>

```typescript
public readonly text: string;
```

- *Type:* string

The code contents.

---


### DependencyGraph <a name="DependencyGraph" id="@winglang/wingsdk.core.DependencyGraph"></a>

Represents the dependency graph for a given Node.

This graph includes the dependency relationships between all nodes in the
node (construct) sub-tree who's root is this Node.

Note that this means that lonely nodes (no dependencies and no dependants) are also included in this graph as
childless children of the root node of the graph.

The graph does not include cross-scope dependencies. That is, if a child on the current scope depends on a node
from a different scope, that relationship is not represented in this graph.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.core.DependencyGraph.Initializer"></a>

```typescript
import { core } from '@winglang/wingsdk'

new core.DependencyGraph(node: Node)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.DependencyGraph.Initializer.parameter.node">node</a></code> | <code>constructs.Node</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.core.DependencyGraph.Initializer.parameter.node"></a>

- *Type:* constructs.Node

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.core.DependencyGraph.topology">topology</a></code> | Returns a topologically sorted array of the constructs in the sub-graph. |

---

##### `topology` <a name="topology" id="@winglang/wingsdk.core.DependencyGraph.topology"></a>

```typescript
public topology(): IConstruct[]
```

Returns a topologically sorted array of the constructs in the sub-graph.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.DependencyGraph.property.root">root</a></code> | <code>@winglang/wingsdk.core.DependencyVertex</code> | Returns the root of the graph. |

---

##### `root`<sup>Required</sup> <a name="root" id="@winglang/wingsdk.core.DependencyGraph.property.root"></a>

```typescript
public readonly root: DependencyVertex;
```

- *Type:* @winglang/wingsdk.core.DependencyVertex

Returns the root of the graph.

Note that this vertex will always have `null` as its `.value` since it is an artifical root
that binds all the connected spaces of the graph.

---


### DependencyVertex <a name="DependencyVertex" id="@winglang/wingsdk.core.DependencyVertex"></a>

Represents a vertex in the graph.

The value of each vertex is an `IConstruct` that is accessible via the `.value` getter.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.core.DependencyVertex.Initializer"></a>

```typescript
import { core } from '@winglang/wingsdk'

new core.DependencyVertex(value?: IConstruct)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.DependencyVertex.Initializer.parameter.value">value</a></code> | <code>constructs.IConstruct</code> | *No description.* |

---

##### `value`<sup>Optional</sup> <a name="value" id="@winglang/wingsdk.core.DependencyVertex.Initializer.parameter.value"></a>

- *Type:* constructs.IConstruct

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.core.DependencyVertex.addChild">addChild</a></code> | Adds a vertex as a dependency of the current node. |
| <code><a href="#@winglang/wingsdk.core.DependencyVertex.topology">topology</a></code> | Returns a topologically sorted array of the constructs in the sub-graph. |

---

##### `addChild` <a name="addChild" id="@winglang/wingsdk.core.DependencyVertex.addChild"></a>

```typescript
public addChild(dep: DependencyVertex): void
```

Adds a vertex as a dependency of the current node.

Also updates the parents of `dep`, so that it contains this node as a parent.

This operation will fail in case it creates a cycle in the graph.

###### `dep`<sup>Required</sup> <a name="dep" id="@winglang/wingsdk.core.DependencyVertex.addChild.parameter.dep"></a>

- *Type:* @winglang/wingsdk.core.DependencyVertex

The dependency.

---

##### `topology` <a name="topology" id="@winglang/wingsdk.core.DependencyVertex.topology"></a>

```typescript
public topology(): IConstruct[]
```

Returns a topologically sorted array of the constructs in the sub-graph.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.DependencyVertex.property.inbound">inbound</a></code> | <code>@winglang/wingsdk.core.DependencyVertex[]</code> | Returns the parents of the vertex (i.e dependants). |
| <code><a href="#@winglang/wingsdk.core.DependencyVertex.property.outbound">outbound</a></code> | <code>@winglang/wingsdk.core.DependencyVertex[]</code> | Returns the children of the vertex (i.e dependencies). |
| <code><a href="#@winglang/wingsdk.core.DependencyVertex.property.value">value</a></code> | <code>constructs.IConstruct</code> | Returns the IConstruct this graph vertex represents. |

---

##### `inbound`<sup>Required</sup> <a name="inbound" id="@winglang/wingsdk.core.DependencyVertex.property.inbound"></a>

```typescript
public readonly inbound: DependencyVertex[];
```

- *Type:* @winglang/wingsdk.core.DependencyVertex[]

Returns the parents of the vertex (i.e dependants).

---

##### `outbound`<sup>Required</sup> <a name="outbound" id="@winglang/wingsdk.core.DependencyVertex.property.outbound"></a>

```typescript
public readonly outbound: DependencyVertex[];
```

- *Type:* @winglang/wingsdk.core.DependencyVertex[]

Returns the children of the vertex (i.e dependencies).

---

##### `value`<sup>Optional</sup> <a name="value" id="@winglang/wingsdk.core.DependencyVertex.property.value"></a>

```typescript
public readonly value: IConstruct;
```

- *Type:* constructs.IConstruct

Returns the IConstruct this graph vertex represents.

`null` in case this is the root of the graph.

---


### Duration <a name="Duration" id="@winglang/wingsdk.core.Duration"></a>

Represents a length of time.


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.core.Duration.fromHours">fromHours</a></code> | Create a Duration representing an amount of hours. |
| <code><a href="#@winglang/wingsdk.core.Duration.fromMinutes">fromMinutes</a></code> | Create a Duration representing an amount of minutes. |
| <code><a href="#@winglang/wingsdk.core.Duration.fromSeconds">fromSeconds</a></code> | Create a Duration representing an amount of seconds. |

---

##### `fromHours` <a name="fromHours" id="@winglang/wingsdk.core.Duration.fromHours"></a>

```typescript
import { core } from '@winglang/wingsdk'

core.Duration.fromHours(amount: number)
```

Create a Duration representing an amount of hours.

###### `amount`<sup>Required</sup> <a name="amount" id="@winglang/wingsdk.core.Duration.fromHours.parameter.amount"></a>

- *Type:* number

the amount of Hours the `Duration` will represent.

---

##### `fromMinutes` <a name="fromMinutes" id="@winglang/wingsdk.core.Duration.fromMinutes"></a>

```typescript
import { core } from '@winglang/wingsdk'

core.Duration.fromMinutes(amount: number)
```

Create a Duration representing an amount of minutes.

###### `amount`<sup>Required</sup> <a name="amount" id="@winglang/wingsdk.core.Duration.fromMinutes.parameter.amount"></a>

- *Type:* number

the amount of Minutes the `Duration` will represent.

---

##### `fromSeconds` <a name="fromSeconds" id="@winglang/wingsdk.core.Duration.fromSeconds"></a>

```typescript
import { core } from '@winglang/wingsdk'

core.Duration.fromSeconds(amount: number)
```

Create a Duration representing an amount of seconds.

###### `amount`<sup>Required</sup> <a name="amount" id="@winglang/wingsdk.core.Duration.fromSeconds.parameter.amount"></a>

- *Type:* number

the amount of Seconds the `Duration` will represent.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.Duration.property.hours">hours</a></code> | <code>number</code> | Return the total number of hours in this Duration. |
| <code><a href="#@winglang/wingsdk.core.Duration.property.minutes">minutes</a></code> | <code>number</code> | Return the total number of minutes in this Duration. |
| <code><a href="#@winglang/wingsdk.core.Duration.property.seconds">seconds</a></code> | <code>number</code> | Return the total number of seconds in this Duration. |

---

##### `hours`<sup>Required</sup> <a name="hours" id="@winglang/wingsdk.core.Duration.property.hours"></a>

```typescript
public readonly hours: number;
```

- *Type:* number

Return the total number of hours in this Duration.

---

##### `minutes`<sup>Required</sup> <a name="minutes" id="@winglang/wingsdk.core.Duration.property.minutes"></a>

```typescript
public readonly minutes: number;
```

- *Type:* number

Return the total number of minutes in this Duration.

---

##### `seconds`<sup>Required</sup> <a name="seconds" id="@winglang/wingsdk.core.Duration.property.seconds"></a>

```typescript
public readonly seconds: number;
```

- *Type:* number

Return the total number of seconds in this Duration.

---


### Files <a name="Files" id="@winglang/wingsdk.core.Files"></a>

Handles the synthesis of files.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.core.Files.Initializer"></a>

```typescript
import { core } from '@winglang/wingsdk'

new core.Files(props: FilesProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.Files.Initializer.parameter.props">props</a></code> | <code>@winglang/wingsdk.core.FilesProps</code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/wingsdk.core.Files.Initializer.parameter.props"></a>

- *Type:* @winglang/wingsdk.core.FilesProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.core.Files.synth">synth</a></code> | Synthesize the app into the output directory. |

---

##### `synth` <a name="synth" id="@winglang/wingsdk.core.Files.synth"></a>

```typescript
public synth(outdir?: string): void
```

Synthesize the app into the output directory.

The artifact produced
depends on what synthesizer was used.

###### `outdir`<sup>Optional</sup> <a name="outdir" id="@winglang/wingsdk.core.Files.synth.parameter.outdir"></a>

- *Type:* string

The output directory, if not specified, the app's outdir will be used.

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.Files.property.stateFile">stateFile</a></code> | <code>string</code> | The path to a state file which will track all synthesized files. |

---

##### `stateFile`<sup>Optional</sup> <a name="stateFile" id="@winglang/wingsdk.core.Files.property.stateFile"></a>

```typescript
public readonly stateFile: string;
```

- *Type:* string

The path to a state file which will track all synthesized files.

---


### Inflight <a name="Inflight" id="@winglang/wingsdk.core.Inflight"></a>

Represents a unit of application code that can be executed by a cloud resource.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.core.Inflight.Initializer"></a>

```typescript
import { core } from '@winglang/wingsdk'

new core.Inflight(props: InflightProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.Inflight.Initializer.parameter.props">props</a></code> | <code>@winglang/wingsdk.core.InflightProps</code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/wingsdk.core.Inflight.Initializer.parameter.props"></a>

- *Type:* @winglang/wingsdk.core.InflightProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.core.Inflight.bundle">bundle</a></code> | Bundle this inflight process so that it can be used in the given capture scope. |
| <code><a href="#@winglang/wingsdk.core.Inflight.makeClients">makeClients</a></code> | Resolve this inflight's captured objects into a map of clients that be safely referenced at runtime. |

---

##### `bundle` <a name="bundle" id="@winglang/wingsdk.core.Inflight.bundle"></a>

```typescript
public bundle(options: InflightBundleOptions): Code
```

Bundle this inflight process so that it can be used in the given capture scope.

Returns the path to a JavaScript file that has been rewritten to include
all dependencies and captured values or clients. The file is isolated in
its own directory so that it can be zipped up and uploaded to cloud
providers.

High level implementation:
1. Read the file (let's say its path is path/to/foo.js)
2. Create a new javascript file named path/to/foo.prebundle.js, including a
    map of all capture clients, a new handler that calls the original
    handler with the clients passed in, and a copy of the user's code from
    path/to/foo.js.
3. Use esbuild to bundle all dependencies, outputting the result to
    path/to/foo.js.bundle/index.js.

###### `options`<sup>Required</sup> <a name="options" id="@winglang/wingsdk.core.Inflight.bundle.parameter.options"></a>

- *Type:* @winglang/wingsdk.core.InflightBundleOptions

---

##### `makeClients` <a name="makeClients" id="@winglang/wingsdk.core.Inflight.makeClients"></a>

```typescript
public makeClients(captureScope: IConstruct): {[ key: string ]: Code}
```

Resolve this inflight's captured objects into a map of clients that be safely referenced at runtime.

###### `captureScope`<sup>Required</sup> <a name="captureScope" id="@winglang/wingsdk.core.Inflight.makeClients.parameter.captureScope"></a>

- *Type:* constructs.IConstruct

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.Inflight.property.captures">captures</a></code> | <code>{[ key: string ]: @winglang/wingsdk.core.Capture}</code> | Capture information. |
| <code><a href="#@winglang/wingsdk.core.Inflight.property.code">code</a></code> | <code>@winglang/wingsdk.core.Code</code> | Reference to code containing the entrypoint function. |
| <code><a href="#@winglang/wingsdk.core.Inflight.property.entrypoint">entrypoint</a></code> | <code>string</code> | Name of the exported function which will be run. |

---

##### `captures`<sup>Required</sup> <a name="captures" id="@winglang/wingsdk.core.Inflight.property.captures"></a>

```typescript
public readonly captures: {[ key: string ]: Capture};
```

- *Type:* {[ key: string ]: @winglang/wingsdk.core.Capture}

Capture information.

During runtime, a map containing all captured values
will be passed as the first argument of the entrypoint function.

Each key here will be the key for the final value in the map.

---

##### `code`<sup>Required</sup> <a name="code" id="@winglang/wingsdk.core.Inflight.property.code"></a>

```typescript
public readonly code: Code;
```

- *Type:* @winglang/wingsdk.core.Code

Reference to code containing the entrypoint function.

---

##### `entrypoint`<sup>Required</sup> <a name="entrypoint" id="@winglang/wingsdk.core.Inflight.property.entrypoint"></a>

```typescript
public readonly entrypoint: string;
```

- *Type:* string

Name of the exported function which will be run.

---


### InflightClient <a name="InflightClient" id="@winglang/wingsdk.core.InflightClient"></a>

Utility class with functions about inflight clients.


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.core.InflightClient.for">for</a></code> | Creates a `Code` instance with code for creating an inflight client. |

---

##### `for` <a name="for" id="@winglang/wingsdk.core.InflightClient.for"></a>

```typescript
import { core } from '@winglang/wingsdk'

core.InflightClient.for(filename: string, clientClass: string, args: string[])
```

Creates a `Code` instance with code for creating an inflight client.

###### `filename`<sup>Required</sup> <a name="filename" id="@winglang/wingsdk.core.InflightClient.for.parameter.filename"></a>

- *Type:* string

---

###### `clientClass`<sup>Required</sup> <a name="clientClass" id="@winglang/wingsdk.core.InflightClient.for.parameter.clientClass"></a>

- *Type:* string

---

###### `args`<sup>Required</sup> <a name="args" id="@winglang/wingsdk.core.InflightClient.for.parameter.args"></a>

- *Type:* string[]

---



### NodeJsCode <a name="NodeJsCode" id="@winglang/wingsdk.core.NodeJsCode"></a>

Reference to a piece of Node.js code.


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.core.NodeJsCode.fromFile">fromFile</a></code> | Reference code from a file path. |
| <code><a href="#@winglang/wingsdk.core.NodeJsCode.fromInline">fromInline</a></code> | Reference code directly from a string. |

---

##### `fromFile` <a name="fromFile" id="@winglang/wingsdk.core.NodeJsCode.fromFile"></a>

```typescript
import { core } from '@winglang/wingsdk'

core.NodeJsCode.fromFile(path: string)
```

Reference code from a file path.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/wingsdk.core.NodeJsCode.fromFile.parameter.path"></a>

- *Type:* string

---

##### `fromInline` <a name="fromInline" id="@winglang/wingsdk.core.NodeJsCode.fromInline"></a>

```typescript
import { core } from '@winglang/wingsdk'

core.NodeJsCode.fromInline(text: string)
```

Reference code directly from a string.

###### `text`<sup>Required</sup> <a name="text" id="@winglang/wingsdk.core.NodeJsCode.fromInline.parameter.text"></a>

- *Type:* string

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.NodeJsCode.property.hash">hash</a></code> | <code>string</code> | Generate a hash of the code contents. |
| <code><a href="#@winglang/wingsdk.core.NodeJsCode.property.language">language</a></code> | <code>@winglang/wingsdk.core.Language</code> | The language of the code. |
| <code><a href="#@winglang/wingsdk.core.NodeJsCode.property.path">path</a></code> | <code>string</code> | A path to the code in the user's file system that can be referenced for bundling purposes. |
| <code><a href="#@winglang/wingsdk.core.NodeJsCode.property.text">text</a></code> | <code>string</code> | The code contents. |

---

##### `hash`<sup>Required</sup> <a name="hash" id="@winglang/wingsdk.core.NodeJsCode.property.hash"></a>

```typescript
public readonly hash: string;
```

- *Type:* string

Generate a hash of the code contents.

---

##### `language`<sup>Required</sup> <a name="language" id="@winglang/wingsdk.core.NodeJsCode.property.language"></a>

```typescript
public readonly language: Language;
```

- *Type:* @winglang/wingsdk.core.Language

The language of the code.

---

##### `path`<sup>Required</sup> <a name="path" id="@winglang/wingsdk.core.NodeJsCode.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

A path to the code in the user's file system that can be referenced for bundling purposes.

---

##### `text`<sup>Required</sup> <a name="text" id="@winglang/wingsdk.core.NodeJsCode.property.text"></a>

```typescript
public readonly text: string;
```

- *Type:* string

The code contents.

---


### PolyconFactory <a name="PolyconFactory" id="@winglang/wingsdk.sim.PolyconFactory"></a>

- *Implements:* @winglang/polycons.IPolyconFactory

Polycon factory which resolves polycons in `cloud` into preflight resources for the simulator target.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.sim.PolyconFactory.Initializer"></a>

```typescript
import { sim } from '@winglang/wingsdk'

new sim.PolyconFactory()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.sim.PolyconFactory.resolve">resolve</a></code> | Resolve the parameters needed for creating a specific polycon into a concrete construct. |

---

##### `resolve` <a name="resolve" id="@winglang/wingsdk.sim.PolyconFactory.resolve"></a>

```typescript
public resolve(polyconId: string, scope: IConstruct, id: string, args: any): IConstruct
```

Resolve the parameters needed for creating a specific polycon into a concrete construct.

###### `polyconId`<sup>Required</sup> <a name="polyconId" id="@winglang/wingsdk.sim.PolyconFactory.resolve.parameter.polyconId"></a>

- *Type:* string

---

###### `scope`<sup>Required</sup> <a name="scope" id="@winglang/wingsdk.sim.PolyconFactory.resolve.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

###### `id`<sup>Required</sup> <a name="id" id="@winglang/wingsdk.sim.PolyconFactory.resolve.parameter.id"></a>

- *Type:* string

---

###### `args`<sup>Required</sup> <a name="args" id="@winglang/wingsdk.sim.PolyconFactory.resolve.parameter.args"></a>

- *Type:* any

---




### PolyconFactory <a name="PolyconFactory" id="@winglang/wingsdk.tfaws.PolyconFactory"></a>

- *Implements:* @winglang/polycons.IPolyconFactory

Polycon factory which resolves polycons in `cloud` into preflight resources for the AWS target.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.tfaws.PolyconFactory.Initializer"></a>

```typescript
import { tfaws } from '@winglang/wingsdk'

new tfaws.PolyconFactory()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.tfaws.PolyconFactory.resolve">resolve</a></code> | Resolve the parameters needed for creating a specific polycon into a concrete construct. |

---

##### `resolve` <a name="resolve" id="@winglang/wingsdk.tfaws.PolyconFactory.resolve"></a>

```typescript
public resolve(type: string, scope: IConstruct, id: string, args: any): IConstruct
```

Resolve the parameters needed for creating a specific polycon into a concrete construct.

###### `type`<sup>Required</sup> <a name="type" id="@winglang/wingsdk.tfaws.PolyconFactory.resolve.parameter.type"></a>

- *Type:* string

---

###### `scope`<sup>Required</sup> <a name="scope" id="@winglang/wingsdk.tfaws.PolyconFactory.resolve.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

###### `id`<sup>Required</sup> <a name="id" id="@winglang/wingsdk.tfaws.PolyconFactory.resolve.parameter.id"></a>

- *Type:* string

---

###### `args`<sup>Required</sup> <a name="args" id="@winglang/wingsdk.tfaws.PolyconFactory.resolve.parameter.args"></a>

- *Type:* any

---




### Simulator <a name="Simulator" id="@winglang/wingsdk.testing.Simulator"></a>

A simulator that can be used to test your application locally.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.testing.Simulator.Initializer"></a>

```typescript
import { testing } from '@winglang/wingsdk'

new testing.Simulator(props: SimulatorProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.testing.Simulator.Initializer.parameter.props">props</a></code> | <code>@winglang/wingsdk.testing.SimulatorProps</code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/wingsdk.testing.Simulator.Initializer.parameter.props"></a>

- *Type:* @winglang/wingsdk.testing.SimulatorProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.testing.Simulator.getAttributes">getAttributes</a></code> | Obtain a resource's attributes. |
| <code><a href="#@winglang/wingsdk.testing.Simulator.getData">getData</a></code> | Obtain a resource's data, including its path, props, attrs, and children. |
| <code><a href="#@winglang/wingsdk.testing.Simulator.getProps">getProps</a></code> | Obtain a resource's props. |
| <code><a href="#@winglang/wingsdk.testing.Simulator.getResourceByPath">getResourceByPath</a></code> | Get the resource instance for a given path. |
| <code><a href="#@winglang/wingsdk.testing.Simulator.listEvents">listEvents</a></code> | Get a list of all events that have been logged during the simulation. |
| <code><a href="#@winglang/wingsdk.testing.Simulator.listLogs">listLogs</a></code> | Get a list of all log events that have been logged during the simulation. |
| <code><a href="#@winglang/wingsdk.testing.Simulator.listResources">listResources</a></code> | Get a list of all resource paths. |
| <code><a href="#@winglang/wingsdk.testing.Simulator.listTraces">listTraces</a></code> | Get a list of all trace events that have been logged during the simulation. |
| <code><a href="#@winglang/wingsdk.testing.Simulator.reload">reload</a></code> | Stop the simulation, reload the simulation tree from the latest version of the app file, and restart the simulation. |
| <code><a href="#@winglang/wingsdk.testing.Simulator.start">start</a></code> | Start the simulator. |
| <code><a href="#@winglang/wingsdk.testing.Simulator.stop">stop</a></code> | Stop the simulation and clean up all resources. |

---

##### `getAttributes` <a name="getAttributes" id="@winglang/wingsdk.testing.Simulator.getAttributes"></a>

```typescript
public getAttributes(path: string): {[ key: string ]: any}
```

Obtain a resource's attributes.

This is data that gets resolved when the
during the resource's in-simulator creation.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/wingsdk.testing.Simulator.getAttributes.parameter.path"></a>

- *Type:* string

---

##### `getData` <a name="getData" id="@winglang/wingsdk.testing.Simulator.getData"></a>

```typescript
public getData(path: string): BaseResourceSchema
```

Obtain a resource's data, including its path, props, attrs, and children.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/wingsdk.testing.Simulator.getData.parameter.path"></a>

- *Type:* string

---

##### `getProps` <a name="getProps" id="@winglang/wingsdk.testing.Simulator.getProps"></a>

```typescript
public getProps(path: string): {[ key: string ]: any}
```

Obtain a resource's props.

This is data about the resource's configuration
that is resolved at synth time.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/wingsdk.testing.Simulator.getProps.parameter.path"></a>

- *Type:* string

---

##### `getResourceByPath` <a name="getResourceByPath" id="@winglang/wingsdk.testing.Simulator.getResourceByPath"></a>

```typescript
public getResourceByPath(path: string): any
```

Get the resource instance for a given path.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/wingsdk.testing.Simulator.getResourceByPath.parameter.path"></a>

- *Type:* string

---

##### `listEvents` <a name="listEvents" id="@winglang/wingsdk.testing.Simulator.listEvents"></a>

```typescript
public listEvents(): SimulatorEvent[]
```

Get a list of all events that have been logged during the simulation.

The list of events is cleared whenever the simulation is restarted.

##### `listLogs` <a name="listLogs" id="@winglang/wingsdk.testing.Simulator.listLogs"></a>

```typescript
public listLogs(): SimulatorEvent[]
```

Get a list of all log events that have been logged during the simulation.

The list of events is cleared whenever the simulation is restarted.

##### `listResources` <a name="listResources" id="@winglang/wingsdk.testing.Simulator.listResources"></a>

```typescript
public listResources(): string[]
```

Get a list of all resource paths.

##### `listTraces` <a name="listTraces" id="@winglang/wingsdk.testing.Simulator.listTraces"></a>

```typescript
public listTraces(): SimulatorEvent[]
```

Get a list of all trace events that have been logged during the simulation.

The list of events is cleared whenever the simulation is restarted.

##### `reload` <a name="reload" id="@winglang/wingsdk.testing.Simulator.reload"></a>

```typescript
public reload(): void
```

Stop the simulation, reload the simulation tree from the latest version of the app file, and restart the simulation.

##### `start` <a name="start" id="@winglang/wingsdk.testing.Simulator.start"></a>

```typescript
public start(): void
```

Start the simulator.

##### `stop` <a name="stop" id="@winglang/wingsdk.testing.Simulator.stop"></a>

```typescript
public stop(): void
```

Stop the simulation and clean up all resources.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.testing.Simulator.property.tree">tree</a></code> | <code>any</code> | Return a copy of the simulator tree, including all resource attributes. |

---

##### `tree`<sup>Required</sup> <a name="tree" id="@winglang/wingsdk.testing.Simulator.property.tree"></a>

```typescript
public readonly tree: any;
```

- *Type:* any

Return a copy of the simulator tree, including all resource attributes.

---


### Testing <a name="Testing" id="@winglang/wingsdk.core.Testing"></a>

Testing utilities.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.core.Testing.Initializer"></a>

```typescript
import { core } from '@winglang/wingsdk'

new core.Testing()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.core.Testing.inspectPrebundledCode">inspectPrebundledCode</a></code> | Obtain a reference to the prebundled Code for a given capture scope. |

---

##### `inspectPrebundledCode` <a name="inspectPrebundledCode" id="@winglang/wingsdk.core.Testing.inspectPrebundledCode"></a>

```typescript
import { core } from '@winglang/wingsdk'

core.Testing.inspectPrebundledCode(captureScope: IConstruct)
```

Obtain a reference to the prebundled Code for a given capture scope.

###### `captureScope`<sup>Required</sup> <a name="captureScope" id="@winglang/wingsdk.core.Testing.inspectPrebundledCode.parameter.captureScope"></a>

- *Type:* constructs.IConstruct

---



## Protocols <a name="Protocols" id="Protocols"></a>

### IApp <a name="IApp" id="@winglang/wingsdk.core.IApp"></a>

- *Extends:* constructs.IConstruct

- *Implemented By:* @winglang/wingsdk.sim.App, @winglang/wingsdk.tfaws.App, @winglang/wingsdk.core.IApp

A Wing application.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.core.IApp.synth">synth</a></code> | Synthesize the app into an artifact. |

---

##### `synth` <a name="synth" id="@winglang/wingsdk.core.IApp.synth"></a>

```typescript
public synth(): string
```

Synthesize the app into an artifact.

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.IApp.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.core.IApp.property.outdir">outdir</a></code> | <code>string</code> | Directory where artifacts are synthesized to. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.core.IApp.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="@winglang/wingsdk.core.IApp.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

Directory where artifacts are synthesized to.

---

### IBucketClient <a name="IBucketClient" id="@winglang/wingsdk.cloud.IBucketClient"></a>

- *Implemented By:* @winglang/wingsdk.cloud.IBucketClient, @winglang/wingsdk.sim.IBucketClient, @winglang/wingsdk.tfaws.IBucketClient

Inflight interface for `Bucket`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.IBucketClient.get">get</a></code> | Retrieve an object from the bucket. |
| <code><a href="#@winglang/wingsdk.cloud.IBucketClient.list">list</a></code> | Retrieve existing objects keys from the bucket. |
| <code><a href="#@winglang/wingsdk.cloud.IBucketClient.put">put</a></code> | Put an object in the bucket. |

---

##### `get` <a name="get" id="@winglang/wingsdk.cloud.IBucketClient.get"></a>

```typescript
public get(key: string): string
```

Retrieve an object from the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/wingsdk.cloud.IBucketClient.get.parameter.key"></a>

- *Type:* string

---

##### `list` <a name="list" id="@winglang/wingsdk.cloud.IBucketClient.list"></a>

```typescript
public list(prefix?: string): string[]
```

Retrieve existing objects keys from the bucket.

###### `prefix`<sup>Optional</sup> <a name="prefix" id="@winglang/wingsdk.cloud.IBucketClient.list.parameter.prefix"></a>

- *Type:* string

Limits the response to keys that begin with the specified prefix.

---

##### `put` <a name="put" id="@winglang/wingsdk.cloud.IBucketClient.put"></a>

```typescript
public put(key: string, body: string): void
```

Put an object in the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/wingsdk.cloud.IBucketClient.put.parameter.key"></a>

- *Type:* string

---

###### `body`<sup>Required</sup> <a name="body" id="@winglang/wingsdk.cloud.IBucketClient.put.parameter.body"></a>

- *Type:* string

---


### IBucketClient <a name="IBucketClient" id="@winglang/wingsdk.sim.IBucketClient"></a>

- *Extends:* @winglang/wingsdk.cloud.IBucketClient

- *Implemented By:* @winglang/wingsdk.sim.IBucketClient

Simulator implementation of inflight client for `cloud.Bucket`.



### IBucketClient <a name="IBucketClient" id="@winglang/wingsdk.tfaws.IBucketClient"></a>

- *Extends:* @winglang/wingsdk.cloud.IBucketClient

- *Implemented By:* @winglang/wingsdk.tfaws.IBucketClient

AWS implementation of inflight client for `cloud.Bucket`.



### ICapturable <a name="ICapturable" id="@winglang/wingsdk.core.ICapturable"></a>

- *Implemented By:* @winglang/wingsdk.cloud.Bucket, @winglang/wingsdk.cloud.BucketBase, @winglang/wingsdk.cloud.Function, @winglang/wingsdk.cloud.FunctionBase, @winglang/wingsdk.cloud.Logger, @winglang/wingsdk.cloud.LoggerBase, @winglang/wingsdk.cloud.Queue, @winglang/wingsdk.cloud.QueueBase, @winglang/wingsdk.cloud.Resource, @winglang/wingsdk.sim.Bucket, @winglang/wingsdk.sim.Function, @winglang/wingsdk.sim.Logger, @winglang/wingsdk.sim.Queue, @winglang/wingsdk.tfaws.Bucket, @winglang/wingsdk.tfaws.Function, @winglang/wingsdk.tfaws.Queue, @winglang/wingsdk.core.ICapturable, @winglang/wingsdk.core.ICapturableConstruct

Represents something that is capturable by an Inflight.



### ICapturableConstruct <a name="ICapturableConstruct" id="@winglang/wingsdk.core.ICapturableConstruct"></a>

- *Extends:* @winglang/wingsdk.core.ICapturable, constructs.IConstruct

- *Implemented By:* @winglang/wingsdk.core.ICapturableConstruct

Represents a construct that is capturable by an Inflight.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.ICapturableConstruct.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.core.ICapturableConstruct.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

### IFunctionClient <a name="IFunctionClient" id="@winglang/wingsdk.cloud.IFunctionClient"></a>

- *Implemented By:* @winglang/wingsdk.cloud.IFunctionClient, @winglang/wingsdk.sim.IFunctionClient, @winglang/wingsdk.tfaws.IFunctionClient

Inflight interface for `Function`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.IFunctionClient.invoke">invoke</a></code> | Invoke the function asynchronously with a given payload. |

---

##### `invoke` <a name="invoke" id="@winglang/wingsdk.cloud.IFunctionClient.invoke"></a>

```typescript
public invoke(payload: string): string
```

Invoke the function asynchronously with a given payload.

###### `payload`<sup>Required</sup> <a name="payload" id="@winglang/wingsdk.cloud.IFunctionClient.invoke.parameter.payload"></a>

- *Type:* string

---


### IFunctionClient <a name="IFunctionClient" id="@winglang/wingsdk.sim.IFunctionClient"></a>

- *Extends:* @winglang/wingsdk.cloud.IFunctionClient

- *Implemented By:* @winglang/wingsdk.sim.IFunctionClient

Simulator implementation of inflight client for `cloud.Function`.



### IFunctionClient <a name="IFunctionClient" id="@winglang/wingsdk.tfaws.IFunctionClient"></a>

- *Extends:* @winglang/wingsdk.cloud.IFunctionClient

- *Implemented By:* @winglang/wingsdk.tfaws.IFunctionClient

AWS implementation of inflight client for `cloud.Function`.



### ILoggerClient <a name="ILoggerClient" id="@winglang/wingsdk.cloud.ILoggerClient"></a>

- *Implemented By:* @winglang/wingsdk.cloud.ILoggerClient, @winglang/wingsdk.sim.ILoggerClient

Inflight interface for `Logger`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.ILoggerClient.print">print</a></code> | Logs a message. |

---

##### `print` <a name="print" id="@winglang/wingsdk.cloud.ILoggerClient.print"></a>

```typescript
public print(message: string): void
```

Logs a message.

The log will be associated with whichever resource is
running the inflight code.

###### `message`<sup>Required</sup> <a name="message" id="@winglang/wingsdk.cloud.ILoggerClient.print.parameter.message"></a>

- *Type:* string

The message to print.

---


### ILoggerClient <a name="ILoggerClient" id="@winglang/wingsdk.sim.ILoggerClient"></a>

- *Extends:* @winglang/wingsdk.cloud.ILoggerClient

- *Implemented By:* @winglang/wingsdk.sim.ILoggerClient

Simulator implementation of inflight client for `cloud.Logger`.



### IQueueClient <a name="IQueueClient" id="@winglang/wingsdk.cloud.IQueueClient"></a>

- *Implemented By:* @winglang/wingsdk.cloud.IQueueClient, @winglang/wingsdk.sim.IQueueClient, @winglang/wingsdk.tfaws.IQueueClient

Inflight interface for `Queue`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.IQueueClient.push">push</a></code> | Push a message to the queue. |

---

##### `push` <a name="push" id="@winglang/wingsdk.cloud.IQueueClient.push"></a>

```typescript
public push(message: string): void
```

Push a message to the queue.

###### `message`<sup>Required</sup> <a name="message" id="@winglang/wingsdk.cloud.IQueueClient.push.parameter.message"></a>

- *Type:* string

Payload to send to the queue.

---


### IQueueClient <a name="IQueueClient" id="@winglang/wingsdk.sim.IQueueClient"></a>

- *Extends:* @winglang/wingsdk.cloud.IQueueClient

- *Implemented By:* @winglang/wingsdk.sim.IQueueClient

Simulator implementation of inflight client for `cloud.Queue`.



### IQueueClient <a name="IQueueClient" id="@winglang/wingsdk.tfaws.IQueueClient"></a>

- *Extends:* @winglang/wingsdk.cloud.IQueueClient

- *Implemented By:* @winglang/wingsdk.tfaws.IQueueClient

AWS implementation of inflight client for `cloud.Queue`.



### IResource <a name="IResource" id="@winglang/wingsdk.sim.IResource"></a>

- *Extends:* constructs.IConstruct

- *Implemented By:* @winglang/wingsdk.sim.Bucket, @winglang/wingsdk.sim.Function, @winglang/wingsdk.sim.Logger, @winglang/wingsdk.sim.Queue, @winglang/wingsdk.sim.IResource

Interfaces shared by all polycon implementations (preflight classes) targeting the simulator.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.sim.IResource.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.sim.IResource.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

### IResourceResolver <a name="IResourceResolver" id="@winglang/wingsdk.testing.IResourceResolver"></a>

- *Implemented By:* @winglang/wingsdk.testing.IResourceResolver

A resolver that can be used to look up other resources in the tree.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.testing.IResourceResolver.lookup">lookup</a></code> | Lookup a resource by its path. |

---

##### `lookup` <a name="lookup" id="@winglang/wingsdk.testing.IResourceResolver.lookup"></a>

```typescript
public lookup(resourceId: string): BaseResourceSchema
```

Lookup a resource by its path.

###### `resourceId`<sup>Required</sup> <a name="resourceId" id="@winglang/wingsdk.testing.IResourceResolver.lookup.parameter.resourceId"></a>

- *Type:* string

---


### ISimulatorContext <a name="ISimulatorContext" id="@winglang/wingsdk.testing.ISimulatorContext"></a>

- *Implemented By:* @winglang/wingsdk.testing.ISimulatorContext

Context that is passed to individual resource simulations.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.testing.ISimulatorContext.addLog">addLog</a></code> | Add a log event to the simulation. |
| <code><a href="#@winglang/wingsdk.testing.ISimulatorContext.addTrace">addTrace</a></code> | Add a trace event to the simulation. |
| <code><a href="#@winglang/wingsdk.testing.ISimulatorContext.findInstance">findInstance</a></code> | Find a resource simulation by its handle. |

---

##### `addLog` <a name="addLog" id="@winglang/wingsdk.testing.ISimulatorContext.addLog"></a>

```typescript
public addLog(event: AddLogProps): void
```

Add a log event to the simulation.

Log events are for information the user
adds within their application code, useful for understanding what their
inflight code is doing.

###### `event`<sup>Required</sup> <a name="event" id="@winglang/wingsdk.testing.ISimulatorContext.addLog.parameter.event"></a>

- *Type:* @winglang/wingsdk.testing.AddLogProps

---

##### `addTrace` <a name="addTrace" id="@winglang/wingsdk.testing.ISimulatorContext.addTrace"></a>

```typescript
public addTrace(event: AddTraceProps): void
```

Add a trace event to the simulation.

Trace events are for breadcrumbs of
information about resource operations that occurred during simulation,
useful for understanding how resources interact.

###### `event`<sup>Required</sup> <a name="event" id="@winglang/wingsdk.testing.ISimulatorContext.addTrace.parameter.event"></a>

- *Type:* @winglang/wingsdk.testing.AddTraceProps

---

##### `findInstance` <a name="findInstance" id="@winglang/wingsdk.testing.ISimulatorContext.findInstance"></a>

```typescript
public findInstance(handle: string): ISimulatorResource
```

Find a resource simulation by its handle.

Throws if the handle isn't valid.

###### `handle`<sup>Required</sup> <a name="handle" id="@winglang/wingsdk.testing.ISimulatorContext.findInstance.parameter.handle"></a>

- *Type:* string

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.testing.ISimulatorContext.property.assetsDir">assetsDir</a></code> | <code>string</code> | The absolute path to where all assets in `app.wx` are stored. |

---

##### `assetsDir`<sup>Required</sup> <a name="assetsDir" id="@winglang/wingsdk.testing.ISimulatorContext.property.assetsDir"></a>

```typescript
public readonly assetsDir: string;
```

- *Type:* string

The absolute path to where all assets in `app.wx` are stored.

---

### ISimulatorFactory <a name="ISimulatorFactory" id="@winglang/wingsdk.testing.ISimulatorFactory"></a>

- *Implemented By:* @winglang/wingsdk.testing.ISimulatorFactory

A factory that can turn resource descriptions into (inflight) resource simulations.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.testing.ISimulatorFactory.resolve">resolve</a></code> | Resolve the parameters needed for creating a specific resource simulation. |

---

##### `resolve` <a name="resolve" id="@winglang/wingsdk.testing.ISimulatorFactory.resolve"></a>

```typescript
public resolve(type: string, props: any, context: ISimulatorContext): ISimulatorResource
```

Resolve the parameters needed for creating a specific resource simulation.

###### `type`<sup>Required</sup> <a name="type" id="@winglang/wingsdk.testing.ISimulatorFactory.resolve.parameter.type"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="@winglang/wingsdk.testing.ISimulatorFactory.resolve.parameter.props"></a>

- *Type:* any

---

###### `context`<sup>Required</sup> <a name="context" id="@winglang/wingsdk.testing.ISimulatorFactory.resolve.parameter.context"></a>

- *Type:* @winglang/wingsdk.testing.ISimulatorContext

---


### ISimulatorResource <a name="ISimulatorResource" id="@winglang/wingsdk.sim.ISimulatorResource"></a>

- *Implemented By:* @winglang/wingsdk.sim.ISimulatorResource

Shared interface for resource simulations.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.sim.ISimulatorResource.cleanup">cleanup</a></code> | Stop the resource and clean up any physical resources it may have created (files, ports, etc). |
| <code><a href="#@winglang/wingsdk.sim.ISimulatorResource.init">init</a></code> | Perform any async initialization required by the resource. |

---

##### `cleanup` <a name="cleanup" id="@winglang/wingsdk.sim.ISimulatorResource.cleanup"></a>

```typescript
public cleanup(): void
```

Stop the resource and clean up any physical resources it may have created (files, ports, etc).

##### `init` <a name="init" id="@winglang/wingsdk.sim.ISimulatorResource.init"></a>

```typescript
public init(): void
```

Perform any async initialization required by the resource.


## Enums <a name="Enums" id="Enums"></a>

### BucketInflightMethods <a name="BucketInflightMethods" id="@winglang/wingsdk.cloud.BucketInflightMethods"></a>

List of inflight operations available for `Bucket`.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.BucketInflightMethods.PUT">PUT</a></code> | `Bucket.put`. |
| <code><a href="#@winglang/wingsdk.cloud.BucketInflightMethods.GET">GET</a></code> | `Bucket.get`. |
| <code><a href="#@winglang/wingsdk.cloud.BucketInflightMethods.LIST">LIST</a></code> | `Bucket.list`. |

---

##### `PUT` <a name="PUT" id="@winglang/wingsdk.cloud.BucketInflightMethods.PUT"></a>

`Bucket.put`.

---


##### `GET` <a name="GET" id="@winglang/wingsdk.cloud.BucketInflightMethods.GET"></a>

`Bucket.get`.

---


##### `LIST` <a name="LIST" id="@winglang/wingsdk.cloud.BucketInflightMethods.LIST"></a>

`Bucket.list`.

---


### FunctionInflightMethods <a name="FunctionInflightMethods" id="@winglang/wingsdk.cloud.FunctionInflightMethods"></a>

List of inflight operations available for `Function`.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.FunctionInflightMethods.INVOKE">INVOKE</a></code> | `Function.invoke`. |

---

##### `INVOKE` <a name="INVOKE" id="@winglang/wingsdk.cloud.FunctionInflightMethods.INVOKE"></a>

`Function.invoke`.

---


### Language <a name="Language" id="@winglang/wingsdk.core.Language"></a>

The language of a piece of code.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.core.Language.NODE_JS">NODE_JS</a></code> | Node.js. |

---

##### `NODE_JS` <a name="NODE_JS" id="@winglang/wingsdk.core.Language.NODE_JS"></a>

Node.js.

---


### LoggerInflightMethods <a name="LoggerInflightMethods" id="@winglang/wingsdk.cloud.LoggerInflightMethods"></a>

List of inflight operations available for `Logger`.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.LoggerInflightMethods.PRINT">PRINT</a></code> | `Logger.print`. |

---

##### `PRINT` <a name="PRINT" id="@winglang/wingsdk.cloud.LoggerInflightMethods.PRINT"></a>

`Logger.print`.

---


### QueueInflightMethods <a name="QueueInflightMethods" id="@winglang/wingsdk.cloud.QueueInflightMethods"></a>

List of inflight operations available for `Queue`.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.QueueInflightMethods.PUSH">PUSH</a></code> | `Queue.push`. |

---

##### `PUSH` <a name="PUSH" id="@winglang/wingsdk.cloud.QueueInflightMethods.PUSH"></a>

`Queue.push`.

---

