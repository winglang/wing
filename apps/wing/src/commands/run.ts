import debug from "debug";
import { readdir, stat } from "fs/promises";
import open = require("open");
import { join, resolve } from "path";

/** Supported file extensions for Wing files. */
const SUPPORTED_EXTENSIONS = [".w", ".wsim"];

const log = debug("wing:run");

/**
 * Runs either a Wing file (`.s` extension) or Wing Simulator file (`.wsim` extension) in the Wing Console.
 * If the entrypoint is a directory, it must contain a single file with one of the accepted extensions.
 * @param entrypoint Either a file (`.s` or `.wsim`) or a directory (which contains a single `.s` or `.wsim` file to run)
 * @returns Promise which resolves when the Wing Console has been opened.
 * @throws Error if the entrypoint is a directory and it contains no files, more than one file, or a non-file (directory, symlink, etc.)
 * @throws Error if the entrypoint is a file and it has an extension that is not one of the accepted extensions.
 */
export async function run(entrypoint: string | null = null): Promise<void> {
		const resolvedEntrypoint = entrypoint ? resolve(entrypoint) : process.cwd();
		log(`Executing 'wing run' with entrypoint: ${resolvedEntrypoint}...`);

		const stats = await stat(resolvedEntrypoint);

		if (stats.isDirectory()) {
			// Endpoint is a directory - check that it contains a single file.
			const allFilesInDir = await readdir(resolvedEntrypoint);
			const relevantFiles = allFilesInDir.filter(file => SUPPORTED_EXTENSIONS.includes(file.substring(file.lastIndexOf("."))));
			if (relevantFiles.length !== 1) throw new Error(`Directory ${resolvedEntrypoint} contains ${relevantFiles.length} files executable by Wing Console, but must contain exactly 1.`);
			const fileToExecute = join(resolvedEntrypoint, relevantFiles[0]);
			const fileStats = await stat(fileToExecute);
			if (!fileStats.isFile()) throw new Error(`Directory ${resolvedEntrypoint} must contain a single '.w' or '.wsim' file, but contains directory: ${fileToExecute}`);
			runFile(fileToExecute);
			return;
		}

		// Entrypoint is a file.
		runFile(resolvedEntrypoint);
}

/**
 * Runs a file in the Wing Console.
 * Assumes that the file exists, but validates that it has a supported extension.
 * @returns Promise which resolves when the Wing Console has been opened.
 * @param filePath Path to the file to run.
 * @throws Error if the file has an extension that is not one of the accepted extensions.
 */
async function runFile(filePath: string): Promise<void> {
	const fileExtension = filePath.substring(filePath.lastIndexOf("."));
	if (!SUPPORTED_EXTENSIONS.includes(fileExtension)) throw new Error(`File ${filePath} has extension ${fileExtension}, but must have one of the following extensions: ${SUPPORTED_EXTENSIONS.join(", ")}`);	
	log(`Calling Wing Console protocol: wing-console://${filePath}`);
	await open(`wing-console://${filePath}`);
}
