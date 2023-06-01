/*\
skip: true
\*/
// doesn't work on sim: #2732

bring cloud;

let var error = "";
try {
    new cloud.Schedule( rate: nil, cron: nil ) as "s1";
} catch e {
    error = e;
}
assert(error == "rate or cron need to be filled.");

try {
    new cloud.Schedule( rate: 2m, cron: "* * * * *" ) as "s2";
} catch e {
    error = e;
}
assert(error == "rate and cron cannot be configured simultaneously.");


try {
    new cloud.Schedule( rate: 1s ) as "s3";
} catch e {
    error = e;
}
assert(error == "rate can not be set to less than 1 minute.");

try {
    new cloud.Schedule( cron: "* * * * * *" ) as "s4";
} catch e {
    error = e;
}
assert(error ==  "cron string must be UNIX cron format [minute] [hour] [day of month] [month] [day of week]");


try {
    new cloud.Schedule( cron: "* * * * *" ) as "s5";
} catch e {
    error = e;
}
assert(error == "cannot use * in both the Day-of-month and Day-of-week fields. If you use it in one, you must use ? in the other");

