// Note that this test has to be alone because it needs to compile successfully and fail at preflight.
// If it is run with other tests, subsequent failures will be ignored in snapshot.
let j = Json { a: 123 };

let a: bool = bool.fromJson(j.get("a"));
//                                  ^ preflight error: unable to parse number 123 as a boolean