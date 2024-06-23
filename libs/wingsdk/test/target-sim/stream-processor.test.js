"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("stream");
var vitest_1 = require("vitest");
var stream_processor_1 = require("../../src/shared/stream-processor");
(0, vitest_1.describe)("processStream", function () {
    (0, vitest_1.it)("should process data events correctly", function () {
        return new Promise(function (done) {
            var mockData = Buffer.from("Hello\nWorld\n");
            var mockStream = new stream_1.Readable();
            mockStream.push(mockData);
            mockStream.push(null); // Indicates end of stream
            var mockCallback = vitest_1.vi.fn();
            (0, stream_processor_1.processStream)(mockStream, mockCallback);
            setImmediate(function () {
                (0, vitest_1.expect)(mockCallback).toHaveBeenCalledTimes(2);
                (0, vitest_1.expect)(mockCallback).toHaveBeenNthCalledWith(1, "Hello");
                (0, vitest_1.expect)(mockCallback).toHaveBeenNthCalledWith(2, "World");
                done(undefined);
            });
        });
    });
    (0, vitest_1.it)("should process lines split among multiple chunks", function () {
        return new Promise(function (done) {
            var mockData1 = Buffer.from("Hello ");
            var mockData2 = Buffer.from("world\n");
            var mockStream = new stream_1.Readable();
            mockStream.push(mockData1);
            mockStream.push(mockData2);
            mockStream.push(null); // Indicates end of stream
            var mockCallback = vitest_1.vi.fn();
            (0, stream_processor_1.processStream)(mockStream, mockCallback);
            setImmediate(function () {
                (0, vitest_1.expect)(mockCallback).toHaveBeenCalledTimes(1);
                (0, vitest_1.expect)(mockCallback).toHaveBeenNthCalledWith(1, "Hello world");
                done(undefined);
            });
        });
    });
    (0, vitest_1.it)("should handle error events", function () {
        return new Promise(function (done) {
            var mockStream = new stream_1.Readable();
            var mockCallback = vitest_1.vi.fn();
            var consoleSpy = vitest_1.vi.spyOn(console, "error");
            (0, stream_processor_1.processStream)(mockStream, mockCallback);
            mockStream.emit("error", new Error("Test error"));
            setImmediate(function () {
                (0, vitest_1.expect)(consoleSpy).toHaveBeenCalledWith("Error occurred: Test error");
                done(undefined);
            });
        });
    });
});
