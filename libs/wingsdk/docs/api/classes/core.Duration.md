[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [core](../modules/core.md) / Duration

# Class: Duration

[core](../modules/core.md).Duration

Represents a length of time.

## Table of contents

### Constructors

- [constructor](core.Duration.md#constructor)

### Properties

- [seconds](core.Duration.md#seconds)

### Accessors

- [hours](core.Duration.md#hours)
- [minutes](core.Duration.md#minutes)

### Methods

- [fromHours](core.Duration.md#fromhours)
- [fromMinutes](core.Duration.md#fromminutes)
- [fromSeconds](core.Duration.md#fromseconds)

## Constructors

### constructor

• `Private` **new Duration**(`seconds`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `seconds` | `number` |

#### Defined in

[src/core/duration.ts:42](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/duration.ts#L42)

## Properties

### seconds

• `Readonly` **seconds**: `number`

Return the total number of seconds in this Duration

#### Defined in

[src/core/duration.ts:40](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/duration.ts#L40)

## Accessors

### hours

• `get` **hours**(): `number`

Return the total number of hours in this Duration

#### Returns

`number`

the value of this `Duration` expressed in Hours.

#### Defined in

[src/core/duration.ts:60](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/duration.ts#L60)

___

### minutes

• `get` **minutes**(): `number`

Return the total number of minutes in this Duration

#### Returns

`number`

the value of this `Duration` expressed in Minutes.

#### Defined in

[src/core/duration.ts:51](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/duration.ts#L51)

## Methods

### fromHours

▸ `Static` **fromHours**(`amount`): [`Duration`](core.Duration.md)

Create a Duration representing an amount of hours

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `number` | the amount of Hours the `Duration` will represent. |

#### Returns

[`Duration`](core.Duration.md)

a new `Duration` representing `amount` Hours.

#### Defined in

[src/core/duration.ts:21](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/duration.ts#L21)

___

### fromMinutes

▸ `Static` **fromMinutes**(`amount`): [`Duration`](core.Duration.md)

Create a Duration representing an amount of minutes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `number` | the amount of Minutes the `Duration` will represent. |

#### Returns

[`Duration`](core.Duration.md)

a new `Duration` representing `amount` Minutes.

#### Defined in

[src/core/duration.ts:11](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/duration.ts#L11)

___

### fromSeconds

▸ `Static` **fromSeconds**(`amount`): [`Duration`](core.Duration.md)

Create a Duration representing an amount of seconds

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `number` | the amount of Seconds the `Duration` will represent. |

#### Returns

[`Duration`](core.Duration.md)

a new `Duration` representing `amount` Seconds.

#### Defined in

[src/core/duration.ts:31](https://github.com/monadahq/winglang/blob/438eedb/libs/wingsdk/src/core/duration.ts#L31)
