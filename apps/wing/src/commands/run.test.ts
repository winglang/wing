import { run } from "./run";
import open = require("open");

import * as fs from "fs/promises";
import { join } from "path";

jest.mock("open");

describe("run command tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should be able to run a valid Wing file", async () => {
    const filePath = join(__dirname, "temp.w");

		// @ts-ignore
    fs.stat = jest.fn().mockResolvedValue({ isDirectory: () => false });

    await run(filePath);
    expect(open).toHaveBeenCalledWith(`wing-console://${filePath}`);
  });

	it("should be able to run a valid Wing simulator file", async () => {
    const filePath = join(__dirname, "temp.wsim");

		// @ts-ignore (write to read-only property)
    fs.stat = jest.fn().mockResolvedValue({ isDirectory: () => false });

    await run(filePath);
    expect(open).toHaveBeenCalledWith(`wing-console://${filePath}`);
  });

	it("should be able to run the single relevant file in a directory", async () => {
    const dirPath = join(__dirname, "some-dir");
		const exampleNamesOfExecutableFiles = ["valid.w", "also-valid.wsim", "valid-as-well.w"];

		/// @ts-ignore (write to read-only property)
    fs.stat = jest.fn((filePath) => Promise.resolve({
			isDirectory: () => filePath.endsWith("some-dir") ? { isDirectory: () => true } : { isDirectory: () => false },
			isFile: () => () => filePath.endsWith(".w") || filePath.endsWith(".wsim")
		}));

		for (const fileName of exampleNamesOfExecutableFiles) {
			// @ts-ignore (write to read-only property)
			fs.readdir = jest.fn().mockResolvedValue([fileName]);
			
			await run(dirPath);

			const filePath = join(dirPath, fileName);
			expect(open).toHaveBeenCalledWith(`wing-console://${filePath}`);
		}
  });

	it("should not be able to run a directory with no files", async () => {
    const dirPath = join(__dirname, "some-dir");

		// @ts-ignore (write to read-only property)
    fs.stat = jest.fn((filePath) => Promise.resolve({
			isDirectory: () => filePath.endsWith("some-dir") ? { isDirectory: () => true } : { isDirectory: () => false }
		}));
		// @ts-ignore (write to read-only property)
		fs.readdir = jest.fn().mockResolvedValue([]);

		expect.assertions(1);

		try {
			await run(dirPath);
		}	catch (ex) {
			expect((ex as Error).message).toMatch(/Directory .* contains 0 files executable by Wing Console, but must contain exactly 1./)
		}
  });

	it("should not be able to run a directory with 2 relevant files", async () => {
    const dirPath = join(__dirname, "some-dir");
		const filesInDir = ["valid1.w", "valid2.wsim"];

		// @ts-ignore (write to read-only property)
    fs.stat = jest.fn((filePath) => Promise.resolve({
			isDirectory: () => filePath.endsWith("some-dir") ? { isDirectory: () => true } : { isDirectory: () => false }
		}));
		// @ts-ignore (write to read-only property)
		fs.readdir = jest.fn().mockResolvedValue(filesInDir);

		expect.assertions(1);

		try {
			await run(dirPath);
		}	catch (ex) {
			expect((ex as Error).message).toMatch(/Directory .* contains 2 files executable by Wing Console, but must contain exactly 1./)
		}
  });
});
