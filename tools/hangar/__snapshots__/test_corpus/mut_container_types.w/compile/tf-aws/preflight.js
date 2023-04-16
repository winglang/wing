const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const bucket1 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"bucket1");
    const bucket2 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"bucket2");
    const bucket3 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"bucket3");
    const arr1 = ["a", "b", "c"];
    const arr2 = [1, 2, 3];
    const arr3 = [bucket1, bucket2];
    const arr4 = arr1;
    (arr1.push("a"));
    (arr2.push(4));
    (arr3.push(bucket3));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((arr2.pop()) === 4)'`)})(((arr2.pop()) === 4))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(arr1.length === 4)'`)})((arr1.length === 4))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((arr4.at(0)) === "a")'`)})(((arr4.at(0)) === "a"))};
    const s1 = new Set([1, 2, 3, 3]);
    const s2 = new Set(["hello", "world", "hello"]);
    const s3 = new Set([bucket1, bucket2, bucket2]);
    (s1.add(5));
    (s2.add("bye"));
    (s3.add(bucket3));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s2.has("bye"))'`)})((s2.has("bye")))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s2.has("hello"))'`)})((s2.has("hello")))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s3.has(bucket2))'`)})((s3.has(bucket2)))};
    const m1 = {"hello":"world"};
    const m2 = {"hello":123};
    const m3 = {"b1":bucket1,"b2":bucket2};
    const m4 = m1;
    const m5 = {"goodbye":"world"};
    const m6 = {"a":m1,"b":m5};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '("hello" in (m1))'`)})(("hello" in (m1)))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.keys(m2).length === 1)'`)})((Object.keys(m2).length === 1))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((m3)["b1"] === bucket1)'`)})(((m3)["b1"] === bucket1))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.keys(m4).length === 1)'`)})((Object.keys(m4).length === 1))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(((m6)["a"])["hello"] === "world")'`)})((((m6)["a"])["hello"] === "world"))};
    ((obj, args) => { obj[args[0]] = args[1]; })(m1, ["hello","goodbye"]);
    ((obj, args) => { obj[args[0]] = args[1]; })(m6, ["a",{"foo":"bar"}]);
    ((map) => { for(const k in map){delete map[k]}; })(m2);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.keys(m2).length === 0)'`)})((Object.keys(m2).length === 0))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((m1)["hello"] === "goodbye")'`)})(((m1)["hello"] === "goodbye"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(((m6)["a"])["foo"] === "bar")'`)})((((m6)["a"])["foo"] === "bar"))};
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "mut_container_types", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
