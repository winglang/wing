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
      "value": "[[\"root/Default/Default/test:fromJson\",\"${aws_lambda_function.testfromJson_Handler_CA86BEEA.arn}\"],[\"root/Default/Default/test:length\",\"${aws_lambda_function.testlength_Handler_BFD8933F.arn}\"],[\"root/Default/Default/test:at()\",\"${aws_lambda_function.testat_Handler_E4F013BC.arn}\"],[\"root/Default/Default/test:concat()\",\"${aws_lambda_function.testconcat_Handler_E184D86A.arn}\"],[\"root/Default/Default/test:endsWith()\",\"${aws_lambda_function.testendsWith_Handler_9BA42993.arn}\"],[\"root/Default/Default/test:indexOf()\",\"${aws_lambda_function.testindexOf_Handler_BD91EA6F.arn}\"],[\"root/Default/Default/test:lowercase()\",\"${aws_lambda_function.testlowercase_Handler_EAADE79D.arn}\"],[\"root/Default/Default/test:uppercase()\",\"${aws_lambda_function.testuppercase_Handler_352FFA2E.arn}\"],[\"root/Default/Default/test:split()\",\"${aws_lambda_function.testsplit_Handler_4FAF6D9E.arn}\"],[\"root/Default/Default/test:startsWith()\",\"${aws_lambda_function.teststartsWith_Handler_C8752245.arn}\"],[\"root/Default/Default/test:substring()\",\"${aws_lambda_function.testsubstring_Handler_E6617207.arn}\"],[\"root/Default/Default/test:trim()\",\"${aws_lambda_function.testtrim_Handler_403ED8AD.arn}\"],[\"root/Default/Default/test:contains()\",\"${aws_lambda_function.testcontains_Handler_F60865D9.arn}\"],[\"root/Default/Default/test:replace()\",\"${aws_lambda_function.testreplace_Handler_83836186.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testat_Handler_IamRole_17A4EF25": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:at()/Handler/IamRole",
            "uniqueId": "testat_Handler_IamRole_17A4EF25"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testconcat_Handler_IamRole_95DF0DBB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concat()/Handler/IamRole",
            "uniqueId": "testconcat_Handler_IamRole_95DF0DBB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testcontains_Handler_IamRole_654B73B4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:contains()/Handler/IamRole",
            "uniqueId": "testcontains_Handler_IamRole_654B73B4"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testendsWith_Handler_IamRole_FF7C666A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:endsWith()/Handler/IamRole",
            "uniqueId": "testendsWith_Handler_IamRole_FF7C666A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testfromJson_Handler_IamRole_1C3963E1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson/Handler/IamRole",
            "uniqueId": "testfromJson_Handler_IamRole_1C3963E1"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testindexOf_Handler_IamRole_F0D11C74": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:indexOf()/Handler/IamRole",
            "uniqueId": "testindexOf_Handler_IamRole_F0D11C74"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testlength_Handler_IamRole_0AFDC7CB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:length/Handler/IamRole",
            "uniqueId": "testlength_Handler_IamRole_0AFDC7CB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testlowercase_Handler_IamRole_AD4BFFD1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lowercase()/Handler/IamRole",
            "uniqueId": "testlowercase_Handler_IamRole_AD4BFFD1"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testreplace_Handler_IamRole_8269B4F2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:replace()/Handler/IamRole",
            "uniqueId": "testreplace_Handler_IamRole_8269B4F2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testsplit_Handler_IamRole_8F132662": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:split()/Handler/IamRole",
            "uniqueId": "testsplit_Handler_IamRole_8F132662"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "teststartsWith_Handler_IamRole_954988DB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:startsWith()/Handler/IamRole",
            "uniqueId": "teststartsWith_Handler_IamRole_954988DB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testsubstring_Handler_IamRole_3EEC66DD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:substring()/Handler/IamRole",
            "uniqueId": "testsubstring_Handler_IamRole_3EEC66DD"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testtrim_Handler_IamRole_92F0C855": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:trim()/Handler/IamRole",
            "uniqueId": "testtrim_Handler_IamRole_92F0C855"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testuppercase_Handler_IamRole_0A95D353": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:uppercase()/Handler/IamRole",
            "uniqueId": "testuppercase_Handler_IamRole_0A95D353"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testat_Handler_IamRolePolicy_8B108027": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:at()/Handler/IamRolePolicy",
            "uniqueId": "testat_Handler_IamRolePolicy_8B108027"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testat_Handler_IamRole_17A4EF25.name}"
      },
      "testconcat_Handler_IamRolePolicy_742C5395": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concat()/Handler/IamRolePolicy",
            "uniqueId": "testconcat_Handler_IamRolePolicy_742C5395"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testconcat_Handler_IamRole_95DF0DBB.name}"
      },
      "testcontains_Handler_IamRolePolicy_F4401AB2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:contains()/Handler/IamRolePolicy",
            "uniqueId": "testcontains_Handler_IamRolePolicy_F4401AB2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testcontains_Handler_IamRole_654B73B4.name}"
      },
      "testendsWith_Handler_IamRolePolicy_DD4E72BF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:endsWith()/Handler/IamRolePolicy",
            "uniqueId": "testendsWith_Handler_IamRolePolicy_DD4E72BF"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testendsWith_Handler_IamRole_FF7C666A.name}"
      },
      "testfromJson_Handler_IamRolePolicy_431D7515": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson/Handler/IamRolePolicy",
            "uniqueId": "testfromJson_Handler_IamRolePolicy_431D7515"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testfromJson_Handler_IamRole_1C3963E1.name}"
      },
      "testindexOf_Handler_IamRolePolicy_44B0136F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:indexOf()/Handler/IamRolePolicy",
            "uniqueId": "testindexOf_Handler_IamRolePolicy_44B0136F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testindexOf_Handler_IamRole_F0D11C74.name}"
      },
      "testlength_Handler_IamRolePolicy_30FC50C3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:length/Handler/IamRolePolicy",
            "uniqueId": "testlength_Handler_IamRolePolicy_30FC50C3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testlength_Handler_IamRole_0AFDC7CB.name}"
      },
      "testlowercase_Handler_IamRolePolicy_BF0B79C7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lowercase()/Handler/IamRolePolicy",
            "uniqueId": "testlowercase_Handler_IamRolePolicy_BF0B79C7"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testlowercase_Handler_IamRole_AD4BFFD1.name}"
      },
      "testreplace_Handler_IamRolePolicy_B1BDF250": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:replace()/Handler/IamRolePolicy",
            "uniqueId": "testreplace_Handler_IamRolePolicy_B1BDF250"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testreplace_Handler_IamRole_8269B4F2.name}"
      },
      "testsplit_Handler_IamRolePolicy_2CBFEABE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:split()/Handler/IamRolePolicy",
            "uniqueId": "testsplit_Handler_IamRolePolicy_2CBFEABE"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testsplit_Handler_IamRole_8F132662.name}"
      },
      "teststartsWith_Handler_IamRolePolicy_35ABC22F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:startsWith()/Handler/IamRolePolicy",
            "uniqueId": "teststartsWith_Handler_IamRolePolicy_35ABC22F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.teststartsWith_Handler_IamRole_954988DB.name}"
      },
      "testsubstring_Handler_IamRolePolicy_B61E4E35": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:substring()/Handler/IamRolePolicy",
            "uniqueId": "testsubstring_Handler_IamRolePolicy_B61E4E35"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testsubstring_Handler_IamRole_3EEC66DD.name}"
      },
      "testtrim_Handler_IamRolePolicy_EF3E08A2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:trim()/Handler/IamRolePolicy",
            "uniqueId": "testtrim_Handler_IamRolePolicy_EF3E08A2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testtrim_Handler_IamRole_92F0C855.name}"
      },
      "testuppercase_Handler_IamRolePolicy_0915B296": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:uppercase()/Handler/IamRolePolicy",
            "uniqueId": "testuppercase_Handler_IamRolePolicy_0915B296"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testuppercase_Handler_IamRole_0A95D353.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testat_Handler_IamRolePolicyAttachment_16B3C8B1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:at()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testat_Handler_IamRolePolicyAttachment_16B3C8B1"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testat_Handler_IamRole_17A4EF25.name}"
      },
      "testconcat_Handler_IamRolePolicyAttachment_1D49A0C8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concat()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testconcat_Handler_IamRolePolicyAttachment_1D49A0C8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testconcat_Handler_IamRole_95DF0DBB.name}"
      },
      "testcontains_Handler_IamRolePolicyAttachment_D324FFE4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:contains()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testcontains_Handler_IamRolePolicyAttachment_D324FFE4"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testcontains_Handler_IamRole_654B73B4.name}"
      },
      "testendsWith_Handler_IamRolePolicyAttachment_76A301AA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:endsWith()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testendsWith_Handler_IamRolePolicyAttachment_76A301AA"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testendsWith_Handler_IamRole_FF7C666A.name}"
      },
      "testfromJson_Handler_IamRolePolicyAttachment_71E8933E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson/Handler/IamRolePolicyAttachment",
            "uniqueId": "testfromJson_Handler_IamRolePolicyAttachment_71E8933E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testfromJson_Handler_IamRole_1C3963E1.name}"
      },
      "testindexOf_Handler_IamRolePolicyAttachment_07DB0649": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:indexOf()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testindexOf_Handler_IamRolePolicyAttachment_07DB0649"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testindexOf_Handler_IamRole_F0D11C74.name}"
      },
      "testlength_Handler_IamRolePolicyAttachment_2C0296CF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:length/Handler/IamRolePolicyAttachment",
            "uniqueId": "testlength_Handler_IamRolePolicyAttachment_2C0296CF"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testlength_Handler_IamRole_0AFDC7CB.name}"
      },
      "testlowercase_Handler_IamRolePolicyAttachment_74C34A7A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lowercase()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testlowercase_Handler_IamRolePolicyAttachment_74C34A7A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testlowercase_Handler_IamRole_AD4BFFD1.name}"
      },
      "testreplace_Handler_IamRolePolicyAttachment_3A28D781": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:replace()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testreplace_Handler_IamRolePolicyAttachment_3A28D781"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testreplace_Handler_IamRole_8269B4F2.name}"
      },
      "testsplit_Handler_IamRolePolicyAttachment_50460D67": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:split()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testsplit_Handler_IamRolePolicyAttachment_50460D67"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testsplit_Handler_IamRole_8F132662.name}"
      },
      "teststartsWith_Handler_IamRolePolicyAttachment_71D91495": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:startsWith()/Handler/IamRolePolicyAttachment",
            "uniqueId": "teststartsWith_Handler_IamRolePolicyAttachment_71D91495"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.teststartsWith_Handler_IamRole_954988DB.name}"
      },
      "testsubstring_Handler_IamRolePolicyAttachment_73196EBC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:substring()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testsubstring_Handler_IamRolePolicyAttachment_73196EBC"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testsubstring_Handler_IamRole_3EEC66DD.name}"
      },
      "testtrim_Handler_IamRolePolicyAttachment_2B623F40": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:trim()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testtrim_Handler_IamRolePolicyAttachment_2B623F40"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testtrim_Handler_IamRole_92F0C855.name}"
      },
      "testuppercase_Handler_IamRolePolicyAttachment_02EC7380": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:uppercase()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testuppercase_Handler_IamRolePolicyAttachment_02EC7380"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testuppercase_Handler_IamRole_0A95D353.name}"
      }
    },
    "aws_lambda_function": {
      "testat_Handler_E4F013BC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:at()/Handler/Default",
            "uniqueId": "testat_Handler_E4F013BC"
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
        "role": "${aws_iam_role.testat_Handler_IamRole_17A4EF25.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testat_Handler_S3Object_AE9ADE42.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testconcat_Handler_E184D86A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concat()/Handler/Default",
            "uniqueId": "testconcat_Handler_E184D86A"
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
        "role": "${aws_iam_role.testconcat_Handler_IamRole_95DF0DBB.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testconcat_Handler_S3Object_65D4C81D.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testcontains_Handler_F60865D9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:contains()/Handler/Default",
            "uniqueId": "testcontains_Handler_F60865D9"
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
        "role": "${aws_iam_role.testcontains_Handler_IamRole_654B73B4.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testcontains_Handler_S3Object_4387F7AE.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testendsWith_Handler_9BA42993": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:endsWith()/Handler/Default",
            "uniqueId": "testendsWith_Handler_9BA42993"
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
        "role": "${aws_iam_role.testendsWith_Handler_IamRole_FF7C666A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testendsWith_Handler_S3Object_8FBD72C0.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testfromJson_Handler_CA86BEEA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson/Handler/Default",
            "uniqueId": "testfromJson_Handler_CA86BEEA"
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
        "role": "${aws_iam_role.testfromJson_Handler_IamRole_1C3963E1.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testfromJson_Handler_S3Object_90641F99.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testindexOf_Handler_BD91EA6F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:indexOf()/Handler/Default",
            "uniqueId": "testindexOf_Handler_BD91EA6F"
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
        "role": "${aws_iam_role.testindexOf_Handler_IamRole_F0D11C74.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testindexOf_Handler_S3Object_C2C2987B.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testlength_Handler_BFD8933F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:length/Handler/Default",
            "uniqueId": "testlength_Handler_BFD8933F"
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
        "role": "${aws_iam_role.testlength_Handler_IamRole_0AFDC7CB.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testlength_Handler_S3Object_1AB463C9.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testlowercase_Handler_EAADE79D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lowercase()/Handler/Default",
            "uniqueId": "testlowercase_Handler_EAADE79D"
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
        "role": "${aws_iam_role.testlowercase_Handler_IamRole_AD4BFFD1.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testlowercase_Handler_S3Object_41A6B15B.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testreplace_Handler_83836186": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:replace()/Handler/Default",
            "uniqueId": "testreplace_Handler_83836186"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c876baf0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c876baf0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testreplace_Handler_IamRole_8269B4F2.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testreplace_Handler_S3Object_20DF2856.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testsplit_Handler_4FAF6D9E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:split()/Handler/Default",
            "uniqueId": "testsplit_Handler_4FAF6D9E"
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
        "role": "${aws_iam_role.testsplit_Handler_IamRole_8F132662.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testsplit_Handler_S3Object_08906E51.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "teststartsWith_Handler_C8752245": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:startsWith()/Handler/Default",
            "uniqueId": "teststartsWith_Handler_C8752245"
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
        "role": "${aws_iam_role.teststartsWith_Handler_IamRole_954988DB.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.teststartsWith_Handler_S3Object_48B24E69.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testsubstring_Handler_E6617207": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:substring()/Handler/Default",
            "uniqueId": "testsubstring_Handler_E6617207"
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
        "role": "${aws_iam_role.testsubstring_Handler_IamRole_3EEC66DD.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testsubstring_Handler_S3Object_6C0217C3.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testtrim_Handler_403ED8AD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:trim()/Handler/Default",
            "uniqueId": "testtrim_Handler_403ED8AD"
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
        "role": "${aws_iam_role.testtrim_Handler_IamRole_92F0C855.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testtrim_Handler_S3Object_3E2EF93C.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testuppercase_Handler_352FFA2E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:uppercase()/Handler/Default",
            "uniqueId": "testuppercase_Handler_352FFA2E"
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
        "role": "${aws_iam_role.testuppercase_Handler_IamRole_0A95D353.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testuppercase_Handler_S3Object_DA85E4BE.key}",
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
      "testat_Handler_S3Object_AE9ADE42": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:at()/Handler/S3Object",
            "uniqueId": "testat_Handler_S3Object_AE9ADE42"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testconcat_Handler_S3Object_65D4C81D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concat()/Handler/S3Object",
            "uniqueId": "testconcat_Handler_S3Object_65D4C81D"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testcontains_Handler_S3Object_4387F7AE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:contains()/Handler/S3Object",
            "uniqueId": "testcontains_Handler_S3Object_4387F7AE"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testendsWith_Handler_S3Object_8FBD72C0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:endsWith()/Handler/S3Object",
            "uniqueId": "testendsWith_Handler_S3Object_8FBD72C0"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testfromJson_Handler_S3Object_90641F99": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson/Handler/S3Object",
            "uniqueId": "testfromJson_Handler_S3Object_90641F99"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testindexOf_Handler_S3Object_C2C2987B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:indexOf()/Handler/S3Object",
            "uniqueId": "testindexOf_Handler_S3Object_C2C2987B"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testlength_Handler_S3Object_1AB463C9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:length/Handler/S3Object",
            "uniqueId": "testlength_Handler_S3Object_1AB463C9"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testlowercase_Handler_S3Object_41A6B15B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lowercase()/Handler/S3Object",
            "uniqueId": "testlowercase_Handler_S3Object_41A6B15B"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testreplace_Handler_S3Object_20DF2856": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:replace()/Handler/S3Object",
            "uniqueId": "testreplace_Handler_S3Object_20DF2856"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testsplit_Handler_S3Object_08906E51": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:split()/Handler/S3Object",
            "uniqueId": "testsplit_Handler_S3Object_08906E51"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "teststartsWith_Handler_S3Object_48B24E69": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:startsWith()/Handler/S3Object",
            "uniqueId": "teststartsWith_Handler_S3Object_48B24E69"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testsubstring_Handler_S3Object_6C0217C3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:substring()/Handler/S3Object",
            "uniqueId": "testsubstring_Handler_S3Object_6C0217C3"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testtrim_Handler_S3Object_3E2EF93C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:trim()/Handler/S3Object",
            "uniqueId": "testtrim_Handler_S3Object_3E2EF93C"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testuppercase_Handler_S3Object_DA85E4BE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:uppercase()/Handler/S3Object",
            "uniqueId": "testuppercase_Handler_S3Object_DA85E4BE"
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
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
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
new $App({ outdir: $outdir, name: "string", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, sourceDir: process.env['WING_SOURCE_DIR'] }).synth();

```

