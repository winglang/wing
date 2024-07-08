---
title: Variable declaration
id: variable-declaration
keywords: [Wing example]
---

### Assignment

```ts example{valid: false}
let x = 12;
x = 77; // error: Variable is not reassignable
```

```ts example
let var y = "hello";
y = "world"; // OK (y is reassignable)
```

### Inferred typing
```ts playground example
let x1 = 12; 
let x2: num = 12; // equivalent 
```

### Optionals
```ts playground example{valid: false}
let var x1 = "Hello"; // type str, value "Hello"
let var x2: str = "Hello"; // same as above 
let var x3: str? = "Hello"; // type str? (optional), value "Hello"
let var x4: str? = nil; // type str? (optional), value nil

x1 = nil; // ERROR: Expected type to be "str", but got "nil" instead
x3 = nil; // OK (x3 is optional)
```
### Scopes
```ts example
let s = "parent";
log(s); // prints parent
if true {
  let s = "inner";
  log(s); // prints inner
}
log(s); // prints parent
```
