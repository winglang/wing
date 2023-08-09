# [string.w](../../../../../../examples/tests/sdk_tests/std/string.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $PARSE_ERROR, $std_String }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: str.fromJson(Json \"World\") == \"World\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })("World"),"World")))};
      try {
        ((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })(123);
      }
      catch ($error_s) {
        const s = $error_s.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: s == PARSE_ERROR")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s,$PARSE_ERROR)))};
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
    async handle() {
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
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".substring(0, 5) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await "hello wing".substring(0,5)),"hello")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".substring(0, 100) == \"hello wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await "hello wing".substring(0,100)),"hello wing")))};
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
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing         \".trim() == \"hello wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await "hello wing         ".trim()),"hello wing")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".trim() == \"hello wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await "hello wing".trim()),"hello wing")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"\".trim() == \"\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await "".trim()),"")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"\\thello wing\\n\".trim() == \"hello wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await "\thello wing\n".trim()),"hello wing")))};
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
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".contains(\"hello\")")})("hello wing".includes("hello"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: !\"hello wing\".contains(\"Hello\")")})((!"hello wing".includes("Hello")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".contains(\"w\")")})("hello wing".includes("w"))};
    }
  }
  return $Closure13;
}

```

## inflight.$Closure14.js
```js
module.exports = function({  }) {
  class $Closure14 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello world\".replace(\"world\", \"wing\") == \"hello wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("hello world".replace("world","wing"),"hello wing")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"pʅɹoʍ oʅʅǝɥ\".replace(\"pʅɹoʍ\", \"ɓuᴉʍ\") == \"ɓuᴉʍ oʅʅǝɥ\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("pʅɹoʍ oʅʅǝɥ".replace("pʅɹoʍ","ɓuᴉʍ"),"ɓuᴉʍ oʅʅǝɥ")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello world\".replace(\"wing\", \"☁\") == \"hello world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("hello world".replace("wing","☁"),"hello world")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello world\".replace(\" \", \"-\") == \"hello-world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("hello world".replace(" ","-"),"hello-world")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"\".replace(\"\", \"hello world\") == \"hello world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("".replace("","hello world"),"hello world")))};
    }
  }
  return $Closure14;
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
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello\".length == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("hello".length,5)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"\".length == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("".length,0)))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ $INDEX_OUT_OF_BOUNDS_ERROR }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".at(0) == \"b\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (0 >= "boom".length || 0 + "boom".length < 0) {throw new Error("index out of bounds")}; return "boom".at(0) })(0),"b")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".at(-4) == \"b\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if ((-4) >= "boom".length || (-4) + "boom".length < 0) {throw new Error("index out of bounds")}; return "boom".at((-4)) })((-4)),"b")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".at(-1) == \"m\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if ((-1) >= "boom".length || (-1) + "boom".length < 0) {throw new Error("index out of bounds")}; return "boom".at((-1)) })((-1)),"m")))};
      try {
        ((args) => { if (4 >= "boom".length || 4 + "boom".length < 0) {throw new Error("index out of bounds")}; return "boom".at(4) })(4);
      }
      catch ($error_s) {
        const s = $error_s.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: s == INDEX_OUT_OF_BOUNDS_ERROR ")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s,$INDEX_OUT_OF_BOUNDS_ERROR)))};
      }
      try {
        ((args) => { if ((-5) >= "boom".length || (-5) + "boom".length < 0) {throw new Error("index out of bounds")}; return "boom".at((-5)) })((-5));
      }
      catch ($error_s) {
        const s = $error_s.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: s == INDEX_OUT_OF_BOUNDS_ERROR ")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s,$INDEX_OUT_OF_BOUNDS_ERROR)))};
      }
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
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".concat(\"boom\") == \"boomboom\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await "boom".concat("boom")),"boomboom")))};
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
    async handle() {
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
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".indexOf(\"m\") == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("boom".indexOf("m"),3)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".indexOf(\"a\") == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("boom".indexOf("a"),(-1))))};
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
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"BOOM\".lowercase() == \"boom\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("BOOM".toLocaleLowerCase(),"boom")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"BooM\".lowercase() == \"boom\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("BooM".toLocaleLowerCase(),"boom")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".lowercase() == \"boom\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("boom".toLocaleLowerCase(),"boom")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"123#@\".lowercase() == \"123#@\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("123#@".toLocaleLowerCase(),"123#@")))};
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
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"BOOM\".uppercase() == \"BOOM\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("BOOM".toLocaleUpperCase(),"BOOM")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"BooM\".uppercase() == \"BOOM\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("BooM".toLocaleUpperCase(),"BOOM")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".uppercase() == \"BOOM\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("boom".toLocaleUpperCase(),"BOOM")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"123#@\".uppercase() == \"123#@\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("123#@".toLocaleUpperCase(),"123#@")))};
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
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello;wing\".split(\";\").at(0) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await (await "hello;wing".split(";")).at(0)),"hello")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello;wing\".split(\";\").at(1) == \"wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await (await "hello;wing".split(";")).at(1)),"wing")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".split(\" \").at(0) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await (await "hello wing".split(" ")).at(0)),"hello")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello;wing\".split(\";\").at(1) == \"wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await (await "hello;wing".split(";")).at(1)),"wing")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".split(\"\").length == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await "hello wing".split("")).length,10)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".split(\"\").at(0) == \"h\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await (await "hello wing".split("")).at(0)),"h")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".split(\"\").at(1) == \"e\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await (await "hello wing".split("")).at(1)),"e")))};
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
      "value": "[[\"root/undefined/Default/test:fromJson\",\"${aws_lambda_function.undefined_testfromJson_Handler_0599F64C.arn}\"],[\"root/undefined/Default/test:length\",\"${aws_lambda_function.undefined_testlength_Handler_6713B031.arn}\"],[\"root/undefined/Default/test:at()\",\"${aws_lambda_function.undefined_testat_Handler_3D63C4E4.arn}\"],[\"root/undefined/Default/test:concat()\",\"${aws_lambda_function.undefined_testconcat_Handler_2CE524DC.arn}\"],[\"root/undefined/Default/test:endsWith()\",\"${aws_lambda_function.undefined_testendsWith_Handler_DB160ACF.arn}\"],[\"root/undefined/Default/test:indexOf()\",\"${aws_lambda_function.undefined_testindexOf_Handler_EFE399F2.arn}\"],[\"root/undefined/Default/test:lowercase()\",\"${aws_lambda_function.undefined_testlowercase_Handler_342AE8BE.arn}\"],[\"root/undefined/Default/test:uppercase()\",\"${aws_lambda_function.undefined_testuppercase_Handler_DDFB4A4B.arn}\"],[\"root/undefined/Default/test:split()\",\"${aws_lambda_function.undefined_testsplit_Handler_BB1E80BD.arn}\"],[\"root/undefined/Default/test:startsWith()\",\"${aws_lambda_function.undefined_teststartsWith_Handler_9AE50424.arn}\"],[\"root/undefined/Default/test:substring()\",\"${aws_lambda_function.undefined_testsubstring_Handler_0CF983A2.arn}\"],[\"root/undefined/Default/test:trim()\",\"${aws_lambda_function.undefined_testtrim_Handler_CB438684.arn}\"],[\"root/undefined/Default/test:contains()\",\"${aws_lambda_function.undefined_testcontains_Handler_DC7BA782.arn}\"],[\"root/undefined/Default/test:replace()\",\"${aws_lambda_function.undefined_testreplace_Handler_DB0A30C0.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testat_Handler_IamRole_7209B66D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:at()/Handler/IamRole",
            "uniqueId": "undefined_testat_Handler_IamRole_7209B66D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testconcat_Handler_IamRole_33B1F533": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:concat()/Handler/IamRole",
            "uniqueId": "undefined_testconcat_Handler_IamRole_33B1F533"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testcontains_Handler_IamRole_0F4149E0": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:contains()/Handler/IamRole",
            "uniqueId": "undefined_testcontains_Handler_IamRole_0F4149E0"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testendsWith_Handler_IamRole_A9D66FC9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:endsWith()/Handler/IamRole",
            "uniqueId": "undefined_testendsWith_Handler_IamRole_A9D66FC9"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testfromJson_Handler_IamRole_FEC9BF71": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:fromJson/Handler/IamRole",
            "uniqueId": "undefined_testfromJson_Handler_IamRole_FEC9BF71"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testindexOf_Handler_IamRole_B2826B6A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:indexOf()/Handler/IamRole",
            "uniqueId": "undefined_testindexOf_Handler_IamRole_B2826B6A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testlength_Handler_IamRole_00C919C1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:length/Handler/IamRole",
            "uniqueId": "undefined_testlength_Handler_IamRole_00C919C1"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testlowercase_Handler_IamRole_0B20CD1A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:lowercase()/Handler/IamRole",
            "uniqueId": "undefined_testlowercase_Handler_IamRole_0B20CD1A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testreplace_Handler_IamRole_50CD4873": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:replace()/Handler/IamRole",
            "uniqueId": "undefined_testreplace_Handler_IamRole_50CD4873"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testsplit_Handler_IamRole_C260228E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:split()/Handler/IamRole",
            "uniqueId": "undefined_testsplit_Handler_IamRole_C260228E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_teststartsWith_Handler_IamRole_D54A4154": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:startsWith()/Handler/IamRole",
            "uniqueId": "undefined_teststartsWith_Handler_IamRole_D54A4154"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testsubstring_Handler_IamRole_AB10C1D1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:substring()/Handler/IamRole",
            "uniqueId": "undefined_testsubstring_Handler_IamRole_AB10C1D1"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testtrim_Handler_IamRole_BEAB6542": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:trim()/Handler/IamRole",
            "uniqueId": "undefined_testtrim_Handler_IamRole_BEAB6542"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testuppercase_Handler_IamRole_DD126ED4": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:uppercase()/Handler/IamRole",
            "uniqueId": "undefined_testuppercase_Handler_IamRole_DD126ED4"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testat_Handler_IamRolePolicy_DE825F4F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:at()/Handler/IamRolePolicy",
            "uniqueId": "undefined_testat_Handler_IamRolePolicy_DE825F4F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testat_Handler_IamRole_7209B66D.name}"
      },
      "undefined_testconcat_Handler_IamRolePolicy_0DAD8A35": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:concat()/Handler/IamRolePolicy",
            "uniqueId": "undefined_testconcat_Handler_IamRolePolicy_0DAD8A35"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testconcat_Handler_IamRole_33B1F533.name}"
      },
      "undefined_testcontains_Handler_IamRolePolicy_C0CB5C59": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:contains()/Handler/IamRolePolicy",
            "uniqueId": "undefined_testcontains_Handler_IamRolePolicy_C0CB5C59"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testcontains_Handler_IamRole_0F4149E0.name}"
      },
      "undefined_testendsWith_Handler_IamRolePolicy_6E0343D2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:endsWith()/Handler/IamRolePolicy",
            "uniqueId": "undefined_testendsWith_Handler_IamRolePolicy_6E0343D2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testendsWith_Handler_IamRole_A9D66FC9.name}"
      },
      "undefined_testfromJson_Handler_IamRolePolicy_A2BDE852": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:fromJson/Handler/IamRolePolicy",
            "uniqueId": "undefined_testfromJson_Handler_IamRolePolicy_A2BDE852"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testfromJson_Handler_IamRole_FEC9BF71.name}"
      },
      "undefined_testindexOf_Handler_IamRolePolicy_751C048A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:indexOf()/Handler/IamRolePolicy",
            "uniqueId": "undefined_testindexOf_Handler_IamRolePolicy_751C048A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testindexOf_Handler_IamRole_B2826B6A.name}"
      },
      "undefined_testlength_Handler_IamRolePolicy_2EA611A8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:length/Handler/IamRolePolicy",
            "uniqueId": "undefined_testlength_Handler_IamRolePolicy_2EA611A8"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testlength_Handler_IamRole_00C919C1.name}"
      },
      "undefined_testlowercase_Handler_IamRolePolicy_F4B5ADC8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:lowercase()/Handler/IamRolePolicy",
            "uniqueId": "undefined_testlowercase_Handler_IamRolePolicy_F4B5ADC8"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testlowercase_Handler_IamRole_0B20CD1A.name}"
      },
      "undefined_testreplace_Handler_IamRolePolicy_911F739A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:replace()/Handler/IamRolePolicy",
            "uniqueId": "undefined_testreplace_Handler_IamRolePolicy_911F739A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testreplace_Handler_IamRole_50CD4873.name}"
      },
      "undefined_testsplit_Handler_IamRolePolicy_0CA667C2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:split()/Handler/IamRolePolicy",
            "uniqueId": "undefined_testsplit_Handler_IamRolePolicy_0CA667C2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testsplit_Handler_IamRole_C260228E.name}"
      },
      "undefined_teststartsWith_Handler_IamRolePolicy_58EC9086": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:startsWith()/Handler/IamRolePolicy",
            "uniqueId": "undefined_teststartsWith_Handler_IamRolePolicy_58EC9086"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_teststartsWith_Handler_IamRole_D54A4154.name}"
      },
      "undefined_testsubstring_Handler_IamRolePolicy_4BDA92D6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:substring()/Handler/IamRolePolicy",
            "uniqueId": "undefined_testsubstring_Handler_IamRolePolicy_4BDA92D6"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testsubstring_Handler_IamRole_AB10C1D1.name}"
      },
      "undefined_testtrim_Handler_IamRolePolicy_4A047365": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:trim()/Handler/IamRolePolicy",
            "uniqueId": "undefined_testtrim_Handler_IamRolePolicy_4A047365"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testtrim_Handler_IamRole_BEAB6542.name}"
      },
      "undefined_testuppercase_Handler_IamRolePolicy_A6F4858B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:uppercase()/Handler/IamRolePolicy",
            "uniqueId": "undefined_testuppercase_Handler_IamRolePolicy_A6F4858B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testuppercase_Handler_IamRole_DD126ED4.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testat_Handler_IamRolePolicyAttachment_14185001": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:at()/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testat_Handler_IamRolePolicyAttachment_14185001"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testat_Handler_IamRole_7209B66D.name}"
      },
      "undefined_testconcat_Handler_IamRolePolicyAttachment_2AA039A2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:concat()/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testconcat_Handler_IamRolePolicyAttachment_2AA039A2"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testconcat_Handler_IamRole_33B1F533.name}"
      },
      "undefined_testcontains_Handler_IamRolePolicyAttachment_7ADDB701": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:contains()/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testcontains_Handler_IamRolePolicyAttachment_7ADDB701"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testcontains_Handler_IamRole_0F4149E0.name}"
      },
      "undefined_testendsWith_Handler_IamRolePolicyAttachment_8ACBBC5E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:endsWith()/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testendsWith_Handler_IamRolePolicyAttachment_8ACBBC5E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testendsWith_Handler_IamRole_A9D66FC9.name}"
      },
      "undefined_testfromJson_Handler_IamRolePolicyAttachment_1876B173": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:fromJson/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testfromJson_Handler_IamRolePolicyAttachment_1876B173"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testfromJson_Handler_IamRole_FEC9BF71.name}"
      },
      "undefined_testindexOf_Handler_IamRolePolicyAttachment_66ADE08C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:indexOf()/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testindexOf_Handler_IamRolePolicyAttachment_66ADE08C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testindexOf_Handler_IamRole_B2826B6A.name}"
      },
      "undefined_testlength_Handler_IamRolePolicyAttachment_372A019A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:length/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testlength_Handler_IamRolePolicyAttachment_372A019A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testlength_Handler_IamRole_00C919C1.name}"
      },
      "undefined_testlowercase_Handler_IamRolePolicyAttachment_B24BF2A9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:lowercase()/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testlowercase_Handler_IamRolePolicyAttachment_B24BF2A9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testlowercase_Handler_IamRole_0B20CD1A.name}"
      },
      "undefined_testreplace_Handler_IamRolePolicyAttachment_B56323C5": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:replace()/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testreplace_Handler_IamRolePolicyAttachment_B56323C5"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testreplace_Handler_IamRole_50CD4873.name}"
      },
      "undefined_testsplit_Handler_IamRolePolicyAttachment_092D7723": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:split()/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testsplit_Handler_IamRolePolicyAttachment_092D7723"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testsplit_Handler_IamRole_C260228E.name}"
      },
      "undefined_teststartsWith_Handler_IamRolePolicyAttachment_778C1B7C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:startsWith()/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_teststartsWith_Handler_IamRolePolicyAttachment_778C1B7C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_teststartsWith_Handler_IamRole_D54A4154.name}"
      },
      "undefined_testsubstring_Handler_IamRolePolicyAttachment_ECF8C894": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:substring()/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testsubstring_Handler_IamRolePolicyAttachment_ECF8C894"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testsubstring_Handler_IamRole_AB10C1D1.name}"
      },
      "undefined_testtrim_Handler_IamRolePolicyAttachment_81B64FB8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:trim()/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testtrim_Handler_IamRolePolicyAttachment_81B64FB8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testtrim_Handler_IamRole_BEAB6542.name}"
      },
      "undefined_testuppercase_Handler_IamRolePolicyAttachment_F5C0FEE6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:uppercase()/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testuppercase_Handler_IamRolePolicyAttachment_F5C0FEE6"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testuppercase_Handler_IamRole_DD126ED4.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testat_Handler_3D63C4E4": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:at()/Handler/Default",
            "uniqueId": "undefined_testat_Handler_3D63C4E4"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8082678",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8082678",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testat_Handler_IamRole_7209B66D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testat_Handler_S3Object_0AB1D430.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testconcat_Handler_2CE524DC": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:concat()/Handler/Default",
            "uniqueId": "undefined_testconcat_Handler_2CE524DC"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8017049",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8017049",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testconcat_Handler_IamRole_33B1F533.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testconcat_Handler_S3Object_2A808484.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testcontains_Handler_DC7BA782": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:contains()/Handler/Default",
            "uniqueId": "undefined_testcontains_Handler_DC7BA782"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8a5e6a3",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8a5e6a3",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testcontains_Handler_IamRole_0F4149E0.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testcontains_Handler_S3Object_D301D15D.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testendsWith_Handler_DB160ACF": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:endsWith()/Handler/Default",
            "uniqueId": "undefined_testendsWith_Handler_DB160ACF"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8f1095b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8f1095b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testendsWith_Handler_IamRole_A9D66FC9.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testendsWith_Handler_S3Object_D458E3F4.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testfromJson_Handler_0599F64C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:fromJson/Handler/Default",
            "uniqueId": "undefined_testfromJson_Handler_0599F64C"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8dbc36b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8dbc36b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testfromJson_Handler_IamRole_FEC9BF71.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testfromJson_Handler_S3Object_D2AC2543.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testindexOf_Handler_EFE399F2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:indexOf()/Handler/Default",
            "uniqueId": "undefined_testindexOf_Handler_EFE399F2"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8a31964",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8a31964",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testindexOf_Handler_IamRole_B2826B6A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testindexOf_Handler_S3Object_0B195A60.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testlength_Handler_6713B031": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:length/Handler/Default",
            "uniqueId": "undefined_testlength_Handler_6713B031"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8fb4429",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8fb4429",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testlength_Handler_IamRole_00C919C1.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testlength_Handler_S3Object_453C9828.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testlowercase_Handler_342AE8BE": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:lowercase()/Handler/Default",
            "uniqueId": "undefined_testlowercase_Handler_342AE8BE"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c85ddefc",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c85ddefc",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testlowercase_Handler_IamRole_0B20CD1A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testlowercase_Handler_S3Object_FD011DED.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testreplace_Handler_DB0A30C0": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:replace()/Handler/Default",
            "uniqueId": "undefined_testreplace_Handler_DB0A30C0"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c80fc5d7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c80fc5d7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testreplace_Handler_IamRole_50CD4873.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testreplace_Handler_S3Object_76182291.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testsplit_Handler_BB1E80BD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:split()/Handler/Default",
            "uniqueId": "undefined_testsplit_Handler_BB1E80BD"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8b13004",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8b13004",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testsplit_Handler_IamRole_C260228E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testsplit_Handler_S3Object_A2889CDA.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_teststartsWith_Handler_9AE50424": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:startsWith()/Handler/Default",
            "uniqueId": "undefined_teststartsWith_Handler_9AE50424"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c897c677",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c897c677",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_teststartsWith_Handler_IamRole_D54A4154.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_teststartsWith_Handler_S3Object_E5141578.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testsubstring_Handler_0CF983A2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:substring()/Handler/Default",
            "uniqueId": "undefined_testsubstring_Handler_0CF983A2"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c824bfd7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c824bfd7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testsubstring_Handler_IamRole_AB10C1D1.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testsubstring_Handler_S3Object_416AE365.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testtrim_Handler_CB438684": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:trim()/Handler/Default",
            "uniqueId": "undefined_testtrim_Handler_CB438684"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c83db0a0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c83db0a0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testtrim_Handler_IamRole_BEAB6542.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testtrim_Handler_S3Object_FC69320F.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testuppercase_Handler_DDFB4A4B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:uppercase()/Handler/Default",
            "uniqueId": "undefined_testuppercase_Handler_DDFB4A4B"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8645fc5",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8645fc5",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testuppercase_Handler_IamRole_DD126ED4.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testuppercase_Handler_S3Object_4BE5100E.key}",
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
      "undefined_testat_Handler_S3Object_0AB1D430": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:at()/Handler/S3Object",
            "uniqueId": "undefined_testat_Handler_S3Object_0AB1D430"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testconcat_Handler_S3Object_2A808484": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:concat()/Handler/S3Object",
            "uniqueId": "undefined_testconcat_Handler_S3Object_2A808484"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testcontains_Handler_S3Object_D301D15D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:contains()/Handler/S3Object",
            "uniqueId": "undefined_testcontains_Handler_S3Object_D301D15D"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testendsWith_Handler_S3Object_D458E3F4": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:endsWith()/Handler/S3Object",
            "uniqueId": "undefined_testendsWith_Handler_S3Object_D458E3F4"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testfromJson_Handler_S3Object_D2AC2543": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:fromJson/Handler/S3Object",
            "uniqueId": "undefined_testfromJson_Handler_S3Object_D2AC2543"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testindexOf_Handler_S3Object_0B195A60": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:indexOf()/Handler/S3Object",
            "uniqueId": "undefined_testindexOf_Handler_S3Object_0B195A60"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testlength_Handler_S3Object_453C9828": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:length/Handler/S3Object",
            "uniqueId": "undefined_testlength_Handler_S3Object_453C9828"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testlowercase_Handler_S3Object_FD011DED": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:lowercase()/Handler/S3Object",
            "uniqueId": "undefined_testlowercase_Handler_S3Object_FD011DED"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testreplace_Handler_S3Object_76182291": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:replace()/Handler/S3Object",
            "uniqueId": "undefined_testreplace_Handler_S3Object_76182291"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testsplit_Handler_S3Object_A2889CDA": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:split()/Handler/S3Object",
            "uniqueId": "undefined_testsplit_Handler_S3Object_A2889CDA"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_teststartsWith_Handler_S3Object_E5141578": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:startsWith()/Handler/S3Object",
            "uniqueId": "undefined_teststartsWith_Handler_S3Object_E5141578"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testsubstring_Handler_S3Object_416AE365": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:substring()/Handler/S3Object",
            "uniqueId": "undefined_testsubstring_Handler_S3Object_416AE365"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testtrim_Handler_S3Object_FC69320F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:trim()/Handler/S3Object",
            "uniqueId": "undefined_testtrim_Handler_S3Object_FC69320F"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testuppercase_Handler_S3Object_4BE5100E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:uppercase()/Handler/S3Object",
            "uniqueId": "undefined_testuppercase_Handler_S3Object_4BE5100E"
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
            $PARSE_ERROR: ${context._lift(PARSE_ERROR)},
            $std_String: ${context._lift(std.String)},
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
          $Closure1._registerBindObject(PARSE_ERROR, host, []);
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
            $INDEX_OUT_OF_BOUNDS_ERROR: ${context._lift(INDEX_OUT_OF_BOUNDS_ERROR)},
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
          $Closure3._registerBindObject(INDEX_OUT_OF_BOUNDS_ERROR, host, []);
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
    }
    class $Closure13 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure13.js")({
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
    }
    class $Closure14 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure14.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure14Client = ${$Closure14._toInflightType(this).text};
            const client = new $Closure14Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    const assertThrows = ((expected, block) => {
      let error = false;
      try {
        (block());
      }
      catch ($error_actual) {
        const actual = $error_actual.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: actual == expected")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(actual,expected)))};
        error = true;
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: error")})(error)};
    });
    const PARSE_ERROR = "unable to parse number 123 as a string";
    {((cond) => {if (!cond) throw new Error("assertion failed: str.fromJson(Json \"Hello\") == \"Hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })("Hello"),"Hello")))};
    (assertThrows(PARSE_ERROR,(() => {
      ((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })(123);
    })));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:fromJson",new $Closure1(this,"$Closure1"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello\".length == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("hello".length,5)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"\".length == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("".length,0)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:length",new $Closure2(this,"$Closure2"));
    const INDEX_OUT_OF_BOUNDS_ERROR = "index out of bounds";
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".at(2) == \"o\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (2 >= "boom".length || 2 + "boom".length < 0) {throw new Error("index out of bounds")}; return "boom".at(2) })(2),"o")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".at(-4) == \"b\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if ((-4) >= "boom".length || (-4) + "boom".length < 0) {throw new Error("index out of bounds")}; return "boom".at((-4)) })((-4)),"b")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".at(-1) == \"m\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if ((-1) >= "boom".length || (-1) + "boom".length < 0) {throw new Error("index out of bounds")}; return "boom".at((-1)) })((-1)),"m")))};
    (assertThrows(INDEX_OUT_OF_BOUNDS_ERROR,(() => {
      ((args) => { if (4 >= "boom".length || 4 + "boom".length < 0) {throw new Error("index out of bounds")}; return "boom".at(4) })(4);
    })));
    (assertThrows(INDEX_OUT_OF_BOUNDS_ERROR,(() => {
      ((args) => { if ((-5) >= "boom".length || (-5) + "boom".length < 0) {throw new Error("index out of bounds")}; return "boom".at((-5)) })((-5));
    })));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:at()",new $Closure3(this,"$Closure3"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".concat(\"boom\") == \"boomboom\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("boom".concat("boom")),"boomboom")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:concat()",new $Closure4(this,"$Closure4"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".endsWith(\"m\")")})("boom".endsWith("m"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !\"boom\".endsWith(\"b\")")})((!"boom".endsWith("b")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:endsWith()",new $Closure5(this,"$Closure5"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".indexOf(\"m\") == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("boom".indexOf("m"),3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".indexOf(\"a\") == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("boom".indexOf("a"),(-1))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:indexOf()",new $Closure6(this,"$Closure6"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"BOOM\".lowercase() == \"boom\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("BOOM".toLocaleLowerCase(),"boom")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"BooM\".lowercase() == \"boom\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("BooM".toLocaleLowerCase(),"boom")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".lowercase() == \"boom\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("boom".toLocaleLowerCase(),"boom")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"123#@\".lowercase() == \"123#@\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("123#@".toLocaleLowerCase(),"123#@")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:lowercase()",new $Closure7(this,"$Closure7"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"BOOM\".uppercase() == \"BOOM\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("BOOM".toLocaleUpperCase(),"BOOM")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"BooM\".uppercase() == \"BOOM\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("BooM".toLocaleUpperCase(),"BOOM")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".uppercase() == \"BOOM\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("boom".toLocaleUpperCase(),"BOOM")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"123#@\".uppercase() == \"123#@\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("123#@".toLocaleUpperCase(),"123#@")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:uppercase()",new $Closure8(this,"$Closure8"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello;wing\".split(\";\").at(0) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((("hello;wing".split(";")).at(0)),"hello")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello;wing\".split(\";\").at(1) == \"wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((("hello;wing".split(";")).at(1)),"wing")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".split(\" \").at(0) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((("hello wing".split(" ")).at(0)),"hello")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello;wing\".split(\";\").at(1) == \"wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((("hello;wing".split(";")).at(1)),"wing")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".split(\"\").length == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("hello wing".split("")).length,10)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".split(\"\").at(0) == \"h\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((("hello wing".split("")).at(0)),"h")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".split(\"\").at(1) == \"e\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((("hello wing".split("")).at(1)),"e")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:split()",new $Closure9(this,"$Closure9"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".startsWith(\"h\")")})("hello wing".startsWith("h"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !\"hello wing\".startsWith(\"H\")")})((!"hello wing".startsWith("H")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !\"hello wing\".startsWith(\"w\")")})((!"hello wing".startsWith("w")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:startsWith()",new $Closure10(this,"$Closure10"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".substring(0, 5) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("hello wing".substring(0,5)),"hello")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".substring(0, 100) == \"hello wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("hello wing".substring(0,100)),"hello wing")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:substring()",new $Closure11(this,"$Closure11"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing         \".trim() == \"hello wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("hello wing         ".trim()),"hello wing")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".trim() == \"hello wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("hello wing".trim()),"hello wing")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"\".trim() == \"\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("".trim()),"")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"\\thello wing\\n\".trim() == \"hello wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("\thello wing\n".trim()),"hello wing")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:trim()",new $Closure12(this,"$Closure12"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".contains(\"hello\")")})("hello wing".includes("hello"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !\"hello wing\".contains(\"Hello\")")})((!"hello wing".includes("Hello")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".contains(\"w\")")})("hello wing".includes("w"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:contains()",new $Closure13(this,"$Closure13"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello world\".replace(\"world\", \"wing\") == \"hello wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("hello world".replace("world","wing"),"hello wing")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"pʅɹoʍ oʅʅǝɥ\".replace(\"pʅɹoʍ\", \"ɓuᴉʍ\") == \"ɓuᴉʍ oʅʅǝɥ\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("pʅɹoʍ oʅʅǝɥ".replace("pʅɹoʍ","ɓuᴉʍ"),"ɓuᴉʍ oʅʅǝɥ")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello world\".replace(\"wing\", \"☁\") == \"hello world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("hello world".replace("wing","☁"),"hello world")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello world\".replace(\" \", \"-\") == \"hello-world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("hello world".replace(" ","-"),"hello-world")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"\".replace(\"\", \"hello world\") == \"hello world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("".replace("","hello world"),"hello world")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:replace()",new $Closure14(this,"$Closure14"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "string", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

