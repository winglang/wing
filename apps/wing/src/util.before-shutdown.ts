/**
 * Based on https://gist.github.com/nfantone/1eaa803772025df69d07f4dbf5df7e58.
 */
type BeforeShutdownListener = (codeOrSignal: string | number) => Promise<void> | void;

/**
 * Time in milliseconds to wait before forcing shutdown.
 */
const SHUTDOWN_TIMEOUT = 15_000;

/**
 * A queue of listener callbacks to execute before shutting
 * down the process.
 */
const shutdownListeners: BeforeShutdownListener[] = [];

/**
 * Listen for signals and execute given `fn` function once.
 * @param  fn Function to execute on shutdown.
 */
const processOnce = (fn: BeforeShutdownListener) => {
  process.once("beforeExit", (code) => void fn(code));
  process.once("exit", (code) => void fn(code));
  process.once("SIGINT", (signal) => void fn(signal));
  process.once("SIGTERM", (signal) => void fn(signal));
};

/**
 * Sets a forced shutdown mechanism that will exit the process after `timeout` milliseconds.
 * @param timeout Time to wait before forcing shutdown (milliseconds)
 */
const forceExitAfter = (timeout: number) => () => {
  setTimeout(() => {
    // Force shutdown after timeout
    console.warn(`Could not close resources gracefully after ${timeout}ms: forcing shutdown`);
    return process.exit(1);
  }, timeout).unref();
};

/**
 * Main process shutdown handler. Will invoke every previously registered async shutdown listener
 * in the queue and exit with a code of `0`. Any `Promise` rejections from any listener will
 * be logged out as a warning, but won't prevent other callbacks from executing.
 */
async function shutdownHandler(codeOrSignal: string | number) {
  for (const listener of shutdownListeners) {
    try {
      await listener(codeOrSignal);
    } catch (error) {
      console.warn(
        `A shutdown handler failed before completing with: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  }

  if (typeof codeOrSignal === "string") {
    process.exit();
  } else {
    process.exit(codeOrSignal);
  }
}

/**
 * Registers a new shutdown listener to be invoked before exiting
 * the main process. Listener handlers are guaranteed to be called in the order
 * they were registered.
 * @param listener The shutdown listener to register.
 * @returns Echoes back the supplied `listener`.
 */
export function beforeShutdown(listener: BeforeShutdownListener) {
  shutdownListeners.push(listener);
  return listener;
}

// Register shutdown callback that kills the process after `SHUTDOWN_TIMEOUT` milliseconds
// This prevents custom shutdown handlers from hanging the process indefinitely
processOnce(forceExitAfter(SHUTDOWN_TIMEOUT));

// Register process shutdown callback
// Will listen to incoming signal events and execute all registered handlers in the stack
processOnce(shutdownHandler);
