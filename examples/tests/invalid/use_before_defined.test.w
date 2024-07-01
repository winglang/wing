log("{y}"); // Access y before it's defined
let y = "ho";

if true {
  log("{x}");
//       ^ Symbol "x" used before being defined
}
let x = "hi";