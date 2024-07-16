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

/**
 * How often to update the lockfile's mtime.
 */
const UPDATE_INTERVAL = 1000;

/**
 * How long the lockfile can be stale before we consider it compromised.
 */
const STALE_THRESHOLD = 5000;

export interface LockfileProps {
  readonly path: string;
  readonly onCompromised?: (reason: string) => void | Promise<void>;
}

export class Lockfile {
  private path: string;
  private lockfile: FileHandle | undefined;
  private timeout: NodeJS.Timeout | undefined;
  private lastMtime: number | undefined;
  private onCompromised?: (reason: string) => void | Promise<void>;

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
        if (Date.now() > stats.mtimeMs + STALE_THRESHOLD) {
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

    // Start updating the lockfile's mtime.
    this.updateLockfileLater();
  }

  private updateLockfileLater() {
    this.timeout = setTimeout(() => {
      void (async () => {
        // If we already updated our lockfile once, we need to check if it got compromised.
        if (this.lastMtime) {
          // Check if the lockfile got compromised because we were too late to update it.
          if (Date.now() > this.lastMtime + STALE_THRESHOLD) {
            this.markAsCompromised("Lockfile was not updated in time");
            return;
          }

          // Check if the lockfile got compromised because access was lost or something else updated it.
          try {
            const stats = await fs.stat(this.path);
            if (stats.mtimeMs !== this.lastMtime) {
              this.markAsCompromised("Lockfile was updated by another process");
              return;
            }
          } catch (_error) {
            this.markAsCompromised("Failed to check lockfile status");
            return;
          }
        }

        // Update lockfile's mtime.
        try {
          const mtime = new Date(Math.ceil(Date.now() / 1000) * 1000);
          await fs.utimes(this.path, mtime, mtime);
          this.lastMtime = mtime.getTime();
        } catch (_error) {
          this.markAsCompromised("Failed to update lockfile mtime");
          return;
        }

        // Lockfile wasn't compromised. Schedule the next update.
        this.updateLockfileLater();
      })();
    }, UPDATE_INTERVAL);
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
    this.onCompromised?.(reason)?.catch((error) => {
      console.error(
        "Unexpected error in Lockfile.onCompromised callback:",
        error
      );
    });
  }
}
