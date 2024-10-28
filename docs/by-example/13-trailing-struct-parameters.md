---
title: Trailing struct parameters
id: trailing-structs-parameters
slug: /trailing-structs-parameters
sidebar_label: Trailing struct parameters
description: Passing fields directly to a function
keywords: [Wing language, example]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/13-trailing-struct-parameters.md
---

If the last parameter of a function is a struct, then you can pass its fields directly.

```js playground example title="main.w"
// struct for the function params
struct NameOptions {
  formal: bool;
  caps: bool;
}

let greet = (name: str, options: NameOptions) => {
  let var prefix = "Hi, ";
  if options.formal {
    prefix = "Greetings, ";
  }
  let var message = "{prefix}{name}";
  if options.caps {
      message = message.uppercase();
  }
  log(message);
};

greet("kermit", NameOptions { formal: true, caps: false });

// Pass fields directly as the last param is a Struct
greet("kermit", formal: true, caps: false);    
  
```

```bash title="Wing console output"
# Run locally with wing console
wing it

Greetings, kermit
Greetings, kermit
```