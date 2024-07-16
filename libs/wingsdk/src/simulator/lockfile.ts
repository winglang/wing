import type { PathLike } from "fs";
import fs, { type FileHandle } from "fs/promises";
import path from "path";
import { isNodeError } from "./util.js";

// eslint-disable-next-line @typescript-eslint/no-shadow
const exists = async (path: PathLike) => {
  try {
    await fs.stat(path);
    return true;
  } catch {
    return false;
  }
};

const UPDATE_INTERVAL = 1000;
const STALE_THRESHOLD = 5000;

export interface LockfileProps {
  readonly path: string;
}

export class Lockfile {
  private path: string;
  private lockfile: FileHandle | undefined;
  private timeout: NodeJS.Timeout | undefined;
  //   private lastMtime: number | undefined;

  public constructor(props: LockfileProps) {
    this.path = props.path;
  }

  public async lock() {
    if (this.lockfile) {
      return; // already locked
    }

    await fs.mkdir(path.dirname(this.path), { recursive: true });

    // If lockfile exists but it's stale, remove it.
    if (await exists(this.path)) {
      try {
        const stats = await fs.stat(this.path);
        if (Date.now() - stats.mtimeMs > STALE_THRESHOLD) {
          console.log("Removing stale lockfile");
          await fs.rm(this.path);
        }
      } catch (error) {
        console.error("Error checking lockfile mtime:", error);
      }
    }

    try {
      this.lockfile = await fs.open(this.path, "wx");
    } catch (error) {
      if (isNodeError(error) && error.code === "EEXIST") {
        throw new Error(
          "Another instance of the simulator is already running. Please stop the current simulation before starting a new one."
        );
      }
      throw error;
    }

    const updateLockfileUtimes = () => {
      this.timeout = setTimeout(() => {
        void (async () => {
          const mtime = new Date(Math.ceil(Date.now() / 1000) * 1000 + 5);
          try {
            console.log("Updating lockfile mtime", mtime);
            await fs.utimes(this.path, mtime, mtime);
          } catch (error) {
            console.error("Error updating lockfile mtime:", error);
          }
          updateLockfileUtimes();
        })();
      }, UPDATE_INTERVAL);
    };

    updateLockfileUtimes();
  }

  public async release() {
    if (!this.lockfile) {
      return; // not locked
    }

    clearTimeout(this.timeout);
    this.timeout = undefined;

    await this.lockfile.close();
    await fs.rm(this.path);
    this.lockfile = undefined;
  }
}
