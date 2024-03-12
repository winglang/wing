let app = nodeof(this).app;

let registrar = app.parameterRegistrar;

registrar.addParameterSchema({
  type: "object",
  properties: {
    foo: {
      type: "string"
    },
    meaning_of_life: {
      type: "number"
    }
  }
});

let foo = registrar.getParameterValue("foo");

if let foo = foo {
  assert(false); // shouldnt happen
} else {
  assert(true);
}