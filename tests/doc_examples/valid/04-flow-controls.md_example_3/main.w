// This file was auto generated from an example found in: 04-flow-controls.md_example_3
// Example metadata: {"valid":true}
let grade = (score: num): str => {
    // Parentheses are optional in conditions.
    // However, curly braces are required in `if/else` statements.
    if 0 < score && score < 55 {
        return "F";
    } else if 55 <= score && score < 65 {
        return "C";
    } else if 65 <= score && score < 75  {
        return "B";
    } else if 75 <= score && score <= 100 {
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
