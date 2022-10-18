[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [core](../modules/core.md) / DependencyVertex

# Class: DependencyVertex

[core](../modules/core.md).DependencyVertex

Represents a vertex in the graph.

The value of each vertex is an `IConstruct` that is accessible via the `.value` getter.

## Table of contents

### Constructors

- [constructor](core.DependencyVertex.md#constructor)

### Properties

- [\_children](core.DependencyVertex.md#_children)
- [\_parents](core.DependencyVertex.md#_parents)
- [\_value](core.DependencyVertex.md#_value)

### Accessors

- [inbound](core.DependencyVertex.md#inbound)
- [outbound](core.DependencyVertex.md#outbound)
- [value](core.DependencyVertex.md#value)

### Methods

- [addChild](core.DependencyVertex.md#addchild)
- [addParent](core.DependencyVertex.md#addparent)
- [findRoute](core.DependencyVertex.md#findroute)
- [topology](core.DependencyVertex.md#topology)

## Constructors

### constructor

• **new DependencyVertex**(`value?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `value` | `undefined` \| `IConstruct` | `undefined` |

#### Defined in

[src/core/dependency.ts:101](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/dependency.ts#L101)

## Properties

### \_children

• `Private` `Readonly` **\_children**: `Set`<[`DependencyVertex`](core.DependencyVertex.md)\>

#### Defined in

[src/core/dependency.ts:96](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/dependency.ts#L96)

___

### \_parents

• `Private` `Readonly` **\_parents**: `Set`<[`DependencyVertex`](core.DependencyVertex.md)\>

#### Defined in

[src/core/dependency.ts:98](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/dependency.ts#L98)

___

### \_value

• `Private` `Readonly` **\_value**: `undefined` \| `IConstruct`

#### Defined in

[src/core/dependency.ts:95](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/dependency.ts#L95)

## Accessors

### inbound

• `get` **inbound**(): [`DependencyVertex`](core.DependencyVertex.md)[]

Returns the parents of the vertex (i.e dependants)

#### Returns

[`DependencyVertex`](core.DependencyVertex.md)[]

#### Defined in

[src/core/dependency.ts:124](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/dependency.ts#L124)

___

### outbound

• `get` **outbound**(): [`DependencyVertex`](core.DependencyVertex.md)[]

Returns the children of the vertex (i.e dependencies)

#### Returns

[`DependencyVertex`](core.DependencyVertex.md)[]

#### Defined in

[src/core/dependency.ts:117](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/dependency.ts#L117)

___

### value

• `get` **value**(): `undefined` \| `IConstruct`

Returns the IConstruct this graph vertex represents.

`null` in case this is the root of the graph.

#### Returns

`undefined` \| `IConstruct`

#### Defined in

[src/core/dependency.ts:110](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/dependency.ts#L110)

## Methods

### addChild

▸ **addChild**(`dep`): `void`

Adds a vertex as a dependency of the current node.
Also updates the parents of `dep`, so that it contains this node as a parent.

This operation will fail in case it creates a cycle in the graph.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dep` | [`DependencyVertex`](core.DependencyVertex.md) | The dependency |

#### Returns

`void`

#### Defined in

[src/core/dependency.ts:158](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/dependency.ts#L158)

___

### addParent

▸ `Private` **addParent**(`dep`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dep` | [`DependencyVertex`](core.DependencyVertex.md) |

#### Returns

`void`

#### Defined in

[src/core/dependency.ts:174](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/dependency.ts#L174)

___

### findRoute

▸ `Private` **findRoute**(`dst`): [`DependencyVertex`](core.DependencyVertex.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `dst` | [`DependencyVertex`](core.DependencyVertex.md) |

#### Returns

[`DependencyVertex`](core.DependencyVertex.md)[]

#### Defined in

[src/core/dependency.ts:178](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/dependency.ts#L178)

___

### topology

▸ **topology**(): `IConstruct`[]

Returns a topologically sorted array of the constructs in the sub-graph.

#### Returns

`IConstruct`[]

#### Defined in

[src/core/dependency.ts:131](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/core/dependency.ts#L131)
