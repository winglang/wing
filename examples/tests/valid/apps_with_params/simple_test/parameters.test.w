let app = nodeof(this).app;

struct MyParams {
  foo: str?;
  meaningOfLife: num;
}

app.parameters.addSchema(MyParams.schema());

let foo = app.parameters.getValue("foo");

if let foo = foo {
  assert(false); // shouldnt happen
} else {
  assert(true);
}

let meaningOfLife = app.parameters.getValue("meaningOfLife");

assert(meaningOfLife == 42);