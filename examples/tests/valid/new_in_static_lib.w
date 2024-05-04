pub class Foo {}

pub class LibClass {
  pub static createFoo(id: str): Foo {
    return new Foo() as id;
  }
}