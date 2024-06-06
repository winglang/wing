import { std } from "@winglang/sdk";

export class TraceProcessor {
  private readonly eventQueue: Array<std.Trace>;
  private processing: boolean;
  private simulationComplete: boolean;
  private printTrace: (event: std.Trace) => Promise<void>;
  private resolveCompletion: ((value: unknown) => void) | null;

  constructor(printTrace: (event: std.Trace) => Promise<void>) {
    this.eventQueue = [];
    this.processing = false;
    this.simulationComplete = false;
    this.resolveCompletion = null;
    this.printTrace = printTrace;
  }

  // Sync method to add events to the queue
  public addEvent(event: std.Trace) {
    this.eventQueue.push(event);
    void this.processEvents();
  }

  // Async method to process events
  public async processEvents() {
    // Check if already processing to avoid race conditions
    if (this.processing) return;
    this.processing = true;

    // Process each event in the queue serially
    while (this.eventQueue.length > 0) {
      const event = this.eventQueue.shift();
      await this.printTrace(event!);
    }

    this.processing = false;

    // Check if simulation has ended and queue is empty
    if (this.simulationComplete && this.eventQueue.length === 0) {
      this.resolveCompletion?.(undefined);
    }
  }

  // Method to call once the simulator has ended to wait for all processing to complete
  public finish() {
    this.simulationComplete = true;
    void this.processEvents(); // Trigger processing in case it was idle
    if (this.eventQueue.length > 0 || this.processing) {
      return new Promise((resolve) => {
        this.resolveCompletion = resolve;
      });
    } else {
      return Promise.resolve();
    }
  }
}
