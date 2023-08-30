# [array.w](../../../../../../examples/tests/sdk_tests/std/array.w) | compile | tf-aws

## inflight.$Closure1-1.js
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

## inflight.$Closure10-1.js
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
      const separator = ";";
      const joinedString = (await i.join(separator));
      const expectedString = (((await i.at(0)) + separator) + (await i.at(1)));
      {((cond) => {if (!cond) throw new Error("assertion failed: joinedString == expectedString")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(joinedString,expectedString)))};
    }
  }
  return $Closure10;
}

```

## inflight.$Closure11-1.js
```js
module.exports = function({  }) {
  class $Closure11 {
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
  return $Closure11;
}

```

## inflight.$Closure12-1.js
```js
module.exports = function({  }) {
  class $Closure12 {
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
  return $Closure12;
}

```

## inflight.$Closure13-1.js
```js
module.exports = function({  }) {
  class $Closure13 {
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
  return $Closure13;
}

```

## inflight.$Closure14-1.js
```js
module.exports = function({  }) {
  class $Closure14 {
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
  return $Closure14;
}

```

## inflight.$Closure15-1.js
```js
module.exports = function({  }) {
  class $Closure15 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const assertThrows = async (expected, block) => {
        let error = false;
        try {
          (await block());
        }
        catch ($error_actual) {
          const actual = $error_actual.message;
          {((cond) => {if (!cond) throw new Error("assertion failed: actual == expected")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(actual,expected)))};
          error = true;
        }
        {((cond) => {if (!cond) throw new Error("assertion failed: error")})(error)};
      }
      ;
      const INDEX_OUT_OF_BOUNDS_ERROR = "Index out of bounds";
      const mutArr = [1, 3, 5, 7, 9];
      {((cond) => {if (!cond) throw new Error("assertion failed: mutArr.at(0) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await mutArr.at(0)),1)))};
      ((obj, args) => { if (args[0] < 0 || args[0] >= mutArr.length) throw new Error("Index out of bounds"); obj[args[0]] = args[1]; })(mutArr, [0,2]);
      {((cond) => {if (!cond) throw new Error("assertion failed: mutArr.at(0) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await mutArr.at(0)),2)))};
      (await assertThrows(INDEX_OUT_OF_BOUNDS_ERROR,async () => {
        ((obj, args) => { if (args[0] < 0 || args[0] >= mutArr.length) throw new Error("Index out of bounds"); obj[args[0]] = args[1]; })(mutArr, [(-1),1]);
      }
      ));
      (await assertThrows(INDEX_OUT_OF_BOUNDS_ERROR,async () => {
        ((obj, args) => { if (args[0] < 0 || args[0] >= mutArr.length) throw new Error("Index out of bounds"); obj[args[0]] = args[1]; })(mutArr, [5,11]);
      }
      ));
    }
  }
  return $Closure15;
}

```

## inflight.$Closure16-1.js
```js
module.exports = function({  }) {
  class $Closure16 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const assertThrows = async (expected, block) => {
        let error = false;
        try {
          (await block());
        }
        catch ($error_actual) {
          const actual = $error_actual.message;
          {((cond) => {if (!cond) throw new Error("assertion failed: actual == expected")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(actual,expected)))};
          error = true;
        }
        {((cond) => {if (!cond) throw new Error("assertion failed: error")})(error)};
      }
      ;
      const INDEX_OUT_OF_BOUNDS_ERROR = "Index out of bounds";
      const mutArr = [5, 10, 20];
      ((obj, args) => { if (args[0] < 0 || args[0] > mutArr.length) throw new Error("Index out of bounds"); obj.splice(args[0], 0, args[1]); })(mutArr, [2,15]);
      {((cond) => {if (!cond) throw new Error("assertion failed: mutArr.length == 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(mutArr.length,4)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mutArr.at(2) == 15")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await mutArr.at(2)),15)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mutArr.at(3) == 20")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await mutArr.at(3)),20)))};
      (await assertThrows(INDEX_OUT_OF_BOUNDS_ERROR,async () => {
        ((obj, args) => { if (args[0] < 0 || args[0] > mutArr.length) throw new Error("Index out of bounds"); obj.splice(args[0], 0, args[1]); })(mutArr, [(-3),15]);
      }
      ));
      {((cond) => {if (!cond) throw new Error("assertion failed: mutArr.length == 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(mutArr.length,4)))};
      (await assertThrows(INDEX_OUT_OF_BOUNDS_ERROR,async () => {
        ((obj, args) => { if (args[0] < 0 || args[0] > mutArr.length) throw new Error("Index out of bounds"); obj.splice(args[0], 0, args[1]); })(mutArr, [7,15]);
      }
      ));
      {((cond) => {if (!cond) throw new Error("assertion failed: mutArr.length == 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(mutArr.length,4)))};
      ((obj, args) => { if (args[0] < 0 || args[0] > mutArr.length) throw new Error("Index out of bounds"); obj.splice(args[0], 0, args[1]); })(mutArr, [4,25]);
      {((cond) => {if (!cond) throw new Error("assertion failed: mutArr.length == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(mutArr.length,5)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mutArr.at(4) == 25")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await mutArr.at(4)),25)))};
    }
  }
  return $Closure16;
}

```

## inflight.$Closure17-1.js
```js
module.exports = function({  }) {
  class $Closure17 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const mutArr = [3, 6, 9, 3];
      const r1 = ((obj, args) => { if (obj.indexOf(args[0]) !== -1) { obj.splice(obj.indexOf(args[0]), 1); return true; } return false; })(mutArr, [3]);
      {((cond) => {if (!cond) throw new Error("assertion failed: r1 == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(r1,true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mutArr.length == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(mutArr.length,3)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mutArr == MutArray<num> [6, 9, 3]")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(mutArr,[6, 9, 3])))};
      const r2 = ((obj, args) => { if (obj.indexOf(args[0]) !== -1) { obj.splice(obj.indexOf(args[0]), 1); return true; } return false; })(mutArr, [(-42)]);
      {((cond) => {if (!cond) throw new Error("assertion failed: r2 == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(r2,false)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mutArr.length == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(mutArr.length,3)))};
    }
  }
  return $Closure17;
}

```

## inflight.$Closure2-1.js
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

## inflight.$Closure3-1.js
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

## inflight.$Closure4-1.js
```js
module.exports = function({  }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const assertThrows = async (expected, block) => {
        let error = false;
        try {
          (await block());
        }
        catch ($error_actual) {
          const actual = $error_actual.message;
          {((cond) => {if (!cond) throw new Error("assertion failed: actual == expected")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(actual,expected)))};
          error = true;
        }
        {((cond) => {if (!cond) throw new Error("assertion failed: error")})(error)};
      }
      ;
      const INDEX_OUT_OF_BOUNDS_ERROR = "Index out of bounds";
      const mutArr = ["hello", "world"];
      const item = ((obj, args) => { if (args[0] < 0 || args[0] >= mutArr.length) throw new Error("Index out of bounds"); return obj.splice(args[0], 1)[0]; })(mutArr, [0]);
      {((cond) => {if (!cond) throw new Error("assertion failed: item == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(item,"hello")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mutArr.length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(mutArr.length,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mutArr.at(0) == \"world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await mutArr.at(0)),"world")))};
      (await assertThrows(INDEX_OUT_OF_BOUNDS_ERROR,async () => {
        ((obj, args) => { if (args[0] < 0 || args[0] >= mutArr.length) throw new Error("Index out of bounds"); return obj.splice(args[0], 1)[0]; })(mutArr, [(-3)]);
      }
      ));
      (await assertThrows(INDEX_OUT_OF_BOUNDS_ERROR,async () => {
        ((obj, args) => { if (args[0] < 0 || args[0] >= mutArr.length) throw new Error("Index out of bounds"); return obj.splice(args[0], 1)[0]; })(mutArr, [3]);
      }
      ));
    }
  }
  return $Closure4;
}

```

## inflight.$Closure5-1.js
```js
module.exports = function({  }) {
  class $Closure5 {
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
  return $Closure5;
}

```

## inflight.$Closure6-1.js
```js
module.exports = function({  }) {
  class $Closure6 {
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
  return $Closure6;
}

```

## inflight.$Closure7-1.js
```js
module.exports = function({  }) {
  class $Closure7 {
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
  return $Closure7;
}

```

## inflight.$Closure8-1.js
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

## inflight.$Closure9-1.js
```js
module.exports = function({  }) {
  class $Closure9 {
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
      "value": "[[\"root/Default/Default/test:length\",\"${aws_lambda_function.testlength_Handler_BFD8933F.arn}\"],[\"root/Default/Default/test:at()\",\"${aws_lambda_function.testat_Handler_E4F013BC.arn}\"],[\"root/Default/Default/test:pushAndPop()\",\"${aws_lambda_function.testpushAndPop_Handler_EAC0C8FF.arn}\"],[\"root/Default/Default/test:popAt()\",\"${aws_lambda_function.testpopAt_Handler_A6739840.arn}\"],[\"root/Default/Default/test:concatMutArray()\",\"${aws_lambda_function.testconcatMutArray_Handler_40D88E89.arn}\"],[\"root/Default/Default/test:concatArray()\",\"${aws_lambda_function.testconcatArray_Handler_F66848AE.arn}\"],[\"root/Default/Default/test:contains()\",\"${aws_lambda_function.testcontains_Handler_F60865D9.arn}\"],[\"root/Default/Default/test:indexOf()\",\"${aws_lambda_function.testindexOf_Handler_BD91EA6F.arn}\"],[\"root/Default/Default/test:indexOfArray()\",\"${aws_lambda_function.testindexOfArray_Handler_DB3A81F5.arn}\"],[\"root/Default/Default/test:join()\",\"${aws_lambda_function.testjoin_Handler_6AC62A8E.arn}\"],[\"root/Default/Default/test:joinWithDefaultSeparator()\",\"${aws_lambda_function.testjoinWithDefaultSeparator_Handler_7AE1258D.arn}\"],[\"root/Default/Default/test:copy()\",\"${aws_lambda_function.testcopy_Handler_27A14A0E.arn}\"],[\"root/Default/Default/test:copyMut()\",\"${aws_lambda_function.testcopyMut_Handler_851E24B4.arn}\"],[\"root/Default/Default/test:lastIndexOf()\",\"${aws_lambda_function.testlastIndexOf_Handler_FFB2061F.arn}\"],[\"root/Default/Default/test:set()\",\"${aws_lambda_function.testset_Handler_ADDF1A01.arn}\"],[\"root/Default/Default/test:insert()\",\"${aws_lambda_function.testinsert_Handler_20BB87F8.arn}\"],[\"root/Default/Default/test:removeFirst()\",\"${aws_lambda_function.testremoveFirst_Handler_4D1D9086.arn}\"]]"
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
      "testinsert_Handler_IamRole_8D4BB8D7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:insert()/Handler/IamRole",
            "uniqueId": "testinsert_Handler_IamRole_8D4BB8D7"
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
      "testpopAt_Handler_IamRole_D00C1FE4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:popAt()/Handler/IamRole",
            "uniqueId": "testpopAt_Handler_IamRole_D00C1FE4"
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
      },
      "testremoveFirst_Handler_IamRole_A9164B23": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:removeFirst()/Handler/IamRole",
            "uniqueId": "testremoveFirst_Handler_IamRole_A9164B23"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testset_Handler_IamRole_B9B79227": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set()/Handler/IamRole",
            "uniqueId": "testset_Handler_IamRole_B9B79227"
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
      "testinsert_Handler_IamRolePolicy_2FD3AAA8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:insert()/Handler/IamRolePolicy",
            "uniqueId": "testinsert_Handler_IamRolePolicy_2FD3AAA8"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinsert_Handler_IamRole_8D4BB8D7.name}"
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
      "testpopAt_Handler_IamRolePolicy_9E762AA5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:popAt()/Handler/IamRolePolicy",
            "uniqueId": "testpopAt_Handler_IamRolePolicy_9E762AA5"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testpopAt_Handler_IamRole_D00C1FE4.name}"
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
      },
      "testremoveFirst_Handler_IamRolePolicy_878A7F57": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:removeFirst()/Handler/IamRolePolicy",
            "uniqueId": "testremoveFirst_Handler_IamRolePolicy_878A7F57"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testremoveFirst_Handler_IamRole_A9164B23.name}"
      },
      "testset_Handler_IamRolePolicy_ADE48415": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set()/Handler/IamRolePolicy",
            "uniqueId": "testset_Handler_IamRolePolicy_ADE48415"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testset_Handler_IamRole_B9B79227.name}"
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
      "testinsert_Handler_IamRolePolicyAttachment_D83DEDF1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:insert()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinsert_Handler_IamRolePolicyAttachment_D83DEDF1"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinsert_Handler_IamRole_8D4BB8D7.name}"
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
      "testpopAt_Handler_IamRolePolicyAttachment_11532865": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:popAt()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testpopAt_Handler_IamRolePolicyAttachment_11532865"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testpopAt_Handler_IamRole_D00C1FE4.name}"
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
      },
      "testremoveFirst_Handler_IamRolePolicyAttachment_511FE450": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:removeFirst()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testremoveFirst_Handler_IamRolePolicyAttachment_511FE450"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testremoveFirst_Handler_IamRole_A9164B23.name}"
      },
      "testset_Handler_IamRolePolicyAttachment_58805670": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testset_Handler_IamRolePolicyAttachment_58805670"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testset_Handler_IamRole_B9B79227.name}"
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
        "architectures": [
          "arm64"
        ],
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
        "architectures": [
          "arm64"
        ],
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
        "architectures": [
          "arm64"
        ],
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
        "architectures": [
          "arm64"
        ],
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
        "architectures": [
          "arm64"
        ],
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
        "architectures": [
          "arm64"
        ],
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
        "architectures": [
          "arm64"
        ],
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
        "architectures": [
          "arm64"
        ],
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
      "testinsert_Handler_20BB87F8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:insert()/Handler/Default",
            "uniqueId": "testinsert_Handler_20BB87F8"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8bd9541",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8bd9541",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinsert_Handler_IamRole_8D4BB8D7.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinsert_Handler_S3Object_B3145049.key}",
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
        "architectures": [
          "arm64"
        ],
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
        "architectures": [
          "arm64"
        ],
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
        "architectures": [
          "arm64"
        ],
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
        "architectures": [
          "arm64"
        ],
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
      "testpopAt_Handler_A6739840": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:popAt()/Handler/Default",
            "uniqueId": "testpopAt_Handler_A6739840"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c817e47d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c817e47d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testpopAt_Handler_IamRole_D00C1FE4.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testpopAt_Handler_S3Object_0EEB898A.key}",
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
        "architectures": [
          "arm64"
        ],
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
      },
      "testremoveFirst_Handler_4D1D9086": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:removeFirst()/Handler/Default",
            "uniqueId": "testremoveFirst_Handler_4D1D9086"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8d404f0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8d404f0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testremoveFirst_Handler_IamRole_A9164B23.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testremoveFirst_Handler_S3Object_9034C8E7.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testset_Handler_ADDF1A01": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set()/Handler/Default",
            "uniqueId": "testset_Handler_ADDF1A01"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8240bc7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8240bc7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testset_Handler_IamRole_B9B79227.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testset_Handler_S3Object_A8FBF518.key}",
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
      "testinsert_Handler_S3Object_B3145049": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:insert()/Handler/S3Object",
            "uniqueId": "testinsert_Handler_S3Object_B3145049"
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
      "testpopAt_Handler_S3Object_0EEB898A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:popAt()/Handler/S3Object",
            "uniqueId": "testpopAt_Handler_S3Object_0EEB898A"
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
      },
      "testremoveFirst_Handler_S3Object_9034C8E7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:removeFirst()/Handler/S3Object",
            "uniqueId": "testremoveFirst_Handler_S3Object_9034C8E7"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testset_Handler_S3Object_A8FBF518": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set()/Handler/S3Object",
            "uniqueId": "testset_Handler_S3Object_A8FBF518"
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
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
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
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
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
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
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
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-1.js")({
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
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure4-1.js")({
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
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure5 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure5-1.js")({
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
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure6 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure6-1.js")({
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
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure7 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure7-1.js")({
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
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure8 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure8-1.js")({
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
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure9 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure9-1.js")({
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
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure10 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure10-1.js")({
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
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure11 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure11-1.js")({
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
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure12 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure12-1.js")({
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
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure13 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure13-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure13Client = ${$Closure13._toInflightType(this)};
            const client = new $Closure13Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure14 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure14-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure14Client = ${$Closure14._toInflightType(this)};
            const client = new $Closure14Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure15 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure15-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure15Client = ${$Closure15._toInflightType(this)};
            const client = new $Closure15Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure16 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure16-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure16Client = ${$Closure16._toInflightType(this)};
            const client = new $Closure16Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure17 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure17-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure17Client = ${$Closure17._toInflightType(this)};
            const client = new $Closure17Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
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
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:popAt()",new $Closure4(this,"$Closure4"));
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
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:concatMutArray()",new $Closure5(this,"$Closure5"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:concatArray()",new $Closure6(this,"$Closure6"));
    const e = ["hello", "wing"];
    {((cond) => {if (!cond) throw new Error("assertion failed: e.contains(\"wing\")")})(e.includes("wing"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !e.contains(\"NotThere\")")})((!e.includes("NotThere")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: buckets.contains(buckets.at(0))")})(buckets.includes((buckets.at(0))))};
    const dummyBucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    {((cond) => {if (!cond) throw new Error("assertion failed: !buckets.contains(dummyBucket)")})((!buckets.includes(dummyBucket)))};
    const h = ["hello", "wing"];
    {((cond) => {if (!cond) throw new Error("assertion failed: h.contains(\"wing\")")})(h.includes("wing"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !h.contains(\"NotThere\")")})((!h.includes("NotThere")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:contains()",new $Closure7(this,"$Closure7"));
    const g = ["hello", "wing"];
    {((cond) => {if (!cond) throw new Error("assertion failed: g.indexOf(\"wing\") == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(g.indexOf("wing"),1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: g.indexOf(\"notThere\") == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(g.indexOf("notThere"),(-1))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: buckets.indexOf(bucket) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(buckets.indexOf(bucket),0)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: buckets.indexOf(dummyBucket) == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(buckets.indexOf(dummyBucket),(-1))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:indexOf()",new $Closure8(this,"$Closure8"));
    const q = ["hello", "wing"];
    {((cond) => {if (!cond) throw new Error("assertion failed: q.indexOf(\"wing\") == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(q.indexOf("wing"),1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: q.indexOf(\"notThere\") == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(q.indexOf("notThere"),(-1))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:indexOfArray()",new $Closure9(this,"$Closure9"));
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
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:join()",new $Closure10(this,"$Closure10"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:joinWithDefaultSeparator()",new $Closure11(this,"$Closure11"));
    const o = ["hello", "wing"];
    const p = [...(o)];
    {((cond) => {if (!cond) throw new Error("assertion failed: o.length == p.length")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(o.length,p.length)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: o.at(0) == p.at(0)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((o.at(0)),(p.at(0)))))};
    const copiedBuckets = [...(buckets)];
    {((cond) => {if (!cond) throw new Error("assertion failed: copiedBuckets.length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(copiedBuckets.length,1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: copiedBuckets.at(0).node.id == \"myBucket\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((copiedBuckets.at(0)).node.id,"myBucket")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:copy()",new $Closure12(this,"$Closure12"));
    const v = ["hello", "wing"];
    const r = [...(v)];
    {((cond) => {if (!cond) throw new Error("assertion failed: q.length == r.length")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(q.length,r.length)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: q.at(0) == r.at(0)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((q.at(0)),(r.at(0)))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:copyMut()",new $Closure13(this,"$Closure13"));
    const lastStr = "wing";
    const s = ["hello", lastStr, lastStr];
    {((cond) => {if (!cond) throw new Error("assertion failed: s.lastIndexOf(lastStr) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s.lastIndexOf(lastStr),2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s.lastIndexOf(\"something\") == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s.lastIndexOf("something"),(-1))))};
    const multipleBuckets = [bucket, bucket, anotherBucket];
    {((cond) => {if (!cond) throw new Error("assertion failed: multipleBuckets.lastIndexOf(bucket) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(multipleBuckets.lastIndexOf(bucket),1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: multipleBuckets.lastIndexOf(dummyBucket) == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(multipleBuckets.lastIndexOf(dummyBucket),(-1))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:lastIndexOf()",new $Closure14(this,"$Closure14"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:set()",new $Closure15(this,"$Closure15"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:insert()",new $Closure16(this,"$Closure16"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:removeFirst()",new $Closure17(this,"$Closure17"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "array", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

