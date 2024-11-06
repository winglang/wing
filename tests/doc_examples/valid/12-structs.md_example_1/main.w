// This file was auto generated from an example found in: 12-structs.md_example_1
// Example metadata: {"valid":true}
// Define a simple structure called `Example`
struct Example {
  a: str;    
  b: num;    
  c: bool?;  
}

// Define another structure called `MyData` that includes composition
struct MyData {
  a: str;       
  b: num?;      
  c: Example;   
}

// Creating an instance of `MyData` with some fields initialized
let data = MyData {
  a: "hello",      
  c: {     
    a: "world",    
    b: 42,         
  }
};

log(data.a); // prints hello    
log(data.c.a); //prints world
log(data.c.b); //prints 42
