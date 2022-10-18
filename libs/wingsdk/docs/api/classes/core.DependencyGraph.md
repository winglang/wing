[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [core](../modules/core.md) / DependencyGraph

# Class: DependencyGraph

[core](../modules/core.md).DependencyGraph

Represents the dependency graph for a given Node.

This graph includes the dependency relationships between all nodes in the
node (construct) sub-tree who's root is this Node.

Note that this means that lonely nodes (no dependencies and no dependants) are also included in this graph as
childless children of the root node of the graph.

The graph does not include cross-scope dependencies. That is, if a child on the current scope depends on a node
from a different scope, that relationship is not represented in this graph.

## Table of contents

### Constructors

- [constructor](core.DependencyGraph.md#constructor)

### Properties

- [\_fosterParent](core.DependencyGraph.md#_fosterparent)

### Accessors

- [root](core.DependencyGraph.md#root)

### Methods

- [topology](core.DependencyGraph.md#topology)

## Constructors

### constructor

• **new DependencyGraph**(`node`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |

#### Defined in

[src/core/dependency.ts:21](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/dependency.ts#L21)

## Properties

### \_fosterParent

• `Private` `Readonly` **\_fosterParent**: [`DependencyVertex`](core.DependencyVertex.md)

#### Defined in

[src/core/dependency.ts:19](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/dependency.ts#L19)

## Accessors

### root

• `get` **root**(): [`DependencyVertex`](core.DependencyVertex.md)

Returns the root of the graph.

Note that this vertex will always have `null` as its `.value` since it is an artifical root
that binds all the connected spaces of the graph.

#### Returns

[`DependencyVertex`](core.DependencyVertex.md)

#### Defined in

[src/core/dependency.ts:77](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/dependency.ts#L77)

## Methods

### topology

▸ **topology**(): `IConstruct`[]

Returns a topologically sorted array of the constructs in the sub-graph.

#### Returns

`IConstruct`[]

#### Defined in

[src/core/dependency.ts:84](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/dependency.ts#L84)
