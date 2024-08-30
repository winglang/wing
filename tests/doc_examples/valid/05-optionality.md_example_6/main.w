// This file was auto generated from an example found in: 05-optionality.md_example_6
// Example metadata: {"valid":true}
let b3: bool? = false; 

if let b3 = b3  { // unboxing b3 and shadowing original b3 
  if b3 {
    log("b3 is true");
  } else {
    log("b3 is false");
  }
} else {
  log("b3 is nil");
}

/**
 * prints:
  b3 is false
**/
