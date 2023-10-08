/*\
skip: true
\*/
// doesn't work on sim: #2732

bring cloud;
bring "./../../valid/assertions.w" as assertions;

// Those are testing the many errors in intalization of a cloud.Schedule
assertions.PreflightAssert.throws("rate or cron need to be filled.", () => {
    new cloud.Schedule( rate: nil, cron: nil ) as "s1";
});

assertions.PreflightAssert.throws("rate and cron cannot be configured simultaneously.", () => {
    new cloud.Schedule( rate: 2m, cron: "* * * * *" ) as "s2";
});

assertions.PreflightAssert.throws("rate can not be set to less than 1 minute.", () => {
    new cloud.Schedule( rate: 1s ) as "s3";
});

assertions.PreflightAssert.throws("cron string must be UNIX cron format [minute] [hour] [day of month] [month] [day of week]", () => {
    new cloud.Schedule( cron: "* * * * * *" ) as "s4";
});

assertions.PreflightAssert.throws("cannot use * in both the Day-of-month and Day-of-week fields. If you use it in one, you must use ? in the other", () => {
    new cloud.Schedule( cron: "* * * * *" ) as "s5";
});
