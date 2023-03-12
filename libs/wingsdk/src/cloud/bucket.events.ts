export interface BucketOnUploadProps {
  /* elided */
}
export interface BucketOnDeleteProps {
  /* elided */
}
export interface BucketOnUpdateProps {
  /* elided */
}
export interface BucketOnEventProps {
  /* elided */
}

export interface BucketEvent {
  key: string;
  type: BucketEventType;
}

export enum BucketEventType {
  PUT = "PUT",
  DELETE = "DELETE",
  UPDATE = "UPDATE",
}

export abstract class BucketEvents implements IBucketEvents {
  private _changeHandlers = new Map<BucketEventType, (key: string) => void>();
  private _onEventFn?: (event: BucketEvent) => void;

  onUpload(fn: (key: string) => void, opts?: BucketOnUploadProps): void {
    if (opts) {
      console.warn("Bucket.onUpload does not support props yet");
    }
    this._changeHandlers.set(BucketEventType.PUT, fn);
  }
  onDelete(fn: (key: string) => void, opts?: BucketOnDeleteProps): void {
    if (opts) {
      console.warn("Bucket.onDelete does not support props yet");
    }
    this._changeHandlers.set(BucketEventType.DELETE, fn);
  }
  onUpdate(fn: (key: string) => void, opts?: BucketOnUpdateProps): void {
    if (opts) {
      console.warn("Bucket.onUpdate does not support props yet");
    }
    this._changeHandlers.set(BucketEventType.UPDATE, fn);
  }
  onEvent(fn: (event: BucketEvent) => void, opts?: BucketOnEventProps): void {
    if (opts) {
      console.warn("Bucket.onEvent does not support props yet");
    }
    this._onEventFn = fn;
  }

  protected async onChange(type: BucketEventType, key: string): Promise<void> {
    try {
      if (this._changeHandlers.has(type)) {
        const fn = this._changeHandlers.get(type);
        try {
          typeof fn == "function" && (await fn(key));
        } catch (error) {
          console.warn(
            `Error while running bucket's "on_${type
              .toString()
              .toLowerCase()}" event: ${error}`
          );
        }
      }
      try {
        typeof this._onEventFn === "function" &&
          (await this._onEventFn({ key, type }));
      } catch (error) {
        console.warn(`Error while running bucket's "on_event" event: ${error}`);
      }
    } catch (error) {
      console.warn(error);
    }
  }
}

export interface IBucketEvents {
  /**
   * Run an inflight whenever a file is uploaded to the bucket.
   */
  onUpload(fn: (key: string) => void, opts?: BucketOnUploadProps): void;

  /**
   * Run an inflight whenever a file is deleted from the bucket.
   */
  onDelete(fn: (key: string) => void, opts?: BucketOnDeleteProps): void;

  /**
   * Run an inflight whenever a file is updated in the bucket.
   */
  onUpdate(fn: (key: string) => void, opts?: BucketOnUpdateProps): void;

  /**
   * Run an inflight whenever a file is uploaded, modified, or deleted from the bucket.
   */
  onEvent(fn: (event: BucketEvent) => void, opts?: BucketOnEventProps): void;
}
