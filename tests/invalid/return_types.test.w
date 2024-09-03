    return 9;
//  ^^^^^^^^^ Return statement outside of function cannot return a value
if true {
    return 9;
//  ^^^^^^^^^ Return statement outside of function cannot return a value
}

inflight (): void => {
  return 9;
//^^^^^^^^^ Unexpected return value from void function
  if true {
    return 9;
//  ^^^^^^^^^ Unexpected return value from void function
  }
};

class C {
  func() {
    return 9;
//  ^^^^^^^^^ Unexpected return value from void function
  }
}
