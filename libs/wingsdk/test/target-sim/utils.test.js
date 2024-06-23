"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var std_1 = require("../../src/std");
var util_1 = require("../../src/target-sim/util");
(0, vitest_1.describe)("convertDurationToCronExpression", function () {
    (0, vitest_1.test)("converts a duration from minutes", function () {
        // GIVEN
        var dur = std_1.Duration.fromMinutes(10);
        var expectedCron = "*/10 * * * *";
        // WHEN
        var cron = (0, util_1.convertDurationToCronExpression)(dur);
        // THEN
        (0, vitest_1.expect)(cron).toEqual(expectedCron);
    });
    (0, vitest_1.test)("converts a duration from hours", function () {
        var dur = std_1.Duration.fromHours(2);
        var expectedCron = "* */2 * * *";
        // WHEN
        var cron = (0, util_1.convertDurationToCronExpression)(dur);
        // THEN
        (0, vitest_1.expect)(cron).toEqual(expectedCron);
    });
    (0, vitest_1.test)("converts durations with fractional hours", function () {
        // GIVEN
        var dur = std_1.Duration.fromHours(2.5);
        var expectedCron = "*/30 */2 * * *";
        // WHEN
        var cron = (0, util_1.convertDurationToCronExpression)(dur);
        // THEN
        (0, vitest_1.expect)(cron).toEqual(expectedCron);
    });
    (0, vitest_1.test)("throws when trying to convert durations from fractional minutes", function () {
        // GIVEN
        var dur = std_1.Duration.fromMinutes(2.5);
        // THEN
        (0, vitest_1.expect)(function () { return (0, util_1.convertDurationToCronExpression)(dur); }).toThrow(/Cron expressions with second precision are not supported/);
    });
    (0, vitest_1.test)("throws when trying to convert sub minute durations", function () {
        // GIVEN
        var dur = std_1.Duration.fromSeconds(30);
        // THEN
        (0, vitest_1.expect)(function () { return (0, util_1.convertDurationToCronExpression)(dur); }).toThrow(/Cron expressions with second precision are not supported/);
    });
});
