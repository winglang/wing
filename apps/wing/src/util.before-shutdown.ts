import whenExit from "when-exit";

/**
 * Registers a new shutdown listener to be invoked before exiting
 * the main process. Listener handlers are guaranteed to be called in the order
 * they were registered.
 * @param listener The shutdown listener to register.
 */
export function beforeShutdown(listener: () => {}) {
  whenExit(listener);
}
