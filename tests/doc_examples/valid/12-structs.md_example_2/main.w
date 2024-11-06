// This file was auto generated from an example found in: 12-structs.md_example_2
// Example metadata: {"valid":true}
struct Options {
  // optional
  prefix: str?;
  // required
  delim: str;
}

let join_str = (a: Array<str>, opts: Options):str => {
  let prefix = opts.prefix ?? "";
  return prefix + a.join(opts.delim);
};

// pass options directly
log(join_str(["hello", "world"], delim: ", ")); //  "hello, world"

// also OK to pass an object
let opts = Options { delim: "/" , prefix: "!!" };
log(join_str(["hello", "world"], opts)); // "!!hello/world");
