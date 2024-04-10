import { WriteStream } from "tty";
import ora from "ora";

/**
 * A stream that can write logs and print a spinner to the terminal without
 * interfering with each other.
 */
export class SpinnerStream {
  private stream: WriteStream;
  private spinner: ora.Ora;
  private buffer: string[] = [];
  private interval: NodeJS.Timeout;

  constructor(stream: WriteStream, text: string) {
    this.stream = stream;
    this.spinner = ora({ stream: this.stream, text, isEnabled: false });
    this.interval = setInterval(() => {
      this.updateSpinner();
    }, 80);
  }

  public write(log: string): void {
    this.buffer.push(log);
  }

  private updateSpinner(): void {
    // Clear the spinner
    this.stream.cursorTo(0);
    this.stream.clearLine(1);

    // Print any logs
    for (const log of this.buffer) {
      this.stream.write(log);
    }
    this.buffer = [];

    // Redraw spinner
    this.spinner.render();
  }

  public stopSpinner(): void {
    // Stop looping
    clearInterval(this.interval);

    // Clear the spinner
    this.stream.cursorTo(0);
    this.stream.clearLine(1);

    // Print any remaining logs
    for (const log of this.buffer) {
      this.stream.write(log);
    }
    this.buffer = [];
  }
}
