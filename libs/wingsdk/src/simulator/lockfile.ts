import fs from "node:fs";
import path from "node:path";
import { isNodeError } from "./util.js";

/**
 * How often to update the lockfile's mtime.
 */
const UPDATE_INTERVAL = 1000;

/**
 * How long the lockfile can be stale before we consider it compromised.
 */
const STALE_THRESHOLD = 10_000;

export interface LockfileProps {
  /**
   * Path to the lockfile.
   */
  readonly path: string;

  /**
   * Callback to call when the lockfile is compromised.
   */
  readonly onCompromised?: (
    reason: string,
    error?: unknown
  ) => void | Promise<void>;
}

export class Lockfile {
  private path: string;
  private lockfile: number | undefined;
  private timeout: NodeJS.Timeout | undefined;
  private lastMtime: number | undefined;
  private compromised = false;
  // private releasing = false;
  // private lastTask: Promise<void> | undefined;
  private onCompromised?: (
    reason: string,
    error?: unknown
  ) => void | Promise<void>;

  public constructor(props: LockfileProps) {
    this.path = props.path;
    this.onCompromised = props.onCompromised;
  }

  public lock() {
    if (this.lockfile) {
      return;
    }

    // if (this.releasing) {
    //   throw new Error(
    //     "Cannot lock the lockfile while it's being released. Please wait for the release to complete."
    //   );
    // }

    // this.lastTask = new Promise(() => {

    // });

    this.compromised = false;

    fs.mkdirSync(path.dirname(this.path), { recursive: true });

    try {
      // If lockfile exists but it's stale, remove it.
      const stats = fs.statSync(this.path);
      if (Date.now() > stats.mtimeMs + STALE_THRESHOLD) {
        fs.rmSync(this.path, { force: true });
      }
    } catch (error) {
      if (isNodeError(error) && error.code === "ENOENT") {
        // Lockfile was removed by another process, so we ignore this error.
      } else if (error instanceof Error) {
        // Lockfile exists but we failed to check its status, or to remove it.
        throw new Error(`Failed to check or remove lockfile: ${error.message}`);
      } else {
        throw error;
      }
    }

    try {
      this.lockfile = fs.openSync(this.path, "wx");
    } catch (error) {
      if (isNodeError(error) && error.code === "EEXIST") {
        throw new Error(
          "Another instance of the simulator is already running on the same state directory."
        );
      }
      throw error;
    }

    // Start updating the lockfile's mtime.
    this.updateLockfileLater();
  }

  private updateLockfileLater() {
    this.timeout = setTimeout(() => {
      // Due to the async nature of this timeout, it's possible that
      // the lockfile was released before this callback was called.
      //
      // Skip the update if that's the case.
      if (
        !this.lockfile ||
        this.compromised
        // || this.releasing
      ) {
        return;
      }

      // If we already updated our lockfile once, we need to check if it got compromised.
      if (this.lastMtime) {
        // Check if the lockfile got compromised because we were too late to update it.
        if (Date.now() > this.lastMtime + STALE_THRESHOLD) {
          this.markAsCompromised("Lockfile was not updated in time");
          return;
        }

        // Check if the lockfile got compromised because access was lost or something else updated it.
        try {
          const stats = fs.statSync(this.path);
          if (stats.mtimeMs !== this.lastMtime) {
            this.markAsCompromised("Lockfile was updated by another process");
            return;
          }
        } catch (error) {
          this.markAsCompromised("Failed to check lockfile status", error);
          return;
        }
      }

      // Update lockfile's mtime.
      try {
        const mtime = new Date(Math.ceil(Date.now() / 1000) * 1000);
        fs.utimesSync(this.path, mtime, mtime);
        this.lastMtime = mtime.getTime();
      } catch (error) {
        this.markAsCompromised("Failed to update the lockfile", error);
        return;
      }

      // Lockfile wasn't compromised. Schedule the next update.
      this.updateLockfileLater();
    }, UPDATE_INTERVAL);
  }

  public release() {
    if (!this.lockfile) {
      return;
    }

    // if (this.releasing) {
    //   return;
    // }

    try {
      // this.releasing = true;

      clearTimeout(this.timeout);
      this.timeout = undefined;

      fs.closeSync(this.lockfile);
      this.lockfile = undefined;
      this.lastMtime = undefined;

      // If the lockfile was compromised, we won't remove
      // it since it belongs to another process now.
      if (!this.compromised) {
        fs.rmSync(this.path, { force: true });
        this.compromised = false;
      }
    } finally {
      // this.releasing = false;
    }
  }

  private markAsCompromised(reason: string, error?: unknown) {
    this.compromised = true;
    this.release();
    void this.onCompromised?.(reason, error);
  }
}
