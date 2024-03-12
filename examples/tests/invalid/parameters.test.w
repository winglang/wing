let app = nodeof(this).app;

let registrar = app.parameterRegistrar;

registrar.addParameterSchema({
  type: "object",
  properties: {
    foo: {
      type: "string"
    }
  },
  required: ["foo"]
});

// Error: Parameter validation errors:
// - must have required property 'foo'

// (hint: make sure to use --values to provide the required parameters file)
