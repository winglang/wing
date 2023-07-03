# [array.w](../../../../../../examples/tests/sdk_tests/std/array.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: [\"hello\"].length == 1")})((Object.freeze(["hello"]).length === 1))};
      {((cond) => {if (!cond) throw new Error("assertion failed: MutArray<str>[\"hello\"].length == 1")})((["hello"].length === 1))};
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
      const i = ["hello", "wing"];
      const separator = ",";
      const joinedString = (await i.join());
      const expectedString = (((await i.at(0)) + separator) + (await i.at(1)));
      {((cond) => {if (!cond) throw new Error("assertion failed: joinedString == expectedString")})((joinedString === expectedString))};
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
      const o = ["hello", "wing"];
      const p = Object.freeze([...(o)]);
      {((cond) => {if (!cond) throw new Error("assertion failed: o.length == p.length")})((o.length === p.length))};
      {((cond) => {if (!cond) throw new Error("assertion failed: o.at(0) == p.at(0)")})(((await o.at(0)) === (await p.at(0))))};
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
      const q = Object.freeze(["hello", "wing"]);
      const r = [...(q)];
      {((cond) => {if (!cond) throw new Error("assertion failed: q.length == r.length")})((q.length === r.length))};
      {((cond) => {if (!cond) throw new Error("assertion failed: q.at(0) == r.at(0)")})(((await q.at(0)) === (await r.at(0))))};
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
      const lastStr = "wing";
      const s = ["hello", lastStr, lastStr];
      {((cond) => {if (!cond) throw new Error("assertion failed: s.lastIndexOf(lastStr) == 2")})((s.lastIndexOf(lastStr) === 2))};
      {((cond) => {if (!cond) throw new Error("assertion failed: s.lastIndexOf(\"something\") == -1")})((s.lastIndexOf("something") === (-1)))};
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
      {((cond) => {if (!cond) throw new Error("assertion failed: [\"hello\"].at(0) == \"hello\"")})(((await Object.freeze(["hello"]).at(0)) === "hello"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: MutArray<str>[\"hello\", \"world\"].at(1) == \"world\"")})(((await ["hello", "world"].at(1)) === "world"))};
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
      const a = ["hello"];
      {((cond) => {if (!cond) throw new Error("assertion failed: a.length == 1")})((a.length === 1))};
      (await a.push("world"));
      {((cond) => {if (!cond) throw new Error("assertion failed: a.length == 2")})((a.length === 2))};
      {((cond) => {if (!cond) throw new Error("assertion failed: a.at(0) == \"hello\"")})(((await a.at(0)) === "hello"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: a.at(1) == \"world\"")})(((await a.at(1)) === "world"))};
      const item = (await a.pop());
      {((cond) => {if (!cond) throw new Error("assertion failed: item == \"world\"")})((item === "world"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: a.length == 1")})((a.length === 1))};
      {((cond) => {if (!cond) throw new Error("assertion failed: a.at(0) == \"hello\"")})(((await a.at(0)) === "hello"))};
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
      const b = ["hello"];
      {((cond) => {if (!cond) throw new Error("assertion failed: b.length == 1")})((b.length === 1))};
      const d = (await b.concat(["wing"]));
      {((cond) => {if (!cond) throw new Error("assertion failed: d.length == 2")})((d.length === 2))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d.at(0) == \"hello\"")})(((await d.at(0)) === "hello"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d.at(1) == \"wing\"")})(((await d.at(1)) === "wing"))};
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
      const array = Object.freeze(["hello"]);
      {((cond) => {if (!cond) throw new Error("assertion failed: array.length == 1")})((array.length === 1))};
      const anotherArray = Object.freeze(["wing"]);
      {((cond) => {if (!cond) throw new Error("assertion failed: anotherArray.length == 1")})((anotherArray.length === 1))};
      const mergedArray = (await array.concat(anotherArray));
      {((cond) => {if (!cond) throw new Error("assertion failed: mergedArray.length == 2")})((mergedArray.length === 2))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mergedArray.at(0) == \"hello\"")})(((await mergedArray.at(0)) === "hello"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mergedArray.at(1) == \"wing\"")})(((await mergedArray.at(1)) === "wing"))};
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
      const e = ["hello", "wing"];
      {((cond) => {if (!cond) throw new Error("assertion failed: e.contains(\"wing\")")})(e.includes("wing"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: !e.contains(\"NotThere\")")})((!e.includes("NotThere")))};
      const h = Object.freeze(["hello", "wing"]);
      {((cond) => {if (!cond) throw new Error("assertion failed: h.contains(\"wing\")")})(h.includes("wing"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: !h.contains(\"NotThere\")")})((!h.includes("NotThere")))};
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
      const g = ["hello", "wing"];
      {((cond) => {if (!cond) throw new Error("assertion failed: g.indexOf(\"wing\") == 1")})((g.indexOf("wing") === 1))};
      {((cond) => {if (!cond) throw new Error("assertion failed: g.indexOf(\"notThere\") == -1")})((g.indexOf("notThere") === (-1)))};
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
      const g = Object.freeze(["hello", "wing"]);
      {((cond) => {if (!cond) throw new Error("assertion failed: g.indexOf(\"wing\") == 1")})((g.indexOf("wing") === 1))};
      {((cond) => {if (!cond) throw new Error("assertion failed: g.indexOf(\"notThere\") == -1")})((g.indexOf("notThere") === (-1)))};
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
      const i = ["hello", "wing"];
      const separator = ";";
      const joinedString = (await i.join(separator));
      const expectedString = (((await i.at(0)) + separator) + (await i.at(1)));
      {((cond) => {if (!cond) throw new Error("assertion failed: joinedString == expectedString")})((joinedString === expectedString))};
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
      "value": "[[\"root/Default/Default/test:length\",\"${aws_lambda_function.testlength_Handler_BFD8933F.arn}\"],[\"root/Default/Default/test:at()\",\"${aws_lambda_function.testat_Handler_E4F013BC.arn}\"],[\"root/Default/Default/test:pushAndPop()\",\"${aws_lambda_function.testpushAndPop_Handler_EAC0C8FF.arn}\"],[\"root/Default/Default/test:concatMutArray()\",\"${aws_lambda_function.testconcatMutArray_Handler_40D88E89.arn}\"],[\"root/Default/Default/test:concatArray()\",\"${aws_lambda_function.testconcatArray_Handler_F66848AE.arn}\"],[\"root/Default/Default/test:contains()\",\"${aws_lambda_function.testcontains_Handler_F60865D9.arn}\"],[\"root/Default/Default/test:indexOf()\",\"${aws_lambda_function.testindexOf_Handler_BD91EA6F.arn}\"],[\"root/Default/Default/test:indexOfArray()\",\"${aws_lambda_function.testindexOfArray_Handler_DB3A81F5.arn}\"],[\"root/Default/Default/test:join()\",\"${aws_lambda_function.testjoin_Handler_6AC62A8E.arn}\"],[\"root/Default/Default/test:joinWithDefaultSeparator()\",\"${aws_lambda_function.testjoinWithDefaultSeparator_Handler_7AE1258D.arn}\"],[\"root/Default/Default/test:copy()\",\"${aws_lambda_function.testcopy_Handler_27A14A0E.arn}\"],[\"root/Default/Default/test:copyMut()\",\"${aws_lambda_function.testcopyMut_Handler_851E24B4.arn}\"],[\"root/Default/Default/test:lastIndexOf()\",\"${aws_lambda_function.testlastIndexOf_Handler_FFB2061F.arn}\"]]"
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
      "testconcatArray_Handler_IamRole_91E4CC58": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concatArray()/Handler/IamRole",
            "uniqueId": "testconcatArray_Handler_IamRole_91E4CC58"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testconcatMutArray_Handler_IamRole_D15DDECD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concatMutArray()/Handler/IamRole",
            "uniqueId": "testconcatMutArray_Handler_IamRole_D15DDECD"
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
      "testcopyMut_Handler_IamRole_D315FFC7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:copyMut()/Handler/IamRole",
            "uniqueId": "testcopyMut_Handler_IamRole_D315FFC7"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testcopy_Handler_IamRole_1C204862": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:copy()/Handler/IamRole",
            "uniqueId": "testcopy_Handler_IamRole_1C204862"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testindexOfArray_Handler_IamRole_7E74F988": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:indexOfArray()/Handler/IamRole",
            "uniqueId": "testindexOfArray_Handler_IamRole_7E74F988"
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
      "testjoinWithDefaultSeparator_Handler_IamRole_F4B07C96": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:joinWithDefaultSeparator()/Handler/IamRole",
            "uniqueId": "testjoinWithDefaultSeparator_Handler_IamRole_F4B07C96"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testjoin_Handler_IamRole_FC92EB9B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:join()/Handler/IamRole",
            "uniqueId": "testjoin_Handler_IamRole_FC92EB9B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testlastIndexOf_Handler_IamRole_91224FF2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lastIndexOf()/Handler/IamRole",
            "uniqueId": "testlastIndexOf_Handler_IamRole_91224FF2"
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
      "testpushAndPop_Handler_IamRole_5F6E6E00": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:pushAndPop()/Handler/IamRole",
            "uniqueId": "testpushAndPop_Handler_IamRole_5F6E6E00"
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
      "testconcatArray_Handler_IamRolePolicy_E96FB1EA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concatArray()/Handler/IamRolePolicy",
            "uniqueId": "testconcatArray_Handler_IamRolePolicy_E96FB1EA"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testconcatArray_Handler_IamRole_91E4CC58.name}"
      },
      "testconcatMutArray_Handler_IamRolePolicy_75833E57": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concatMutArray()/Handler/IamRolePolicy",
            "uniqueId": "testconcatMutArray_Handler_IamRolePolicy_75833E57"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testconcatMutArray_Handler_IamRole_D15DDECD.name}"
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
      "testcopyMut_Handler_IamRolePolicy_E62EECBF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:copyMut()/Handler/IamRolePolicy",
            "uniqueId": "testcopyMut_Handler_IamRolePolicy_E62EECBF"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testcopyMut_Handler_IamRole_D315FFC7.name}"
      },
      "testcopy_Handler_IamRolePolicy_C631E0BA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:copy()/Handler/IamRolePolicy",
            "uniqueId": "testcopy_Handler_IamRolePolicy_C631E0BA"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testcopy_Handler_IamRole_1C204862.name}"
      },
      "testindexOfArray_Handler_IamRolePolicy_A7F1827B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:indexOfArray()/Handler/IamRolePolicy",
            "uniqueId": "testindexOfArray_Handler_IamRolePolicy_A7F1827B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testindexOfArray_Handler_IamRole_7E74F988.name}"
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
      "testjoinWithDefaultSeparator_Handler_IamRolePolicy_BE8C8109": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:joinWithDefaultSeparator()/Handler/IamRolePolicy",
            "uniqueId": "testjoinWithDefaultSeparator_Handler_IamRolePolicy_BE8C8109"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testjoinWithDefaultSeparator_Handler_IamRole_F4B07C96.name}"
      },
      "testjoin_Handler_IamRolePolicy_DFD6A993": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:join()/Handler/IamRolePolicy",
            "uniqueId": "testjoin_Handler_IamRolePolicy_DFD6A993"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testjoin_Handler_IamRole_FC92EB9B.name}"
      },
      "testlastIndexOf_Handler_IamRolePolicy_AB422B9C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lastIndexOf()/Handler/IamRolePolicy",
            "uniqueId": "testlastIndexOf_Handler_IamRolePolicy_AB422B9C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testlastIndexOf_Handler_IamRole_91224FF2.name}"
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
      "testpushAndPop_Handler_IamRolePolicy_7A2A0323": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:pushAndPop()/Handler/IamRolePolicy",
            "uniqueId": "testpushAndPop_Handler_IamRolePolicy_7A2A0323"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testpushAndPop_Handler_IamRole_5F6E6E00.name}"
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
      "testconcatArray_Handler_IamRolePolicyAttachment_A92013C8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concatArray()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testconcatArray_Handler_IamRolePolicyAttachment_A92013C8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testconcatArray_Handler_IamRole_91E4CC58.name}"
      },
      "testconcatMutArray_Handler_IamRolePolicyAttachment_412A245F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concatMutArray()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testconcatMutArray_Handler_IamRolePolicyAttachment_412A245F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testconcatMutArray_Handler_IamRole_D15DDECD.name}"
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
      "testcopyMut_Handler_IamRolePolicyAttachment_F41EBCFC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:copyMut()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testcopyMut_Handler_IamRolePolicyAttachment_F41EBCFC"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testcopyMut_Handler_IamRole_D315FFC7.name}"
      },
      "testcopy_Handler_IamRolePolicyAttachment_8E7F5E53": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:copy()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testcopy_Handler_IamRolePolicyAttachment_8E7F5E53"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testcopy_Handler_IamRole_1C204862.name}"
      },
      "testindexOfArray_Handler_IamRolePolicyAttachment_FC4444FE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:indexOfArray()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testindexOfArray_Handler_IamRolePolicyAttachment_FC4444FE"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testindexOfArray_Handler_IamRole_7E74F988.name}"
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
      "testjoinWithDefaultSeparator_Handler_IamRolePolicyAttachment_CCD2125B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:joinWithDefaultSeparator()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testjoinWithDefaultSeparator_Handler_IamRolePolicyAttachment_CCD2125B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testjoinWithDefaultSeparator_Handler_IamRole_F4B07C96.name}"
      },
      "testjoin_Handler_IamRolePolicyAttachment_CC1F36FC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:join()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testjoin_Handler_IamRolePolicyAttachment_CC1F36FC"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testjoin_Handler_IamRole_FC92EB9B.name}"
      },
      "testlastIndexOf_Handler_IamRolePolicyAttachment_48E66B52": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lastIndexOf()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testlastIndexOf_Handler_IamRolePolicyAttachment_48E66B52"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testlastIndexOf_Handler_IamRole_91224FF2.name}"
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
      "testpushAndPop_Handler_IamRolePolicyAttachment_D18E216F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:pushAndPop()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testpushAndPop_Handler_IamRolePolicyAttachment_D18E216F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testpushAndPop_Handler_IamRole_5F6E6E00.name}"
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
      "testconcatArray_Handler_F66848AE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concatArray()/Handler/Default",
            "uniqueId": "testconcatArray_Handler_F66848AE"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8ba9aa0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8ba9aa0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testconcatArray_Handler_IamRole_91E4CC58.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testconcatArray_Handler_S3Object_51EBC412.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testconcatMutArray_Handler_40D88E89": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concatMutArray()/Handler/Default",
            "uniqueId": "testconcatMutArray_Handler_40D88E89"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8e5a138",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8e5a138",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testconcatMutArray_Handler_IamRole_D15DDECD.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testconcatMutArray_Handler_S3Object_070213DC.key}",
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
      "testcopyMut_Handler_851E24B4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:copyMut()/Handler/Default",
            "uniqueId": "testcopyMut_Handler_851E24B4"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8b1cc09",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8b1cc09",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testcopyMut_Handler_IamRole_D315FFC7.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testcopyMut_Handler_S3Object_9A27F38E.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testcopy_Handler_27A14A0E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:copy()/Handler/Default",
            "uniqueId": "testcopy_Handler_27A14A0E"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c802a3d7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c802a3d7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testcopy_Handler_IamRole_1C204862.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testcopy_Handler_S3Object_75FB5F66.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testindexOfArray_Handler_DB3A81F5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:indexOfArray()/Handler/Default",
            "uniqueId": "testindexOfArray_Handler_DB3A81F5"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c88fa7a3",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c88fa7a3",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testindexOfArray_Handler_IamRole_7E74F988.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testindexOfArray_Handler_S3Object_97FDD78D.key}",
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
      "testjoinWithDefaultSeparator_Handler_7AE1258D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:joinWithDefaultSeparator()/Handler/Default",
            "uniqueId": "testjoinWithDefaultSeparator_Handler_7AE1258D"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c833ed71",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c833ed71",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testjoinWithDefaultSeparator_Handler_IamRole_F4B07C96.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testjoinWithDefaultSeparator_Handler_S3Object_3891F637.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testjoin_Handler_6AC62A8E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:join()/Handler/Default",
            "uniqueId": "testjoin_Handler_6AC62A8E"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8a46f15",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8a46f15",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testjoin_Handler_IamRole_FC92EB9B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testjoin_Handler_S3Object_AA8680E5.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testlastIndexOf_Handler_FFB2061F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lastIndexOf()/Handler/Default",
            "uniqueId": "testlastIndexOf_Handler_FFB2061F"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c84609d0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c84609d0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testlastIndexOf_Handler_IamRole_91224FF2.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testlastIndexOf_Handler_S3Object_D642CBE9.key}",
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
      "testpushAndPop_Handler_EAC0C8FF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:pushAndPop()/Handler/Default",
            "uniqueId": "testpushAndPop_Handler_EAC0C8FF"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8b6e896",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8b6e896",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testpushAndPop_Handler_IamRole_5F6E6E00.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testpushAndPop_Handler_S3Object_3F93E368.key}",
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
      },
      "cloudBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "cloudBucket"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      },
      "myBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/myBucket/Default",
            "uniqueId": "myBucket"
          }
        },
        "bucket_prefix": "mybucket-c8573914-",
        "force_destroy": false
      },
      "mySecondBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/mySecondBucket/Default",
            "uniqueId": "mySecondBucket"
          }
        },
        "bucket_prefix": "mysecondbucket-c8d5dc33-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "cloudBucket_PublicAccessBlock_5946CCE8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "cloudBucket_PublicAccessBlock_5946CCE8"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.cloudBucket.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "myBucket_PublicAccessBlock_7A6E4A40": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/myBucket/PublicAccessBlock",
            "uniqueId": "myBucket_PublicAccessBlock_7A6E4A40"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.myBucket.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "mySecondBucket_PublicAccessBlock_54DA86BC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/mySecondBucket/PublicAccessBlock",
            "uniqueId": "mySecondBucket_PublicAccessBlock_54DA86BC"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.mySecondBucket.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "cloudBucket_Encryption_77B6AEEF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Encryption",
            "uniqueId": "cloudBucket_Encryption_77B6AEEF"
          }
        },
        "bucket": "${aws_s3_bucket.cloudBucket.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "myBucket_Encryption_689540CB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/myBucket/Encryption",
            "uniqueId": "myBucket_Encryption_689540CB"
          }
        },
        "bucket": "${aws_s3_bucket.myBucket.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "mySecondBucket_Encryption_4630E612": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/mySecondBucket/Encryption",
            "uniqueId": "mySecondBucket_Encryption_4630E612"
          }
        },
        "bucket": "${aws_s3_bucket.mySecondBucket.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
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
      "testconcatArray_Handler_S3Object_51EBC412": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concatArray()/Handler/S3Object",
            "uniqueId": "testconcatArray_Handler_S3Object_51EBC412"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testconcatMutArray_Handler_S3Object_070213DC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concatMutArray()/Handler/S3Object",
            "uniqueId": "testconcatMutArray_Handler_S3Object_070213DC"
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
      "testcopyMut_Handler_S3Object_9A27F38E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:copyMut()/Handler/S3Object",
            "uniqueId": "testcopyMut_Handler_S3Object_9A27F38E"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testcopy_Handler_S3Object_75FB5F66": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:copy()/Handler/S3Object",
            "uniqueId": "testcopy_Handler_S3Object_75FB5F66"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testindexOfArray_Handler_S3Object_97FDD78D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:indexOfArray()/Handler/S3Object",
            "uniqueId": "testindexOfArray_Handler_S3Object_97FDD78D"
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
      "testjoinWithDefaultSeparator_Handler_S3Object_3891F637": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:joinWithDefaultSeparator()/Handler/S3Object",
            "uniqueId": "testjoinWithDefaultSeparator_Handler_S3Object_3891F637"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testjoin_Handler_S3Object_AA8680E5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:join()/Handler/S3Object",
            "uniqueId": "testjoin_Handler_S3Object_AA8680E5"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testlastIndexOf_Handler_S3Object_D642CBE9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lastIndexOf()/Handler/S3Object",
            "uniqueId": "testlastIndexOf_Handler_S3Object_D642CBE9"
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
      "testpushAndPop_Handler_S3Object_3F93E368": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:pushAndPop()/Handler/S3Object",
            "uniqueId": "testpushAndPop_Handler_S3Object_3F93E368"
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
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
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
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        }
        if (ops.includes("handle")) {
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
    const bucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"myBucket");
    const buckets = Object.freeze([bucket]);
    const anotherBucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"mySecondBucket");
    const anotherBuckets = Object.freeze([anotherBucket]);
    {((cond) => {if (!cond) throw new Error("assertion failed: buckets.length == 1")})((buckets.length === 1))};
    {((cond) => {if (!cond) throw new Error("assertion failed: [1,2,3].length == 3")})((Object.freeze([1, 2, 3]).length === 3))};
    {((cond) => {if (!cond) throw new Error("assertion failed: MutArray<num>[1,2,3].length == 3")})(([1, 2, 3].length === 3))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:length",new $Closure1(this,"$Closure1"));
    {((cond) => {if (!cond) throw new Error("assertion failed: [\"hello\"].at(0) == \"hello\"")})(((Object.freeze(["hello"]).at(0)) === "hello"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: MutArray<str>[\"hello\", \"world\"].at(1) == \"world\"")})(((["hello", "world"].at(1)) === "world"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: buckets.at(0).node.id == \"myBucket\"")})(((buckets.at(0)).node.id === "myBucket"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:at()",new $Closure2(this,"$Closure2"));
    const a = ["hello"];
    {((cond) => {if (!cond) throw new Error("assertion failed: a.length == 1")})((a.length === 1))};
    (a.push("world"));
    {((cond) => {if (!cond) throw new Error("assertion failed: a.length == 2")})((a.length === 2))};
    {((cond) => {if (!cond) throw new Error("assertion failed: a.at(0) == \"hello\"")})(((a.at(0)) === "hello"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: a.at(1) == \"world\"")})(((a.at(1)) === "world"))};
    const item = (a.pop());
    {((cond) => {if (!cond) throw new Error("assertion failed: item == \"world\"")})((item === "world"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: a.length == 1")})((a.length === 1))};
    {((cond) => {if (!cond) throw new Error("assertion failed: a.at(0) == \"hello\"")})(((a.at(0)) === "hello"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:pushAndPop()",new $Closure3(this,"$Closure3"));
    const array = Object.freeze(["hello"]);
    {((cond) => {if (!cond) throw new Error("assertion failed: array.length == 1")})((array.length === 1))};
    const mergedArray = (array.concat(Object.freeze(["wing"])));
    {((cond) => {if (!cond) throw new Error("assertion failed: mergedArray.length == 2")})((mergedArray.length === 2))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mergedArray.at(0) == \"hello\"")})(((mergedArray.at(0)) === "hello"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mergedArray.at(1) == \"wing\"")})(((mergedArray.at(1)) === "wing"))};
    const b = ["hello"];
    {((cond) => {if (!cond) throw new Error("assertion failed: b.length == 1")})((b.length === 1))};
    const d = (b.concat(["wing"]));
    {((cond) => {if (!cond) throw new Error("assertion failed: d.length == 2")})((d.length === 2))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d.at(0) == \"hello\"")})(((d.at(0)) === "hello"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d.at(1) == \"wing\"")})(((d.at(1)) === "wing"))};
    const mergedBuckets = (buckets.concat(anotherBuckets));
    {((cond) => {if (!cond) throw new Error("assertion failed: mergedBuckets.length == 2")})((mergedBuckets.length === 2))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mergedBuckets.at(0).node.id == \"myBucket\"")})(((mergedBuckets.at(0)).node.id === "myBucket"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mergedBuckets.at(1).node.id == \"mySecondBucket\"")})(((mergedBuckets.at(1)).node.id === "mySecondBucket"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:concatMutArray()",new $Closure4(this,"$Closure4"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:concatArray()",new $Closure5(this,"$Closure5"));
    const e = ["hello", "wing"];
    {((cond) => {if (!cond) throw new Error("assertion failed: e.contains(\"wing\")")})(e.includes("wing"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !e.contains(\"NotThere\")")})((!e.includes("NotThere")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: buckets.contains(buckets.at(0))")})(buckets.includes((buckets.at(0))))};
    const dummyBucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    {((cond) => {if (!cond) throw new Error("assertion failed: !buckets.contains(dummyBucket)")})((!buckets.includes(dummyBucket)))};
    const h = Object.freeze(["hello", "wing"]);
    {((cond) => {if (!cond) throw new Error("assertion failed: h.contains(\"wing\")")})(h.includes("wing"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !h.contains(\"NotThere\")")})((!h.includes("NotThere")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:contains()",new $Closure6(this,"$Closure6"));
    const g = ["hello", "wing"];
    {((cond) => {if (!cond) throw new Error("assertion failed: g.indexOf(\"wing\") == 1")})((g.indexOf("wing") === 1))};
    {((cond) => {if (!cond) throw new Error("assertion failed: g.indexOf(\"notThere\") == -1")})((g.indexOf("notThere") === (-1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: buckets.indexOf(bucket) == 0")})((buckets.indexOf(bucket) === 0))};
    {((cond) => {if (!cond) throw new Error("assertion failed: buckets.indexOf(dummyBucket) == -1")})((buckets.indexOf(dummyBucket) === (-1)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:indexOf()",new $Closure7(this,"$Closure7"));
    const q = ["hello", "wing"];
    {((cond) => {if (!cond) throw new Error("assertion failed: q.indexOf(\"wing\") == 1")})((q.indexOf("wing") === 1))};
    {((cond) => {if (!cond) throw new Error("assertion failed: q.indexOf(\"notThere\") == -1")})((q.indexOf("notThere") === (-1)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:indexOfArray()",new $Closure8(this,"$Closure8"));
    const m = ["hello", "wing"];
    const delimeter = ";";
    const joinedString = (m.join(delimeter));
    const expectedString = (((m.at(0)) + delimeter) + (m.at(1)));
    {((cond) => {if (!cond) throw new Error("assertion failed: joinedString == expectedString")})((joinedString === expectedString))};
    const l = ["hello", "wing"];
    const separator = ",";
    const joinedStringWithDefault = (m.join());
    const expectedStringWithDefault = (((m.at(0)) + separator) + (m.at(1)));
    {((cond) => {if (!cond) throw new Error("assertion failed: joinedStringWithDefault == expectedStringWithDefault")})((joinedStringWithDefault === expectedStringWithDefault))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:join()",new $Closure9(this,"$Closure9"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:joinWithDefaultSeparator()",new $Closure10(this,"$Closure10"));
    const o = ["hello", "wing"];
    const p = Object.freeze([...(o)]);
    {((cond) => {if (!cond) throw new Error("assertion failed: o.length == p.length")})((o.length === p.length))};
    {((cond) => {if (!cond) throw new Error("assertion failed: o.at(0) == p.at(0)")})(((o.at(0)) === (p.at(0))))};
    const copiedBuckets = [...(buckets)];
    {((cond) => {if (!cond) throw new Error("assertion failed: copiedBuckets.length == 1")})((copiedBuckets.length === 1))};
    {((cond) => {if (!cond) throw new Error("assertion failed: copiedBuckets.at(0).node.id == \"myBucket\"")})(((copiedBuckets.at(0)).node.id === "myBucket"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:copy()",new $Closure11(this,"$Closure11"));
    const v = Object.freeze(["hello", "wing"]);
    const r = [...(v)];
    {((cond) => {if (!cond) throw new Error("assertion failed: q.length == r.length")})((q.length === r.length))};
    {((cond) => {if (!cond) throw new Error("assertion failed: q.at(0) == r.at(0)")})(((q.at(0)) === (r.at(0))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:copyMut()",new $Closure12(this,"$Closure12"));
    const lastStr = "wing";
    const s = ["hello", lastStr, lastStr];
    {((cond) => {if (!cond) throw new Error("assertion failed: s.lastIndexOf(lastStr) == 2")})((s.lastIndexOf(lastStr) === 2))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s.lastIndexOf(\"something\") == -1")})((s.lastIndexOf("something") === (-1)))};
    const multipleBuckets = [bucket, bucket, anotherBucket];
    {((cond) => {if (!cond) throw new Error("assertion failed: multipleBuckets.lastIndexOf(bucket) == 1")})((multipleBuckets.lastIndexOf(bucket) === 1))};
    {((cond) => {if (!cond) throw new Error("assertion failed: multipleBuckets.lastIndexOf(dummyBucket) == -1")})((multipleBuckets.lastIndexOf(dummyBucket) === (-1)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:lastIndexOf()",new $Closure13(this,"$Closure13"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "array", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

