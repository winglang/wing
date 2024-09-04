struct MyParams {
  foo: str?;
  meaningOfLife: num;
}

let myParams = MyParams.fromJson(@app.parameters.read(schema: MyParams.schema()));

if let foo = myParams.foo {
  assert(false); // shouldnt happen
} else {
  assert(true);
}

let meaningOfLife = myParams.meaningOfLife;

assert(meaningOfLife == 42);
