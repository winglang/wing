// This file was auto generated from an example found in: 04-flow-controls.md_example_2
// Example metadata: {"valid":true}
// print numbers from 0 to 9
for value in 0..10 {
  log("{value}");
}

// prints numbers in reverse order from 10 to 0
for value in 10..-1 {
    log("{value}");
}

// include end
for value in 1..=5 {
    log("{value}");
}
