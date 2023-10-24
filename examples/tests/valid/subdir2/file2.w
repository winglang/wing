bring util;

pub class Bar {
  pub bar(): str {
    util.nanoid();
    return "bar";
  }
}

// this file's sibling, file1.w, also has a class "Foo"
// but this is okay since it's private
class Foo {}
