resource T1 {}
let t = new T1();

resource T2 {
  static m():num {return 1;}
}
assert(T2.m() == 1);
