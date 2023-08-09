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
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: [\"hello\"].length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(["hello"].length,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: MutArray<str>[\"hello\"].length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(["hello"].length,1)))};
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
      const i = ["hello", "wing"];
      const separator = ",";
      const joinedString = (await i.join());
      const expectedString = (((await i.at(0)) + separator) + (await i.at(1)));
      {((cond) => {if (!cond) throw new Error("assertion failed: joinedString == expectedString")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(joinedString,expectedString)))};
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
      const o = ["hello", "wing"];
      const p = [...(o)];
      {((cond) => {if (!cond) throw new Error("assertion failed: o.length == p.length")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(o.length,p.length)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: o.at(0) == p.at(0)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await o.at(0)),(await p.at(0)))))};
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
      const q = ["hello", "wing"];
      const r = [...(q)];
      {((cond) => {if (!cond) throw new Error("assertion failed: q.length == r.length")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(q.length,r.length)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: q.at(0) == r.at(0)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await q.at(0)),(await r.at(0)))))};
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
      const lastStr = "wing";
      const s = ["hello", lastStr, lastStr];
      {((cond) => {if (!cond) throw new Error("assertion failed: s.lastIndexOf(lastStr) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s.lastIndexOf(lastStr),2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: s.lastIndexOf(\"something\") == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s.lastIndexOf("something"),(-1))))};
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
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: [\"hello\"].at(0) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await ["hello"].at(0)),"hello")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: MutArray<str>[\"hello\", \"world\"].at(1) == \"world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await ["hello", "world"].at(1)),"world")))};
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
    async handle() {
      const a = ["hello"];
      {((cond) => {if (!cond) throw new Error("assertion failed: a.length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(a.length,1)))};
      (await a.push("world"));
      {((cond) => {if (!cond) throw new Error("assertion failed: a.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(a.length,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: a.at(0) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await a.at(0)),"hello")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: a.at(1) == \"world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await a.at(1)),"world")))};
      const item = (await a.pop());
      {((cond) => {if (!cond) throw new Error("assertion failed: item == \"world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(item,"world")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: a.length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(a.length,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: a.at(0) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await a.at(0)),"hello")))};
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
      const b = ["hello"];
      {((cond) => {if (!cond) throw new Error("assertion failed: b.length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(b.length,1)))};
      const d = (await b.concat(["wing"]));
      {((cond) => {if (!cond) throw new Error("assertion failed: d.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d.length,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d.at(0) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await d.at(0)),"hello")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d.at(1) == \"wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await d.at(1)),"wing")))};
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
      const array = ["hello"];
      {((cond) => {if (!cond) throw new Error("assertion failed: array.length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(array.length,1)))};
      const anotherArray = ["wing"];
      {((cond) => {if (!cond) throw new Error("assertion failed: anotherArray.length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(anotherArray.length,1)))};
      const mergedArray = (await array.concat(anotherArray));
      {((cond) => {if (!cond) throw new Error("assertion failed: mergedArray.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(mergedArray.length,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mergedArray.at(0) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await mergedArray.at(0)),"hello")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mergedArray.at(1) == \"wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await mergedArray.at(1)),"wing")))};
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
      const e = ["hello", "wing"];
      {((cond) => {if (!cond) throw new Error("assertion failed: e.contains(\"wing\")")})(e.includes("wing"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: !e.contains(\"NotThere\")")})((!e.includes("NotThere")))};
      const h = ["hello", "wing"];
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
    async handle() {
      const g = ["hello", "wing"];
      {((cond) => {if (!cond) throw new Error("assertion failed: g.indexOf(\"wing\") == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(g.indexOf("wing"),1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: g.indexOf(\"notThere\") == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(g.indexOf("notThere"),(-1))))};
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
      const g = ["hello", "wing"];
      {((cond) => {if (!cond) throw new Error("assertion failed: g.indexOf(\"wing\") == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(g.indexOf("wing"),1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: g.indexOf(\"notThere\") == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(g.indexOf("notThere"),(-1))))};
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
      const i = ["hello", "wing"];
      const separator = ";";
      const joinedString = (await i.join(separator));
      const expectedString = (((await i.at(0)) + separator) + (await i.at(1)));
      {((cond) => {if (!cond) throw new Error("assertion failed: joinedString == expectedString")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(joinedString,expectedString)))};
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
      "value": "[[\"root/undefined/Default/test:length\",\"${aws_lambda_function.undefined_testlength_Handler_6713B031.arn}\"],[\"root/undefined/Default/test:at()\",\"${aws_lambda_function.undefined_testat_Handler_3D63C4E4.arn}\"],[\"root/undefined/Default/test:pushAndPop()\",\"${aws_lambda_function.undefined_testpushAndPop_Handler_1747E73B.arn}\"],[\"root/undefined/Default/test:concatMutArray()\",\"${aws_lambda_function.undefined_testconcatMutArray_Handler_92A182A4.arn}\"],[\"root/undefined/Default/test:concatArray()\",\"${aws_lambda_function.undefined_testconcatArray_Handler_2C905669.arn}\"],[\"root/undefined/Default/test:contains()\",\"${aws_lambda_function.undefined_testcontains_Handler_DC7BA782.arn}\"],[\"root/undefined/Default/test:indexOf()\",\"${aws_lambda_function.undefined_testindexOf_Handler_EFE399F2.arn}\"],[\"root/undefined/Default/test:indexOfArray()\",\"${aws_lambda_function.undefined_testindexOfArray_Handler_B7674780.arn}\"],[\"root/undefined/Default/test:join()\",\"${aws_lambda_function.undefined_testjoin_Handler_3160CB23.arn}\"],[\"root/undefined/Default/test:joinWithDefaultSeparator()\",\"${aws_lambda_function.undefined_testjoinWithDefaultSeparator_Handler_3BDC9821.arn}\"],[\"root/undefined/Default/test:copy()\",\"${aws_lambda_function.undefined_testcopy_Handler_ACBBD2F6.arn}\"],[\"root/undefined/Default/test:copyMut()\",\"${aws_lambda_function.undefined_testcopyMut_Handler_2E742271.arn}\"],[\"root/undefined/Default/test:lastIndexOf()\",\"${aws_lambda_function.undefined_testlastIndexOf_Handler_4C41AA22.arn}\"]]"
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
      "undefined_testconcatArray_Handler_IamRole_42A7B9CB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:concatArray()/Handler/IamRole",
            "uniqueId": "undefined_testconcatArray_Handler_IamRole_42A7B9CB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testconcatMutArray_Handler_IamRole_B63A90EC": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:concatMutArray()/Handler/IamRole",
            "uniqueId": "undefined_testconcatMutArray_Handler_IamRole_B63A90EC"
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
      "undefined_testcopyMut_Handler_IamRole_3929F3AB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:copyMut()/Handler/IamRole",
            "uniqueId": "undefined_testcopyMut_Handler_IamRole_3929F3AB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testcopy_Handler_IamRole_3DF6EE7C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:copy()/Handler/IamRole",
            "uniqueId": "undefined_testcopy_Handler_IamRole_3DF6EE7C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testindexOfArray_Handler_IamRole_2A7243D0": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:indexOfArray()/Handler/IamRole",
            "uniqueId": "undefined_testindexOfArray_Handler_IamRole_2A7243D0"
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
      "undefined_testjoinWithDefaultSeparator_Handler_IamRole_51485CD1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:joinWithDefaultSeparator()/Handler/IamRole",
            "uniqueId": "undefined_testjoinWithDefaultSeparator_Handler_IamRole_51485CD1"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testjoin_Handler_IamRole_9AAD008A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:join()/Handler/IamRole",
            "uniqueId": "undefined_testjoin_Handler_IamRole_9AAD008A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testlastIndexOf_Handler_IamRole_73073F1A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:lastIndexOf()/Handler/IamRole",
            "uniqueId": "undefined_testlastIndexOf_Handler_IamRole_73073F1A"
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
      "undefined_testpushAndPop_Handler_IamRole_9C5712AA": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:pushAndPop()/Handler/IamRole",
            "uniqueId": "undefined_testpushAndPop_Handler_IamRole_9C5712AA"
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
      "undefined_testconcatArray_Handler_IamRolePolicy_054939B7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:concatArray()/Handler/IamRolePolicy",
            "uniqueId": "undefined_testconcatArray_Handler_IamRolePolicy_054939B7"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testconcatArray_Handler_IamRole_42A7B9CB.name}"
      },
      "undefined_testconcatMutArray_Handler_IamRolePolicy_F2AF5ECA": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:concatMutArray()/Handler/IamRolePolicy",
            "uniqueId": "undefined_testconcatMutArray_Handler_IamRolePolicy_F2AF5ECA"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testconcatMutArray_Handler_IamRole_B63A90EC.name}"
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
      "undefined_testcopyMut_Handler_IamRolePolicy_8D3D1EA4": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:copyMut()/Handler/IamRolePolicy",
            "uniqueId": "undefined_testcopyMut_Handler_IamRolePolicy_8D3D1EA4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testcopyMut_Handler_IamRole_3929F3AB.name}"
      },
      "undefined_testcopy_Handler_IamRolePolicy_F731210A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:copy()/Handler/IamRolePolicy",
            "uniqueId": "undefined_testcopy_Handler_IamRolePolicy_F731210A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testcopy_Handler_IamRole_3DF6EE7C.name}"
      },
      "undefined_testindexOfArray_Handler_IamRolePolicy_AE99F611": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:indexOfArray()/Handler/IamRolePolicy",
            "uniqueId": "undefined_testindexOfArray_Handler_IamRolePolicy_AE99F611"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testindexOfArray_Handler_IamRole_2A7243D0.name}"
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
      "undefined_testjoinWithDefaultSeparator_Handler_IamRolePolicy_FA1BC687": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:joinWithDefaultSeparator()/Handler/IamRolePolicy",
            "uniqueId": "undefined_testjoinWithDefaultSeparator_Handler_IamRolePolicy_FA1BC687"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testjoinWithDefaultSeparator_Handler_IamRole_51485CD1.name}"
      },
      "undefined_testjoin_Handler_IamRolePolicy_6E456911": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:join()/Handler/IamRolePolicy",
            "uniqueId": "undefined_testjoin_Handler_IamRolePolicy_6E456911"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testjoin_Handler_IamRole_9AAD008A.name}"
      },
      "undefined_testlastIndexOf_Handler_IamRolePolicy_0410659C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:lastIndexOf()/Handler/IamRolePolicy",
            "uniqueId": "undefined_testlastIndexOf_Handler_IamRolePolicy_0410659C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testlastIndexOf_Handler_IamRole_73073F1A.name}"
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
      "undefined_testpushAndPop_Handler_IamRolePolicy_1003CF6F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:pushAndPop()/Handler/IamRolePolicy",
            "uniqueId": "undefined_testpushAndPop_Handler_IamRolePolicy_1003CF6F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testpushAndPop_Handler_IamRole_9C5712AA.name}"
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
      "undefined_testconcatArray_Handler_IamRolePolicyAttachment_C38C77B9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:concatArray()/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testconcatArray_Handler_IamRolePolicyAttachment_C38C77B9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testconcatArray_Handler_IamRole_42A7B9CB.name}"
      },
      "undefined_testconcatMutArray_Handler_IamRolePolicyAttachment_84A35C52": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:concatMutArray()/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testconcatMutArray_Handler_IamRolePolicyAttachment_84A35C52"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testconcatMutArray_Handler_IamRole_B63A90EC.name}"
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
      "undefined_testcopyMut_Handler_IamRolePolicyAttachment_3DAB4586": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:copyMut()/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testcopyMut_Handler_IamRolePolicyAttachment_3DAB4586"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testcopyMut_Handler_IamRole_3929F3AB.name}"
      },
      "undefined_testcopy_Handler_IamRolePolicyAttachment_FC3CBCD4": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:copy()/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testcopy_Handler_IamRolePolicyAttachment_FC3CBCD4"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testcopy_Handler_IamRole_3DF6EE7C.name}"
      },
      "undefined_testindexOfArray_Handler_IamRolePolicyAttachment_36A3687B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:indexOfArray()/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testindexOfArray_Handler_IamRolePolicyAttachment_36A3687B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testindexOfArray_Handler_IamRole_2A7243D0.name}"
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
      "undefined_testjoinWithDefaultSeparator_Handler_IamRolePolicyAttachment_BBE3C78F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:joinWithDefaultSeparator()/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testjoinWithDefaultSeparator_Handler_IamRolePolicyAttachment_BBE3C78F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testjoinWithDefaultSeparator_Handler_IamRole_51485CD1.name}"
      },
      "undefined_testjoin_Handler_IamRolePolicyAttachment_7F843DAB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:join()/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testjoin_Handler_IamRolePolicyAttachment_7F843DAB"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testjoin_Handler_IamRole_9AAD008A.name}"
      },
      "undefined_testlastIndexOf_Handler_IamRolePolicyAttachment_4FA2C251": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:lastIndexOf()/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testlastIndexOf_Handler_IamRolePolicyAttachment_4FA2C251"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testlastIndexOf_Handler_IamRole_73073F1A.name}"
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
      "undefined_testpushAndPop_Handler_IamRolePolicyAttachment_D836B3B0": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:pushAndPop()/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testpushAndPop_Handler_IamRolePolicyAttachment_D836B3B0"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testpushAndPop_Handler_IamRole_9C5712AA.name}"
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
      "undefined_testconcatArray_Handler_2C905669": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:concatArray()/Handler/Default",
            "uniqueId": "undefined_testconcatArray_Handler_2C905669"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8972307",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8972307",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testconcatArray_Handler_IamRole_42A7B9CB.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testconcatArray_Handler_S3Object_41B3A1A9.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testconcatMutArray_Handler_92A182A4": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:concatMutArray()/Handler/Default",
            "uniqueId": "undefined_testconcatMutArray_Handler_92A182A4"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c877e8b1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c877e8b1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testconcatMutArray_Handler_IamRole_B63A90EC.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testconcatMutArray_Handler_S3Object_41ABA87E.key}",
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
      "undefined_testcopyMut_Handler_2E742271": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:copyMut()/Handler/Default",
            "uniqueId": "undefined_testcopyMut_Handler_2E742271"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c813e0ee",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c813e0ee",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testcopyMut_Handler_IamRole_3929F3AB.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testcopyMut_Handler_S3Object_145BA1EE.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testcopy_Handler_ACBBD2F6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:copy()/Handler/Default",
            "uniqueId": "undefined_testcopy_Handler_ACBBD2F6"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c805c5b7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c805c5b7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testcopy_Handler_IamRole_3DF6EE7C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testcopy_Handler_S3Object_BD4E3DE9.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testindexOfArray_Handler_B7674780": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:indexOfArray()/Handler/Default",
            "uniqueId": "undefined_testindexOfArray_Handler_B7674780"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8cb1d10",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8cb1d10",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testindexOfArray_Handler_IamRole_2A7243D0.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testindexOfArray_Handler_S3Object_7ECB7AFF.key}",
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
      "undefined_testjoinWithDefaultSeparator_Handler_3BDC9821": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:joinWithDefaultSeparator()/Handler/Default",
            "uniqueId": "undefined_testjoinWithDefaultSeparator_Handler_3BDC9821"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8b07580",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8b07580",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testjoinWithDefaultSeparator_Handler_IamRole_51485CD1.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testjoinWithDefaultSeparator_Handler_S3Object_A1CD9C83.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testjoin_Handler_3160CB23": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:join()/Handler/Default",
            "uniqueId": "undefined_testjoin_Handler_3160CB23"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c844c23b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c844c23b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testjoin_Handler_IamRole_9AAD008A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testjoin_Handler_S3Object_4BCCD2FC.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testlastIndexOf_Handler_4C41AA22": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:lastIndexOf()/Handler/Default",
            "uniqueId": "undefined_testlastIndexOf_Handler_4C41AA22"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8cbbb8c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8cbbb8c",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testlastIndexOf_Handler_IamRole_73073F1A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testlastIndexOf_Handler_S3Object_6BC9BD8B.key}",
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
      "undefined_testpushAndPop_Handler_1747E73B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:pushAndPop()/Handler/Default",
            "uniqueId": "undefined_testpushAndPop_Handler_1747E73B"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c880bb65",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c880bb65",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testpushAndPop_Handler_IamRole_9C5712AA.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testpushAndPop_Handler_S3Object_4BEF0F8C.key}",
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
      },
      "undefined_cloudBucket_7A0DE585": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/Default",
            "uniqueId": "undefined_cloudBucket_7A0DE585"
          }
        },
        "bucket_prefix": "cloud-bucket-c8802ab1-",
        "force_destroy": false
      },
      "undefined_myBucket_FD0EE62A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/myBucket/Default",
            "uniqueId": "undefined_myBucket_FD0EE62A"
          }
        },
        "bucket_prefix": "mybucket-c84a897d-",
        "force_destroy": false
      },
      "undefined_mySecondBucket_D87F304D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/mySecondBucket/Default",
            "uniqueId": "undefined_mySecondBucket_D87F304D"
          }
        },
        "bucket_prefix": "mysecondbucket-c8c7c151-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "undefined_cloudBucket_PublicAccessBlock_A3FBADF2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "undefined_cloudBucket_PublicAccessBlock_A3FBADF2"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "undefined_myBucket_PublicAccessBlock_5F6A704D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/myBucket/PublicAccessBlock",
            "uniqueId": "undefined_myBucket_PublicAccessBlock_5F6A704D"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.undefined_myBucket_FD0EE62A.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "undefined_mySecondBucket_PublicAccessBlock_D04D06AF": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/mySecondBucket/PublicAccessBlock",
            "uniqueId": "undefined_mySecondBucket_PublicAccessBlock_D04D06AF"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.undefined_mySecondBucket_D87F304D.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "undefined_cloudBucket_Encryption_80E33E4D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/Encryption",
            "uniqueId": "undefined_cloudBucket_Encryption_80E33E4D"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "undefined_myBucket_Encryption_5F8DEA06": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/myBucket/Encryption",
            "uniqueId": "undefined_myBucket_Encryption_5F8DEA06"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_myBucket_FD0EE62A.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "undefined_mySecondBucket_Encryption_305619CC": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/mySecondBucket/Encryption",
            "uniqueId": "undefined_mySecondBucket_Encryption_305619CC"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_mySecondBucket_D87F304D.bucket}",
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
      "undefined_testconcatArray_Handler_S3Object_41B3A1A9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:concatArray()/Handler/S3Object",
            "uniqueId": "undefined_testconcatArray_Handler_S3Object_41B3A1A9"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testconcatMutArray_Handler_S3Object_41ABA87E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:concatMutArray()/Handler/S3Object",
            "uniqueId": "undefined_testconcatMutArray_Handler_S3Object_41ABA87E"
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
      "undefined_testcopyMut_Handler_S3Object_145BA1EE": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:copyMut()/Handler/S3Object",
            "uniqueId": "undefined_testcopyMut_Handler_S3Object_145BA1EE"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testcopy_Handler_S3Object_BD4E3DE9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:copy()/Handler/S3Object",
            "uniqueId": "undefined_testcopy_Handler_S3Object_BD4E3DE9"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testindexOfArray_Handler_S3Object_7ECB7AFF": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:indexOfArray()/Handler/S3Object",
            "uniqueId": "undefined_testindexOfArray_Handler_S3Object_7ECB7AFF"
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
      "undefined_testjoinWithDefaultSeparator_Handler_S3Object_A1CD9C83": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:joinWithDefaultSeparator()/Handler/S3Object",
            "uniqueId": "undefined_testjoinWithDefaultSeparator_Handler_S3Object_A1CD9C83"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testjoin_Handler_S3Object_4BCCD2FC": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:join()/Handler/S3Object",
            "uniqueId": "undefined_testjoin_Handler_S3Object_4BCCD2FC"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testlastIndexOf_Handler_S3Object_6BC9BD8B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:lastIndexOf()/Handler/S3Object",
            "uniqueId": "undefined_testlastIndexOf_Handler_S3Object_6BC9BD8B"
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
      "undefined_testpushAndPop_Handler_S3Object_4BEF0F8C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:pushAndPop()/Handler/S3Object",
            "uniqueId": "undefined_testpushAndPop_Handler_S3Object_4BEF0F8C"
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
const cloud = $stdlib.cloud;
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
    const bucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"myBucket");
    const buckets = [bucket];
    const anotherBucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"mySecondBucket");
    const anotherBuckets = [anotherBucket];
    {((cond) => {if (!cond) throw new Error("assertion failed: buckets.length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(buckets.length,1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: [1,2,3].length == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })([1, 2, 3].length,3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: MutArray<num>[1,2,3].length == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })([1, 2, 3].length,3)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:length",new $Closure1(this,"$Closure1"));
    {((cond) => {if (!cond) throw new Error("assertion failed: [\"hello\"].at(0) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((["hello"].at(0)),"hello")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: MutArray<str>[\"hello\", \"world\"].at(1) == \"world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((["hello", "world"].at(1)),"world")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: buckets.at(0).node.id == \"myBucket\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((buckets.at(0)).node.id,"myBucket")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:at()",new $Closure2(this,"$Closure2"));
    const a = ["hello"];
    {((cond) => {if (!cond) throw new Error("assertion failed: a.length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(a.length,1)))};
    (a.push("world"));
    {((cond) => {if (!cond) throw new Error("assertion failed: a.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(a.length,2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: a.at(0) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((a.at(0)),"hello")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: a.at(1) == \"world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((a.at(1)),"world")))};
    const item = (a.pop());
    {((cond) => {if (!cond) throw new Error("assertion failed: item == \"world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(item,"world")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: a.length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(a.length,1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: a.at(0) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((a.at(0)),"hello")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:pushAndPop()",new $Closure3(this,"$Closure3"));
    const array = ["hello"];
    {((cond) => {if (!cond) throw new Error("assertion failed: array.length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(array.length,1)))};
    const mergedArray = (array.concat(["wing"]));
    {((cond) => {if (!cond) throw new Error("assertion failed: mergedArray.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(mergedArray.length,2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mergedArray.at(0) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((mergedArray.at(0)),"hello")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mergedArray.at(1) == \"wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((mergedArray.at(1)),"wing")))};
    const b = ["hello"];
    {((cond) => {if (!cond) throw new Error("assertion failed: b.length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(b.length,1)))};
    const d = (b.concat(["wing"]));
    {((cond) => {if (!cond) throw new Error("assertion failed: d.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d.length,2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d.at(0) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((d.at(0)),"hello")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d.at(1) == \"wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((d.at(1)),"wing")))};
    const mergedBuckets = (buckets.concat(anotherBuckets));
    {((cond) => {if (!cond) throw new Error("assertion failed: mergedBuckets.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(mergedBuckets.length,2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mergedBuckets.at(0).node.id == \"myBucket\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((mergedBuckets.at(0)).node.id,"myBucket")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mergedBuckets.at(1).node.id == \"mySecondBucket\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((mergedBuckets.at(1)).node.id,"mySecondBucket")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:concatMutArray()",new $Closure4(this,"$Closure4"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:concatArray()",new $Closure5(this,"$Closure5"));
    const e = ["hello", "wing"];
    {((cond) => {if (!cond) throw new Error("assertion failed: e.contains(\"wing\")")})(e.includes("wing"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !e.contains(\"NotThere\")")})((!e.includes("NotThere")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: buckets.contains(buckets.at(0))")})(buckets.includes((buckets.at(0))))};
    const dummyBucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    {((cond) => {if (!cond) throw new Error("assertion failed: !buckets.contains(dummyBucket)")})((!buckets.includes(dummyBucket)))};
    const h = ["hello", "wing"];
    {((cond) => {if (!cond) throw new Error("assertion failed: h.contains(\"wing\")")})(h.includes("wing"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !h.contains(\"NotThere\")")})((!h.includes("NotThere")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:contains()",new $Closure6(this,"$Closure6"));
    const g = ["hello", "wing"];
    {((cond) => {if (!cond) throw new Error("assertion failed: g.indexOf(\"wing\") == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(g.indexOf("wing"),1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: g.indexOf(\"notThere\") == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(g.indexOf("notThere"),(-1))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: buckets.indexOf(bucket) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(buckets.indexOf(bucket),0)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: buckets.indexOf(dummyBucket) == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(buckets.indexOf(dummyBucket),(-1))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:indexOf()",new $Closure7(this,"$Closure7"));
    const q = ["hello", "wing"];
    {((cond) => {if (!cond) throw new Error("assertion failed: q.indexOf(\"wing\") == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(q.indexOf("wing"),1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: q.indexOf(\"notThere\") == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(q.indexOf("notThere"),(-1))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:indexOfArray()",new $Closure8(this,"$Closure8"));
    const m = ["hello", "wing"];
    const delimeter = ";";
    const joinedString = (m.join(delimeter));
    const expectedString = (((m.at(0)) + delimeter) + (m.at(1)));
    {((cond) => {if (!cond) throw new Error("assertion failed: joinedString == expectedString")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(joinedString,expectedString)))};
    const l = ["hello", "wing"];
    const separator = ",";
    const joinedStringWithDefault = (m.join());
    const expectedStringWithDefault = (((m.at(0)) + separator) + (m.at(1)));
    {((cond) => {if (!cond) throw new Error("assertion failed: joinedStringWithDefault == expectedStringWithDefault")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(joinedStringWithDefault,expectedStringWithDefault)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:join()",new $Closure9(this,"$Closure9"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:joinWithDefaultSeparator()",new $Closure10(this,"$Closure10"));
    const o = ["hello", "wing"];
    const p = [...(o)];
    {((cond) => {if (!cond) throw new Error("assertion failed: o.length == p.length")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(o.length,p.length)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: o.at(0) == p.at(0)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((o.at(0)),(p.at(0)))))};
    const copiedBuckets = [...(buckets)];
    {((cond) => {if (!cond) throw new Error("assertion failed: copiedBuckets.length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(copiedBuckets.length,1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: copiedBuckets.at(0).node.id == \"myBucket\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((copiedBuckets.at(0)).node.id,"myBucket")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:copy()",new $Closure11(this,"$Closure11"));
    const v = ["hello", "wing"];
    const r = [...(v)];
    {((cond) => {if (!cond) throw new Error("assertion failed: q.length == r.length")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(q.length,r.length)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: q.at(0) == r.at(0)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((q.at(0)),(r.at(0)))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:copyMut()",new $Closure12(this,"$Closure12"));
    const lastStr = "wing";
    const s = ["hello", lastStr, lastStr];
    {((cond) => {if (!cond) throw new Error("assertion failed: s.lastIndexOf(lastStr) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s.lastIndexOf(lastStr),2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s.lastIndexOf(\"something\") == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s.lastIndexOf("something"),(-1))))};
    const multipleBuckets = [bucket, bucket, anotherBucket];
    {((cond) => {if (!cond) throw new Error("assertion failed: multipleBuckets.lastIndexOf(bucket) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(multipleBuckets.lastIndexOf(bucket),1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: multipleBuckets.lastIndexOf(dummyBucket) == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(multipleBuckets.lastIndexOf(dummyBucket),(-1))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:lastIndexOf()",new $Closure13(this,"$Closure13"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "array", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

