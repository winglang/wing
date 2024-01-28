class Foo1 {
  extern "../../valid/external_js.js" static getGreeting(name: str): str;
       //^ must be a sub directory of the entrypoint
}
