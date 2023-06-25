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
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.freeze(["hello"]).length === 1)'`)})((Object.freeze(["hello"]).length === 1))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(["hello"].length === 1)'`)})((["hello"].length === 1))};
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
      const o = ["hello", "wing"];
      const p = Object.freeze([...(o)]);
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(o.length === p.length)'`)})((o.length === p.length))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await o.at(0)) === (await p.at(0)))'`)})(((await o.at(0)) === (await p.at(0))))};
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
      const q = Object.freeze(["hello", "wing"]);
      const r = [...(q)];
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(q.length === r.length)'`)})((q.length === r.length))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await q.at(0)) === (await r.at(0)))'`)})(((await q.at(0)) === (await r.at(0))))};
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
      const lastStr = "wing";
      const s = ["hello", lastStr, lastStr];
      const u = s.lastIndexOf(lastStr);
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(u === 2)'`)})((u === 2))};
      const v = s.lastIndexOf("something");
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(v === (-1))'`)})((v === (-1)))};
    }
  }
  return $Closure12;
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
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await Object.freeze(["hello"]).at(0)) === "hello")'`)})(((await Object.freeze(["hello"]).at(0)) === "hello"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await ["hello", "world"].at(1)) === "world")'`)})(((await ["hello", "world"].at(1)) === "world"))};
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
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(a.length === 1)'`)})((a.length === 1))};
      (await a.push("world"));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(a.length === 2)'`)})((a.length === 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await a.at(0)) === "hello")'`)})(((await a.at(0)) === "hello"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await a.at(1)) === "world")'`)})(((await a.at(1)) === "world"))};
      const item = (await a.pop());
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(item === "world")'`)})((item === "world"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(a.length === 1)'`)})((a.length === 1))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await a.at(0)) === "hello")'`)})(((await a.at(0)) === "hello"))};
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
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(b.length === 1)'`)})((b.length === 1))};
      const c = ["wing"];
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(c.length === 1)'`)})((c.length === 1))};
      const d = (await b.concat(c));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(d.length === 2)'`)})((d.length === 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await d.at(0)) === "hello")'`)})(((await d.at(0)) === "hello"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await d.at(1)) === "wing")'`)})(((await d.at(1)) === "wing"))};
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
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(array.length === 1)'`)})((array.length === 1))};
      const anotherArray = Object.freeze(["wing"]);
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(anotherArray.length === 1)'`)})((anotherArray.length === 1))};
      const mergedArray = (await array.concat(anotherArray));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(mergedArray.length === 2)'`)})((mergedArray.length === 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await mergedArray.at(0)) === "hello")'`)})(((await mergedArray.at(0)) === "hello"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await mergedArray.at(1)) === "wing")'`)})(((await mergedArray.at(1)) === "wing"))};
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
      const f = "wing";
      const contains = e.includes(f);
      {((cond) => {if (!cond) throw new Error(`assertion failed: 'contains'`)})(contains)};
      const g = "NotThere";
      const doesNotContain = e.includes(g);
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(!doesNotContain)'`)})((!doesNotContain))};
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
      const h = "wing";
      const index = g.indexOf(h);
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(index === 1)'`)})((index === 1))};
      const t = "notThere";
      const secondIndex = g.indexOf(t);
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(secondIndex === (-1))'`)})((secondIndex === (-1)))};
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
      const i = ["hello", "wing"];
      const j = "wing";
      const separator = ";";
      const joinedString = (await i.join(separator));
      const expectedString = (((await i.at(0)) + separator) + (await i.at(1)));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(joinedString === expectedString)'`)})((joinedString === expectedString))};
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
      const j = "wing";
      const separator = ",";
      const joinedString = (await i.join());
      const expectedString = (((await i.at(0)) + separator) + (await i.at(1)));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(joinedString === expectedString)'`)})((joinedString === expectedString))};
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
      "value": "[[\"root/Default/Default/test:length\",\"${aws_lambda_function.root_testlength_Handler_7245E498.arn}\"],[\"root/Default/Default/test:at()\",\"${aws_lambda_function.root_testat_Handler_39FB3FA1.arn}\"],[\"root/Default/Default/test:pushAndPop()\",\"${aws_lambda_function.root_testpushAndPop_Handler_20B4DAAB.arn}\"],[\"root/Default/Default/test:concatMutArray()\",\"${aws_lambda_function.root_testconcatMutArray_Handler_CCDA88F4.arn}\"],[\"root/Default/Default/test:concatArray()\",\"${aws_lambda_function.root_testconcatArray_Handler_BCC85120.arn}\"],[\"root/Default/Default/test:contains()\",\"${aws_lambda_function.root_testcontains_Handler_9F29A18C.arn}\"],[\"root/Default/Default/test:indexOf()\",\"${aws_lambda_function.root_testindexOf_Handler_6F5475B9.arn}\"],[\"root/Default/Default/test:join()\",\"${aws_lambda_function.root_testjoin_Handler_CB9050B7.arn}\"],[\"root/Default/Default/test:joinWithDefaultSeparator()\",\"${aws_lambda_function.root_testjoinWithDefaultSeparator_Handler_D6A71109.arn}\"],[\"root/Default/Default/test:copy()\",\"${aws_lambda_function.root_testcopy_Handler_8004DED9.arn}\"],[\"root/Default/Default/test:copyMut()\",\"${aws_lambda_function.root_testcopyMut_Handler_40DBEE6F.arn}\"],[\"root/Default/Default/test:lastIndexOf()\",\"${aws_lambda_function.root_testlastIndexOf_Handler_6B91D55C.arn}\"]]"
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
      "root_testconcatArray_Handler_IamRole_1305F7EF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concatArray()/Handler/IamRole",
            "uniqueId": "root_testconcatArray_Handler_IamRole_1305F7EF"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testconcatMutArray_Handler_IamRole_51074FC0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concatMutArray()/Handler/IamRole",
            "uniqueId": "root_testconcatMutArray_Handler_IamRole_51074FC0"
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
      "root_testcopyMut_Handler_IamRole_0420D757": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:copyMut()/Handler/IamRole",
            "uniqueId": "root_testcopyMut_Handler_IamRole_0420D757"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testcopy_Handler_IamRole_61CF9BB6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:copy()/Handler/IamRole",
            "uniqueId": "root_testcopy_Handler_IamRole_61CF9BB6"
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
      "root_testjoinWithDefaultSeparator_Handler_IamRole_236D0F20": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:joinWithDefaultSeparator()/Handler/IamRole",
            "uniqueId": "root_testjoinWithDefaultSeparator_Handler_IamRole_236D0F20"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testjoin_Handler_IamRole_51CF02B8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:join()/Handler/IamRole",
            "uniqueId": "root_testjoin_Handler_IamRole_51CF02B8"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testlastIndexOf_Handler_IamRole_79D10A99": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lastIndexOf()/Handler/IamRole",
            "uniqueId": "root_testlastIndexOf_Handler_IamRole_79D10A99"
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
      "root_testpushAndPop_Handler_IamRole_EC6118B7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:pushAndPop()/Handler/IamRole",
            "uniqueId": "root_testpushAndPop_Handler_IamRole_EC6118B7"
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
      "root_testconcatArray_Handler_IamRolePolicy_ECEF2107": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concatArray()/Handler/IamRolePolicy",
            "uniqueId": "root_testconcatArray_Handler_IamRolePolicy_ECEF2107"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testconcatArray_Handler_IamRole_1305F7EF.name}"
      },
      "root_testconcatMutArray_Handler_IamRolePolicy_3C7C25C2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concatMutArray()/Handler/IamRolePolicy",
            "uniqueId": "root_testconcatMutArray_Handler_IamRolePolicy_3C7C25C2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testconcatMutArray_Handler_IamRole_51074FC0.name}"
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
      "root_testcopyMut_Handler_IamRolePolicy_0651D1C7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:copyMut()/Handler/IamRolePolicy",
            "uniqueId": "root_testcopyMut_Handler_IamRolePolicy_0651D1C7"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testcopyMut_Handler_IamRole_0420D757.name}"
      },
      "root_testcopy_Handler_IamRolePolicy_AED6FB45": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:copy()/Handler/IamRolePolicy",
            "uniqueId": "root_testcopy_Handler_IamRolePolicy_AED6FB45"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testcopy_Handler_IamRole_61CF9BB6.name}"
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
      "root_testjoinWithDefaultSeparator_Handler_IamRolePolicy_821C9484": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:joinWithDefaultSeparator()/Handler/IamRolePolicy",
            "uniqueId": "root_testjoinWithDefaultSeparator_Handler_IamRolePolicy_821C9484"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testjoinWithDefaultSeparator_Handler_IamRole_236D0F20.name}"
      },
      "root_testjoin_Handler_IamRolePolicy_A86111B4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:join()/Handler/IamRolePolicy",
            "uniqueId": "root_testjoin_Handler_IamRolePolicy_A86111B4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testjoin_Handler_IamRole_51CF02B8.name}"
      },
      "root_testlastIndexOf_Handler_IamRolePolicy_C49B9CD0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lastIndexOf()/Handler/IamRolePolicy",
            "uniqueId": "root_testlastIndexOf_Handler_IamRolePolicy_C49B9CD0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testlastIndexOf_Handler_IamRole_79D10A99.name}"
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
      "root_testpushAndPop_Handler_IamRolePolicy_38557369": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:pushAndPop()/Handler/IamRolePolicy",
            "uniqueId": "root_testpushAndPop_Handler_IamRolePolicy_38557369"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testpushAndPop_Handler_IamRole_EC6118B7.name}"
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
      "root_testconcatArray_Handler_IamRolePolicyAttachment_A6817FE8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concatArray()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testconcatArray_Handler_IamRolePolicyAttachment_A6817FE8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testconcatArray_Handler_IamRole_1305F7EF.name}"
      },
      "root_testconcatMutArray_Handler_IamRolePolicyAttachment_823829C8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concatMutArray()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testconcatMutArray_Handler_IamRolePolicyAttachment_823829C8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testconcatMutArray_Handler_IamRole_51074FC0.name}"
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
      "root_testcopyMut_Handler_IamRolePolicyAttachment_A145DB50": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:copyMut()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testcopyMut_Handler_IamRolePolicyAttachment_A145DB50"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testcopyMut_Handler_IamRole_0420D757.name}"
      },
      "root_testcopy_Handler_IamRolePolicyAttachment_DE98366C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:copy()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testcopy_Handler_IamRolePolicyAttachment_DE98366C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testcopy_Handler_IamRole_61CF9BB6.name}"
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
      "root_testjoinWithDefaultSeparator_Handler_IamRolePolicyAttachment_580EDA79": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:joinWithDefaultSeparator()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testjoinWithDefaultSeparator_Handler_IamRolePolicyAttachment_580EDA79"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testjoinWithDefaultSeparator_Handler_IamRole_236D0F20.name}"
      },
      "root_testjoin_Handler_IamRolePolicyAttachment_24627D71": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:join()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testjoin_Handler_IamRolePolicyAttachment_24627D71"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testjoin_Handler_IamRole_51CF02B8.name}"
      },
      "root_testlastIndexOf_Handler_IamRolePolicyAttachment_C8DBAEB8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lastIndexOf()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testlastIndexOf_Handler_IamRolePolicyAttachment_C8DBAEB8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testlastIndexOf_Handler_IamRole_79D10A99.name}"
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
      "root_testpushAndPop_Handler_IamRolePolicyAttachment_F2C28810": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:pushAndPop()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testpushAndPop_Handler_IamRolePolicyAttachment_F2C28810"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testpushAndPop_Handler_IamRole_EC6118B7.name}"
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
      "root_testconcatArray_Handler_BCC85120": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concatArray()/Handler/Default",
            "uniqueId": "root_testconcatArray_Handler_BCC85120"
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
        "role": "${aws_iam_role.root_testconcatArray_Handler_IamRole_1305F7EF.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testconcatArray_Handler_S3Object_7F2389FB.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testconcatMutArray_Handler_CCDA88F4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concatMutArray()/Handler/Default",
            "uniqueId": "root_testconcatMutArray_Handler_CCDA88F4"
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
        "role": "${aws_iam_role.root_testconcatMutArray_Handler_IamRole_51074FC0.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testconcatMutArray_Handler_S3Object_500993A4.key}",
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
      "root_testcopyMut_Handler_40DBEE6F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:copyMut()/Handler/Default",
            "uniqueId": "root_testcopyMut_Handler_40DBEE6F"
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
        "role": "${aws_iam_role.root_testcopyMut_Handler_IamRole_0420D757.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testcopyMut_Handler_S3Object_2868869B.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testcopy_Handler_8004DED9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:copy()/Handler/Default",
            "uniqueId": "root_testcopy_Handler_8004DED9"
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
        "role": "${aws_iam_role.root_testcopy_Handler_IamRole_61CF9BB6.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testcopy_Handler_S3Object_29FB2C8F.key}",
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
      "root_testjoinWithDefaultSeparator_Handler_D6A71109": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:joinWithDefaultSeparator()/Handler/Default",
            "uniqueId": "root_testjoinWithDefaultSeparator_Handler_D6A71109"
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
        "role": "${aws_iam_role.root_testjoinWithDefaultSeparator_Handler_IamRole_236D0F20.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testjoinWithDefaultSeparator_Handler_S3Object_42DD08C0.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testjoin_Handler_CB9050B7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:join()/Handler/Default",
            "uniqueId": "root_testjoin_Handler_CB9050B7"
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
        "role": "${aws_iam_role.root_testjoin_Handler_IamRole_51CF02B8.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testjoin_Handler_S3Object_72E20B44.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testlastIndexOf_Handler_6B91D55C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lastIndexOf()/Handler/Default",
            "uniqueId": "root_testlastIndexOf_Handler_6B91D55C"
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
        "role": "${aws_iam_role.root_testlastIndexOf_Handler_IamRole_79D10A99.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testlastIndexOf_Handler_S3Object_2B34A1FC.key}",
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
      "root_testpushAndPop_Handler_20B4DAAB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:pushAndPop()/Handler/Default",
            "uniqueId": "root_testpushAndPop_Handler_20B4DAAB"
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
        "role": "${aws_iam_role.root_testpushAndPop_Handler_IamRole_EC6118B7.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testpushAndPop_Handler_S3Object_E9F1EBBB.key}",
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
      },
      "root_cloudBucket_4F3C4F53": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "root_cloudBucket_4F3C4F53"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      },
      "root_myBucket_86EF9F01": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/myBucket/Default",
            "uniqueId": "root_myBucket_86EF9F01"
          }
        },
        "bucket_prefix": "mybucket-c8573914-",
        "force_destroy": false
      },
      "root_mySecondBucket_DC733AF4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/mySecondBucket/Default",
            "uniqueId": "root_mySecondBucket_DC733AF4"
          }
        },
        "bucket_prefix": "mysecondbucket-c8d5dc33-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "root_cloudBucket_PublicAccessBlock_319C1C2E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "root_cloudBucket_PublicAccessBlock_319C1C2E"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "root_myBucket_PublicAccessBlock_D0DC82F2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/myBucket/PublicAccessBlock",
            "uniqueId": "root_myBucket_PublicAccessBlock_D0DC82F2"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_myBucket_86EF9F01.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "root_mySecondBucket_PublicAccessBlock_3CD2DFE6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/mySecondBucket/PublicAccessBlock",
            "uniqueId": "root_mySecondBucket_PublicAccessBlock_3CD2DFE6"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_mySecondBucket_DC733AF4.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "root_cloudBucket_Encryption_8ED0CD9C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Encryption",
            "uniqueId": "root_cloudBucket_Encryption_8ED0CD9C"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "root_myBucket_Encryption_6D0EB5B0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/myBucket/Encryption",
            "uniqueId": "root_myBucket_Encryption_6D0EB5B0"
          }
        },
        "bucket": "${aws_s3_bucket.root_myBucket_86EF9F01.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "root_mySecondBucket_Encryption_AFD9A702": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/mySecondBucket/Encryption",
            "uniqueId": "root_mySecondBucket_Encryption_AFD9A702"
          }
        },
        "bucket": "${aws_s3_bucket.root_mySecondBucket_DC733AF4.bucket}",
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
      "root_testconcatArray_Handler_S3Object_7F2389FB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concatArray()/Handler/S3Object",
            "uniqueId": "root_testconcatArray_Handler_S3Object_7F2389FB"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testconcatMutArray_Handler_S3Object_500993A4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concatMutArray()/Handler/S3Object",
            "uniqueId": "root_testconcatMutArray_Handler_S3Object_500993A4"
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
      "root_testcopyMut_Handler_S3Object_2868869B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:copyMut()/Handler/S3Object",
            "uniqueId": "root_testcopyMut_Handler_S3Object_2868869B"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testcopy_Handler_S3Object_29FB2C8F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:copy()/Handler/S3Object",
            "uniqueId": "root_testcopy_Handler_S3Object_29FB2C8F"
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
      "root_testjoinWithDefaultSeparator_Handler_S3Object_42DD08C0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:joinWithDefaultSeparator()/Handler/S3Object",
            "uniqueId": "root_testjoinWithDefaultSeparator_Handler_S3Object_42DD08C0"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testjoin_Handler_S3Object_72E20B44": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:join()/Handler/S3Object",
            "uniqueId": "root_testjoin_Handler_S3Object_72E20B44"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testlastIndexOf_Handler_S3Object_2B34A1FC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:lastIndexOf()/Handler/S3Object",
            "uniqueId": "root_testlastIndexOf_Handler_S3Object_2B34A1FC"
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
      "root_testpushAndPop_Handler_S3Object_E9F1EBBB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:pushAndPop()/Handler/S3Object",
            "uniqueId": "root_testpushAndPop_Handler_S3Object_E9F1EBBB"
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
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
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
        this._addInflightOps("handle");
        this.display.hidden = true;
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
        this._addInflightOps("handle");
        this.display.hidden = true;
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
        this._addInflightOps("handle");
        this.display.hidden = true;
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
        this._addInflightOps("handle");
        this.display.hidden = true;
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
        this._addInflightOps("handle");
        this.display.hidden = true;
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
        this._addInflightOps("handle");
        this.display.hidden = true;
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
        this._addInflightOps("handle");
        this.display.hidden = true;
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
        this._addInflightOps("handle");
        this.display.hidden = true;
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
        this._addInflightOps("handle");
        this.display.hidden = true;
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
        this._addInflightOps("handle");
        this.display.hidden = true;
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
        this._addInflightOps("handle");
        this.display.hidden = true;
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
    const bucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"myBucket");
    const buckets = Object.freeze([bucket]);
    const anotherBucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"mySecondBucket");
    const anotherBuckets = Object.freeze([anotherBucket]);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(buckets.length === 1)'`)})((buckets.length === 1))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.freeze([1, 2, 3]).length === 3)'`)})((Object.freeze([1, 2, 3]).length === 3))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '([1, 2, 3].length === 3)'`)})(([1, 2, 3].length === 3))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:length",new $Closure1(this,"$Closure1"));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((Object.freeze(["hello"]).at(0)) === "hello")'`)})(((Object.freeze(["hello"]).at(0)) === "hello"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((["hello", "world"].at(1)) === "world")'`)})(((["hello", "world"].at(1)) === "world"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((buckets.at(0)).node.id === "myBucket")'`)})(((buckets.at(0)).node.id === "myBucket"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:at()",new $Closure2(this,"$Closure2"));
    const a = ["hello"];
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(a.length === 1)'`)})((a.length === 1))};
    (a.push("world"));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(a.length === 2)'`)})((a.length === 2))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((a.at(0)) === "hello")'`)})(((a.at(0)) === "hello"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((a.at(1)) === "world")'`)})(((a.at(1)) === "world"))};
    const item = (a.pop());
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(item === "world")'`)})((item === "world"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(a.length === 1)'`)})((a.length === 1))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((a.at(0)) === "hello")'`)})(((a.at(0)) === "hello"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:pushAndPop()",new $Closure3(this,"$Closure3"));
    const array = Object.freeze(["hello"]);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(array.length === 1)'`)})((array.length === 1))};
    const anotherArray = Object.freeze(["wing"]);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(anotherArray.length === 1)'`)})((anotherArray.length === 1))};
    const mergedArray = (array.concat(anotherArray));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(mergedArray.length === 2)'`)})((mergedArray.length === 2))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((mergedArray.at(0)) === "hello")'`)})(((mergedArray.at(0)) === "hello"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((mergedArray.at(1)) === "wing")'`)})(((mergedArray.at(1)) === "wing"))};
    const b = ["hello"];
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(b.length === 1)'`)})((b.length === 1))};
    const c = ["wing"];
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(c.length === 1)'`)})((c.length === 1))};
    const d = (b.concat(c));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(d.length === 2)'`)})((d.length === 2))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((d.at(0)) === "hello")'`)})(((d.at(0)) === "hello"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((d.at(1)) === "wing")'`)})(((d.at(1)) === "wing"))};
    const mergedBuckets = (buckets.concat(anotherBuckets));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(mergedBuckets.length === 2)'`)})((mergedBuckets.length === 2))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((mergedBuckets.at(0)).node.id === "myBucket")'`)})(((mergedBuckets.at(0)).node.id === "myBucket"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((mergedBuckets.at(1)).node.id === "mySecondBucket")'`)})(((mergedBuckets.at(1)).node.id === "mySecondBucket"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:concatMutArray()",new $Closure4(this,"$Closure4"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:concatArray()",new $Closure5(this,"$Closure5"));
    const e = ["hello", "wing"];
    const f = "wing";
    const contains = e.includes(f);
    {((cond) => {if (!cond) throw new Error(`assertion failed: 'contains'`)})(contains)};
    const n = "NotThere";
    const doesNotContain = e.includes(n);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(!doesNotContain)'`)})((!doesNotContain))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: 'buckets.includes((buckets.at(0)))'`)})(buckets.includes((buckets.at(0))))};
    const dummyBucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(!buckets.includes(dummyBucket))'`)})((!buckets.includes(dummyBucket)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:contains()",new $Closure6(this,"$Closure6"));
    const g = ["hello", "wing"];
    const h = "wing";
    const index = g.indexOf(h);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(index === 1)'`)})((index === 1))};
    const t = "notThere";
    const secondIndex = g.indexOf(t);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(secondIndex === (-1))'`)})((secondIndex === (-1)))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(buckets.indexOf(bucket) === 0)'`)})((buckets.indexOf(bucket) === 0))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(buckets.indexOf(dummyBucket) === (-1))'`)})((buckets.indexOf(dummyBucket) === (-1)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:indexOf()",new $Closure7(this,"$Closure7"));
    const i = ["hello", "wing"];
    const j = "wing";
    const delimeter = ";";
    const joinedString = (i.join(delimeter));
    const expectedString = (((i.at(0)) + delimeter) + (i.at(1)));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(joinedString === expectedString)'`)})((joinedString === expectedString))};
    const l = ["hello", "wing"];
    const m = "wing";
    const separator = ",";
    const joinedStringWithDefault = (i.join());
    const expectedStringWithDefault = (((i.at(0)) + separator) + (i.at(1)));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(joinedStringWithDefault === expectedStringWithDefault)'`)})((joinedStringWithDefault === expectedStringWithDefault))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:join()",new $Closure8(this,"$Closure8"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:joinWithDefaultSeparator()",new $Closure9(this,"$Closure9"));
    const o = ["hello", "wing"];
    const p = Object.freeze([...(o)]);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(o.length === p.length)'`)})((o.length === p.length))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((o.at(0)) === (p.at(0)))'`)})(((o.at(0)) === (p.at(0))))};
    const copiedBuckets = [...(buckets)];
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(copiedBuckets.length === 1)'`)})((copiedBuckets.length === 1))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((copiedBuckets.at(0)).node.id === "myBucket")'`)})(((copiedBuckets.at(0)).node.id === "myBucket"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:copy()",new $Closure10(this,"$Closure10"));
    const q = Object.freeze(["hello", "wing"]);
    const r = [...(q)];
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(q.length === r.length)'`)})((q.length === r.length))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((q.at(0)) === (r.at(0)))'`)})(((q.at(0)) === (r.at(0))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:copyMut()",new $Closure11(this,"$Closure11"));
    const lastStr = "wing";
    const s = ["hello", lastStr, lastStr];
    const u = s.lastIndexOf(lastStr);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(u === 2)'`)})((u === 2))};
    const v = s.lastIndexOf("something");
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(v === (-1))'`)})((v === (-1)))};
    const multipleBuckets = [bucket, bucket, anotherBucket];
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(multipleBuckets.lastIndexOf(bucket) === 1)'`)})((multipleBuckets.lastIndexOf(bucket) === 1))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(multipleBuckets.lastIndexOf(dummyBucket) === (-1))'`)})((multipleBuckets.lastIndexOf(dummyBucket) === (-1)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:lastIndexOf()",new $Closure12(this,"$Closure12"));
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

