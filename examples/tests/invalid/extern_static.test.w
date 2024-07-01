class Foo {
  extern "../valid/external_ts.ts" inflight getGreeting(name: str): str;
                                    //^ Error: extern methods must be declared "static"
}
