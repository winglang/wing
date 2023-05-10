// Note that this test has to be alone because it needs to compile successfully and fail at preflight.
// If it is run with other tests, subsequent failures will be ignored in snapshot.
let j = Json { a: "apples" };

let a: num = num.fromJson(j.get("a"));
//                                ^ preflight error: unable to parse string apples as a number