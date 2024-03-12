let app = nodeof(this).app;

struct MyParams {
  foo: str?;
}

let registrar = app.parameters;

registrar.addSchema(MyParams.schema());

let foo = registrar.getValue("foo");

if let foo = foo {
  assert(false); // shouldnt happen
} else {
  assert(true);
}