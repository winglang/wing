---
title: node
id: node
---

# API Reference <a name="API Reference" id="api-reference"></a>


## Classes <a name="Classes" id="Classes"></a>

### Node <a name="Node" id="@winglang/sdk.std.Node"></a>

The internal node of a construct.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.Node.addConnection">addConnection</a></code> | Adds a connection between two constructs. |
| <code><a href="#@winglang/sdk.std.Node.addDependency">addDependency</a></code> | Add an ordering dependency on another construct. |
| <code><a href="#@winglang/sdk.std.Node.addMetadata">addMetadata</a></code> | Adds a metadata entry to this construct. |
| <code><a href="#@winglang/sdk.std.Node.addValidation">addValidation</a></code> | Adds a validation to this construct. |
| <code><a href="#@winglang/sdk.std.Node.findAll">findAll</a></code> | Return this construct and all of its children in the given order. |
| <code><a href="#@winglang/sdk.std.Node.findChild">findChild</a></code> | Return a direct child by id. |
| <code><a href="#@winglang/sdk.std.Node.getContext">getContext</a></code> | Retrieves a value from tree context if present. Otherwise, would throw an error. |
| <code><a href="#@winglang/sdk.std.Node.lock">lock</a></code> | Locks this construct from allowing more children to be added. |
| <code><a href="#@winglang/sdk.std.Node.setContext">setContext</a></code> | This can be used to set contextual values. |
| <code><a href="#@winglang/sdk.std.Node.tryFindChild">tryFindChild</a></code> | Return a direct child by id, or undefined. |
| <code><a href="#@winglang/sdk.std.Node.tryGetContext">tryGetContext</a></code> | Retrieves a value from tree context. |
| <code><a href="#@winglang/sdk.std.Node.tryRemoveChild">tryRemoveChild</a></code> | Remove the child with the given name, if present. |
| <code><a href="#@winglang/sdk.std.Node.validate">validate</a></code> | Validates this construct. |

---

##### `addConnection` <a name="addConnection" id="@winglang/sdk.std.Node.addConnection"></a>

```wing
addConnection(props: AddConnectionProps): void
```

Adds a connection between two constructs.

A connection is a piece of
metadata describing how one construct is related to another construct.

###### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.std.Node.addConnection.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.std.AddConnectionProps">AddConnectionProps</a>

---

##### `addDependency` <a name="addDependency" id="@winglang/sdk.std.Node.addDependency"></a>

```wing
addDependency(...deps: Array<IDependable>): void
```

Add an ordering dependency on another construct.

An `IDependable`

###### `deps`<sup>Required</sup> <a name="deps" id="@winglang/sdk.std.Node.addDependency.parameter.deps"></a>

- *Type:* constructs.IDependable

---

##### `addMetadata` <a name="addMetadata" id="@winglang/sdk.std.Node.addMetadata"></a>

```wing
addMetadata(type: str, data: any, options?: MetadataOptions): void
```

Adds a metadata entry to this construct.

Entries are arbitrary values and will also include a stack trace to allow tracing back to
the code location for when the entry was added. It can be used, for example, to include source
mapping in CloudFormation templates to improve diagnostics.

###### `type`<sup>Required</sup> <a name="type" id="@winglang/sdk.std.Node.addMetadata.parameter.type"></a>

- *Type:* str

a string denoting the type of metadata.

---

###### `data`<sup>Required</sup> <a name="data" id="@winglang/sdk.std.Node.addMetadata.parameter.data"></a>

- *Type:* any

the value of the metadata (can be a Token).

If null/undefined, metadata will not be added.

---

###### `options`<sup>Optional</sup> <a name="options" id="@winglang/sdk.std.Node.addMetadata.parameter.options"></a>

- *Type:* constructs.MetadataOptions

options.

---

##### `addValidation` <a name="addValidation" id="@winglang/sdk.std.Node.addValidation"></a>

```wing
addValidation(validation: IValidation): void
```

Adds a validation to this construct.

When `node.validate()` is called, the `validate()` method will be called on
all validations and all errors will be returned.

###### `validation`<sup>Required</sup> <a name="validation" id="@winglang/sdk.std.Node.addValidation.parameter.validation"></a>

- *Type:* constructs.IValidation

The validation object.

---

##### `findAll` <a name="findAll" id="@winglang/sdk.std.Node.findAll"></a>

```wing
findAll(order?: ConstructOrder): MutArray<IConstruct>
```

Return this construct and all of its children in the given order.

###### `order`<sup>Optional</sup> <a name="order" id="@winglang/sdk.std.Node.findAll.parameter.order"></a>

- *Type:* constructs.ConstructOrder

---

##### `findChild` <a name="findChild" id="@winglang/sdk.std.Node.findChild"></a>

```wing
findChild(): IConstruct
```

Return a direct child by id.

Throws an error if the child is not found.

##### `getContext` <a name="getContext" id="@winglang/sdk.std.Node.getContext"></a>

```wing
getContext(key: str): any
```

Retrieves a value from tree context if present. Otherwise, would throw an error.

Context is usually initialized at the root, but can be overridden at any point in the tree.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.Node.getContext.parameter.key"></a>

- *Type:* str

The context key.

---

##### `lock` <a name="lock" id="@winglang/sdk.std.Node.lock"></a>

```wing
lock(): void
```

Locks this construct from allowing more children to be added.

After this
call, no more children can be added to this construct or to any children.

##### `setContext` <a name="setContext" id="@winglang/sdk.std.Node.setContext"></a>

```wing
setContext(key: str, value: any): void
```

This can be used to set contextual values.

Context must be set before any children are added, since children may consult context info during construction.
If the key already exists, it will be overridden.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.Node.setContext.parameter.key"></a>

- *Type:* str

The context key.

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.Node.setContext.parameter.value"></a>

- *Type:* any

The context value.

---

##### `tryFindChild` <a name="tryFindChild" id="@winglang/sdk.std.Node.tryFindChild"></a>

```wing
tryFindChild(): IConstruct?
```

Return a direct child by id, or undefined.

##### `tryGetContext` <a name="tryGetContext" id="@winglang/sdk.std.Node.tryGetContext"></a>

```wing
tryGetContext(key: str): any
```

Retrieves a value from tree context.

Context is usually initialized at the root, but can be overridden at any point in the tree.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.Node.tryGetContext.parameter.key"></a>

- *Type:* str

The context key.

---

##### `tryRemoveChild` <a name="tryRemoveChild" id="@winglang/sdk.std.Node.tryRemoveChild"></a>

```wing
tryRemoveChild(childName: str): bool
```

Remove the child with the given name, if present.

###### `childName`<sup>Required</sup> <a name="childName" id="@winglang/sdk.std.Node.tryRemoveChild.parameter.childName"></a>

- *Type:* str

---

##### `validate` <a name="validate" id="@winglang/sdk.std.Node.validate"></a>

```wing
validate(): MutArray<str>
```

Validates this construct.

Invokes the `validate()` method on all validations added through
`addValidation()`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.Node.property.addr">addr</a></code> | <code>str</code> | Returns an opaque tree-unique address for this construct. |
| <code><a href="#@winglang/sdk.std.Node.property.app">app</a></code> | <code><a href="#@winglang/sdk.std.IApp">IApp</a></code> | Returns the root of the construct tree (the `cloud.App` object). |
| <code><a href="#@winglang/sdk.std.Node.property.children">children</a></code> | <code>MutArray&lt;constructs.IConstruct&gt;</code> | All direct children of this construct. |
| <code><a href="#@winglang/sdk.std.Node.property.dependencies">dependencies</a></code> | <code>MutArray&lt;constructs.IConstruct&gt;</code> | Return all dependencies registered on this node (non-recursive). |
| <code><a href="#@winglang/sdk.std.Node.property.id">id</a></code> | <code>str</code> | The id of this construct within the current scope. |
| <code><a href="#@winglang/sdk.std.Node.property.locked">locked</a></code> | <code>bool</code> | Returns true if this construct or the scopes in which it is defined are locked. |
| <code><a href="#@winglang/sdk.std.Node.property.metadata">metadata</a></code> | <code>MutArray&lt;constructs.MetadataEntry&gt;</code> | An immutable array of metadata objects associated with this construct. |
| <code><a href="#@winglang/sdk.std.Node.property.path">path</a></code> | <code>str</code> | The full, absolute path of this construct in the tree. |
| <code><a href="#@winglang/sdk.std.Node.property.root">root</a></code> | <code>constructs.IConstruct</code> | Returns the root of the construct tree (the `cloud.App` object). |
| <code><a href="#@winglang/sdk.std.Node.property.scopes">scopes</a></code> | <code>MutArray&lt;constructs.IConstruct&gt;</code> | All parent scopes of this construct. |
| <code><a href="#@winglang/sdk.std.Node.property.scope">scope</a></code> | <code>constructs.IConstruct</code> | Returns the scope in which this construct is defined. |
| <code><a href="#@winglang/sdk.std.Node.property.color">color</a></code> | <code>str</code> | The color of the construct for display purposes. |
| <code><a href="#@winglang/sdk.std.Node.property.defaultChild">defaultChild</a></code> | <code>constructs.IConstruct</code> | Returns the child construct that has the id `Default` or `Resource"`. |
| <code><a href="#@winglang/sdk.std.Node.property.description">description</a></code> | <code>str</code> | Description of the construct for display purposes. |
| <code><a href="#@winglang/sdk.std.Node.property.expanded">expanded</a></code> | <code>bool</code> | The default view of this resource in the UI. |
| <code><a href="#@winglang/sdk.std.Node.property.hidden">hidden</a></code> | <code>bool</code> | Whether the construct should be hidden by default in tree visualizations. |
| <code><a href="#@winglang/sdk.std.Node.property.icon">icon</a></code> | <code>str</code> | The icon of the construct for display purposes. |
| <code><a href="#@winglang/sdk.std.Node.property.sourceModule">sourceModule</a></code> | <code>str</code> | The source file or library where the construct was defined. |
| <code><a href="#@winglang/sdk.std.Node.property.title">title</a></code> | <code>str</code> | Title of the construct for display purposes. |

---

##### `addr`<sup>Required</sup> <a name="addr" id="@winglang/sdk.std.Node.property.addr"></a>

```wing
addr: str;
```

- *Type:* str

Returns an opaque tree-unique address for this construct.

Addresses are 42 characters hexadecimal strings. They begin with "c8"
followed by 40 lowercase hexadecimal characters (0-9a-f).

Addresses are calculated using a SHA-1 of the components of the construct
path.

To enable refactorings of construct trees, constructs with the ID `Default`
will be excluded from the calculation. In those cases constructs in the
same tree may have the same addreess.

---

*Example*

```wing
c83a2846e506bcc5f10682b564084bca2d275709ee
```


##### `app`<sup>Required</sup> <a name="app" id="@winglang/sdk.std.Node.property.app"></a>

```wing
app: IApp;
```

- *Type:* <a href="#@winglang/sdk.std.IApp">IApp</a>

Returns the root of the construct tree (the `cloud.App` object).

Similar to `root`.

---

##### `children`<sup>Required</sup> <a name="children" id="@winglang/sdk.std.Node.property.children"></a>

```wing
children: MutArray<IConstruct>;
```

- *Type:* MutArray&lt;constructs.IConstruct&gt;

All direct children of this construct.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="@winglang/sdk.std.Node.property.dependencies"></a>

```wing
dependencies: MutArray<IConstruct>;
```

- *Type:* MutArray&lt;constructs.IConstruct&gt;

Return all dependencies registered on this node (non-recursive).

---

##### `id`<sup>Required</sup> <a name="id" id="@winglang/sdk.std.Node.property.id"></a>

```wing
id: str;
```

- *Type:* str

The id of this construct within the current scope.

This is a a scope-unique id. To obtain an app-unique id for this construct, use `addr`.

---

##### `locked`<sup>Required</sup> <a name="locked" id="@winglang/sdk.std.Node.property.locked"></a>

```wing
locked: bool;
```

- *Type:* bool

Returns true if this construct or the scopes in which it is defined are locked.

---

##### `metadata`<sup>Required</sup> <a name="metadata" id="@winglang/sdk.std.Node.property.metadata"></a>

```wing
metadata: MutArray<MetadataEntry>;
```

- *Type:* MutArray&lt;constructs.MetadataEntry&gt;

An immutable array of metadata objects associated with this construct.

This can be used, for example, to implement support for deprecation notices, source mapping, etc.

---

##### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.std.Node.property.path"></a>

```wing
path: str;
```

- *Type:* str

The full, absolute path of this construct in the tree.

Components are separated by '/'.

---

##### `root`<sup>Required</sup> <a name="root" id="@winglang/sdk.std.Node.property.root"></a>

```wing
root: IConstruct;
```

- *Type:* constructs.IConstruct

Returns the root of the construct tree (the `cloud.App` object).

Similar to `app`.

---

##### `scopes`<sup>Required</sup> <a name="scopes" id="@winglang/sdk.std.Node.property.scopes"></a>

```wing
scopes: MutArray<IConstruct>;
```

- *Type:* MutArray&lt;constructs.IConstruct&gt;

All parent scopes of this construct.

---

##### `scope`<sup>Optional</sup> <a name="scope" id="@winglang/sdk.std.Node.property.scope"></a>

```wing
scope: IConstruct;
```

- *Type:* constructs.IConstruct

Returns the scope in which this construct is defined.

The value is `undefined` at the root of the construct scope tree.

---

##### `color`<sup>Optional</sup> <a name="color" id="@winglang/sdk.std.Node.property.color"></a>

```wing
color: str;
```

- *Type:* str

The color of the construct for display purposes.

Supported colors are:
- orange
- sky
- emerald
- lime
- pink
- amber
- cyan
- purple
- red
- violet
- slate

---

##### `defaultChild`<sup>Optional</sup> <a name="defaultChild" id="@winglang/sdk.std.Node.property.defaultChild"></a>

```wing
defaultChild: IConstruct;
```

- *Type:* constructs.IConstruct

Returns the child construct that has the id `Default` or `Resource"`.

This is usually the construct that provides the bulk of the underlying functionality.
Useful for modifications of the underlying construct that are not available at the higher levels.
Override the defaultChild property.

This should only be used in the cases where the correct
default child is not named 'Resource' or 'Default' as it
should be.

If you set this to undefined, the default behavior of finding
the child named 'Resource' or 'Default' will be used.

---

##### `description`<sup>Optional</sup> <a name="description" id="@winglang/sdk.std.Node.property.description"></a>

```wing
description: str;
```

- *Type:* str

Description of the construct for display purposes.

---

##### `expanded`<sup>Optional</sup> <a name="expanded" id="@winglang/sdk.std.Node.property.expanded"></a>

```wing
expanded: bool;
```

- *Type:* bool
- *Default:* false

The default view of this resource in the UI.

By default, nodes are collapsed,
so set this to `true` if you want the node to be expanded by default.

---

##### `hidden`<sup>Optional</sup> <a name="hidden" id="@winglang/sdk.std.Node.property.hidden"></a>

```wing
hidden: bool;
```

- *Type:* bool

Whether the construct should be hidden by default in tree visualizations.

---

##### `icon`<sup>Optional</sup> <a name="icon" id="@winglang/sdk.std.Node.property.icon"></a>

```wing
icon: str;
```

- *Type:* str

The icon of the construct for display purposes.

Supported icons are from Heroicons:
- https://heroicons.com/
e.g.
- "academic-cap"

---

##### `sourceModule`<sup>Optional</sup> <a name="sourceModule" id="@winglang/sdk.std.Node.property.sourceModule"></a>

```wing
sourceModule: str;
```

- *Type:* str

The source file or library where the construct was defined.

---

##### `title`<sup>Optional</sup> <a name="title" id="@winglang/sdk.std.Node.property.title"></a>

```wing
title: str;
```

- *Type:* str

Title of the construct for display purposes.

---


## Structs <a name="Structs" id="Structs"></a>

### AddConnectionProps <a name="AddConnectionProps" id="@winglang/sdk.std.AddConnectionProps"></a>

Props for `Node.addConnection`.

#### Initializer <a name="Initializer" id="@winglang/sdk.std.AddConnectionProps.Initializer"></a>

```wing
let AddConnectionProps = AddConnectionProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.AddConnectionProps.property.name">name</a></code> | <code>str</code> | A name for the connection. |
| <code><a href="#@winglang/sdk.std.AddConnectionProps.property.target">target</a></code> | <code>constructs.IConstruct</code> | The target of the connection. |
| <code><a href="#@winglang/sdk.std.AddConnectionProps.property.source">source</a></code> | <code>constructs.IConstruct</code> | The source of the connection. |
| <code><a href="#@winglang/sdk.std.AddConnectionProps.property.sourceOp">sourceOp</a></code> | <code>str</code> | An operation that the source construct supports. |
| <code><a href="#@winglang/sdk.std.AddConnectionProps.property.targetOp">targetOp</a></code> | <code>str</code> | An operation that the target construct supports. |

---

##### `name`<sup>Required</sup> <a name="name" id="@winglang/sdk.std.AddConnectionProps.property.name"></a>

```wing
name: str;
```

- *Type:* str

A name for the connection.

---

##### `target`<sup>Required</sup> <a name="target" id="@winglang/sdk.std.AddConnectionProps.property.target"></a>

```wing
target: IConstruct;
```

- *Type:* constructs.IConstruct

The target of the connection.

---

##### `source`<sup>Optional</sup> <a name="source" id="@winglang/sdk.std.AddConnectionProps.property.source"></a>

```wing
source: IConstruct;
```

- *Type:* constructs.IConstruct
- *Default:* this

The source of the connection.

---

##### `sourceOp`<sup>Optional</sup> <a name="sourceOp" id="@winglang/sdk.std.AddConnectionProps.property.sourceOp"></a>

```wing
sourceOp: str;
```

- *Type:* str
- *Default:* no operation

An operation that the source construct supports.

---

##### `targetOp`<sup>Optional</sup> <a name="targetOp" id="@winglang/sdk.std.AddConnectionProps.property.targetOp"></a>

```wing
targetOp: str;
```

- *Type:* str
- *Default:* no operation

An operation that the target construct supports.

---

## Protocols <a name="Protocols" id="Protocols"></a>

### IApp <a name="IApp" id="@winglang/sdk.std.IApp"></a>

- *Extends:* constructs.IConstruct

- *Implemented By:* <a href="#@winglang/sdk.core.App">App</a>, <a href="#@winglang/sdk.std.IApp">IApp</a>

Represents a Wing application.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.IApp.makeId">makeId</a></code> | Generate a unique ID for the given scope and prefix. |

---

##### `makeId` <a name="makeId" id="@winglang/sdk.std.IApp.makeId"></a>

```wing
makeId(prefix?: str): str
```

Generate a unique ID for the given scope and prefix.

The newly generated ID is
guaranteed to be unique within the given scope.
It will have the form '{prefix}{n}', where '{prefix}' is the given prefix and '{n}' is an
ascending sequence of integers starting from '0'.

###### `prefix`<sup>Optional</sup> <a name="prefix" id="@winglang/sdk.std.IApp.makeId.parameter.prefix"></a>

- *Type:* str

prepended to the unique identifier.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.IApp.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.std.IApp.property.entrypointDir">entrypointDir</a></code> | <code>str</code> | The directory of the entrypoint of the current program. |
| <code><a href="#@winglang/sdk.std.IApp.property.isTestEnvironment">isTestEnvironment</a></code> | <code>bool</code> | `true` if this is a testing environment. |
| <code><a href="#@winglang/sdk.std.IApp.property.parameters">parameters</a></code> | <code><a href="#@winglang/sdk.platform.ParameterRegistrar">ParameterRegistrar</a></code> | The application's parameter registrar. |
| <code><a href="#@winglang/sdk.std.IApp.property.workdir">workdir</a></code> | <code>str</code> | The `.wing` directory into which you can emit artifacts during preflight. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.std.IApp.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `entrypointDir`<sup>Required</sup> <a name="entrypointDir" id="@winglang/sdk.std.IApp.property.entrypointDir"></a>

```wing
entrypointDir: str;
```

- *Type:* str

The directory of the entrypoint of the current program.

---

##### `isTestEnvironment`<sup>Required</sup> <a name="isTestEnvironment" id="@winglang/sdk.std.IApp.property.isTestEnvironment"></a>

```wing
isTestEnvironment: bool;
```

- *Type:* bool

`true` if this is a testing environment.

---

##### `parameters`<sup>Required</sup> <a name="parameters" id="@winglang/sdk.std.IApp.property.parameters"></a>

```wing
parameters: ParameterRegistrar;
```

- *Type:* <a href="#@winglang/sdk.platform.ParameterRegistrar">ParameterRegistrar</a>

The application's parameter registrar.

---

##### `workdir`<sup>Required</sup> <a name="workdir" id="@winglang/sdk.std.IApp.property.workdir"></a>

```wing
workdir: str;
```

- *Type:* str

The `.wing` directory into which you can emit artifacts during preflight.

---

