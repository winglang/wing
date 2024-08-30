import { Readable } from "stream";
import { describe, expect, it, vi } from "vitest";
import { processStream } from "../../src/shared/stream-processor";

describe("processStream", () => {
  it("should process data events correctly", () =>
    new Promise((done) => {
      const mockData = Buffer.from("Hello\nWorld\n");
      const mockStream = new Readable();
      mockStream.push(mockData);
      mockStream.push(null); // Indicates end of stream

      const mockCallback = vi.fn();

      processStream(mockStream, mockCallback);

      setImmediate(() => {
        expect(mockCallback).toHaveBeenCalledTimes(2);
        expect(mockCallback).toHaveBeenNthCalledWith(1, "Hello");
        expect(mockCallback).toHaveBeenNthCalledWith(2, "World");
        done(undefined);
      });
    }));

  it("should process lines split among multiple chunks", () =>
    new Promise((done) => {
      const mockData1 = Buffer.from("Hello ");
      const mockData2 = Buffer.from("world\n");
      const mockStream = new Readable();
      mockStream.push(mockData1);
      mockStream.push(mockData2);
      mockStream.push(null); // Indicates end of stream

      const mockCallback = vi.fn();

      processStream(mockStream, mockCallback);

      setImmediate(() => {
        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toHaveBeenNthCalledWith(1, "Hello world");
        done(undefined);
      });
    }));

  it("should handle error events", () =>
    new Promise((done) => {
      const mockStream = new Readable();
      const mockCallback = vi.fn();
      const consoleSpy = vi.spyOn(console, "error");

      processStream(mockStream, mockCallback);

      mockStream.emit("error", new Error("Test error"));

      setImmediate(() => {
        expect(consoleSpy).toHaveBeenCalledWith("Error occurred: Test error");
        done(undefined);
      });
    }));
});
