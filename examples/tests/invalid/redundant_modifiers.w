class Foo {
  // Dup access method modifier
  pub pub m1() {}
  //^ Multiple or ambiguous modifiers found

  // Conflicting access method modifier
  pub protected m2() {}
  //^ Multiple or ambiguous modifiers found

  // Dup static method modifier
  static pub static m3() {}
  //^ Multiple or ambiguous modifiers found

  // Dup inflight method modifier
  pub inflight static inflight m4() {}
  //^ Multiple or ambiguous modifiers found

  // Dup extern method modifier
  static extern "x.js" pub extern "y.js" m5();
  //^ Multiple or ambiguous modifiers found

  // Dup access field modifier
  protected protected f1: str;
  //^ Multiple or ambiguous modifiers found

  // Dup inflight field modifier
  protected inflight inflight f2: str;
  //^ Multiple or ambiguous modifiers found

  // Dup static field modifier
  static pub static f3: str;
  //^ Multiple or ambiguous modifiers found

  // Dup reassignable field modifier
  var pub var f4: str;
  //^ Multiple or ambiguous modifiers found
}

// Dup class modifiers
inflight inflight class Foo {}
//^ Multiple or ambiguous modifiers found

pub inflight pub class Foo {}
//^ Multiple or ambiguous modifiers found