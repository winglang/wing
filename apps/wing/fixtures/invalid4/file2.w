bring "./file1.w" as file1;

pub class B {
  a: file1.A;
  init() {
    this.a = new file1.A();
  }
}
