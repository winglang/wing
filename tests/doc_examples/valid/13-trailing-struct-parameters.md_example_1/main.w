// This file was auto generated from an example found in: 13-trailing-struct-parameters.md_example_1
// Example metadata: {"valid":true}
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
  
