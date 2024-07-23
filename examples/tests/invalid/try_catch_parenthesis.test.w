try {
  log("Hello World");
} catch (e) {
//      ^^^ Unexpected parentheses in catch block. Use 'catch e' instead of 'catch (e)'.
  log("error");
}

try {
  log("Hello World");
} catch (longError) {
//      ^^^^^^^^^^^ Unexpected parentheses in catch block. Use 'catch longError' instead of 'catch (longError)'.
  log("error");
}


try {
  log("Hello World");
} catch e {
  log("error");
}
// this is ok^

