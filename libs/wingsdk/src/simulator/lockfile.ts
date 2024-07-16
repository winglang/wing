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
  readonly onCompromised?: () => void;
}

export class Lockfile {
  private path: string;
  private lockfile: FileHandle | undefined;
  private timeout: NodeJS.Timeout | undefined;
  private lastMtime: number | undefined;
  private onCompromised: ((reason: string) => void) | undefined;

  public constructor(props: LockfileProps) {
    this.path = props.path;
    this.onCompromised = props.onCompromised;
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
          await fs.rm(this.path);
        }
      } catch (error) {
        throw new Error("Failed to check lockfile status: " + error);
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
          // Check if the lockfile got compromised because we were too late to update it.
          if (this.lastMtime && Date.now() > this.lastMtime + STALE_THRESHOLD) {
            this.markAsCompromised("Lockfile was not updated in time");
            return;
          }

          // Check if the lockfile got compromised because access was lost or something else updated it.
          if (this.lastMtime) {
            try {
              const stats = await fs.stat(this.path);
              if (stats.mtimeMs !== this.lastMtime) {
                this.markAsCompromised(
                  "Lockfile was updated by another process"
                );
                return;
              }
            } catch (_error) {
              this.markAsCompromised("Failed to check lockfile status");
              return;
            }
          }

          // Update mtime.
          try {
            const mtime = new Date(Math.ceil(Date.now() / 1000) * 1000 + 5);
            await fs.utimes(this.path, mtime, mtime);
            this.lastMtime = mtime.getTime();
          } catch (_error) {
            this.markAsCompromised("Failed to update lockfile mtime");
            return;
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

  private markAsCompromised(reason: string) {
    this.lockfile = undefined;
    this.onCompromised?.(reason);
  }
}
