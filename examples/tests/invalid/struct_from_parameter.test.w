struct MyParams {
  foo: str;
  bar: bool;
  baz: num;
}


let app = nodeof(this).app;

// Never added the schema to the parameters, so
// technically we never enforced the parameters must have been
// provided

MyParams.fromParameters(app.parameters);
//Error: unable to parse MyParams:
// - instance requires property "bar"
// - instance requires property "baz"
// - instance requires property "foo"