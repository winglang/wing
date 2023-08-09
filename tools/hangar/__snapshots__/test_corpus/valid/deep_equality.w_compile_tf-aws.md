# [deep_equality.w](../../../../../examples/tests/valid/deep_equality.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $numA, $numB, $strA, $strB }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: numA == numA")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($numA,$numA)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: numA == numB")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($numA,$numB)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: strA == strA")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($strA,$strA)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: strA == strB")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($strA,$strB)))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure10.js
```js
module.exports = function({ $arrayA, $arrayC }) {
  class $Closure10 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: arrayA != arrayC")})(($arrayA !== $arrayC))};
    }
  }
  return $Closure10;
}

```

## inflight.$Closure11.js
```js
module.exports = function({ $cat1, $cat2 }) {
  class $Closure11 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: cat1 == cat1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($cat1,$cat1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: cat1 == cat2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($cat1,$cat2)))};
    }
  }
  return $Closure11;
}

```

## inflight.$Closure12.js
```js
module.exports = function({ $cat1, $cat3 }) {
  class $Closure12 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: cat1 != cat3")})(($cat1 !== $cat3))};
    }
  }
  return $Closure12;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $numA, $numC, $strA, $strC }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: numA != numC")})(($numA !== $numC))};
      {((cond) => {if (!cond) throw new Error("assertion failed: strA != strC")})(($strA !== $strC))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ $jsonA, $jsonB }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: jsonA == jsonA")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($jsonA,$jsonA)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: jsonA == jsonB")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($jsonA,$jsonB)))};
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4.js
```js
module.exports = function({ $jsonA, $jsonC }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: jsonA != jsonC")})(($jsonA !== $jsonC))};
    }
  }
  return $Closure4;
}

```

## inflight.$Closure5.js
```js
module.exports = function({ $new_Set_setB_, $setA }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: setA == setA")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($setA,$setA)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: setA == setB.copy()")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($setA,$new_Set_setB_)))};
    }
  }
  return $Closure5;
}

```

## inflight.$Closure6.js
```js
module.exports = function({ $setA, $setC }) {
  class $Closure6 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: setA != setC")})(($setA !== $setC))};
    }
  }
  return $Closure6;
}

```

## inflight.$Closure7.js
```js
module.exports = function({ $______mapB___, $mapA }) {
  class $Closure7 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: mapA == mapA")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($mapA,$mapA)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mapA == mapB.copy()")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($mapA,$______mapB___)))};
    }
  }
  return $Closure7;
}

```

## inflight.$Closure8.js
```js
module.exports = function({ $mapA, $mapC }) {
  class $Closure8 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: mapA != mapC")})(($mapA !== $mapC))};
    }
  }
  return $Closure8;
}

```

## inflight.$Closure9.js
```js
module.exports = function({ $_____arrayB__, $arrayA }) {
  class $Closure9 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: arrayA == arrayA")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($arrayA,$arrayA)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: arrayA == arrayB.copy()")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($arrayA,$_____arrayB__)))};
    }
  }
  return $Closure9;
}

```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.17.0"
    },
    "outputs": {
      "root": {
        "undefined": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/undefined/Default/test:Primitive types with the same value\",\"${aws_lambda_function.undefined_testPrimitivetypeswiththesamevalue_Handler_BA23DEF1.arn}\"],[\"root/undefined/Default/test:Primitive types with different values\",\"${aws_lambda_function.undefined_testPrimitivetypeswithdifferentvalues_Handler_72687E7C.arn}\"],[\"root/undefined/Default/test:Json with the same value\",\"${aws_lambda_function.undefined_testJsonwiththesamevalue_Handler_A0E959EE.arn}\"],[\"root/undefined/Default/test:Json with different values\",\"${aws_lambda_function.undefined_testJsonwithdifferentvalues_Handler_B430481D.arn}\"],[\"root/undefined/Default/test:Set types with the same value\",\"${aws_lambda_function.undefined_testSettypeswiththesamevalue_Handler_0228D440.arn}\"],[\"root/undefined/Default/test:Set types with different values\",\"${aws_lambda_function.undefined_testSettypeswithdifferentvalues_Handler_9ADD9681.arn}\"],[\"root/undefined/Default/test:Map with the same value\",\"${aws_lambda_function.undefined_testMapwiththesamevalue_Handler_44AC81A1.arn}\"],[\"root/undefined/Default/test:Map with different values\",\"${aws_lambda_function.undefined_testMapwithdifferentvalues_Handler_D4DD2946.arn}\"],[\"root/undefined/Default/test:Array with the same value\",\"${aws_lambda_function.undefined_testArraywiththesamevalue_Handler_F670E8B6.arn}\"],[\"root/undefined/Default/test:Array with different values\",\"${aws_lambda_function.undefined_testArraywithdifferentvalues_Handler_A9F27FFF.arn}\"],[\"root/undefined/Default/test:Struct with the same value\",\"${aws_lambda_function.undefined_testStructwiththesamevalue_Handler_F9E97F69.arn}\"],[\"root/undefined/Default/test:Struct with different values\",\"${aws_lambda_function.undefined_testStructwithdifferentvalues_Handler_E890A68E.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testArraywithdifferentvalues_Handler_IamRole_6D7F277B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Array with different values/Handler/IamRole",
            "uniqueId": "undefined_testArraywithdifferentvalues_Handler_IamRole_6D7F277B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testArraywiththesamevalue_Handler_IamRole_A7E21B7F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Array with the same value/Handler/IamRole",
            "uniqueId": "undefined_testArraywiththesamevalue_Handler_IamRole_A7E21B7F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testJsonwithdifferentvalues_Handler_IamRole_8CF66D30": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Json with different values/Handler/IamRole",
            "uniqueId": "undefined_testJsonwithdifferentvalues_Handler_IamRole_8CF66D30"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testJsonwiththesamevalue_Handler_IamRole_8EC23E1D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Json with the same value/Handler/IamRole",
            "uniqueId": "undefined_testJsonwiththesamevalue_Handler_IamRole_8EC23E1D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testMapwithdifferentvalues_Handler_IamRole_3F6578F6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Map with different values/Handler/IamRole",
            "uniqueId": "undefined_testMapwithdifferentvalues_Handler_IamRole_3F6578F6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testMapwiththesamevalue_Handler_IamRole_419DDA3B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Map with the same value/Handler/IamRole",
            "uniqueId": "undefined_testMapwiththesamevalue_Handler_IamRole_419DDA3B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testPrimitivetypeswithdifferentvalues_Handler_IamRole_3B188884": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Primitive types with different values/Handler/IamRole",
            "uniqueId": "undefined_testPrimitivetypeswithdifferentvalues_Handler_IamRole_3B188884"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testPrimitivetypeswiththesamevalue_Handler_IamRole_711AFAA0": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Primitive types with the same value/Handler/IamRole",
            "uniqueId": "undefined_testPrimitivetypeswiththesamevalue_Handler_IamRole_711AFAA0"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testSettypeswithdifferentvalues_Handler_IamRole_91819181": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Set types with different values/Handler/IamRole",
            "uniqueId": "undefined_testSettypeswithdifferentvalues_Handler_IamRole_91819181"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testSettypeswiththesamevalue_Handler_IamRole_89F2A2B1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Set types with the same value/Handler/IamRole",
            "uniqueId": "undefined_testSettypeswiththesamevalue_Handler_IamRole_89F2A2B1"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testStructwithdifferentvalues_Handler_IamRole_1A11F71D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Struct with different values/Handler/IamRole",
            "uniqueId": "undefined_testStructwithdifferentvalues_Handler_IamRole_1A11F71D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testStructwiththesamevalue_Handler_IamRole_41BEB903": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Struct with the same value/Handler/IamRole",
            "uniqueId": "undefined_testStructwiththesamevalue_Handler_IamRole_41BEB903"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testArraywithdifferentvalues_Handler_IamRolePolicy_FD40D613": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Array with different values/Handler/IamRolePolicy",
            "uniqueId": "undefined_testArraywithdifferentvalues_Handler_IamRolePolicy_FD40D613"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testArraywithdifferentvalues_Handler_IamRole_6D7F277B.name}"
      },
      "undefined_testArraywiththesamevalue_Handler_IamRolePolicy_1C463DF3": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Array with the same value/Handler/IamRolePolicy",
            "uniqueId": "undefined_testArraywiththesamevalue_Handler_IamRolePolicy_1C463DF3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testArraywiththesamevalue_Handler_IamRole_A7E21B7F.name}"
      },
      "undefined_testJsonwithdifferentvalues_Handler_IamRolePolicy_D89495F7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Json with different values/Handler/IamRolePolicy",
            "uniqueId": "undefined_testJsonwithdifferentvalues_Handler_IamRolePolicy_D89495F7"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testJsonwithdifferentvalues_Handler_IamRole_8CF66D30.name}"
      },
      "undefined_testJsonwiththesamevalue_Handler_IamRolePolicy_C990335B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Json with the same value/Handler/IamRolePolicy",
            "uniqueId": "undefined_testJsonwiththesamevalue_Handler_IamRolePolicy_C990335B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testJsonwiththesamevalue_Handler_IamRole_8EC23E1D.name}"
      },
      "undefined_testMapwithdifferentvalues_Handler_IamRolePolicy_FF1F2BFF": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Map with different values/Handler/IamRolePolicy",
            "uniqueId": "undefined_testMapwithdifferentvalues_Handler_IamRolePolicy_FF1F2BFF"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testMapwithdifferentvalues_Handler_IamRole_3F6578F6.name}"
      },
      "undefined_testMapwiththesamevalue_Handler_IamRolePolicy_DC8C4C5E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Map with the same value/Handler/IamRolePolicy",
            "uniqueId": "undefined_testMapwiththesamevalue_Handler_IamRolePolicy_DC8C4C5E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testMapwiththesamevalue_Handler_IamRole_419DDA3B.name}"
      },
      "undefined_testPrimitivetypeswithdifferentvalues_Handler_IamRolePolicy_E2B7F2A0": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Primitive types with different values/Handler/IamRolePolicy",
            "uniqueId": "undefined_testPrimitivetypeswithdifferentvalues_Handler_IamRolePolicy_E2B7F2A0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testPrimitivetypeswithdifferentvalues_Handler_IamRole_3B188884.name}"
      },
      "undefined_testPrimitivetypeswiththesamevalue_Handler_IamRolePolicy_292A2D4D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Primitive types with the same value/Handler/IamRolePolicy",
            "uniqueId": "undefined_testPrimitivetypeswiththesamevalue_Handler_IamRolePolicy_292A2D4D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testPrimitivetypeswiththesamevalue_Handler_IamRole_711AFAA0.name}"
      },
      "undefined_testSettypeswithdifferentvalues_Handler_IamRolePolicy_7496ED6E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Set types with different values/Handler/IamRolePolicy",
            "uniqueId": "undefined_testSettypeswithdifferentvalues_Handler_IamRolePolicy_7496ED6E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testSettypeswithdifferentvalues_Handler_IamRole_91819181.name}"
      },
      "undefined_testSettypeswiththesamevalue_Handler_IamRolePolicy_3036AA5A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Set types with the same value/Handler/IamRolePolicy",
            "uniqueId": "undefined_testSettypeswiththesamevalue_Handler_IamRolePolicy_3036AA5A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testSettypeswiththesamevalue_Handler_IamRole_89F2A2B1.name}"
      },
      "undefined_testStructwithdifferentvalues_Handler_IamRolePolicy_C316CB11": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Struct with different values/Handler/IamRolePolicy",
            "uniqueId": "undefined_testStructwithdifferentvalues_Handler_IamRolePolicy_C316CB11"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testStructwithdifferentvalues_Handler_IamRole_1A11F71D.name}"
      },
      "undefined_testStructwiththesamevalue_Handler_IamRolePolicy_B9EB0E59": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Struct with the same value/Handler/IamRolePolicy",
            "uniqueId": "undefined_testStructwiththesamevalue_Handler_IamRolePolicy_B9EB0E59"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testStructwiththesamevalue_Handler_IamRole_41BEB903.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testArraywithdifferentvalues_Handler_IamRolePolicyAttachment_453E069E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Array with different values/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testArraywithdifferentvalues_Handler_IamRolePolicyAttachment_453E069E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testArraywithdifferentvalues_Handler_IamRole_6D7F277B.name}"
      },
      "undefined_testArraywiththesamevalue_Handler_IamRolePolicyAttachment_CDBEF63A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Array with the same value/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testArraywiththesamevalue_Handler_IamRolePolicyAttachment_CDBEF63A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testArraywiththesamevalue_Handler_IamRole_A7E21B7F.name}"
      },
      "undefined_testJsonwithdifferentvalues_Handler_IamRolePolicyAttachment_EE26BA76": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Json with different values/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testJsonwithdifferentvalues_Handler_IamRolePolicyAttachment_EE26BA76"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testJsonwithdifferentvalues_Handler_IamRole_8CF66D30.name}"
      },
      "undefined_testJsonwiththesamevalue_Handler_IamRolePolicyAttachment_F143BC0F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Json with the same value/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testJsonwiththesamevalue_Handler_IamRolePolicyAttachment_F143BC0F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testJsonwiththesamevalue_Handler_IamRole_8EC23E1D.name}"
      },
      "undefined_testMapwithdifferentvalues_Handler_IamRolePolicyAttachment_B40B6E29": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Map with different values/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testMapwithdifferentvalues_Handler_IamRolePolicyAttachment_B40B6E29"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testMapwithdifferentvalues_Handler_IamRole_3F6578F6.name}"
      },
      "undefined_testMapwiththesamevalue_Handler_IamRolePolicyAttachment_5D96B979": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Map with the same value/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testMapwiththesamevalue_Handler_IamRolePolicyAttachment_5D96B979"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testMapwiththesamevalue_Handler_IamRole_419DDA3B.name}"
      },
      "undefined_testPrimitivetypeswithdifferentvalues_Handler_IamRolePolicyAttachment_D3B9593C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Primitive types with different values/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testPrimitivetypeswithdifferentvalues_Handler_IamRolePolicyAttachment_D3B9593C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testPrimitivetypeswithdifferentvalues_Handler_IamRole_3B188884.name}"
      },
      "undefined_testPrimitivetypeswiththesamevalue_Handler_IamRolePolicyAttachment_A6692FA9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Primitive types with the same value/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testPrimitivetypeswiththesamevalue_Handler_IamRolePolicyAttachment_A6692FA9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testPrimitivetypeswiththesamevalue_Handler_IamRole_711AFAA0.name}"
      },
      "undefined_testSettypeswithdifferentvalues_Handler_IamRolePolicyAttachment_9B56F297": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Set types with different values/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testSettypeswithdifferentvalues_Handler_IamRolePolicyAttachment_9B56F297"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testSettypeswithdifferentvalues_Handler_IamRole_91819181.name}"
      },
      "undefined_testSettypeswiththesamevalue_Handler_IamRolePolicyAttachment_17090C1D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Set types with the same value/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testSettypeswiththesamevalue_Handler_IamRolePolicyAttachment_17090C1D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testSettypeswiththesamevalue_Handler_IamRole_89F2A2B1.name}"
      },
      "undefined_testStructwithdifferentvalues_Handler_IamRolePolicyAttachment_7AB7B0C9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Struct with different values/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testStructwithdifferentvalues_Handler_IamRolePolicyAttachment_7AB7B0C9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testStructwithdifferentvalues_Handler_IamRole_1A11F71D.name}"
      },
      "undefined_testStructwiththesamevalue_Handler_IamRolePolicyAttachment_9030ADFC": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Struct with the same value/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testStructwiththesamevalue_Handler_IamRolePolicyAttachment_9030ADFC"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testStructwiththesamevalue_Handler_IamRole_41BEB903.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testArraywithdifferentvalues_Handler_A9F27FFF": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Array with different values/Handler/Default",
            "uniqueId": "undefined_testArraywithdifferentvalues_Handler_A9F27FFF"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8ff8764",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8ff8764",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testArraywithdifferentvalues_Handler_IamRole_6D7F277B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testArraywithdifferentvalues_Handler_S3Object_AB102C08.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testArraywiththesamevalue_Handler_F670E8B6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Array with the same value/Handler/Default",
            "uniqueId": "undefined_testArraywiththesamevalue_Handler_F670E8B6"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c87cf750",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c87cf750",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testArraywiththesamevalue_Handler_IamRole_A7E21B7F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testArraywiththesamevalue_Handler_S3Object_8A99CA20.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testJsonwithdifferentvalues_Handler_B430481D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Json with different values/Handler/Default",
            "uniqueId": "undefined_testJsonwithdifferentvalues_Handler_B430481D"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c82612d3",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c82612d3",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testJsonwithdifferentvalues_Handler_IamRole_8CF66D30.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testJsonwithdifferentvalues_Handler_S3Object_EA4C1F83.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testJsonwiththesamevalue_Handler_A0E959EE": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Json with the same value/Handler/Default",
            "uniqueId": "undefined_testJsonwiththesamevalue_Handler_A0E959EE"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8c37b79",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8c37b79",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testJsonwiththesamevalue_Handler_IamRole_8EC23E1D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testJsonwiththesamevalue_Handler_S3Object_D20DB5FC.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testMapwithdifferentvalues_Handler_D4DD2946": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Map with different values/Handler/Default",
            "uniqueId": "undefined_testMapwithdifferentvalues_Handler_D4DD2946"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8f5ff3a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8f5ff3a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testMapwithdifferentvalues_Handler_IamRole_3F6578F6.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testMapwithdifferentvalues_Handler_S3Object_042DADF8.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testMapwiththesamevalue_Handler_44AC81A1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Map with the same value/Handler/Default",
            "uniqueId": "undefined_testMapwiththesamevalue_Handler_44AC81A1"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c86baafe",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c86baafe",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testMapwiththesamevalue_Handler_IamRole_419DDA3B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testMapwiththesamevalue_Handler_S3Object_1405423D.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testPrimitivetypeswithdifferentvalues_Handler_72687E7C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Primitive types with different values/Handler/Default",
            "uniqueId": "undefined_testPrimitivetypeswithdifferentvalues_Handler_72687E7C"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c81908b2",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c81908b2",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testPrimitivetypeswithdifferentvalues_Handler_IamRole_3B188884.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testPrimitivetypeswithdifferentvalues_Handler_S3Object_3C875F72.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testPrimitivetypeswiththesamevalue_Handler_BA23DEF1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Primitive types with the same value/Handler/Default",
            "uniqueId": "undefined_testPrimitivetypeswiththesamevalue_Handler_BA23DEF1"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c86e00a0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c86e00a0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testPrimitivetypeswiththesamevalue_Handler_IamRole_711AFAA0.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testPrimitivetypeswiththesamevalue_Handler_S3Object_FD702405.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testSettypeswithdifferentvalues_Handler_9ADD9681": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Set types with different values/Handler/Default",
            "uniqueId": "undefined_testSettypeswithdifferentvalues_Handler_9ADD9681"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8861425",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8861425",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testSettypeswithdifferentvalues_Handler_IamRole_91819181.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testSettypeswithdifferentvalues_Handler_S3Object_BECF2E06.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testSettypeswiththesamevalue_Handler_0228D440": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Set types with the same value/Handler/Default",
            "uniqueId": "undefined_testSettypeswiththesamevalue_Handler_0228D440"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c85b7ae9",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c85b7ae9",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testSettypeswiththesamevalue_Handler_IamRole_89F2A2B1.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testSettypeswiththesamevalue_Handler_S3Object_7706CCF6.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testStructwithdifferentvalues_Handler_E890A68E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Struct with different values/Handler/Default",
            "uniqueId": "undefined_testStructwithdifferentvalues_Handler_E890A68E"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c878dc75",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c878dc75",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testStructwithdifferentvalues_Handler_IamRole_1A11F71D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testStructwithdifferentvalues_Handler_S3Object_C0BBA847.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testStructwiththesamevalue_Handler_F9E97F69": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Struct with the same value/Handler/Default",
            "uniqueId": "undefined_testStructwiththesamevalue_Handler_F9E97F69"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8a917e6",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8a917e6",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testStructwiththesamevalue_Handler_IamRole_41BEB903.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testStructwiththesamevalue_Handler_S3Object_79E1F5DD.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "undefined_Code_6226BB4A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Code",
            "uniqueId": "undefined_Code_6226BB4A"
          }
        },
        "bucket_prefix": "code-c818e3de-"
      }
    },
    "aws_s3_object": {
      "undefined_testArraywithdifferentvalues_Handler_S3Object_AB102C08": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Array with different values/Handler/S3Object",
            "uniqueId": "undefined_testArraywithdifferentvalues_Handler_S3Object_AB102C08"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testArraywiththesamevalue_Handler_S3Object_8A99CA20": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Array with the same value/Handler/S3Object",
            "uniqueId": "undefined_testArraywiththesamevalue_Handler_S3Object_8A99CA20"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testJsonwithdifferentvalues_Handler_S3Object_EA4C1F83": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Json with different values/Handler/S3Object",
            "uniqueId": "undefined_testJsonwithdifferentvalues_Handler_S3Object_EA4C1F83"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testJsonwiththesamevalue_Handler_S3Object_D20DB5FC": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Json with the same value/Handler/S3Object",
            "uniqueId": "undefined_testJsonwiththesamevalue_Handler_S3Object_D20DB5FC"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testMapwithdifferentvalues_Handler_S3Object_042DADF8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Map with different values/Handler/S3Object",
            "uniqueId": "undefined_testMapwithdifferentvalues_Handler_S3Object_042DADF8"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testMapwiththesamevalue_Handler_S3Object_1405423D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Map with the same value/Handler/S3Object",
            "uniqueId": "undefined_testMapwiththesamevalue_Handler_S3Object_1405423D"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testPrimitivetypeswithdifferentvalues_Handler_S3Object_3C875F72": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Primitive types with different values/Handler/S3Object",
            "uniqueId": "undefined_testPrimitivetypeswithdifferentvalues_Handler_S3Object_3C875F72"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testPrimitivetypeswiththesamevalue_Handler_S3Object_FD702405": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Primitive types with the same value/Handler/S3Object",
            "uniqueId": "undefined_testPrimitivetypeswiththesamevalue_Handler_S3Object_FD702405"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testSettypeswithdifferentvalues_Handler_S3Object_BECF2E06": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Set types with different values/Handler/S3Object",
            "uniqueId": "undefined_testSettypeswithdifferentvalues_Handler_S3Object_BECF2E06"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testSettypeswiththesamevalue_Handler_S3Object_7706CCF6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Set types with the same value/Handler/S3Object",
            "uniqueId": "undefined_testSettypeswiththesamevalue_Handler_S3Object_7706CCF6"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testStructwithdifferentvalues_Handler_S3Object_C0BBA847": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Struct with different values/Handler/S3Object",
            "uniqueId": "undefined_testStructwithdifferentvalues_Handler_S3Object_C0BBA847"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testStructwiththesamevalue_Handler_S3Object_79E1F5DD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:Struct with the same value/Handler/S3Object",
            "uniqueId": "undefined_testStructwiththesamevalue_Handler_S3Object_79E1F5DD"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    }
  }
}
```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $numA: ${context._lift(numA)},
            $numB: ${context._lift(numB)},
            $strA: ${context._lift(strA)},
            $strB: ${context._lift(strB)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this).text};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(numA, host, []);
          $Closure1._registerBindObject(numB, host, []);
          $Closure1._registerBindObject(strA, host, []);
          $Closure1._registerBindObject(strB, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2.js")({
            $numA: ${context._lift(numA)},
            $numC: ${context._lift(numC)},
            $strA: ${context._lift(strA)},
            $strC: ${context._lift(strC)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this).text};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(numA, host, []);
          $Closure2._registerBindObject(numC, host, []);
          $Closure2._registerBindObject(strA, host, []);
          $Closure2._registerBindObject(strC, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure3.js")({
            $jsonA: ${context._lift(jsonA)},
            $jsonB: ${context._lift(jsonB)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this).text};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure3._registerBindObject(jsonA, host, []);
          $Closure3._registerBindObject(jsonB, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure4.js")({
            $jsonA: ${context._lift(jsonA)},
            $jsonC: ${context._lift(jsonC)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType(this).text};
            const client = new $Closure4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure4._registerBindObject(jsonA, host, []);
          $Closure4._registerBindObject(jsonC, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure5 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure5.js")({
            $new_Set_setB_: ${context._lift(new Set(setB))},
            $setA: ${context._lift(setA)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure5Client = ${$Closure5._toInflightType(this).text};
            const client = new $Closure5Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure5._registerBindObject(new Set(setB), host, []);
          $Closure5._registerBindObject(setA, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure6 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure6.js")({
            $setA: ${context._lift(setA)},
            $setC: ${context._lift(setC)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure6Client = ${$Closure6._toInflightType(this).text};
            const client = new $Closure6Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure6._registerBindObject(setA, host, []);
          $Closure6._registerBindObject(setC, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure7 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure7.js")({
            $______mapB___: ${context._lift(({...(mapB)}))},
            $mapA: ${context._lift(mapA)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure7Client = ${$Closure7._toInflightType(this).text};
            const client = new $Closure7Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure7._registerBindObject(({...(mapB)}), host, []);
          $Closure7._registerBindObject(mapA, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure8 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure8.js")({
            $mapA: ${context._lift(mapA)},
            $mapC: ${context._lift(mapC)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure8Client = ${$Closure8._toInflightType(this).text};
            const client = new $Closure8Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure8._registerBindObject(mapA, host, []);
          $Closure8._registerBindObject(mapC, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure9 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure9.js")({
            $_____arrayB__: ${context._lift([...(arrayB)])},
            $arrayA: ${context._lift(arrayA)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure9Client = ${$Closure9._toInflightType(this).text};
            const client = new $Closure9Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure9._registerBindObject([...(arrayB)], host, []);
          $Closure9._registerBindObject(arrayA, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure10 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure10.js")({
            $arrayA: ${context._lift(arrayA)},
            $arrayC: ${context._lift(arrayC)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure10Client = ${$Closure10._toInflightType(this).text};
            const client = new $Closure10Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure10._registerBindObject(arrayA, host, []);
          $Closure10._registerBindObject(arrayC, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure11 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure11.js")({
            $cat1: ${context._lift(cat1)},
            $cat2: ${context._lift(cat2)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure11Client = ${$Closure11._toInflightType(this).text};
            const client = new $Closure11Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure11._registerBindObject(cat1, host, []);
          $Closure11._registerBindObject(cat2, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure12 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure12.js")({
            $cat1: ${context._lift(cat1)},
            $cat3: ${context._lift(cat3)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure12Client = ${$Closure12._toInflightType(this).text};
            const client = new $Closure12Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure12._registerBindObject(cat1, host, []);
          $Closure12._registerBindObject(cat3, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const numA = 1;
    const numB = 1;
    const numC = 10;
    const strA = "wing";
    const strB = "wing";
    const strC = "wingnuts";
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:Primitive types with the same value",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:Primitive types with different values",new $Closure2(this,"$Closure2"));
    const jsonA = ({"a": 1});
    const jsonB = ({"a": 1});
    const jsonC = [1, 2, 3];
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:Json with the same value",new $Closure3(this,"$Closure3"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:Json with different values",new $Closure4(this,"$Closure4"));
    const setA = new Set([1, 2, 3]);
    const setB = new Set([1, 2, 3]);
    const setC = new Set([4, 5, 6]);
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:Set types with the same value",new $Closure5(this,"$Closure5"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:Set types with different values",new $Closure6(this,"$Closure6"));
    const mapA = ({"a": 1,"b": 2});
    const mapB = ({"a": 1,"b": 2});
    const mapC = ({"c": 10,"b": 2});
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:Map with the same value",new $Closure7(this,"$Closure7"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:Map with different values",new $Closure8(this,"$Closure8"));
    const arrayA = [1, 2, 3];
    const arrayB = [1, 2, 3];
    const arrayC = [4, 5, 6];
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:Array with the same value",new $Closure9(this,"$Closure9"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:Array with different values",new $Closure10(this,"$Closure10"));
    const cat1 = ({"name": "Mittens","age": 3});
    const cat2 = ({"name": "Mittens","age": 3});
    const cat3 = ({"name": "Simba","age": 5});
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:Struct with the same value",new $Closure11(this,"$Closure11"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:Struct with different values",new $Closure12(this,"$Closure12"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "deep_equality", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

