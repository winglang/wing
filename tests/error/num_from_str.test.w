// Note that this test has to be alone because it needs to compile successfully and fail at preflight.
// If it is run with other tests, subsequent failures will be ignored in snapshot.
let a: num = num.fromStr("123a");
//                                ^ preflight error: unable to parse 123a as a number