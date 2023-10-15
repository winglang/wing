# [duration.test.w](../../../../../../examples/tests/sdk_tests/std/duration.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $std_Duration }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: 12ms.seconds == 12 / 1000")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(0.012)).seconds,(12 / 1000))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 12s.seconds == 12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(12)).seconds,12)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 12m.seconds == 12 * 60")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(720)).seconds,(12 * 60))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 12h.seconds == 12 * 60 * 60")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(43200)).seconds,((12 * 60) * 60))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 12d.seconds == 12 * 60 * 60 * 24")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(1036800)).seconds,(((12 * 60) * 60) * 24))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 12mo.seconds == (12 * 60 * 60 * 24 * 365) / 12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(31536000)).seconds,(((((12 * 60) * 60) * 24) * 365) / 12))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 12y.seconds == 12 * 60 * 60 * 24 * 365")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(378432000)).seconds,((((12 * 60) * 60) * 24) * 365))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMilliseconds(10).seconds == 10ms.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMilliseconds(10)).seconds,(await $std_Duration.fromSeconds(0.01)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMinutes(10).seconds == 10m.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMinutes(10)).seconds,(await $std_Duration.fromSeconds(600)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromSeconds(10).seconds == 10s.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(10)).seconds,(await $std_Duration.fromSeconds(10)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromHours(10).seconds == 10h.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromHours(10)).seconds,(await $std_Duration.fromSeconds(36000)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromDays(10).seconds == 10d.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromDays(10)).seconds,(await $std_Duration.fromSeconds(864000)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMonths(10).seconds == 10mo.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMonths(10)).seconds,(await $std_Duration.fromSeconds(26280000)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromYears(10).seconds == 10y.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromYears(10)).seconds,(await $std_Duration.fromSeconds(315360000)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 1s.milliseconds == 1000")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(1)).milliseconds,1000)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 1s.minutes == 1 / 60")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(1)).minutes,(1 / 60))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 1s.hours == 1 / (60 * 60)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(1)).hours,(1 / (60 * 60)))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 1s.days == 1 / (60 * 60 * 24)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(1)).days,(1 / ((60 * 60) * 24)))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 1s.months == 1 / ((60 * 60 * 24 * 365) / 12)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(1)).months,(1 / ((((60 * 60) * 24) * 365) / 12)))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 1s.years == 1 / (60 * 60 * 24 * 365)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(1)).years,(1 / (((60 * 60) * 24) * 365)))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 1s == 1000ms")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(1)),(await $std_Duration.fromSeconds(1)))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 60s == 1m")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(60)),(await $std_Duration.fromSeconds(60)))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 60m == 1h")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(3600)),(await $std_Duration.fromSeconds(3600)))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 24h == 1d")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(86400)),(await $std_Duration.fromSeconds(86400)))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 365d == 1y")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(31536000)),(await $std_Duration.fromSeconds(31536000)))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 12mo == 1y")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(31536000)),(await $std_Duration.fromSeconds(31536000)))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 3600s == 1h")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(3600)),(await $std_Duration.fromSeconds(3600)))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 86400s == 1d")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(86400)),(await $std_Duration.fromSeconds(86400)))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 31536000s == 1y")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(31536000)),(await $std_Duration.fromSeconds(31536000)))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMilliseconds(1000).seconds == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMilliseconds(1000)).seconds,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMilliseconds(1000).minutes == 1s.minutes")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMilliseconds(1000)).minutes,(await $std_Duration.fromSeconds(1)).minutes)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMilliseconds(1000).hours == 1s.hours")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMilliseconds(1000)).hours,(await $std_Duration.fromSeconds(1)).hours)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMilliseconds(1000).days == 1s.days")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMilliseconds(1000)).days,(await $std_Duration.fromSeconds(1)).days)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMilliseconds(1000).months == 1s.months")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMilliseconds(1000)).months,(await $std_Duration.fromSeconds(1)).months)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMilliseconds(1000).years == 1s.years")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMilliseconds(1000)).years,(await $std_Duration.fromSeconds(1)).years)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromSeconds(60).milliseconds == 60s.milliseconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(60)).milliseconds,(await $std_Duration.fromSeconds(60)).milliseconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromSeconds(60).minutes == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(60)).minutes,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromSeconds(60).hours == 1m.hours")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(60)).hours,(await $std_Duration.fromSeconds(60)).hours)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromSeconds(60).days == 1m.days")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(60)).days,(await $std_Duration.fromSeconds(60)).days)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromSeconds(60).months == 1m.months")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(60)).months,(await $std_Duration.fromSeconds(60)).months)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromSeconds(60).years == 1m.years")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(60)).years,(await $std_Duration.fromSeconds(60)).years)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMinutes(60).milliseconds == 60m.milliseconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMinutes(60)).milliseconds,(await $std_Duration.fromSeconds(3600)).milliseconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMinutes(60).seconds == 60m.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMinutes(60)).seconds,(await $std_Duration.fromSeconds(3600)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMinutes(60).hours == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMinutes(60)).hours,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMinutes(60).days == 1h.days")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMinutes(60)).days,(await $std_Duration.fromSeconds(3600)).days)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMinutes(60).months == 1h.months")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMinutes(60)).months,(await $std_Duration.fromSeconds(3600)).months)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMinutes(60).years == 1h.years")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMinutes(60)).years,(await $std_Duration.fromSeconds(3600)).years)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromHours(24).milliseconds == 24h.milliseconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromHours(24)).milliseconds,(await $std_Duration.fromSeconds(86400)).milliseconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromHours(24).seconds == 24h.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromHours(24)).seconds,(await $std_Duration.fromSeconds(86400)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromHours(24).minutes == 24h.minutes")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromHours(24)).minutes,(await $std_Duration.fromSeconds(86400)).minutes)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromHours(24).days == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromHours(24)).days,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromHours(24).months == 1d.months")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromHours(24)).months,(await $std_Duration.fromSeconds(86400)).months)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromHours(24).years == 1d.years")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromHours(24)).years,(await $std_Duration.fromSeconds(86400)).years)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromDays(365).milliseconds == 365d.milliseconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromDays(365)).milliseconds,(await $std_Duration.fromSeconds(31536000)).milliseconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromDays(365).seconds == 365d.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromDays(365)).seconds,(await $std_Duration.fromSeconds(31536000)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromDays(365).minutes == 365d.minutes")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromDays(365)).minutes,(await $std_Duration.fromSeconds(31536000)).minutes)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromDays(365).hours == 365d.hours")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromDays(365)).hours,(await $std_Duration.fromSeconds(31536000)).hours)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromDays(365).months == 12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromDays(365)).months,12)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromDays(365).years == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromDays(365)).years,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMonths(12).milliseconds == 12mo.milliseconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMonths(12)).milliseconds,(await $std_Duration.fromSeconds(31536000)).milliseconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMonths(12).seconds == 12mo.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMonths(12)).seconds,(await $std_Duration.fromSeconds(31536000)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMonths(12).minutes == 12mo.minutes")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMonths(12)).minutes,(await $std_Duration.fromSeconds(31536000)).minutes)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMonths(12).hours == 12mo.hours")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMonths(12)).hours,(await $std_Duration.fromSeconds(31536000)).hours)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMonths(12).days == 12mo.days")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMonths(12)).days,(await $std_Duration.fromSeconds(31536000)).days)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMonths(12).years == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMonths(12)).years,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromYears(1).milliseconds == 1y.milliseconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromYears(1)).milliseconds,(await $std_Duration.fromSeconds(31536000)).milliseconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromYears(1).seconds == 1y.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromYears(1)).seconds,(await $std_Duration.fromSeconds(31536000)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromYears(1).minutes == 1y.minutes")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromYears(1)).minutes,(await $std_Duration.fromSeconds(31536000)).minutes)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromYears(1).hours == 1y.hours")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromYears(1)).hours,(await $std_Duration.fromSeconds(31536000)).hours)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromYears(1).days == 1y.days")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromYears(1)).days,(await $std_Duration.fromSeconds(31536000)).days)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromYears(1).months == 1y.months")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromYears(1)).months,(await $std_Duration.fromSeconds(31536000)).months)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: -12ms.seconds == -12 / 1000")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((-(await $std_Duration.fromSeconds(0.012)).seconds),((-12) / 1000))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: -12s.seconds == -12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((-(await $std_Duration.fromSeconds(12)).seconds),(-12))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: -12m.seconds == -12 * 60")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((-(await $std_Duration.fromSeconds(720)).seconds),((-12) * 60))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: -12h.seconds == -12 * 60 * 60")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((-(await $std_Duration.fromSeconds(43200)).seconds),(((-12) * 60) * 60))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: -12d.seconds == -12 * 60 * 60 * 24")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((-(await $std_Duration.fromSeconds(1036800)).seconds),((((-12) * 60) * 60) * 24))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: -12mo.seconds == (-12 * 60 * 60 * 24 * 365) / 12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((-(await $std_Duration.fromSeconds(31536000)).seconds),((((((-12) * 60) * 60) * 24) * 365) / 12))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: -12y.seconds == -12 * 60 * 60 * 24 * 365")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((-(await $std_Duration.fromSeconds(378432000)).seconds),(((((-12) * 60) * 60) * 24) * 365))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMilliseconds(-10).seconds == -10ms.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMilliseconds((-10))).seconds,(-(await $std_Duration.fromSeconds(0.01)).seconds))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMinutes(-10).seconds == -10m.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMinutes((-10))).seconds,(-(await $std_Duration.fromSeconds(600)).seconds))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromSeconds(-10).seconds == -10s.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds((-10))).seconds,(-(await $std_Duration.fromSeconds(10)).seconds))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromHours(-10).seconds == -10h.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromHours((-10))).seconds,(-(await $std_Duration.fromSeconds(36000)).seconds))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromDays(-10).seconds == -10d.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromDays((-10))).seconds,(-(await $std_Duration.fromSeconds(864000)).seconds))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMonths(-10).seconds == -10mo.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMonths((-10))).seconds,(-(await $std_Duration.fromSeconds(26280000)).seconds))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromYears(-10).seconds == -10y.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromYears((-10))).seconds,(-(await $std_Duration.fromSeconds(315360000)).seconds))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 0ms.seconds == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(0)).seconds,0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 0s.seconds == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(0)).seconds,0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 0m.seconds == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(0)).seconds,0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 0h.seconds == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(0)).seconds,0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 0d.seconds == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(0)).seconds,0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 0mo.seconds == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(0)).seconds,0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 0y.seconds == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(0)).seconds,0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMilliseconds(0).seconds == 0ms.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMilliseconds(0)).seconds,(await $std_Duration.fromSeconds(0)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMinutes(0).seconds == 0m.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMinutes(0)).seconds,(await $std_Duration.fromSeconds(0)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromSeconds(0).seconds == 0s.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(0)).seconds,(await $std_Duration.fromSeconds(0)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromHours(0).seconds == 0h.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromHours(0)).seconds,(await $std_Duration.fromSeconds(0)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromDays(0).seconds == 0d.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromDays(0)).seconds,(await $std_Duration.fromSeconds(0)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMonths(0).seconds == 0mo.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMonths(0)).seconds,(await $std_Duration.fromSeconds(0)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromYears(0).seconds == 0y.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromYears(0)).seconds,(await $std_Duration.fromSeconds(0)).seconds)))};
    }
  }
  return $Closure1;
}

```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.17.0"
    },
    "outputs": {
      "root": {
        "Default": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  }
}
```

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $std_Duration: ${context._lift($stdlib.core.toLiftableModuleType(std.Duration, "@winglang/sdk/std", "Duration"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this)};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: 12ms.seconds == 12 / 1000")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(0.012)).seconds,(12 / 1000))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 12s.seconds == 12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(12)).seconds,12)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 12m.seconds == 12 * 60")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(720)).seconds,(12 * 60))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 12h.seconds == 12 * 60 * 60")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(43200)).seconds,((12 * 60) * 60))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 12d.seconds == 12 * 60 * 60 * 24")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(1036800)).seconds,(((12 * 60) * 60) * 24))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 12mo.seconds == (12 * 60 * 60 * 24 * 365) / 12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(31536000)).seconds,(((((12 * 60) * 60) * 24) * 365) / 12))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 12y.seconds == 12 * 60 * 60 * 24 * 365")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(378432000)).seconds,((((12 * 60) * 60) * 24) * 365))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMilliseconds(10).seconds == 10ms.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromMilliseconds(10)).seconds,(std.Duration.fromSeconds(0.01)).seconds)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMinutes(10).seconds == 10m.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromMinutes(10)).seconds,(std.Duration.fromSeconds(600)).seconds)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromSeconds(10).seconds == 10s.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(10)).seconds,(std.Duration.fromSeconds(10)).seconds)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromHours(10).seconds == 10h.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromHours(10)).seconds,(std.Duration.fromSeconds(36000)).seconds)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromDays(10).seconds == 10d.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromDays(10)).seconds,(std.Duration.fromSeconds(864000)).seconds)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMonths(10).seconds == 10mo.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromMonths(10)).seconds,(std.Duration.fromSeconds(26280000)).seconds)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromYears(10).seconds == 10y.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromYears(10)).seconds,(std.Duration.fromSeconds(315360000)).seconds)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 1s.milliseconds == 1000")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(1)).milliseconds,1000)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 1s.minutes == 1 / 60")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(1)).minutes,(1 / 60))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 1s.hours == 1 / (60 * 60)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(1)).hours,(1 / (60 * 60)))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 1s.days == 1 / (60 * 60 * 24)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(1)).days,(1 / ((60 * 60) * 24)))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 1s.months == 1 / ((60 * 60 * 24 * 365) / 12)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(1)).months,(1 / ((((60 * 60) * 24) * 365) / 12)))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 1s.years == 1 / (60 * 60 * 24 * 365)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(1)).years,(1 / (((60 * 60) * 24) * 365)))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:duration",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "duration.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

