class Foo {
  extern "./sad.js" static getNum(): num;
//^ "./sad.js" not found
  extern "not-installed" static tooBad(): bool;
}
