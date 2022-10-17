import childProcess from "node:child_process";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { promisify } from "node:util";

import { test, suite } from "vitest";
import fastGlob from "fast-glob";

const exec = promisify(childProcess.exec);

suite("compiles wing files in examples/simple", async () => {
    const examplesDirname = resolve(__dirname, "../../../examples/simple");
    const wingFiles = await fastGlob("*.w", { cwd: examplesDirname });
    for (const wingFile of wingFiles) {
        test.concurrent(
            `simple/${wingFile}`,
            async (t) => {
                await exec(`cargo run ${examplesDirname}/${wingFile}`);
                t.expect(
                    await readFile(
                        `${examplesDirname}/${wingFile}.out/intermediate.js`,
                        "utf8",
                    ),
                ).toMatchSnapshot();
            },
            { timeout: 25_000 },
        );
    }
});

// test("compiles wing files in the examples/simple directory", async (t) => {
//     const wingFiles = await fastGlob("*.w", {
//         cwd: examplesDirname,
//         absolute: true,
//     });
//     for (const wingFile of wingFiles) {
//         execSync(`cargo run ${wingFile}`);
//         expect(
//             await readFile(`${wingFile}.out/intermediate.js`, "utf8"),
//         ).toMatchSnapshot();
//     }
// });
