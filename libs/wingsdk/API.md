# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### App <a name="App" id="@monadahq/wingsdk.core.App"></a>

The root construct for all Wing applications.

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
| <code><a href="#@monadahq/wingsdk.core.App.synth">synth</a></code> | Synthesize the app into the output directory. |

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

Synthesize the app into the output directory.

The artifact produced
depends on what synthesizer was used.

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
| <code><a href="#@monadahq/wingsdk.core.App.property.outdir">outdir</a></code> | <code>string</code> | Directory where all artifacts will be synthesized to. |
| <code><a href="#@monadahq/wingsdk.core.App.property.root">root</a></code> | <code>constructs.Construct</code> | The root construct which all constructs should be added to. |
| <code><a href="#@monadahq/wingsdk.core.App.property.stateFile">stateFile</a></code> | <code>string</code> | The path to a state file which will track all synthesized files. |

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

Directory where all artifacts will be synthesized to.

---

##### `root`<sup>Required</sup> <a name="root" id="@monadahq/wingsdk.core.App.property.root"></a>

```typescript
public readonly root: Construct;
```

- *Type:* constructs.Construct

The root construct which all constructs should be added to.

This is
exposed for compatibility with different CDK frameworks that require
creating their own `App` construct with a different root.

---

##### `stateFile`<sup>Optional</sup> <a name="stateFile" id="@monadahq/wingsdk.core.App.property.stateFile"></a>

```typescript
public readonly stateFile: string;
```

- *Type:* string

The path to a state file which will track all synthesized files.

---


### App <a name="App" id="@monadahq/wingsdk.sim.App"></a>

A construct that knows how to synthesize simulator resources into a Wing simulator (.wx) file.

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.sim.App.Initializer"></a>

```typescript
import { sim } from '@monadahq/wingsdk'

new sim.App(props: AppProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.sim.App.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.sim.AppProps</code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@monadahq/wingsdk.sim.App.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.sim.AppProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.sim.App.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.sim.App.synth">synth</a></code> | Synthesize the app into the output directory. |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.sim.App.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `synth` <a name="synth" id="@monadahq/wingsdk.sim.App.synth"></a>

```typescript
public synth(): void
```

Synthesize the app into the output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.sim.App.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.sim.App.isConstruct"></a>

```typescript
import { sim } from '@monadahq/wingsdk'

sim.App.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.sim.App.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.sim.App.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.sim.App.property.node"></a>

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

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.cloud.Bucket.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

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


### Bucket <a name="Bucket" id="@monadahq/wingsdk.sim.Bucket"></a>

- *Implements:* @monadahq/wingsdk.sim.IResource

Simulator implementation of `cloud.Bucket`.

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.sim.Bucket.Initializer"></a>

```typescript
import { sim } from '@monadahq/wingsdk'

new sim.Bucket(scope: Construct, id: string, props: BucketProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.sim.Bucket.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.sim.Bucket.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.sim.Bucket.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.cloud.BucketProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.sim.Bucket.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.sim.Bucket.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@monadahq/wingsdk.sim.Bucket.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.cloud.BucketProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.sim.Bucket.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.sim.Bucket.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.sim.Bucket.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.sim.Bucket.isConstruct"></a>

```typescript
import { sim } from '@monadahq/wingsdk'

sim.Bucket.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.sim.Bucket.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.sim.Bucket.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@monadahq/wingsdk.sim.Bucket.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.sim.Bucket.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@monadahq/wingsdk.sim.Bucket.property.stateful"></a>

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

AWS implementation of `cloud.Bucket`.

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

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.tfaws.Bucket.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

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

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.cloud.BucketBase.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

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

Represents a file to be synthesized in the app's output directory.

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
| <code><a href="#@monadahq/wingsdk.fs.FileBase.save">save</a></code> | Render the contents of the file and save it to the user's file system. |

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

Render the contents of the file and save it to the user's file system.

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
| <code><a href="#@monadahq/wingsdk.fs.FileBase.property.filePath">filePath</a></code> | <code>string</code> | The file's relative path to the output directory. |

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

The file's relative path to the output directory.

---


### Function <a name="Function" id="@monadahq/wingsdk.cloud.Function"></a>

Represents a serverless function.

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.cloud.Function.Initializer"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

new cloud.Function(scope: Construct, id: string, inflight: Inflight, props?: FunctionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Function.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.cloud.Function.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.cloud.Function.Initializer.parameter.inflight">inflight</a></code> | <code>@monadahq/wingsdk.core.Inflight</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.cloud.Function.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.cloud.FunctionProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.cloud.Function.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.cloud.Function.Initializer.parameter.id"></a>

- *Type:* string

---

##### `inflight`<sup>Required</sup> <a name="inflight" id="@monadahq/wingsdk.cloud.Function.Initializer.parameter.inflight"></a>

- *Type:* @monadahq/wingsdk.core.Inflight

---

##### `props`<sup>Optional</sup> <a name="props" id="@monadahq/wingsdk.cloud.Function.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.cloud.FunctionProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.Function.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.cloud.Function.addEnvironment">addEnvironment</a></code> | Add an environment variable to the function. |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.cloud.Function.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addEnvironment` <a name="addEnvironment" id="@monadahq/wingsdk.cloud.Function.addEnvironment"></a>

```typescript
public addEnvironment(_key: string, _value: string): void
```

Add an environment variable to the function.

###### `_key`<sup>Required</sup> <a name="_key" id="@monadahq/wingsdk.cloud.Function.addEnvironment.parameter._key"></a>

- *Type:* string

---

###### `_value`<sup>Required</sup> <a name="_value" id="@monadahq/wingsdk.cloud.Function.addEnvironment.parameter._value"></a>

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


### Function <a name="Function" id="@monadahq/wingsdk.sim.Function"></a>

- *Implements:* @monadahq/wingsdk.sim.IResource

Simulator implementation of `cloud.Function`.

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.sim.Function.Initializer"></a>

```typescript
import { sim } from '@monadahq/wingsdk'

new sim.Function(scope: Construct, id: string, inflight: Inflight, props: FunctionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.sim.Function.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.sim.Function.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.sim.Function.Initializer.parameter.inflight">inflight</a></code> | <code>@monadahq/wingsdk.core.Inflight</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.sim.Function.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.cloud.FunctionProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.sim.Function.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.sim.Function.Initializer.parameter.id"></a>

- *Type:* string

---

##### `inflight`<sup>Required</sup> <a name="inflight" id="@monadahq/wingsdk.sim.Function.Initializer.parameter.inflight"></a>

- *Type:* @monadahq/wingsdk.core.Inflight

---

##### `props`<sup>Required</sup> <a name="props" id="@monadahq/wingsdk.sim.Function.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.cloud.FunctionProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.sim.Function.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.sim.Function.addEnvironment">addEnvironment</a></code> | Add an environment variable to the function. |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.sim.Function.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addEnvironment` <a name="addEnvironment" id="@monadahq/wingsdk.sim.Function.addEnvironment"></a>

```typescript
public addEnvironment(name: string, value: string): void
```

Add an environment variable to the function.

###### `name`<sup>Required</sup> <a name="name" id="@monadahq/wingsdk.sim.Function.addEnvironment.parameter.name"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@monadahq/wingsdk.sim.Function.addEnvironment.parameter.value"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.sim.Function.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.sim.Function.isConstruct"></a>

```typescript
import { sim } from '@monadahq/wingsdk'

sim.Function.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.sim.Function.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.sim.Function.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@monadahq/wingsdk.sim.Function.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.sim.Function.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@monadahq/wingsdk.sim.Function.property.stateful"></a>

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

AWS implementation of `cloud.Function`.

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.tfaws.Function.Initializer"></a>

```typescript
import { tfaws } from '@monadahq/wingsdk'

new tfaws.Function(scope: Construct, id: string, inflight: Inflight, props: FunctionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.tfaws.Function.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.tfaws.Function.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.tfaws.Function.Initializer.parameter.inflight">inflight</a></code> | <code>@monadahq/wingsdk.core.Inflight</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.tfaws.Function.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.cloud.FunctionProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.tfaws.Function.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.tfaws.Function.Initializer.parameter.id"></a>

- *Type:* string

---

##### `inflight`<sup>Required</sup> <a name="inflight" id="@monadahq/wingsdk.tfaws.Function.Initializer.parameter.inflight"></a>

- *Type:* @monadahq/wingsdk.core.Inflight

---

##### `props`<sup>Required</sup> <a name="props" id="@monadahq/wingsdk.tfaws.Function.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.cloud.FunctionProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.tfaws.Function.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.tfaws.Function.addEnvironment">addEnvironment</a></code> | Add an environment variable to the function. |
| <code><a href="#@monadahq/wingsdk.tfaws.Function.addPolicyStatements">addPolicyStatements</a></code> | Add a policy statement to the Lambda role. |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.tfaws.Function.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addEnvironment` <a name="addEnvironment" id="@monadahq/wingsdk.tfaws.Function.addEnvironment"></a>

```typescript
public addEnvironment(name: string, value: string): void
```

Add an environment variable to the function.

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

Add a policy statement to the Lambda role.

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

Functionality shared between all `Function` implementations.

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.cloud.FunctionBase.Initializer"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

new cloud.FunctionBase(scope: Construct, id: string, inflight: Inflight, props: FunctionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.FunctionBase.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.cloud.FunctionBase.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.cloud.FunctionBase.Initializer.parameter.inflight">inflight</a></code> | <code>@monadahq/wingsdk.core.Inflight</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.cloud.FunctionBase.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.cloud.FunctionProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.cloud.FunctionBase.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.cloud.FunctionBase.Initializer.parameter.id"></a>

- *Type:* string

---

##### `inflight`<sup>Required</sup> <a name="inflight" id="@monadahq/wingsdk.cloud.FunctionBase.Initializer.parameter.inflight"></a>

- *Type:* @monadahq/wingsdk.core.Inflight

---

##### `props`<sup>Required</sup> <a name="props" id="@monadahq/wingsdk.cloud.FunctionBase.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.cloud.FunctionProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.FunctionBase.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.cloud.FunctionBase.addEnvironment">addEnvironment</a></code> | Add an environment variable to the function. |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.cloud.FunctionBase.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addEnvironment` <a name="addEnvironment" id="@monadahq/wingsdk.cloud.FunctionBase.addEnvironment"></a>

```typescript
public addEnvironment(key: string, value: string): void
```

Add an environment variable to the function.

###### `key`<sup>Required</sup> <a name="key" id="@monadahq/wingsdk.cloud.FunctionBase.addEnvironment.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@monadahq/wingsdk.cloud.FunctionBase.addEnvironment.parameter.value"></a>

- *Type:* string

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

Represents a text file that should be synthesized in the app's outdir.

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
| <code><a href="#@monadahq/wingsdk.fs.JsonFile.save">save</a></code> | Render the contents of the file and save it to the user's file system. |

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

Render the contents of the file and save it to the user's file system.

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
| <code><a href="#@monadahq/wingsdk.fs.JsonFile.property.filePath">filePath</a></code> | <code>string</code> | The file's relative path to the output directory. |

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

The file's relative path to the output directory.

---


### Queue <a name="Queue" id="@monadahq/wingsdk.cloud.Queue"></a>

Represents a serverless queue.

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
| <code><a href="#@monadahq/wingsdk.cloud.Queue.onMessage">onMessage</a></code> | Create a function to consume messages from this queue. |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.cloud.Queue.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `onMessage` <a name="onMessage" id="@monadahq/wingsdk.cloud.Queue.onMessage"></a>

```typescript
public onMessage(_inflight: Inflight, _props?: QueueOnMessageProps): Function
```

Create a function to consume messages from this queue.

###### `_inflight`<sup>Required</sup> <a name="_inflight" id="@monadahq/wingsdk.cloud.Queue.onMessage.parameter._inflight"></a>

- *Type:* @monadahq/wingsdk.core.Inflight

---

###### `_props`<sup>Optional</sup> <a name="_props" id="@monadahq/wingsdk.cloud.Queue.onMessage.parameter._props"></a>

- *Type:* @monadahq/wingsdk.cloud.QueueOnMessageProps

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


### Queue <a name="Queue" id="@monadahq/wingsdk.sim.Queue"></a>

- *Implements:* @monadahq/wingsdk.sim.IResource

Simulator implementation of `cloud.Queue`.

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.sim.Queue.Initializer"></a>

```typescript
import { sim } from '@monadahq/wingsdk'

new sim.Queue(scope: Construct, id: string, props?: QueueProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.sim.Queue.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.sim.Queue.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@monadahq/wingsdk.sim.Queue.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.cloud.QueueProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.sim.Queue.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.sim.Queue.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="@monadahq/wingsdk.sim.Queue.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.cloud.QueueProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.sim.Queue.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.sim.Queue.onMessage">onMessage</a></code> | Create a function to consume messages from this queue. |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.sim.Queue.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `onMessage` <a name="onMessage" id="@monadahq/wingsdk.sim.Queue.onMessage"></a>

```typescript
public onMessage(inflight: Inflight, props?: QueueOnMessageProps): Function
```

Create a function to consume messages from this queue.

###### `inflight`<sup>Required</sup> <a name="inflight" id="@monadahq/wingsdk.sim.Queue.onMessage.parameter.inflight"></a>

- *Type:* @monadahq/wingsdk.core.Inflight

---

###### `props`<sup>Optional</sup> <a name="props" id="@monadahq/wingsdk.sim.Queue.onMessage.parameter.props"></a>

- *Type:* @monadahq/wingsdk.cloud.QueueOnMessageProps

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.sim.Queue.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@monadahq/wingsdk.sim.Queue.isConstruct"></a>

```typescript
import { sim } from '@monadahq/wingsdk'

sim.Queue.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@monadahq/wingsdk.sim.Queue.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.sim.Queue.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@monadahq/wingsdk.sim.Queue.property.stateful">stateful</a></code> | <code>boolean</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.sim.Queue.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@monadahq/wingsdk.sim.Queue.property.stateful"></a>

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

AWS implementation of `cloud.Queue`.

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
| <code><a href="#@monadahq/wingsdk.tfaws.Queue.onMessage">onMessage</a></code> | Create a function to consume messages from this queue. |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.tfaws.Queue.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `onMessage` <a name="onMessage" id="@monadahq/wingsdk.tfaws.Queue.onMessage"></a>

```typescript
public onMessage(inflight: Inflight, props?: QueueOnMessageProps): Function
```

Create a function to consume messages from this queue.

###### `inflight`<sup>Required</sup> <a name="inflight" id="@monadahq/wingsdk.tfaws.Queue.onMessage.parameter.inflight"></a>

- *Type:* @monadahq/wingsdk.core.Inflight

---

###### `props`<sup>Optional</sup> <a name="props" id="@monadahq/wingsdk.tfaws.Queue.onMessage.parameter.props"></a>

- *Type:* @monadahq/wingsdk.cloud.QueueOnMessageProps

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

Functionality shared between all `Queue` implementations.

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.cloud.QueueBase.Initializer"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

new cloud.QueueBase(scope: Construct, id: string, props?: QueueProps)
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

##### `props`<sup>Optional</sup> <a name="props" id="@monadahq/wingsdk.cloud.QueueBase.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.cloud.QueueProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.QueueBase.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@monadahq/wingsdk.cloud.QueueBase.onMessage">onMessage</a></code> | Create a function to consume messages from this queue. |

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.cloud.QueueBase.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `onMessage` <a name="onMessage" id="@monadahq/wingsdk.cloud.QueueBase.onMessage"></a>

```typescript
public onMessage(inflight: Inflight, props?: QueueOnMessageProps): Function
```

Create a function to consume messages from this queue.

###### `inflight`<sup>Required</sup> <a name="inflight" id="@monadahq/wingsdk.cloud.QueueBase.onMessage.parameter.inflight"></a>

- *Type:* @monadahq/wingsdk.core.Inflight

---

###### `props`<sup>Optional</sup> <a name="props" id="@monadahq/wingsdk.cloud.QueueBase.onMessage.parameter.props"></a>

- *Type:* @monadahq/wingsdk.cloud.QueueOnMessageProps

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

- *Implements:* @monadahq/wingsdk.core.ICapturable

Shared behavior between all Wing SDK resources.

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

---

##### `toString` <a name="toString" id="@monadahq/wingsdk.cloud.Resource.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

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

Represents a text file that should be synthesized in the app's outdir.

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
| <code><a href="#@monadahq/wingsdk.fs.TextFile.save">save</a></code> | Render the contents of the file and save it to the user's file system. |
| <code><a href="#@monadahq/wingsdk.fs.TextFile.addLine">addLine</a></code> | Append a line to the text file's contents. |

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

Render the contents of the file and save it to the user's file system.

###### `outdir`<sup>Required</sup> <a name="outdir" id="@monadahq/wingsdk.fs.TextFile.save.parameter.outdir"></a>

- *Type:* string

---

##### `addLine` <a name="addLine" id="@monadahq/wingsdk.fs.TextFile.addLine"></a>

```typescript
public addLine(line: string): void
```

Append a line to the text file's contents.

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
| <code><a href="#@monadahq/wingsdk.fs.TextFile.property.filePath">filePath</a></code> | <code>string</code> | The file's relative path to the output directory. |

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

The file's relative path to the output directory.

---


## Structs <a name="Structs" id="Structs"></a>

### AppProps <a name="AppProps" id="@monadahq/wingsdk.core.AppProps"></a>

Props for `App`.

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
- *Default:* no state file

The path to a state file which will track all synthesized files.

If a
statefile is not specified, we won't be able to remove extrenous files.

---

### AppProps <a name="AppProps" id="@monadahq/wingsdk.sim.AppProps"></a>

Props for `App`.

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.sim.AppProps.Initializer"></a>

```typescript
import { sim } from '@monadahq/wingsdk'

const appProps: sim.AppProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.sim.AppProps.property.outdir">outdir</a></code> | <code>string</code> | Directory where artifacts are synthesized to. |

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="@monadahq/wingsdk.sim.AppProps.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

Directory where artifacts are synthesized to.

---

### BucketProps <a name="BucketProps" id="@monadahq/wingsdk.cloud.BucketProps"></a>

Properties for `Bucket`.

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.cloud.BucketProps.Initializer"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

const bucketProps: cloud.BucketProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.BucketProps.property.public">public</a></code> | <code>boolean</code> | Whether the bucket's objects should be publicly accessible. |

---

##### `public`<sup>Optional</sup> <a name="public" id="@monadahq/wingsdk.cloud.BucketProps.property.public"></a>

```typescript
public readonly public: boolean;
```

- *Type:* boolean
- *Default:* false

Whether the bucket's objects should be publicly accessible.

---

### Capture <a name="Capture" id="@monadahq/wingsdk.core.Capture"></a>

Capture information.

A capture is a reference from an Inflight to a
construction-time object or value.

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.core.Capture.Initializer"></a>

```typescript
import { core } from '@monadahq/wingsdk'

const capture: core.Capture = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.Capture.property.methods">methods</a></code> | <code>string[]</code> | Which methods are called on the captured object. |
| <code><a href="#@monadahq/wingsdk.core.Capture.property.obj">obj</a></code> | <code>any</code> | The captured object. |

---

##### `methods`<sup>Optional</sup> <a name="methods" id="@monadahq/wingsdk.core.Capture.property.methods"></a>

```typescript
public readonly methods: string[];
```

- *Type:* string[]

Which methods are called on the captured object.

---

##### `obj`<sup>Required</sup> <a name="obj" id="@monadahq/wingsdk.core.Capture.property.obj"></a>

```typescript
public readonly obj: any;
```

- *Type:* any

The captured object.

---

### CaptureMetadata <a name="CaptureMetadata" id="@monadahq/wingsdk.core.CaptureMetadata"></a>

Extra metadata associated with a capture.

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.core.CaptureMetadata.Initializer"></a>

```typescript
import { core } from '@monadahq/wingsdk'

const captureMetadata: core.CaptureMetadata = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.CaptureMetadata.property.methods">methods</a></code> | <code>string[]</code> | Which methods are called on the captured object. |

---

##### `methods`<sup>Optional</sup> <a name="methods" id="@monadahq/wingsdk.core.CaptureMetadata.property.methods"></a>

```typescript
public readonly methods: string[];
```

- *Type:* string[]

Which methods are called on the captured object.

---

### FunctionProps <a name="FunctionProps" id="@monadahq/wingsdk.cloud.FunctionProps"></a>

Properties for `Function`.

This is the type users see when constructing a cloud.Function instance.

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.cloud.FunctionProps.Initializer"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

const functionProps: cloud.FunctionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.FunctionProps.property.env">env</a></code> | <code>{[ key: string ]: string}</code> | Environment variables to pass to the function. |

---

##### `env`<sup>Optional</sup> <a name="env" id="@monadahq/wingsdk.cloud.FunctionProps.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* No environment variables.

Environment variables to pass to the function.

---

### InflightBundleOptions <a name="InflightBundleOptions" id="@monadahq/wingsdk.core.InflightBundleOptions"></a>

Options for `Inflight.bundle`.

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.core.InflightBundleOptions.Initializer"></a>

```typescript
import { core } from '@monadahq/wingsdk'

const inflightBundleOptions: core.InflightBundleOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.InflightBundleOptions.property.captureClients">captureClients</a></code> | <code>{[ key: string ]: @monadahq/wingsdk.core.Code}</code> | A map of capture clients that can be bundled with the Inflight's code. |
| <code><a href="#@monadahq/wingsdk.core.InflightBundleOptions.property.captureScope">captureScope</a></code> | <code>constructs.IConstruct</code> | Associate the inflight bundle with a given capture scope. |
| <code><a href="#@monadahq/wingsdk.core.InflightBundleOptions.property.external">external</a></code> | <code>string[]</code> | List of dependencies to exclude from the bundle. |

---

##### `captureClients`<sup>Required</sup> <a name="captureClients" id="@monadahq/wingsdk.core.InflightBundleOptions.property.captureClients"></a>

```typescript
public readonly captureClients: {[ key: string ]: Code};
```

- *Type:* {[ key: string ]: @monadahq/wingsdk.core.Code}

A map of capture clients that can be bundled with the Inflight's code.

---

##### `captureScope`<sup>Optional</sup> <a name="captureScope" id="@monadahq/wingsdk.core.InflightBundleOptions.property.captureScope"></a>

```typescript
public readonly captureScope: IConstruct;
```

- *Type:* constructs.IConstruct

Associate the inflight bundle with a given capture scope.

---

##### `external`<sup>Optional</sup> <a name="external" id="@monadahq/wingsdk.core.InflightBundleOptions.property.external"></a>

```typescript
public readonly external: string[];
```

- *Type:* string[]

List of dependencies to exclude from the bundle.

---

### InflightProps <a name="InflightProps" id="@monadahq/wingsdk.core.InflightProps"></a>

Options for `Inflight`.

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.core.InflightProps.Initializer"></a>

```typescript
import { core } from '@monadahq/wingsdk'

const inflightProps: core.InflightProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.InflightProps.property.code">code</a></code> | <code>@monadahq/wingsdk.core.Code</code> | Reference to code containing the entrypoint function. |
| <code><a href="#@monadahq/wingsdk.core.InflightProps.property.entrypoint">entrypoint</a></code> | <code>string</code> | Name of the exported function to run. |
| <code><a href="#@monadahq/wingsdk.core.InflightProps.property.captures">captures</a></code> | <code>{[ key: string ]: @monadahq/wingsdk.core.Capture}</code> | Capture information. |

---

##### `code`<sup>Required</sup> <a name="code" id="@monadahq/wingsdk.core.InflightProps.property.code"></a>

```typescript
public readonly code: Code;
```

- *Type:* @monadahq/wingsdk.core.Code

Reference to code containing the entrypoint function.

---

##### `entrypoint`<sup>Required</sup> <a name="entrypoint" id="@monadahq/wingsdk.core.InflightProps.property.entrypoint"></a>

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


##### `captures`<sup>Optional</sup> <a name="captures" id="@monadahq/wingsdk.core.InflightProps.property.captures"></a>

```typescript
public readonly captures: {[ key: string ]: Capture};
```

- *Type:* {[ key: string ]: @monadahq/wingsdk.core.Capture}
- *Default:* No captures

Capture information.

During runtime, a map containing all captured values
will be passed as the first argument of the entrypoint function.

Each key here will be the key for the final value in the map.

---

### JsonFileProps <a name="JsonFileProps" id="@monadahq/wingsdk.fs.JsonFileProps"></a>

Props for `JsonFile`.

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

AWS IAM Policy Statement.

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.tfaws.PolicyStatement.Initializer"></a>

```typescript
import { tfaws } from '@monadahq/wingsdk'

const policyStatement: tfaws.PolicyStatement = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.tfaws.PolicyStatement.property.action">action</a></code> | <code>string[]</code> | Actions. |
| <code><a href="#@monadahq/wingsdk.tfaws.PolicyStatement.property.effect">effect</a></code> | <code>string</code> | Effect ("Allow" or "Deny"). |
| <code><a href="#@monadahq/wingsdk.tfaws.PolicyStatement.property.resource">resource</a></code> | <code>string \| string[]</code> | Resources. |

---

##### `action`<sup>Optional</sup> <a name="action" id="@monadahq/wingsdk.tfaws.PolicyStatement.property.action"></a>

```typescript
public readonly action: string[];
```

- *Type:* string[]

Actions.

---

##### `effect`<sup>Optional</sup> <a name="effect" id="@monadahq/wingsdk.tfaws.PolicyStatement.property.effect"></a>

```typescript
public readonly effect: string;
```

- *Type:* string

Effect ("Allow" or "Deny").

---

##### `resource`<sup>Optional</sup> <a name="resource" id="@monadahq/wingsdk.tfaws.PolicyStatement.property.resource"></a>

```typescript
public readonly resource: string | string[];
```

- *Type:* string | string[]

Resources.

---

### QueueOnMessageProps <a name="QueueOnMessageProps" id="@monadahq/wingsdk.cloud.QueueOnMessageProps"></a>

Options for Queue.onMessage.

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.cloud.QueueOnMessageProps.Initializer"></a>

```typescript
import { cloud } from '@monadahq/wingsdk'

const queueOnMessageProps: cloud.QueueOnMessageProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.QueueOnMessageProps.property.env">env</a></code> | <code>{[ key: string ]: string}</code> | Environment variables to pass to the function. |
| <code><a href="#@monadahq/wingsdk.cloud.QueueOnMessageProps.property.batchSize">batchSize</a></code> | <code>number</code> | The maximum number of messages to send to subscribers at once. |

---

##### `env`<sup>Optional</sup> <a name="env" id="@monadahq/wingsdk.cloud.QueueOnMessageProps.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* No environment variables.

Environment variables to pass to the function.

---

##### `batchSize`<sup>Optional</sup> <a name="batchSize" id="@monadahq/wingsdk.cloud.QueueOnMessageProps.property.batchSize"></a>

```typescript
public readonly batchSize: number;
```

- *Type:* number
- *Default:* 1

The maximum number of messages to send to subscribers at once.

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
| <code><a href="#@monadahq/wingsdk.cloud.QueueProps.property.timeout">timeout</a></code> | <code>@monadahq/wingsdk.core.Duration</code> | How long a queue's consumers have to process a message. |

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@monadahq/wingsdk.cloud.QueueProps.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* @monadahq/wingsdk.core.Duration
- *Default:* Duration.fromSeconds(10)

How long a queue's consumers have to process a message.

---

### SynthesizerProps <a name="SynthesizerProps" id="@monadahq/wingsdk.core.SynthesizerProps"></a>

Props for `Synth`.

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.core.SynthesizerProps.Initializer"></a>

```typescript
import { core } from '@monadahq/wingsdk'

const synthesizerProps: core.SynthesizerProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.SynthesizerProps.property.customFactory">customFactory</a></code> | <code>@monadahq/polycons.IPolyconFactory</code> | A custom factory to resolve polycons. |
| <code><a href="#@monadahq/wingsdk.core.SynthesizerProps.property.outdir">outdir</a></code> | <code>string</code> | The output directory into which to emit synthesized artifacts. |

---

##### `customFactory`<sup>Optional</sup> <a name="customFactory" id="@monadahq/wingsdk.core.SynthesizerProps.property.customFactory"></a>

```typescript
public readonly customFactory: IPolyconFactory;
```

- *Type:* @monadahq/polycons.IPolyconFactory
- *Default:* use the default polycon factory included in the Wing SDK

A custom factory to resolve polycons.

---

##### `outdir`<sup>Optional</sup> <a name="outdir" id="@monadahq/wingsdk.core.SynthesizerProps.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string
- *Default:* "." (the current working directory)

The output directory into which to emit synthesized artifacts.

---

### TextFileProps <a name="TextFileProps" id="@monadahq/wingsdk.fs.TextFileProps"></a>

Props for `TextFile`.

#### Initializer <a name="Initializer" id="@monadahq/wingsdk.fs.TextFileProps.Initializer"></a>

```typescript
import { fs } from '@monadahq/wingsdk'

const textFileProps: fs.TextFileProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.fs.TextFileProps.property.lines">lines</a></code> | <code>string[]</code> | The lines of text that will be serialized into the file during synthesis. |

---

##### `lines`<sup>Optional</sup> <a name="lines" id="@monadahq/wingsdk.fs.TextFileProps.property.lines"></a>

```typescript
public readonly lines: string[];
```

- *Type:* string[]
- *Default:* []

The lines of text that will be serialized into the file during synthesis.

They will be joined with newline characters.

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
| <code><a href="#@monadahq/wingsdk.core.Code.property.hash">hash</a></code> | <code>string</code> | Generate a hash of the code contents. |
| <code><a href="#@monadahq/wingsdk.core.Code.property.language">language</a></code> | <code>@monadahq/wingsdk.core.Language</code> | The language of the code. |
| <code><a href="#@monadahq/wingsdk.core.Code.property.path">path</a></code> | <code>string</code> | A path to the code in the user's file system that can be referenced for bundling purposes. |
| <code><a href="#@monadahq/wingsdk.core.Code.property.text">text</a></code> | <code>string</code> | The code contents. |

---

##### `hash`<sup>Required</sup> <a name="hash" id="@monadahq/wingsdk.core.Code.property.hash"></a>

```typescript
public readonly hash: string;
```

- *Type:* string

Generate a hash of the code contents.

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

Represents a length of time.


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.core.Duration.fromHours">fromHours</a></code> | Create a Duration representing an amount of hours. |
| <code><a href="#@monadahq/wingsdk.core.Duration.fromMinutes">fromMinutes</a></code> | Create a Duration representing an amount of minutes. |
| <code><a href="#@monadahq/wingsdk.core.Duration.fromSeconds">fromSeconds</a></code> | Create a Duration representing an amount of seconds. |

---

##### `fromHours` <a name="fromHours" id="@monadahq/wingsdk.core.Duration.fromHours"></a>

```typescript
import { core } from '@monadahq/wingsdk'

core.Duration.fromHours(amount: number)
```

Create a Duration representing an amount of hours.

###### `amount`<sup>Required</sup> <a name="amount" id="@monadahq/wingsdk.core.Duration.fromHours.parameter.amount"></a>

- *Type:* number

the amount of Hours the `Duration` will represent.

---

##### `fromMinutes` <a name="fromMinutes" id="@monadahq/wingsdk.core.Duration.fromMinutes"></a>

```typescript
import { core } from '@monadahq/wingsdk'

core.Duration.fromMinutes(amount: number)
```

Create a Duration representing an amount of minutes.

###### `amount`<sup>Required</sup> <a name="amount" id="@monadahq/wingsdk.core.Duration.fromMinutes.parameter.amount"></a>

- *Type:* number

the amount of Minutes the `Duration` will represent.

---

##### `fromSeconds` <a name="fromSeconds" id="@monadahq/wingsdk.core.Duration.fromSeconds"></a>

```typescript
import { core } from '@monadahq/wingsdk'

core.Duration.fromSeconds(amount: number)
```

Create a Duration representing an amount of seconds.

###### `amount`<sup>Required</sup> <a name="amount" id="@monadahq/wingsdk.core.Duration.fromSeconds.parameter.amount"></a>

- *Type:* number

the amount of Seconds the `Duration` will represent.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.Duration.property.hours">hours</a></code> | <code>number</code> | Return the total number of hours in this Duration. |
| <code><a href="#@monadahq/wingsdk.core.Duration.property.minutes">minutes</a></code> | <code>number</code> | Return the total number of minutes in this Duration. |
| <code><a href="#@monadahq/wingsdk.core.Duration.property.seconds">seconds</a></code> | <code>number</code> | Return the total number of seconds in this Duration. |

---

##### `hours`<sup>Required</sup> <a name="hours" id="@monadahq/wingsdk.core.Duration.property.hours"></a>

```typescript
public readonly hours: number;
```

- *Type:* number

Return the total number of hours in this Duration.

---

##### `minutes`<sup>Required</sup> <a name="minutes" id="@monadahq/wingsdk.core.Duration.property.minutes"></a>

```typescript
public readonly minutes: number;
```

- *Type:* number

Return the total number of minutes in this Duration.

---

##### `seconds`<sup>Required</sup> <a name="seconds" id="@monadahq/wingsdk.core.Duration.property.seconds"></a>

```typescript
public readonly seconds: number;
```

- *Type:* number

Return the total number of seconds in this Duration.

---


### Inflight <a name="Inflight" id="@monadahq/wingsdk.core.Inflight"></a>

Represents a unit of application code that can be executed by a cloud resource.

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.core.Inflight.Initializer"></a>

```typescript
import { core } from '@monadahq/wingsdk'

new core.Inflight(props: InflightProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.Inflight.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.core.InflightProps</code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@monadahq/wingsdk.core.Inflight.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.core.InflightProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.core.Inflight.bundle">bundle</a></code> | Bundle this inflight process so that it can be used in the given capture scope. |
| <code><a href="#@monadahq/wingsdk.core.Inflight.makeClients">makeClients</a></code> | Resolve this inflight's captured objects into a map of clients that be safely referenced at runtime. |

---

##### `bundle` <a name="bundle" id="@monadahq/wingsdk.core.Inflight.bundle"></a>

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

###### `options`<sup>Required</sup> <a name="options" id="@monadahq/wingsdk.core.Inflight.bundle.parameter.options"></a>

- *Type:* @monadahq/wingsdk.core.InflightBundleOptions

---

##### `makeClients` <a name="makeClients" id="@monadahq/wingsdk.core.Inflight.makeClients"></a>

```typescript
public makeClients(captureScope: IConstruct): {[ key: string ]: Code}
```

Resolve this inflight's captured objects into a map of clients that be safely referenced at runtime.

###### `captureScope`<sup>Required</sup> <a name="captureScope" id="@monadahq/wingsdk.core.Inflight.makeClients.parameter.captureScope"></a>

- *Type:* constructs.IConstruct

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.core.Inflight.property.captures">captures</a></code> | <code>{[ key: string ]: @monadahq/wingsdk.core.Capture}</code> | Capture information. |
| <code><a href="#@monadahq/wingsdk.core.Inflight.property.code">code</a></code> | <code>@monadahq/wingsdk.core.Code</code> | Reference to code containing the entrypoint function. |
| <code><a href="#@monadahq/wingsdk.core.Inflight.property.entrypoint">entrypoint</a></code> | <code>string</code> | Name of the exported function which will be run. |

---

##### `captures`<sup>Required</sup> <a name="captures" id="@monadahq/wingsdk.core.Inflight.property.captures"></a>

```typescript
public readonly captures: {[ key: string ]: Capture};
```

- *Type:* {[ key: string ]: @monadahq/wingsdk.core.Capture}

Capture information.

During runtime, a map containing all captured values
will be passed as the first argument of the entrypoint function.

Each key here will be the key for the final value in the map.

---

##### `code`<sup>Required</sup> <a name="code" id="@monadahq/wingsdk.core.Inflight.property.code"></a>

```typescript
public readonly code: Code;
```

- *Type:* @monadahq/wingsdk.core.Code

Reference to code containing the entrypoint function.

---

##### `entrypoint`<sup>Required</sup> <a name="entrypoint" id="@monadahq/wingsdk.core.Inflight.property.entrypoint"></a>

```typescript
public readonly entrypoint: string;
```

- *Type:* string

Name of the exported function which will be run.

---


### InflightClient <a name="InflightClient" id="@monadahq/wingsdk.core.InflightClient"></a>

Utility class with functions about inflight clients.


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.core.InflightClient.for">for</a></code> | Creates a `Code` instance with code for creating an inflight client. |

---

##### `for` <a name="for" id="@monadahq/wingsdk.core.InflightClient.for"></a>

```typescript
import { core } from '@monadahq/wingsdk'

core.InflightClient.for(filename: string, clientClass: string, args: string[])
```

Creates a `Code` instance with code for creating an inflight client.

###### `filename`<sup>Required</sup> <a name="filename" id="@monadahq/wingsdk.core.InflightClient.for.parameter.filename"></a>

- *Type:* string

---

###### `clientClass`<sup>Required</sup> <a name="clientClass" id="@monadahq/wingsdk.core.InflightClient.for.parameter.clientClass"></a>

- *Type:* string

---

###### `args`<sup>Required</sup> <a name="args" id="@monadahq/wingsdk.core.InflightClient.for.parameter.args"></a>

- *Type:* string[]

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
| <code><a href="#@monadahq/wingsdk.core.NodeJsCode.property.hash">hash</a></code> | <code>string</code> | Generate a hash of the code contents. |
| <code><a href="#@monadahq/wingsdk.core.NodeJsCode.property.language">language</a></code> | <code>@monadahq/wingsdk.core.Language</code> | The language of the code. |
| <code><a href="#@monadahq/wingsdk.core.NodeJsCode.property.path">path</a></code> | <code>string</code> | A path to the code in the user's file system that can be referenced for bundling purposes. |
| <code><a href="#@monadahq/wingsdk.core.NodeJsCode.property.text">text</a></code> | <code>string</code> | The code contents. |

---

##### `hash`<sup>Required</sup> <a name="hash" id="@monadahq/wingsdk.core.NodeJsCode.property.hash"></a>

```typescript
public readonly hash: string;
```

- *Type:* string

Generate a hash of the code contents.

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

A path to the code in the user's file system that can be referenced for bundling purposes.

---

##### `text`<sup>Required</sup> <a name="text" id="@monadahq/wingsdk.core.NodeJsCode.property.text"></a>

```typescript
public readonly text: string;
```

- *Type:* string

The code contents.

---


### PolyconFactory <a name="PolyconFactory" id="@monadahq/wingsdk.sim.PolyconFactory"></a>

- *Implements:* @monadahq/polycons.IPolyconFactory

Polycon factory which resolves `cloud` resources into simulated resources.

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.sim.PolyconFactory.Initializer"></a>

```typescript
import { sim } from '@monadahq/wingsdk'

new sim.PolyconFactory()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.sim.PolyconFactory.resolve">resolve</a></code> | Resolve the parameters needed for creating a specific polycon into a concrete construct. |

---

##### `resolve` <a name="resolve" id="@monadahq/wingsdk.sim.PolyconFactory.resolve"></a>

```typescript
public resolve(polyconId: string, scope: IConstruct, id: string, args: any): IConstruct
```

Resolve the parameters needed for creating a specific polycon into a concrete construct.

###### `polyconId`<sup>Required</sup> <a name="polyconId" id="@monadahq/wingsdk.sim.PolyconFactory.resolve.parameter.polyconId"></a>

- *Type:* string

---

###### `scope`<sup>Required</sup> <a name="scope" id="@monadahq/wingsdk.sim.PolyconFactory.resolve.parameter.scope"></a>

- *Type:* constructs.IConstruct

---

###### `id`<sup>Required</sup> <a name="id" id="@monadahq/wingsdk.sim.PolyconFactory.resolve.parameter.id"></a>

- *Type:* string

---

###### `args`<sup>Required</sup> <a name="args" id="@monadahq/wingsdk.sim.PolyconFactory.resolve.parameter.args"></a>

- *Type:* any

---




### PolyconFactory <a name="PolyconFactory" id="@monadahq/wingsdk.tfaws.PolyconFactory"></a>

- *Implements:* @monadahq/polycons.IPolyconFactory

Polycon factory which resolves `cloud` resources into AWS resources.

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
public resolve(polyconId: string, scope: IConstruct, id: string, args: any): IConstruct
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

###### `args`<sup>Required</sup> <a name="args" id="@monadahq/wingsdk.tfaws.PolyconFactory.resolve.parameter.args"></a>

- *Type:* any

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


### Synthesizer <a name="Synthesizer" id="@monadahq/wingsdk.sim.Synthesizer"></a>

Simulator synthesizer.

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.sim.Synthesizer.Initializer"></a>

```typescript
import { sim } from '@monadahq/wingsdk'

new sim.Synthesizer(props?: SynthesizerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.sim.Synthesizer.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.core.SynthesizerProps</code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@monadahq/wingsdk.sim.Synthesizer.Initializer.parameter.props"></a>

- *Type:* @monadahq/wingsdk.core.SynthesizerProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.sim.Synthesizer.synth">synth</a></code> | Synthesize the app. |

---

##### `synth` <a name="synth" id="@monadahq/wingsdk.sim.Synthesizer.synth"></a>

```typescript
public synth(): void
```

Synthesize the app.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.sim.Synthesizer.property.outdir">outdir</a></code> | <code>string</code> | Path to the output directory. |
| <code><a href="#@monadahq/wingsdk.sim.Synthesizer.property.root">root</a></code> | <code>constructs.Construct</code> | Place in the construct tree where all users constructs will get added. |

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="@monadahq/wingsdk.sim.Synthesizer.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

Path to the output directory.

For example, if synthesizing to terraform,
`cdktf.out` will be created in here.

---

##### `root`<sup>Required</sup> <a name="root" id="@monadahq/wingsdk.sim.Synthesizer.property.root"></a>

```typescript
public readonly root: Construct;
```

- *Type:* constructs.Construct

Place in the construct tree where all users constructs will get added.

---


### Synthesizer <a name="Synthesizer" id="@monadahq/wingsdk.tfaws.Synthesizer"></a>

CDK for Terraform synthesizer.

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.tfaws.Synthesizer.Initializer"></a>

```typescript
import { tfaws } from '@monadahq/wingsdk'

new tfaws.Synthesizer(props?: SynthesizerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.tfaws.Synthesizer.Initializer.parameter.props">props</a></code> | <code>@monadahq/wingsdk.core.SynthesizerProps</code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@monadahq/wingsdk.tfaws.Synthesizer.Initializer.parameter.props"></a>

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


### Testing <a name="Testing" id="@monadahq/wingsdk.core.Testing"></a>

Testing utilities.

#### Initializers <a name="Initializers" id="@monadahq/wingsdk.core.Testing.Initializer"></a>

```typescript
import { core } from '@monadahq/wingsdk'

new core.Testing()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.core.Testing.inspectPrebundledCode">inspectPrebundledCode</a></code> | Obtain a reference to the prebundled Code for a given capture scope. |

---

##### `inspectPrebundledCode` <a name="inspectPrebundledCode" id="@monadahq/wingsdk.core.Testing.inspectPrebundledCode"></a>

```typescript
import { core } from '@monadahq/wingsdk'

core.Testing.inspectPrebundledCode(captureScope: IConstruct)
```

Obtain a reference to the prebundled Code for a given capture scope.

###### `captureScope`<sup>Required</sup> <a name="captureScope" id="@monadahq/wingsdk.core.Testing.inspectPrebundledCode.parameter.captureScope"></a>

- *Type:* constructs.IConstruct

---



## Protocols <a name="Protocols" id="Protocols"></a>

### IBucketClient <a name="IBucketClient" id="@monadahq/wingsdk.cloud.IBucketClient"></a>

- *Implemented By:* @monadahq/wingsdk.cloud.IBucketClient

Inflight interface for `Bucket`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.IBucketClient.get">get</a></code> | Retrieve an object from the bucket. |
| <code><a href="#@monadahq/wingsdk.cloud.IBucketClient.put">put</a></code> | Put an object in the bucket. |

---

##### `get` <a name="get" id="@monadahq/wingsdk.cloud.IBucketClient.get"></a>

```typescript
public get(key: string): string
```

Retrieve an object from the bucket.

Throws if no object with the given key
exists.

###### `key`<sup>Required</sup> <a name="key" id="@monadahq/wingsdk.cloud.IBucketClient.get.parameter.key"></a>

- *Type:* string

---

##### `put` <a name="put" id="@monadahq/wingsdk.cloud.IBucketClient.put"></a>

```typescript
public put(key: string, body: string): void
```

Put an object in the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@monadahq/wingsdk.cloud.IBucketClient.put.parameter.key"></a>

- *Type:* string

---

###### `body`<sup>Required</sup> <a name="body" id="@monadahq/wingsdk.cloud.IBucketClient.put.parameter.body"></a>

- *Type:* string

---


### ICapturable <a name="ICapturable" id="@monadahq/wingsdk.core.ICapturable"></a>

- *Implemented By:* @monadahq/wingsdk.cloud.Bucket, @monadahq/wingsdk.cloud.BucketBase, @monadahq/wingsdk.cloud.Function, @monadahq/wingsdk.cloud.FunctionBase, @monadahq/wingsdk.cloud.Queue, @monadahq/wingsdk.cloud.QueueBase, @monadahq/wingsdk.cloud.Resource, @monadahq/wingsdk.sim.Bucket, @monadahq/wingsdk.sim.Function, @monadahq/wingsdk.sim.Queue, @monadahq/wingsdk.tfaws.Bucket, @monadahq/wingsdk.tfaws.Function, @monadahq/wingsdk.tfaws.Queue, @monadahq/wingsdk.core.ICapturable

Represents something that is capturable by an Inflight.



### IFunctionClient <a name="IFunctionClient" id="@monadahq/wingsdk.cloud.IFunctionClient"></a>

- *Implemented By:* @monadahq/wingsdk.cloud.IFunctionClient

Inflight interface for `Function`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.IFunctionClient.invoke">invoke</a></code> | Invoke the function asynchronously with a given payload. |

---

##### `invoke` <a name="invoke" id="@monadahq/wingsdk.cloud.IFunctionClient.invoke"></a>

```typescript
public invoke(payload: string): string
```

Invoke the function asynchronously with a given payload.

###### `payload`<sup>Required</sup> <a name="payload" id="@monadahq/wingsdk.cloud.IFunctionClient.invoke.parameter.payload"></a>

- *Type:* string

---


### IQueueClient <a name="IQueueClient" id="@monadahq/wingsdk.cloud.IQueueClient"></a>

- *Implemented By:* @monadahq/wingsdk.cloud.IQueueClient

Inflight interface for `Queue`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.IQueueClient.push">push</a></code> | Push a message to the queue. |

---

##### `push` <a name="push" id="@monadahq/wingsdk.cloud.IQueueClient.push"></a>

```typescript
public push(message: string): void
```

Push a message to the queue.

###### `message`<sup>Required</sup> <a name="message" id="@monadahq/wingsdk.cloud.IQueueClient.push.parameter.message"></a>

- *Type:* string

Payload to send to the queue.

---


### IResource <a name="IResource" id="@monadahq/wingsdk.sim.IResource"></a>

- *Extends:* constructs.IConstruct

- *Implemented By:* @monadahq/wingsdk.sim.Bucket, @monadahq/wingsdk.sim.Function, @monadahq/wingsdk.sim.Queue, @monadahq/wingsdk.sim.IResource

Fields shared by all resource implementations for the simulator.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@monadahq/wingsdk.sim.IResource.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@monadahq/wingsdk.sim.IResource.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

## Enums <a name="Enums" id="Enums"></a>

### BucketInflightMethods <a name="BucketInflightMethods" id="@monadahq/wingsdk.cloud.BucketInflightMethods"></a>

List of inflight operations available for `Bucket`.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.BucketInflightMethods.PUT">PUT</a></code> | `Bucket.put`. |
| <code><a href="#@monadahq/wingsdk.cloud.BucketInflightMethods.GET">GET</a></code> | `Bucket.get`. |

---

##### `PUT` <a name="PUT" id="@monadahq/wingsdk.cloud.BucketInflightMethods.PUT"></a>

`Bucket.put`.

---


##### `GET` <a name="GET" id="@monadahq/wingsdk.cloud.BucketInflightMethods.GET"></a>

`Bucket.get`.

---


### FunctionInflightMethods <a name="FunctionInflightMethods" id="@monadahq/wingsdk.cloud.FunctionInflightMethods"></a>

List of inflight operations available for `Function`.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.FunctionInflightMethods.INVOKE">INVOKE</a></code> | `Function.invoke`. |

---

##### `INVOKE` <a name="INVOKE" id="@monadahq/wingsdk.cloud.FunctionInflightMethods.INVOKE"></a>

`Function.invoke`.

---


### Language <a name="Language" id="@monadahq/wingsdk.core.Language"></a>

The language of a piece of code.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.core.Language.NODE_JS">NODE_JS</a></code> | Node.js. |

---

##### `NODE_JS` <a name="NODE_JS" id="@monadahq/wingsdk.core.Language.NODE_JS"></a>

Node.js.

---


### QueueInflightMethods <a name="QueueInflightMethods" id="@monadahq/wingsdk.cloud.QueueInflightMethods"></a>

List of inflight operations available for `Queue`.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@monadahq/wingsdk.cloud.QueueInflightMethods.PUSH">PUSH</a></code> | `Queue.push`. |

---

##### `PUSH` <a name="PUSH" id="@monadahq/wingsdk.cloud.QueueInflightMethods.PUSH"></a>

`Queue.push`.

---

