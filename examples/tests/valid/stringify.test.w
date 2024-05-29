enum MyEnum { A, B, C }

// If a value's type is stringable, it can be passed directly to the "log" function
log("my string");
log(42);
log(true);
log(Json { "cool": "beans" });
log(MyEnum.A);
