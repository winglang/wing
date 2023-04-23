resource Foo {
  extern "./sad.js" static get_num(): num;
//^ "./sad.js" not found
  extern "not-installed" static too_bad(): bool;
//^ "not-installed" not found
  init(){}
}