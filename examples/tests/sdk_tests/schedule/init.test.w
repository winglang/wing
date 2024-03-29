/*\
skip: true
\*/

bring cloud;
bring util;
bring expect;

new cloud.Schedule( rate: 5m ) as "s0";

// doesn't work on sim: https://github.com/winglang/wing/issues/2732
if (util.env("WING_TARGET") != "sim") {
  // Those are testing the many errors in initialization of a cloud.Schedule
  let var error = "";
  try {
      new cloud.Schedule( rate: nil, cron: nil ) as "s1";
  } catch e {
      error = e;
  }
  expect.equal(error, "rate or cron need to be filled.");

  try {
      new cloud.Schedule( rate: 2m, cron: "* * * * *" ) as "s2";
  } catch e {
      error = e;
  }
  expect.equal(error, "rate and cron cannot be configured simultaneously.");


  try {
      new cloud.Schedule( rate: 1s ) as "s3";
  } catch e {
      error = e;
  }
  expect.equal(error, "rate can not be set to less than 1 minute.");

  try {
      new cloud.Schedule( cron: "* * * * * *" ) as "s4";
  } catch e {
      error = e;
  }
  expect.equal(error, "cron string must be in UNIX cron format");

  try {
      new cloud.Schedule( cron: "* * * * ?" ) as "s5";
  } catch e {
      error = e;
  }
  expect.equal(error, "cron string must be in UNIX cron format");
}