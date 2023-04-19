const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const words = Object.freeze(["wing", "lang", "dang"]);
    const unique_numbers = Object.freeze(new Set([1, 2, 3]));
    for (const word of words) {
      for (const number of unique_numbers) {
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(number > 0)'`)})((number > 0))};
        {console.log(`${word}: ${number}`)};
      }
    }
    let i = 0;
    for (const word of words) {
      i = (i + 1);
      let pre_break_hits = 0;
      let post_break_hits = 0;
      for (const number of unique_numbers) {
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(number > 0)'`)})((number > 0))};
        {console.log(`${word}: ${number}`)};
        pre_break_hits = (pre_break_hits + 1);
        if ((number === 2)) {
          break;
        }
        post_break_hits = (post_break_hits + 1);
      }
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(pre_break_hits === 2)'`)})((pre_break_hits === 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(post_break_hits === 1)'`)})((post_break_hits === 1))};
    }
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(i === 3)'`)})((i === 3))};
    let j = 0;
    for (const word of words) {
      j = (j + 1);
      let pre_continue_hits = 0;
      let post_continue_hits = 0;
      for (const number of unique_numbers) {
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(number > 0)'`)})((number > 0))};
        {console.log(`${word}: ${number}`)};
        pre_continue_hits = (pre_continue_hits + 1);
        if ((number > 0)) {
          continue;
        }
        post_continue_hits = (post_continue_hits + 1);
      }
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(pre_continue_hits === 3)'`)})((pre_continue_hits === 3))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(post_continue_hits === 0)'`)})((post_continue_hits === 0))};
    }
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(j === 3)'`)})((j === 3))};
    {console.log("---\nfor x in 0..0 { ... }")};
    for (const x of $stdlib.std.Range.of(0, 0, false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
    }
    {console.log("there's no value to iterate")};
    {console.log("---\nfor x in 0..=0 { ... }")};
    for (const x of $stdlib.std.Range.of(0, 0, true)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x === 0)'`)})((x === 0))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 0..2 { ... }")};
    for (const x of $stdlib.std.Range.of(0, 2, false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= 0)'`)})((x >= 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x < 2)'`)})((x < 2))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 0..=2 { ... }")};
    for (const x of $stdlib.std.Range.of(0, 2, true)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= 0)'`)})((x >= 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 2)'`)})((x <= 2))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 2..0 { ... }")};
    for (const x of $stdlib.std.Range.of(2, 0, false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 2)'`)})((x <= 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x > 0)'`)})((x > 0))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 2..=0 { ... }")};
    for (const x of $stdlib.std.Range.of(2, 0, true)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 2)'`)})((x <= 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= 0)'`)})((x >= 0))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 0..-2 { ... }")};
    for (const x of $stdlib.std.Range.of(0, (-2), false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 0)'`)})((x <= 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x > (-2))'`)})((x > (-2)))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 0..=-2 { ... }")};
    for (const x of $stdlib.std.Range.of(0, (-2), true)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 0)'`)})((x <= 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x > (-3))'`)})((x > (-3)))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in -2..0 { ... }")};
    for (const x of $stdlib.std.Range.of((-2), 0, false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= (-2))'`)})((x >= (-2)))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x < 0)'`)})((x < 0))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in -2..=0 { ... }")};
    for (const x of $stdlib.std.Range.of((-2), 0, true)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= (-2))'`)})((x >= (-2)))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 0)'`)})((x <= 0))};
      {console.log(`${x}`)};
    }
    const z = 2;
    {console.log("---\nfor x in 0..z { ... } <=> x = 2")};
    for (const x of $stdlib.std.Range.of(0, z, false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= 0)'`)})((x >= 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x < 2)'`)})((x < 2))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 0..=z { ... } <=> x = 2")};
    for (const x of $stdlib.std.Range.of(0, z, true)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= 0)'`)})((x >= 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 2)'`)})((x <= 2))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in z..0 { ... } <=> x = 2")};
    for (const x of $stdlib.std.Range.of(z, 0, false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 2)'`)})((x <= 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x > 0)'`)})((x > 0))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 0..(z*2) { ... } <=> x = 2")};
    for (const x of $stdlib.std.Range.of(0, (z * 2), false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= 0)'`)})((x >= 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x < 4)'`)})((x < 4))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 0..=(z*2) { ... } <=> x = 2")};
    for (const x of $stdlib.std.Range.of(0, (z * 2), true)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= 0)'`)})((x >= 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 4)'`)})((x <= 4))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in (z*2)..0 { ... } <=> x = 2")};
    for (const x of $stdlib.std.Range.of((z * 2), 0, false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 4)'`)})((x <= 4))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x > 0)'`)})((x > 0))};
      {console.log(`${x}`)};
    }
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"cloud.Function",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "for_loop", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
