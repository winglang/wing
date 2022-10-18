[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [testing](../modules/testing.md) / SimulatorProps

# Interface: SimulatorProps

[testing](../modules/testing.md).SimulatorProps

Props for `Simulator`.

## Table of contents

### Properties

- [appPath](testing.SimulatorProps.md#apppath)
- [dispatcher](testing.SimulatorProps.md#dispatcher)

## Properties

### appPath

• `Readonly` **appPath**: `string`

Path to a Wing app file (.wx).

#### Defined in

[src/testing/simulator.ts:16](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/testing/simulator.ts#L16)

___

### dispatcher

• `Optional` `Readonly` **dispatcher**: [`ISimulatorDispatcher`](testing.ISimulatorDispatcher.md)

The factory that dispatches to simulation implementations.

**`Default`**

- a factory that simulates built-in Wing SDK resources

#### Defined in

[src/testing/simulator.ts:22](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/testing/simulator.ts#L22)
