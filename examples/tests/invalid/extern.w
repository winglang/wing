class Foo {
  extern "./sad.js" static getNum(): num;
//^ "./sad.js" not found
  extern "not-installed" static tooBad(): bool;
//^ "not-installed" not found
  extern "./util.js" greet(): str;
                   //^ Error: extern methods must be declared static
}
