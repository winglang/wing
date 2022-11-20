print("${y}"); // Access y before it's defined
let y = "ho";

if true {
  print("${x}"); // Access x before it's defined (even though it's defined in an outer scope)
}
let x = "hi";