# [deep_equality.w](../../../../../examples/tests/valid/deep_equality.w) | compile | tf-aws

## Cat.Struct.js
```js
module.exports = function(stdStruct) {
  class Cat {
    static jsonSchema() {
      return {
        id: "/Cat",
        type: "object",
        properties: {
          name: { type: "string" },
          age: { type: "number" },
        },
        required: [
          "name",
          "age",
        ],
        $defs: {
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return `require("./Cat.Struct.js")(${ context._lift(stdStruct) })`;
    }
  }
  return Cat;
};

```

## inflight.$Closure1-1.js
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

## inflight.$Closure10-1.js
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

## inflight.$Closure11-1.js
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

## inflight.$Closure12-1.js
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

## inflight.$Closure2-1.js
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

## inflight.$Closure3-1.js
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

## inflight.$Closure4-1.js
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

## inflight.$Closure5-1.js
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

## inflight.$Closure6-1.js
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

## inflight.$Closure7-1.js
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

## inflight.$Closure8-1.js
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

## inflight.$Closure9-1.js
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
        "Default": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/Default/Default/test:Primitive types with the same value\",\"${aws_lambda_function.testPrimitivetypeswiththesamevalue_Handler_E7430682.arn}\"],[\"root/Default/Default/test:Primitive types with different values\",\"${aws_lambda_function.testPrimitivetypeswithdifferentvalues_Handler_1CD5AE77.arn}\"],[\"root/Default/Default/test:Json with the same value\",\"${aws_lambda_function.testJsonwiththesamevalue_Handler_0A930AF7.arn}\"],[\"root/Default/Default/test:Json with different values\",\"${aws_lambda_function.testJsonwithdifferentvalues_Handler_7CBC98A6.arn}\"],[\"root/Default/Default/test:Set types with the same value\",\"${aws_lambda_function.testSettypeswiththesamevalue_Handler_16147212.arn}\"],[\"root/Default/Default/test:Set types with different values\",\"${aws_lambda_function.testSettypeswithdifferentvalues_Handler_827F38F3.arn}\"],[\"root/Default/Default/test:Map with the same value\",\"${aws_lambda_function.testMapwiththesamevalue_Handler_74DC4830.arn}\"],[\"root/Default/Default/test:Map with different values\",\"${aws_lambda_function.testMapwithdifferentvalues_Handler_E889ADD0.arn}\"],[\"root/Default/Default/test:Array with the same value\",\"${aws_lambda_function.testArraywiththesamevalue_Handler_7A26272F.arn}\"],[\"root/Default/Default/test:Array with different values\",\"${aws_lambda_function.testArraywithdifferentvalues_Handler_2422390C.arn}\"],[\"root/Default/Default/test:Struct with the same value\",\"${aws_lambda_function.testStructwiththesamevalue_Handler_4436CF3A.arn}\"],[\"root/Default/Default/test:Struct with different values\",\"${aws_lambda_function.testStructwithdifferentvalues_Handler_A8DC5651.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testArraywithdifferentvalues_Handler_IamRole_FC5BD6E2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Array with different values/Handler/IamRole",
            "uniqueId": "testArraywithdifferentvalues_Handler_IamRole_FC5BD6E2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testArraywiththesamevalue_Handler_IamRole_4E0921A0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Array with the same value/Handler/IamRole",
            "uniqueId": "testArraywiththesamevalue_Handler_IamRole_4E0921A0"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testJsonwithdifferentvalues_Handler_IamRole_12575809": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Json with different values/Handler/IamRole",
            "uniqueId": "testJsonwithdifferentvalues_Handler_IamRole_12575809"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testJsonwiththesamevalue_Handler_IamRole_BC676995": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Json with the same value/Handler/IamRole",
            "uniqueId": "testJsonwiththesamevalue_Handler_IamRole_BC676995"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testMapwithdifferentvalues_Handler_IamRole_CF7CC596": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Map with different values/Handler/IamRole",
            "uniqueId": "testMapwithdifferentvalues_Handler_IamRole_CF7CC596"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testMapwiththesamevalue_Handler_IamRole_CC9D639C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Map with the same value/Handler/IamRole",
            "uniqueId": "testMapwiththesamevalue_Handler_IamRole_CC9D639C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testPrimitivetypeswithdifferentvalues_Handler_IamRole_486896F1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Primitive types with different values/Handler/IamRole",
            "uniqueId": "testPrimitivetypeswithdifferentvalues_Handler_IamRole_486896F1"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testPrimitivetypeswiththesamevalue_Handler_IamRole_AAB321E6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Primitive types with the same value/Handler/IamRole",
            "uniqueId": "testPrimitivetypeswiththesamevalue_Handler_IamRole_AAB321E6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testSettypeswithdifferentvalues_Handler_IamRole_170B7079": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Set types with different values/Handler/IamRole",
            "uniqueId": "testSettypeswithdifferentvalues_Handler_IamRole_170B7079"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testSettypeswiththesamevalue_Handler_IamRole_058FC879": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Set types with the same value/Handler/IamRole",
            "uniqueId": "testSettypeswiththesamevalue_Handler_IamRole_058FC879"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testStructwithdifferentvalues_Handler_IamRole_A1B66D3F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Struct with different values/Handler/IamRole",
            "uniqueId": "testStructwithdifferentvalues_Handler_IamRole_A1B66D3F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testStructwiththesamevalue_Handler_IamRole_705BC42B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Struct with the same value/Handler/IamRole",
            "uniqueId": "testStructwiththesamevalue_Handler_IamRole_705BC42B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testArraywithdifferentvalues_Handler_IamRolePolicy_A345D9E8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Array with different values/Handler/IamRolePolicy",
            "uniqueId": "testArraywithdifferentvalues_Handler_IamRolePolicy_A345D9E8"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testArraywithdifferentvalues_Handler_IamRole_FC5BD6E2.name}"
      },
      "testArraywiththesamevalue_Handler_IamRolePolicy_190CF3C3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Array with the same value/Handler/IamRolePolicy",
            "uniqueId": "testArraywiththesamevalue_Handler_IamRolePolicy_190CF3C3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testArraywiththesamevalue_Handler_IamRole_4E0921A0.name}"
      },
      "testJsonwithdifferentvalues_Handler_IamRolePolicy_E3159C67": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Json with different values/Handler/IamRolePolicy",
            "uniqueId": "testJsonwithdifferentvalues_Handler_IamRolePolicy_E3159C67"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testJsonwithdifferentvalues_Handler_IamRole_12575809.name}"
      },
      "testJsonwiththesamevalue_Handler_IamRolePolicy_8086FDCB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Json with the same value/Handler/IamRolePolicy",
            "uniqueId": "testJsonwiththesamevalue_Handler_IamRolePolicy_8086FDCB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testJsonwiththesamevalue_Handler_IamRole_BC676995.name}"
      },
      "testMapwithdifferentvalues_Handler_IamRolePolicy_A49668FF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Map with different values/Handler/IamRolePolicy",
            "uniqueId": "testMapwithdifferentvalues_Handler_IamRolePolicy_A49668FF"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testMapwithdifferentvalues_Handler_IamRole_CF7CC596.name}"
      },
      "testMapwiththesamevalue_Handler_IamRolePolicy_6A901007": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Map with the same value/Handler/IamRolePolicy",
            "uniqueId": "testMapwiththesamevalue_Handler_IamRolePolicy_6A901007"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testMapwiththesamevalue_Handler_IamRole_CC9D639C.name}"
      },
      "testPrimitivetypeswithdifferentvalues_Handler_IamRolePolicy_E319096A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Primitive types with different values/Handler/IamRolePolicy",
            "uniqueId": "testPrimitivetypeswithdifferentvalues_Handler_IamRolePolicy_E319096A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testPrimitivetypeswithdifferentvalues_Handler_IamRole_486896F1.name}"
      },
      "testPrimitivetypeswiththesamevalue_Handler_IamRolePolicy_57C12442": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Primitive types with the same value/Handler/IamRolePolicy",
            "uniqueId": "testPrimitivetypeswiththesamevalue_Handler_IamRolePolicy_57C12442"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testPrimitivetypeswiththesamevalue_Handler_IamRole_AAB321E6.name}"
      },
      "testSettypeswithdifferentvalues_Handler_IamRolePolicy_6B0161E6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Set types with different values/Handler/IamRolePolicy",
            "uniqueId": "testSettypeswithdifferentvalues_Handler_IamRolePolicy_6B0161E6"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testSettypeswithdifferentvalues_Handler_IamRole_170B7079.name}"
      },
      "testSettypeswiththesamevalue_Handler_IamRolePolicy_85C3A094": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Set types with the same value/Handler/IamRolePolicy",
            "uniqueId": "testSettypeswiththesamevalue_Handler_IamRolePolicy_85C3A094"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testSettypeswiththesamevalue_Handler_IamRole_058FC879.name}"
      },
      "testStructwithdifferentvalues_Handler_IamRolePolicy_B2AB1519": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Struct with different values/Handler/IamRolePolicy",
            "uniqueId": "testStructwithdifferentvalues_Handler_IamRolePolicy_B2AB1519"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testStructwithdifferentvalues_Handler_IamRole_A1B66D3F.name}"
      },
      "testStructwiththesamevalue_Handler_IamRolePolicy_475F7032": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Struct with the same value/Handler/IamRolePolicy",
            "uniqueId": "testStructwiththesamevalue_Handler_IamRolePolicy_475F7032"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testStructwiththesamevalue_Handler_IamRole_705BC42B.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testArraywithdifferentvalues_Handler_IamRolePolicyAttachment_E439E7EC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Array with different values/Handler/IamRolePolicyAttachment",
            "uniqueId": "testArraywithdifferentvalues_Handler_IamRolePolicyAttachment_E439E7EC"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testArraywithdifferentvalues_Handler_IamRole_FC5BD6E2.name}"
      },
      "testArraywiththesamevalue_Handler_IamRolePolicyAttachment_4871F563": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Array with the same value/Handler/IamRolePolicyAttachment",
            "uniqueId": "testArraywiththesamevalue_Handler_IamRolePolicyAttachment_4871F563"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testArraywiththesamevalue_Handler_IamRole_4E0921A0.name}"
      },
      "testJsonwithdifferentvalues_Handler_IamRolePolicyAttachment_4450F623": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Json with different values/Handler/IamRolePolicyAttachment",
            "uniqueId": "testJsonwithdifferentvalues_Handler_IamRolePolicyAttachment_4450F623"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testJsonwithdifferentvalues_Handler_IamRole_12575809.name}"
      },
      "testJsonwiththesamevalue_Handler_IamRolePolicyAttachment_690FEA7C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Json with the same value/Handler/IamRolePolicyAttachment",
            "uniqueId": "testJsonwiththesamevalue_Handler_IamRolePolicyAttachment_690FEA7C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testJsonwiththesamevalue_Handler_IamRole_BC676995.name}"
      },
      "testMapwithdifferentvalues_Handler_IamRolePolicyAttachment_9C810FF6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Map with different values/Handler/IamRolePolicyAttachment",
            "uniqueId": "testMapwithdifferentvalues_Handler_IamRolePolicyAttachment_9C810FF6"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testMapwithdifferentvalues_Handler_IamRole_CF7CC596.name}"
      },
      "testMapwiththesamevalue_Handler_IamRolePolicyAttachment_F9DC04FA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Map with the same value/Handler/IamRolePolicyAttachment",
            "uniqueId": "testMapwiththesamevalue_Handler_IamRolePolicyAttachment_F9DC04FA"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testMapwiththesamevalue_Handler_IamRole_CC9D639C.name}"
      },
      "testPrimitivetypeswithdifferentvalues_Handler_IamRolePolicyAttachment_D3647122": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Primitive types with different values/Handler/IamRolePolicyAttachment",
            "uniqueId": "testPrimitivetypeswithdifferentvalues_Handler_IamRolePolicyAttachment_D3647122"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testPrimitivetypeswithdifferentvalues_Handler_IamRole_486896F1.name}"
      },
      "testPrimitivetypeswiththesamevalue_Handler_IamRolePolicyAttachment_5BE812C7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Primitive types with the same value/Handler/IamRolePolicyAttachment",
            "uniqueId": "testPrimitivetypeswiththesamevalue_Handler_IamRolePolicyAttachment_5BE812C7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testPrimitivetypeswiththesamevalue_Handler_IamRole_AAB321E6.name}"
      },
      "testSettypeswithdifferentvalues_Handler_IamRolePolicyAttachment_6D8FBB2A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Set types with different values/Handler/IamRolePolicyAttachment",
            "uniqueId": "testSettypeswithdifferentvalues_Handler_IamRolePolicyAttachment_6D8FBB2A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testSettypeswithdifferentvalues_Handler_IamRole_170B7079.name}"
      },
      "testSettypeswiththesamevalue_Handler_IamRolePolicyAttachment_C5010D5B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Set types with the same value/Handler/IamRolePolicyAttachment",
            "uniqueId": "testSettypeswiththesamevalue_Handler_IamRolePolicyAttachment_C5010D5B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testSettypeswiththesamevalue_Handler_IamRole_058FC879.name}"
      },
      "testStructwithdifferentvalues_Handler_IamRolePolicyAttachment_1EA2F024": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Struct with different values/Handler/IamRolePolicyAttachment",
            "uniqueId": "testStructwithdifferentvalues_Handler_IamRolePolicyAttachment_1EA2F024"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testStructwithdifferentvalues_Handler_IamRole_A1B66D3F.name}"
      },
      "testStructwiththesamevalue_Handler_IamRolePolicyAttachment_1E4F5BA8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Struct with the same value/Handler/IamRolePolicyAttachment",
            "uniqueId": "testStructwiththesamevalue_Handler_IamRolePolicyAttachment_1E4F5BA8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testStructwiththesamevalue_Handler_IamRole_705BC42B.name}"
      }
    },
    "aws_lambda_function": {
      "testArraywithdifferentvalues_Handler_2422390C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Array with different values/Handler/Default",
            "uniqueId": "testArraywithdifferentvalues_Handler_2422390C"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c804987d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c804987d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testArraywithdifferentvalues_Handler_IamRole_FC5BD6E2.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testArraywithdifferentvalues_Handler_S3Object_82EC75EC.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testArraywiththesamevalue_Handler_7A26272F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Array with the same value/Handler/Default",
            "uniqueId": "testArraywiththesamevalue_Handler_7A26272F"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c85bde80",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c85bde80",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testArraywiththesamevalue_Handler_IamRole_4E0921A0.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testArraywiththesamevalue_Handler_S3Object_4588D096.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testJsonwithdifferentvalues_Handler_7CBC98A6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Json with different values/Handler/Default",
            "uniqueId": "testJsonwithdifferentvalues_Handler_7CBC98A6"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c81ffded",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c81ffded",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testJsonwithdifferentvalues_Handler_IamRole_12575809.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testJsonwithdifferentvalues_Handler_S3Object_5F4A5EDA.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testJsonwiththesamevalue_Handler_0A930AF7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Json with the same value/Handler/Default",
            "uniqueId": "testJsonwiththesamevalue_Handler_0A930AF7"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8a70f75",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8a70f75",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testJsonwiththesamevalue_Handler_IamRole_BC676995.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testJsonwiththesamevalue_Handler_S3Object_E25D109B.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testMapwithdifferentvalues_Handler_E889ADD0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Map with different values/Handler/Default",
            "uniqueId": "testMapwithdifferentvalues_Handler_E889ADD0"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8bfa9fd",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8bfa9fd",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testMapwithdifferentvalues_Handler_IamRole_CF7CC596.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testMapwithdifferentvalues_Handler_S3Object_07E13478.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testMapwiththesamevalue_Handler_74DC4830": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Map with the same value/Handler/Default",
            "uniqueId": "testMapwiththesamevalue_Handler_74DC4830"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8e1f849",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8e1f849",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testMapwiththesamevalue_Handler_IamRole_CC9D639C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testMapwiththesamevalue_Handler_S3Object_B4857ED0.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testPrimitivetypeswithdifferentvalues_Handler_1CD5AE77": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Primitive types with different values/Handler/Default",
            "uniqueId": "testPrimitivetypeswithdifferentvalues_Handler_1CD5AE77"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8339af6",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8339af6",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testPrimitivetypeswithdifferentvalues_Handler_IamRole_486896F1.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testPrimitivetypeswithdifferentvalues_Handler_S3Object_9C3AA605.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testPrimitivetypeswiththesamevalue_Handler_E7430682": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Primitive types with the same value/Handler/Default",
            "uniqueId": "testPrimitivetypeswiththesamevalue_Handler_E7430682"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8c80713",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8c80713",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testPrimitivetypeswiththesamevalue_Handler_IamRole_AAB321E6.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testPrimitivetypeswiththesamevalue_Handler_S3Object_C824F26A.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testSettypeswithdifferentvalues_Handler_827F38F3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Set types with different values/Handler/Default",
            "uniqueId": "testSettypeswithdifferentvalues_Handler_827F38F3"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8f9b754",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8f9b754",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testSettypeswithdifferentvalues_Handler_IamRole_170B7079.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testSettypeswithdifferentvalues_Handler_S3Object_727747E2.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testSettypeswiththesamevalue_Handler_16147212": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Set types with the same value/Handler/Default",
            "uniqueId": "testSettypeswiththesamevalue_Handler_16147212"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c80c25d8",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c80c25d8",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testSettypeswiththesamevalue_Handler_IamRole_058FC879.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testSettypeswiththesamevalue_Handler_S3Object_E7A37201.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testStructwithdifferentvalues_Handler_A8DC5651": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Struct with different values/Handler/Default",
            "uniqueId": "testStructwithdifferentvalues_Handler_A8DC5651"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8546ffd",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8546ffd",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testStructwithdifferentvalues_Handler_IamRole_A1B66D3F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testStructwithdifferentvalues_Handler_S3Object_29250ADD.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testStructwiththesamevalue_Handler_4436CF3A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Struct with the same value/Handler/Default",
            "uniqueId": "testStructwiththesamevalue_Handler_4436CF3A"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8c23fc1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8c23fc1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testStructwiththesamevalue_Handler_IamRole_705BC42B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testStructwiththesamevalue_Handler_S3Object_4846898F.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "Code": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "Code"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      }
    },
    "aws_s3_object": {
      "testArraywithdifferentvalues_Handler_S3Object_82EC75EC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Array with different values/Handler/S3Object",
            "uniqueId": "testArraywithdifferentvalues_Handler_S3Object_82EC75EC"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testArraywiththesamevalue_Handler_S3Object_4588D096": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Array with the same value/Handler/S3Object",
            "uniqueId": "testArraywiththesamevalue_Handler_S3Object_4588D096"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testJsonwithdifferentvalues_Handler_S3Object_5F4A5EDA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Json with different values/Handler/S3Object",
            "uniqueId": "testJsonwithdifferentvalues_Handler_S3Object_5F4A5EDA"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testJsonwiththesamevalue_Handler_S3Object_E25D109B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Json with the same value/Handler/S3Object",
            "uniqueId": "testJsonwiththesamevalue_Handler_S3Object_E25D109B"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testMapwithdifferentvalues_Handler_S3Object_07E13478": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Map with different values/Handler/S3Object",
            "uniqueId": "testMapwithdifferentvalues_Handler_S3Object_07E13478"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testMapwiththesamevalue_Handler_S3Object_B4857ED0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Map with the same value/Handler/S3Object",
            "uniqueId": "testMapwiththesamevalue_Handler_S3Object_B4857ED0"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testPrimitivetypeswithdifferentvalues_Handler_S3Object_9C3AA605": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Primitive types with different values/Handler/S3Object",
            "uniqueId": "testPrimitivetypeswithdifferentvalues_Handler_S3Object_9C3AA605"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testPrimitivetypeswiththesamevalue_Handler_S3Object_C824F26A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Primitive types with the same value/Handler/S3Object",
            "uniqueId": "testPrimitivetypeswiththesamevalue_Handler_S3Object_C824F26A"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testSettypeswithdifferentvalues_Handler_S3Object_727747E2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Set types with different values/Handler/S3Object",
            "uniqueId": "testSettypeswithdifferentvalues_Handler_S3Object_727747E2"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testSettypeswiththesamevalue_Handler_S3Object_E7A37201": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Set types with the same value/Handler/S3Object",
            "uniqueId": "testSettypeswiththesamevalue_Handler_S3Object_E7A37201"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testStructwithdifferentvalues_Handler_S3Object_29250ADD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Struct with different values/Handler/S3Object",
            "uniqueId": "testStructwithdifferentvalues_Handler_S3Object_29250ADD"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testStructwiththesamevalue_Handler_S3Object_4846898F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:Struct with the same value/Handler/S3Object",
            "uniqueId": "testStructwiththesamevalue_Handler_S3Object_4846898F"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
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
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $numA: ${context._lift(numA)},
            $numB: ${context._lift(numB)},
            $strA: ${context._lift(strA)},
            $strB: ${context._lift(strB)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this)};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"]
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
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
            $numA: ${context._lift(numA)},
            $numC: ${context._lift(numC)},
            $strA: ${context._lift(strA)},
            $strC: ${context._lift(strC)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this)};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"]
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
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-1.js")({
            $jsonA: ${context._lift(jsonA)},
            $jsonB: ${context._lift(jsonB)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this)};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"]
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
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure4-1.js")({
            $jsonA: ${context._lift(jsonA)},
            $jsonC: ${context._lift(jsonC)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType(this)};
            const client = new $Closure4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"]
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
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure5-1.js")({
            $new_Set_setB_: ${context._lift(new Set(setB))},
            $setA: ${context._lift(setA)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure5Client = ${$Closure5._toInflightType(this)};
            const client = new $Closure5Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"]
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
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure6-1.js")({
            $setA: ${context._lift(setA)},
            $setC: ${context._lift(setC)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure6Client = ${$Closure6._toInflightType(this)};
            const client = new $Closure6Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"]
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
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure7-1.js")({
            $______mapB___: ${context._lift(({...(mapB)}))},
            $mapA: ${context._lift(mapA)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure7Client = ${$Closure7._toInflightType(this)};
            const client = new $Closure7Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"]
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
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure8-1.js")({
            $mapA: ${context._lift(mapA)},
            $mapC: ${context._lift(mapC)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure8Client = ${$Closure8._toInflightType(this)};
            const client = new $Closure8Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"]
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
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure9-1.js")({
            $_____arrayB__: ${context._lift([...(arrayB)])},
            $arrayA: ${context._lift(arrayA)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure9Client = ${$Closure9._toInflightType(this)};
            const client = new $Closure9Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"]
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
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure10-1.js")({
            $arrayA: ${context._lift(arrayA)},
            $arrayC: ${context._lift(arrayC)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure10Client = ${$Closure10._toInflightType(this)};
            const client = new $Closure10Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"]
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
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure11-1.js")({
            $cat1: ${context._lift(cat1)},
            $cat2: ${context._lift(cat2)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure11Client = ${$Closure11._toInflightType(this)};
            const client = new $Closure11Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"]
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
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure12-1.js")({
            $cat1: ${context._lift(cat1)},
            $cat3: ${context._lift(cat3)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure12Client = ${$Closure12._toInflightType(this)};
            const client = new $Closure12Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"]
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
    const Cat = require("./Cat.Struct.js")($stdlib.std.Struct);
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

