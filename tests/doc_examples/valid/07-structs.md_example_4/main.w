// This file was auto generated from an example found in: 07-structs.md_example_4
// Example metadata: {"valid":true}
struct Options {
  prefix: str?;
  delim: str;
}

let join_str = (a: Array<str>, opts: Options):str => {
  let prefix = opts.prefix ?? "";
  return prefix + a.join(opts.delim);
};

log(join_str(["hello", "world"], delim: ", ")); //  "!hello.world"

// also OK to pass an object
let opts = Options { delim: "," };
log(join_str(["hello", "world"], opts)); // "!!hello/world");
