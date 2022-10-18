[@monadahq/wingsdk](../README.md) / [Exports](../modules.md) / [tfaws](../modules/tfaws.md) / PolicyStatement

# Interface: PolicyStatement

[tfaws](../modules/tfaws.md).PolicyStatement

AWS IAM Policy Statement.

## Table of contents

### Properties

- [action](tfaws.PolicyStatement.md#action)
- [effect](tfaws.PolicyStatement.md#effect)
- [resource](tfaws.PolicyStatement.md#resource)

## Properties

### action

• `Optional` `Readonly` **action**: `string`[]

Actions

#### Defined in

[src/tf-aws/function.ts:206](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/tf-aws/function.ts#L206)

___

### effect

• `Optional` `Readonly` **effect**: `string`

Effect ("Allow" or "Deny")

#### Defined in

[src/tf-aws/function.ts:210](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/tf-aws/function.ts#L210)

___

### resource

• `Optional` `Readonly` **resource**: `string` \| `string`[]

Resources

#### Defined in

[src/tf-aws/function.ts:208](https://github.com/monadahq/winglang/blob/main/libs/wingsdk/src/tf-aws/function.ts#L208)
