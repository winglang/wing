let app = nodeof(this).app;

struct MyParams {
  foo: str;
}

app.parameters.addSchema(MyParams.schema());

// Error: Parameter validation errors:
// - must have required property 'foo'

// (hint: make sure to use --values to provide the required parameters file)
