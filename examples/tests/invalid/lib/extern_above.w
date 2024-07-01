class Foo1 {
  extern "../../valid/external_ts.ts" static getGreeting(name: str): str;
       //^ must be a sub directory of the entrypoint
}
