[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [testing](../modules/testing.md) / Simulator

# Class: Simulator

[testing](../modules/testing.md).Simulator

A simulator that can be used to test your application locally.

## Table of contents

### Constructors

- [constructor](testing.Simulator.md#constructor)

### Properties

- [\_appPath](testing.Simulator.md#_apppath)
- [\_assetsDir](testing.Simulator.md#_assetsdir)
- [\_dispatcher](testing.Simulator.md#_dispatcher)
- [\_tree](testing.Simulator.md#_tree)

### Accessors

- [tree](testing.Simulator.md#tree)

### Methods

- [\_annotateTreeWithPaths](testing.Simulator.md#_annotatetreewithpaths)
- [\_loadApp](testing.Simulator.md#_loadapp)
- [getAttributes](testing.Simulator.md#getattributes)
- [getData](testing.Simulator.md#getdata)
- [getProps](testing.Simulator.md#getprops)
- [reload](testing.Simulator.md#reload)
- [start](testing.Simulator.md#start)
- [stop](testing.Simulator.md#stop)

## Constructors

### constructor

• **new Simulator**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`SimulatorProps`](../interfaces/testing.SimulatorProps.md) |

#### Defined in

[src/testing/simulator.ts:59](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/testing/simulator.ts#L59)

## Properties

### \_appPath

• `Private` **\_appPath**: `string`

#### Defined in

[src/testing/simulator.ts:56](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/testing/simulator.ts#L56)

___

### \_assetsDir

• `Private` **\_assetsDir**: `string`

#### Defined in

[src/testing/simulator.ts:57](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/testing/simulator.ts#L57)

___

### \_dispatcher

• `Private` `Readonly` **\_dispatcher**: [`ISimulatorDispatcher`](../interfaces/testing.ISimulatorDispatcher.md)

#### Defined in

[src/testing/simulator.ts:54](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/testing/simulator.ts#L54)

___

### \_tree

• `Private` **\_tree**: [`WingSimulatorSchema`](../interfaces/sim.WingSimulatorSchema.md)

#### Defined in

[src/testing/simulator.ts:55](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/testing/simulator.ts#L55)

## Accessors

### tree

• `get` **tree**(): `any`

Return a copy of the simulator tree, including all resource attributes.

#### Returns

`any`

#### Defined in

[src/testing/simulator.ts:187](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/testing/simulator.ts#L187)

## Methods

### \_annotateTreeWithPaths

▸ `Private` **_annotateTreeWithPaths**(`tree`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tree` | `any` |

#### Returns

`void`

#### Defined in

[src/testing/simulator.ts:92](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/testing/simulator.ts#L92)

___

### \_loadApp

▸ `Private` **_loadApp**(`appPath`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `appPath` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `assetsDir` | `string` |
| `tree` | `any` |

#### Defined in

[src/testing/simulator.ts:68](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/testing/simulator.ts#L68)

___

### getAttributes

▸ **getAttributes**(`path`): `Object`

Obtain a resource's attributes. This is data that gets resolved when the
during the resource's in-simulator creation.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`Object`

#### Defined in

[src/testing/simulator.ts:164](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/testing/simulator.ts#L164)

___

### getData

▸ **getData**(`path`): [`BaseResourceSchema`](../interfaces/sim.BaseResourceSchema.md)

Obtain a resource's data, including its path, props, attrs, and children.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

[`BaseResourceSchema`](../interfaces/sim.BaseResourceSchema.md)

#### Defined in

[src/testing/simulator.ts:180](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/testing/simulator.ts#L180)

___

### getProps

▸ **getProps**(`path`): `Object`

Obtain a resource's props. This is data about the resource's configuration
that is resolved at synth time.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`Object`

#### Defined in

[src/testing/simulator.ts:173](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/testing/simulator.ts#L173)

___

### reload

▸ **reload**(): `Promise`<`void`\>

Stop the simulation, reload the simulation tree from the latest version of
the app file, and restart the simulation.

#### Returns

`Promise`<`void`\>

#### Defined in

[src/testing/simulator.ts:150](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/testing/simulator.ts#L150)

___

### start

▸ **start**(): `Promise`<`void`\>

Start the simulator.

#### Returns

`Promise`<`void`\>

#### Defined in

[src/testing/simulator.ts:106](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/testing/simulator.ts#L106)

___

### stop

▸ **stop**(): `Promise`<`void`\>

Stop the simulation and clean up all resources.

#### Returns

`Promise`<`void`\>

#### Defined in

[src/testing/simulator.ts:134](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/testing/simulator.ts#L134)
