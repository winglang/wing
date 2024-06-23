---
title: Flow control
id: flow-control
keywords: [Wing example]
---

### For in

```ts playground example
let iterable = ["a", "b", "c", "d", "e", "f", "g", "h"];
for value in iterable {
  if value == "g" {
    // stopping at g
    break;
  }
  if value == "b" {
    // skipping b
    continue;
  }
  log(value);
}
/** 
 * prints
 a
 c
 d
 e
 f
**/
```

### For through a range

```ts playground example
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
```

### If elif else

```ts playground example
let grade = (score: num): str => {
    // Parentheses are optional in conditions.
    // However, curly braces are required in `if/else` statements.
    if 0 < score && score < 55 {
        return "F";
    } elif 55 <= score && score < 65 {
        return "C";
    } elif 65 <= score && score < 75  {
        return "B";
    } elif 75 <= score && score <= 100 {
        return "A";
    } else {
        return "Invalid grade";
    }
};

log("54 is {grade(54)}"); // 54 is F
log("62 is {grade(62)}"); // 62 is C
log("68 is {grade(68)}"); // 68 is B
log("99 is {grade(99)}"); // 99 is A
log("101 is {grade(101)}"); // 101 is Invalid grade
```

### While 

```ts playground example
let var i = 0;
while i < 100 {
  i = i + 1;
  if i == 20 {
    // although the while loop goes to 100, we break it at 20
    break;
  }
  if i % 2 == 0 {
    // continue for even numbers
    continue;
  }
  log("{i}");
}
/** 
 * prints
  1
  3
  5
  7
  9
  11
  13
  15
  17
  19
**/
```

