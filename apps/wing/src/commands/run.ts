import { readdirSync  } from "fs";
import { debug } from "debug";
import { resolve } from "path";
import open = require("open");
import { normalPath } from "../util";

export async function run(simfile?: string) {
    const wingFiles = readdirSync('.').filter(item => item.endsWith('.w'));
    if (!simfile) {
        if (wingFiles.length !== 1) {
            throw new Error('Please specify which file you want to run');
        }
        simfile = wingFiles[0];
    } else if (!wingFiles.includes(simfile)) {
        throw new Error(simfile + " doesn't exist");
    }

    simfile = normalPath(resolve(simfile));
    debug("calling wing console protocol with:" + simfile);
    open("wing-console://" + simfile);
}