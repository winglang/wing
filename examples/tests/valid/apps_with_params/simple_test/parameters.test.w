let app = nodeof(this).app;

struct MyParams {
  foo: str?;
  meaningOfLife: num;
}

app.parameters.addSchema(MyParams.schema());

let myParams = MyParams.fromParameters(app.parameters);

if let foo = myParams.foo {
  assert(false); // shouldnt happen
} else {
  assert(true);
}

let meaningOfLife = myParams.meaningOfLife;

assert(meaningOfLife == 42);