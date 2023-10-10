class Foo {
  extern "../external_js.js" inflight getGreeting(name: str): str;
                                    //^ Error: extern methods must be declared "static"
}
