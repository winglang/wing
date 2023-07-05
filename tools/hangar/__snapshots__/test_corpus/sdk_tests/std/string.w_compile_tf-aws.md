# [string.w](../../../../../../examples/tests/sdk_tests/std/string.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ PARSE_ERROR, std_String }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: str.fromJson(Json \"World\") == \"World\"")})((((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })("World") === "World"))};
      try {
        ((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })(123);
      }
      catch ($error_s) {
        const s = $error_s.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: s == PARSE_ERROR")})((s === PARSE_ERROR))};
      }
    }
  }
  return $Closure1;
}

```

## inflight.$Closure10.js
```js
module.exports = function({  }) {
  class $Closure10 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".startsWith(\"h\")")})("hello wing".startsWith("h"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: !\"hello wing\".startsWith(\"H\")")})((!"hello wing".startsWith("H")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: !\"hello wing\".startsWith(\"w\")")})((!"hello wing".startsWith("w")))};
    }
  }
  return $Closure10;
}

```

## inflight.$Closure11.js
```js
module.exports = function({  }) {
  class $Closure11 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".substring(0, 5) == \"hello\"")})(((await "hello wing".substring(0,5)) === "hello"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".substring(0, 100) == \"hello wing\"")})(((await "hello wing".substring(0,100)) === "hello wing"))};
    }
  }
  return $Closure11;
}

```

## inflight.$Closure12.js
```js
module.exports = function({  }) {
  class $Closure12 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing         \".trim() == \"hello wing\"")})(((await "hello wing         ".trim()) === "hello wing"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".trim() == \"hello wing\"")})(((await "hello wing".trim()) === "hello wing"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"\".trim() == \"\"")})(((await "".trim()) === ""))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"\\thello wing\\n\".trim() == \"hello wing\"")})(((await "\thello wing\n".trim()) === "hello wing"))};
    }
  }
  return $Closure12;
}

```

## inflight.$Closure13.js
```js
module.exports = function({  }) {
  class $Closure13 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".contains(\"hello\")")})("hello wing".includes("hello"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: !\"hello wing\".contains(\"Hello\")")})((!"hello wing".includes("Hello")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".contains(\"w\")")})("hello wing".includes("w"))};
    }
  }
  return $Closure13;
}

```

## inflight.$Closure2.js
```js
module.exports = function({  }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello\".length == 5")})(("hello".length === 5))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"\".length == 0")})(("".length === 0))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({  }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".at(0) == \"b\"")})(((await "boom".at(0)) === "b"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".at(-4) == \"b\"")})(((await "boom".at((-4))) === "b"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".at(-1) == \"m\"")})(((await "boom".at((-1))) === "m"))};
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4.js
```js
module.exports = function({  }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".concat(\"boom\") == \"boomboom\"")})(((await "boom".concat("boom")) === "boomboom"))};
    }
  }
  return $Closure4;
}

```

## inflight.$Closure5.js
```js
module.exports = function({  }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".endsWith(\"m\")")})("boom".endsWith("m"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: !\"boom\".endsWith(\"b\")")})((!"boom".endsWith("b")))};
    }
  }
  return $Closure5;
}

```

## inflight.$Closure6.js
```js
module.exports = function({  }) {
  class $Closure6 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".indexOf(\"m\") == 3")})(("boom".indexOf("m") === 3))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".indexOf(\"a\") == -1")})(("boom".indexOf("a") === (-1)))};
    }
  }
  return $Closure6;
}

```

## inflight.$Closure7.js
```js
module.exports = function({  }) {
  class $Closure7 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"BOOM\".lowercase() == \"boom\"")})(("BOOM".toLocaleLowerCase() === "boom"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"BooM\".lowercase() == \"boom\"")})(("BooM".toLocaleLowerCase() === "boom"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".lowercase() == \"boom\"")})(("boom".toLocaleLowerCase() === "boom"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"123#@\".lowercase() == \"123#@\"")})(("123#@".toLocaleLowerCase() === "123#@"))};
    }
  }
  return $Closure7;
}

```

## inflight.$Closure8.js
```js
module.exports = function({  }) {
  class $Closure8 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"BOOM\".uppercase() == \"BOOM\"")})(("BOOM".toLocaleUpperCase() === "BOOM"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"BooM\".uppercase() == \"BOOM\"")})(("BooM".toLocaleUpperCase() === "BOOM"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".uppercase() == \"BOOM\"")})(("boom".toLocaleUpperCase() === "BOOM"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"123#@\".uppercase() == \"123#@\"")})(("123#@".toLocaleUpperCase() === "123#@"))};
    }
  }
  return $Closure8;
}

```

## inflight.$Closure9.js
```js
module.exports = function({  }) {
  class $Closure9 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello;wing\".split(\";\").at(0) == \"hello\"")})(((await (await "hello;wing".split(";")).at(0)) === "hello"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello;wing\".split(\";\").at(1) == \"wing\"")})(((await (await "hello;wing".split(";")).at(1)) === "wing"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".split(\" \").at(0) == \"hello\"")})(((await (await "hello wing".split(" ")).at(0)) === "hello"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello;wing\".split(\";\").at(1) == \"wing\"")})(((await (await "hello;wing".split(";")).at(1)) === "wing"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".split(\"\").length == 10")})(((await "hello wing".split("")).length === 10))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".split(\"\").at(0) == \"h\"")})(((await (await "hello wing".split("")).at(0)) === "h"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".split(\"\").at(1) == \"e\"")})(((await (await "hello wing".split("")).at(1)) === "e"))};
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
      "version": "0.15.2"
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
      "value": "[[\"root/Default/Default/test:fromJson\",\"${aws_lambda_function.root_testfromJson_Handler_78BC74EF.arn}\"],[\"root/Default/Default/test:length\",\"${aws_lambda_function.root_testlength_Handler_7245E498.arn}\"],[\"root/Default/Default/test:at()\",\"${aws_lambda_function.root_testat_Handler_39FB3FA1.arn}\"],[\"root/Default/Default/test:concat()\",\"${aws_lambda_function.root_testconcat_Handler_2B9B5654.arn}\"],[\"root/Default/Default/test:endsWith()\",\"${aws_lambda_function.root_testendsWith_Handler_E854161E.arn}\"],[\"root/Default/Default/test:indexOf()\",\"${aws_lambda_function.root_testindexOf_Handler_6F5475B9.arn}\"],[\"root/Default/Default/test:lowercase()\",\"${aws_lambda_function.root_testlowercase_Handler_95CEF018.arn}\"],[\"root/Default/Default/test:uppercase()\",\"${aws_lambda_function.root_testuppercase_Handler_43CD4B37.arn}\"],[\"root/Default/Default/test:split()\",\"${aws_lambda_function.root_testsplit_Handler_BE849B09.arn}\"],[\"root/Default/Default/test:startsWith()\",\"${aws_lambda_function.root_teststartsWith_Handler_C08D2DA3.arn}\"],[\"root/Default/Default/test:substring()\",\"${aws_lambda_function.root_testsubstring_Handler_BB2E73EE.arn}\"],[\"root/Default/Default/test:trim()\",\"${aws_lambda_function.root_testtrim_Handler_8071D201.arn}\"],[\"root/Default/Default/test:contains()\",\"${aws_lambda_function.root_testcontains_Handler_9F29A18C.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testat_Handler_IamRole_EA5BD403": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:at()/Handler/IamRole",
            "uniqueId": "root_testat_Handler_IamRole_EA5BD403"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testconcat_Handler_IamRole_D3565082": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concat()/Handler/IamRole",
            "uniqueId": "root_testconcat_Handler_IamRole_D3565082"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testcontains_Handler_IamRole_D838F461": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:contains()/Handler/IamRole",
            "uniqueId": "root_testcontains_Handler_IamRole_D838F461"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testendsWith_Handler_IamRole_9C8E605F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:endsWith()/Handler/IamRole",
            "uniqueId": "root_testendsWith_Handler_IamRole_9C8E605F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testfromJson_Handler_IamRole_0CD391FA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson/Handler/IamRole",
            "uniqueId": "root_testfromJson_Handler_IamRole_0CD391FA"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testindexOf_Handler_IamRole_7B64B0A4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:indexOf()/Handler/IamRole",
            "uniqueId": "root_testindexOf_Handler_IamRole_7B64B0A4"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testlength_Handler_IamRole_A8384051": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:length/Handler/IamRole",
            "uniqueId": "root_testlength_Handler_IamRole_A8384051"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testlowercase_Handler_IamRole_38B6F995": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lowercase()/Handler/IamRole",
            "uniqueId": "root_testlowercase_Handler_IamRole_38B6F995"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testsplit_Handler_IamRole_335B1659": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:split()/Handler/IamRole",
            "uniqueId": "root_testsplit_Handler_IamRole_335B1659"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_teststartsWith_Handler_IamRole_FF6BD029": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:startsWith()/Handler/IamRole",
            "uniqueId": "root_teststartsWith_Handler_IamRole_FF6BD029"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testsubstring_Handler_IamRole_0C00157D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:substring()/Handler/IamRole",
            "uniqueId": "root_testsubstring_Handler_IamRole_0C00157D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testtrim_Handler_IamRole_B912FF8D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:trim()/Handler/IamRole",
            "uniqueId": "root_testtrim_Handler_IamRole_B912FF8D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testuppercase_Handler_IamRole_4AEBCA3A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:uppercase()/Handler/IamRole",
            "uniqueId": "root_testuppercase_Handler_IamRole_4AEBCA3A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testat_Handler_IamRolePolicy_F5E3D10E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:at()/Handler/IamRolePolicy",
            "uniqueId": "root_testat_Handler_IamRolePolicy_F5E3D10E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testat_Handler_IamRole_EA5BD403.name}"
      },
      "root_testconcat_Handler_IamRolePolicy_9FC6C8CB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concat()/Handler/IamRolePolicy",
            "uniqueId": "root_testconcat_Handler_IamRolePolicy_9FC6C8CB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testconcat_Handler_IamRole_D3565082.name}"
      },
      "root_testcontains_Handler_IamRolePolicy_98FEE2B9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:contains()/Handler/IamRolePolicy",
            "uniqueId": "root_testcontains_Handler_IamRolePolicy_98FEE2B9"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testcontains_Handler_IamRole_D838F461.name}"
      },
      "root_testendsWith_Handler_IamRolePolicy_29295A7C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:endsWith()/Handler/IamRolePolicy",
            "uniqueId": "root_testendsWith_Handler_IamRolePolicy_29295A7C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testendsWith_Handler_IamRole_9C8E605F.name}"
      },
      "root_testfromJson_Handler_IamRolePolicy_45DAD346": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson/Handler/IamRolePolicy",
            "uniqueId": "root_testfromJson_Handler_IamRolePolicy_45DAD346"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testfromJson_Handler_IamRole_0CD391FA.name}"
      },
      "root_testindexOf_Handler_IamRolePolicy_8E7A6391": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:indexOf()/Handler/IamRolePolicy",
            "uniqueId": "root_testindexOf_Handler_IamRolePolicy_8E7A6391"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testindexOf_Handler_IamRole_7B64B0A4.name}"
      },
      "root_testlength_Handler_IamRolePolicy_9DE70A2C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:length/Handler/IamRolePolicy",
            "uniqueId": "root_testlength_Handler_IamRolePolicy_9DE70A2C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testlength_Handler_IamRole_A8384051.name}"
      },
      "root_testlowercase_Handler_IamRolePolicy_D302619A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lowercase()/Handler/IamRolePolicy",
            "uniqueId": "root_testlowercase_Handler_IamRolePolicy_D302619A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testlowercase_Handler_IamRole_38B6F995.name}"
      },
      "root_testsplit_Handler_IamRolePolicy_AC02D869": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:split()/Handler/IamRolePolicy",
            "uniqueId": "root_testsplit_Handler_IamRolePolicy_AC02D869"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testsplit_Handler_IamRole_335B1659.name}"
      },
      "root_teststartsWith_Handler_IamRolePolicy_ACC5C9AA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:startsWith()/Handler/IamRolePolicy",
            "uniqueId": "root_teststartsWith_Handler_IamRolePolicy_ACC5C9AA"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_teststartsWith_Handler_IamRole_FF6BD029.name}"
      },
      "root_testsubstring_Handler_IamRolePolicy_08C66616": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:substring()/Handler/IamRolePolicy",
            "uniqueId": "root_testsubstring_Handler_IamRolePolicy_08C66616"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testsubstring_Handler_IamRole_0C00157D.name}"
      },
      "root_testtrim_Handler_IamRolePolicy_B3EC9F90": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:trim()/Handler/IamRolePolicy",
            "uniqueId": "root_testtrim_Handler_IamRolePolicy_B3EC9F90"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testtrim_Handler_IamRole_B912FF8D.name}"
      },
      "root_testuppercase_Handler_IamRolePolicy_E3205F9D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:uppercase()/Handler/IamRolePolicy",
            "uniqueId": "root_testuppercase_Handler_IamRolePolicy_E3205F9D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testuppercase_Handler_IamRole_4AEBCA3A.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testat_Handler_IamRolePolicyAttachment_13C52D1D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:at()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testat_Handler_IamRolePolicyAttachment_13C52D1D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testat_Handler_IamRole_EA5BD403.name}"
      },
      "root_testconcat_Handler_IamRolePolicyAttachment_3ECF4EC6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concat()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testconcat_Handler_IamRolePolicyAttachment_3ECF4EC6"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testconcat_Handler_IamRole_D3565082.name}"
      },
      "root_testcontains_Handler_IamRolePolicyAttachment_2B74BA53": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:contains()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testcontains_Handler_IamRolePolicyAttachment_2B74BA53"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testcontains_Handler_IamRole_D838F461.name}"
      },
      "root_testendsWith_Handler_IamRolePolicyAttachment_51ADF62A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:endsWith()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testendsWith_Handler_IamRolePolicyAttachment_51ADF62A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testendsWith_Handler_IamRole_9C8E605F.name}"
      },
      "root_testfromJson_Handler_IamRolePolicyAttachment_32BFB486": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testfromJson_Handler_IamRolePolicyAttachment_32BFB486"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testfromJson_Handler_IamRole_0CD391FA.name}"
      },
      "root_testindexOf_Handler_IamRolePolicyAttachment_44945C33": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:indexOf()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testindexOf_Handler_IamRolePolicyAttachment_44945C33"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testindexOf_Handler_IamRole_7B64B0A4.name}"
      },
      "root_testlength_Handler_IamRolePolicyAttachment_75515754": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:length/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testlength_Handler_IamRolePolicyAttachment_75515754"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testlength_Handler_IamRole_A8384051.name}"
      },
      "root_testlowercase_Handler_IamRolePolicyAttachment_0000995C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lowercase()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testlowercase_Handler_IamRolePolicyAttachment_0000995C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testlowercase_Handler_IamRole_38B6F995.name}"
      },
      "root_testsplit_Handler_IamRolePolicyAttachment_21563C82": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:split()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testsplit_Handler_IamRolePolicyAttachment_21563C82"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testsplit_Handler_IamRole_335B1659.name}"
      },
      "root_teststartsWith_Handler_IamRolePolicyAttachment_B5DF8DDF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:startsWith()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_teststartsWith_Handler_IamRolePolicyAttachment_B5DF8DDF"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_teststartsWith_Handler_IamRole_FF6BD029.name}"
      },
      "root_testsubstring_Handler_IamRolePolicyAttachment_729AE57E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:substring()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testsubstring_Handler_IamRolePolicyAttachment_729AE57E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testsubstring_Handler_IamRole_0C00157D.name}"
      },
      "root_testtrim_Handler_IamRolePolicyAttachment_1143D19B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:trim()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testtrim_Handler_IamRolePolicyAttachment_1143D19B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testtrim_Handler_IamRole_B912FF8D.name}"
      },
      "root_testuppercase_Handler_IamRolePolicyAttachment_7C9EE0F4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:uppercase()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testuppercase_Handler_IamRolePolicyAttachment_7C9EE0F4"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testuppercase_Handler_IamRole_4AEBCA3A.name}"
      }
    },
    "aws_lambda_function": {
      "root_testat_Handler_39FB3FA1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:at()/Handler/Default",
            "uniqueId": "root_testat_Handler_39FB3FA1"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c858faac",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c858faac",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testat_Handler_IamRole_EA5BD403.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testat_Handler_S3Object_C90B92D0.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testconcat_Handler_2B9B5654": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concat()/Handler/Default",
            "uniqueId": "root_testconcat_Handler_2B9B5654"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c869963c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c869963c",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testconcat_Handler_IamRole_D3565082.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testconcat_Handler_S3Object_883D8A97.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testcontains_Handler_9F29A18C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:contains()/Handler/Default",
            "uniqueId": "root_testcontains_Handler_9F29A18C"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8e953a0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8e953a0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testcontains_Handler_IamRole_D838F461.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testcontains_Handler_S3Object_65C920EB.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testendsWith_Handler_E854161E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:endsWith()/Handler/Default",
            "uniqueId": "root_testendsWith_Handler_E854161E"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8465c4f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8465c4f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testendsWith_Handler_IamRole_9C8E605F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testendsWith_Handler_S3Object_C4DA0D0A.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testfromJson_Handler_78BC74EF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson/Handler/Default",
            "uniqueId": "root_testfromJson_Handler_78BC74EF"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c89f3277",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c89f3277",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testfromJson_Handler_IamRole_0CD391FA.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testfromJson_Handler_S3Object_15CCD570.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testindexOf_Handler_6F5475B9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:indexOf()/Handler/Default",
            "uniqueId": "root_testindexOf_Handler_6F5475B9"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c80be453",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c80be453",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testindexOf_Handler_IamRole_7B64B0A4.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testindexOf_Handler_S3Object_4F451E5A.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testlength_Handler_7245E498": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:length/Handler/Default",
            "uniqueId": "root_testlength_Handler_7245E498"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8e0ccbd",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8e0ccbd",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testlength_Handler_IamRole_A8384051.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testlength_Handler_S3Object_22B052A5.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testlowercase_Handler_95CEF018": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lowercase()/Handler/Default",
            "uniqueId": "root_testlowercase_Handler_95CEF018"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c86ac32a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c86ac32a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testlowercase_Handler_IamRole_38B6F995.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testlowercase_Handler_S3Object_3920718B.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testsplit_Handler_BE849B09": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:split()/Handler/Default",
            "uniqueId": "root_testsplit_Handler_BE849B09"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8e87cf7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8e87cf7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testsplit_Handler_IamRole_335B1659.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testsplit_Handler_S3Object_AAF37758.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_teststartsWith_Handler_C08D2DA3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:startsWith()/Handler/Default",
            "uniqueId": "root_teststartsWith_Handler_C08D2DA3"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8f6a537",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8f6a537",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_teststartsWith_Handler_IamRole_FF6BD029.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_teststartsWith_Handler_S3Object_D9E4331C.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testsubstring_Handler_BB2E73EE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:substring()/Handler/Default",
            "uniqueId": "root_testsubstring_Handler_BB2E73EE"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c803a722",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c803a722",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testsubstring_Handler_IamRole_0C00157D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testsubstring_Handler_S3Object_59DA0784.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testtrim_Handler_8071D201": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:trim()/Handler/Default",
            "uniqueId": "root_testtrim_Handler_8071D201"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c81cc785",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c81cc785",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testtrim_Handler_IamRole_B912FF8D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testtrim_Handler_S3Object_AB882546.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testuppercase_Handler_43CD4B37": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:uppercase()/Handler/Default",
            "uniqueId": "root_testuppercase_Handler_43CD4B37"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c882dfb8",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c882dfb8",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testuppercase_Handler_IamRole_4AEBCA3A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testuppercase_Handler_S3Object_EDD57ADA.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "root_Code_02F3C603": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "root_Code_02F3C603"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      }
    },
    "aws_s3_object": {
      "root_testat_Handler_S3Object_C90B92D0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:at()/Handler/S3Object",
            "uniqueId": "root_testat_Handler_S3Object_C90B92D0"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testconcat_Handler_S3Object_883D8A97": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concat()/Handler/S3Object",
            "uniqueId": "root_testconcat_Handler_S3Object_883D8A97"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testcontains_Handler_S3Object_65C920EB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:contains()/Handler/S3Object",
            "uniqueId": "root_testcontains_Handler_S3Object_65C920EB"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testendsWith_Handler_S3Object_C4DA0D0A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:endsWith()/Handler/S3Object",
            "uniqueId": "root_testendsWith_Handler_S3Object_C4DA0D0A"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testfromJson_Handler_S3Object_15CCD570": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson/Handler/S3Object",
            "uniqueId": "root_testfromJson_Handler_S3Object_15CCD570"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testindexOf_Handler_S3Object_4F451E5A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:indexOf()/Handler/S3Object",
            "uniqueId": "root_testindexOf_Handler_S3Object_4F451E5A"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testlength_Handler_S3Object_22B052A5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:length/Handler/S3Object",
            "uniqueId": "root_testlength_Handler_S3Object_22B052A5"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testlowercase_Handler_S3Object_3920718B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lowercase()/Handler/S3Object",
            "uniqueId": "root_testlowercase_Handler_S3Object_3920718B"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testsplit_Handler_S3Object_AAF37758": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:split()/Handler/S3Object",
            "uniqueId": "root_testsplit_Handler_S3Object_AAF37758"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_teststartsWith_Handler_S3Object_D9E4331C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:startsWith()/Handler/S3Object",
            "uniqueId": "root_teststartsWith_Handler_S3Object_D9E4331C"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testsubstring_Handler_S3Object_59DA0784": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:substring()/Handler/S3Object",
            "uniqueId": "root_testsubstring_Handler_S3Object_59DA0784"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testtrim_Handler_S3Object_AB882546": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:trim()/Handler/S3Object",
            "uniqueId": "root_testtrim_Handler_S3Object_AB882546"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testuppercase_Handler_S3Object_EDD57ADA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:uppercase()/Handler/S3Object",
            "uniqueId": "root_testuppercase_Handler_S3Object_EDD57ADA"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
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
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const PARSE_ERROR_client = context._lift(PARSE_ERROR);
        const std_StringClient = std.String._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            PARSE_ERROR: ${PARSE_ERROR_client},
            std_String: ${std_StringClient.text},
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
        if (ops.includes("$inflight_init")) {
          $Closure1._registerBindObject(PARSE_ERROR, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(PARSE_ERROR, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure2.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure3.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure4.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure5 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure5.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure6 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure6.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure7 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure7.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure8 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure8.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure9 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure9.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure10 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure10.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure11 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure11.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure12 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure12.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure13 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure13.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure13Client = ${$Closure13._toInflightType(this).text};
            const client = new $Closure13Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    const assertThrows =  (expected, block) =>  {
      let error = false;
      try {
        (block());
      }
      catch ($error_actual) {
        const actual = $error_actual.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: actual == expected")})((actual === expected))};
        error = true;
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: error")})(error)};
    }
    ;
    const PARSE_ERROR = "unable to parse number 123 as a string";
    {((cond) => {if (!cond) throw new Error("assertion failed: str.fromJson(Json \"Hello\") == \"Hello\"")})((((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })("Hello") === "Hello"))};
    (assertThrows(PARSE_ERROR, () =>  {
      ((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })(123);
    }
    ));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:fromJson",new $Closure1(this,"$Closure1"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello\".length == 5")})(("hello".length === 5))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"\".length == 0")})(("".length === 0))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:length",new $Closure2(this,"$Closure2"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".at(2) == \"o\"")})((("boom".at(2)) === "o"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".at(-4) == \"b\"")})((("boom".at((-4))) === "b"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".at(-1) == \"m\"")})((("boom".at((-1))) === "m"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:at()",new $Closure3(this,"$Closure3"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".concat(\"boom\") == \"boomboom\"")})((("boom".concat("boom")) === "boomboom"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:concat()",new $Closure4(this,"$Closure4"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".endsWith(\"m\")")})("boom".endsWith("m"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !\"boom\".endsWith(\"b\")")})((!"boom".endsWith("b")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:endsWith()",new $Closure5(this,"$Closure5"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".indexOf(\"m\") == 3")})(("boom".indexOf("m") === 3))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".indexOf(\"a\") == -1")})(("boom".indexOf("a") === (-1)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:indexOf()",new $Closure6(this,"$Closure6"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"BOOM\".lowercase() == \"boom\"")})(("BOOM".toLocaleLowerCase() === "boom"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"BooM\".lowercase() == \"boom\"")})(("BooM".toLocaleLowerCase() === "boom"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".lowercase() == \"boom\"")})(("boom".toLocaleLowerCase() === "boom"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"123#@\".lowercase() == \"123#@\"")})(("123#@".toLocaleLowerCase() === "123#@"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:lowercase()",new $Closure7(this,"$Closure7"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"BOOM\".uppercase() == \"BOOM\"")})(("BOOM".toLocaleUpperCase() === "BOOM"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"BooM\".uppercase() == \"BOOM\"")})(("BooM".toLocaleUpperCase() === "BOOM"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".uppercase() == \"BOOM\"")})(("boom".toLocaleUpperCase() === "BOOM"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"123#@\".uppercase() == \"123#@\"")})(("123#@".toLocaleUpperCase() === "123#@"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:uppercase()",new $Closure8(this,"$Closure8"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello;wing\".split(\";\").at(0) == \"hello\"")})(((("hello;wing".split(";")).at(0)) === "hello"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello;wing\".split(\";\").at(1) == \"wing\"")})(((("hello;wing".split(";")).at(1)) === "wing"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".split(\" \").at(0) == \"hello\"")})(((("hello wing".split(" ")).at(0)) === "hello"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello;wing\".split(\";\").at(1) == \"wing\"")})(((("hello;wing".split(";")).at(1)) === "wing"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".split(\"\").length == 10")})((("hello wing".split("")).length === 10))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".split(\"\").at(0) == \"h\"")})(((("hello wing".split("")).at(0)) === "h"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".split(\"\").at(1) == \"e\"")})(((("hello wing".split("")).at(1)) === "e"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:split()",new $Closure9(this,"$Closure9"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".startsWith(\"h\")")})("hello wing".startsWith("h"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !\"hello wing\".startsWith(\"H\")")})((!"hello wing".startsWith("H")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !\"hello wing\".startsWith(\"w\")")})((!"hello wing".startsWith("w")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:startsWith()",new $Closure10(this,"$Closure10"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".substring(0, 5) == \"hello\"")})((("hello wing".substring(0,5)) === "hello"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".substring(0, 100) == \"hello wing\"")})((("hello wing".substring(0,100)) === "hello wing"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:substring()",new $Closure11(this,"$Closure11"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing         \".trim() == \"hello wing\"")})((("hello wing         ".trim()) === "hello wing"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".trim() == \"hello wing\"")})((("hello wing".trim()) === "hello wing"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"\".trim() == \"\"")})((("".trim()) === ""))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"\\thello wing\\n\".trim() == \"hello wing\"")})((("\thello wing\n".trim()) === "hello wing"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:trim()",new $Closure12(this,"$Closure12"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".contains(\"hello\")")})("hello wing".includes("hello"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !\"hello wing\".contains(\"Hello\")")})((!"hello wing".includes("Hello")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".contains(\"w\")")})("hello wing".includes("w"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:contains()",new $Closure13(this,"$Closure13"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "string", plugins: $plugins, isTestEnvironment: $wing_is_test });
    if ($wing_is_test) {
      new $Root(this, "env0");
      const $test_runner = this.testRunner;
      const $tests = $test_runner.findTests();
      for (let $i = 1; $i < $tests.length; $i++) {
        new $Root(this, "env" + $i);
      }
    } else {
      new $Root(this, "Default");
    }
  }
}
new $App().synth();

```

