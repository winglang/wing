import log from "electron-log";
import { createMachine, interpret } from "xstate";

export type AppEvent =
  | "COMPILER_ERROR"
  | "COMPILER_SUCCESS"
  | "COMPILER_LOADING"
  | "SIMULATOR_ERROR"
  | "SIMULATOR_SUCCESS"
  | "SIMULATOR_LOADING";

export type AppEvent2 =
  | {
      type: "COMPILER_ERROR";
    }
  | { type: "COMPILER_SUCCESS" }
  | { type: "COMPILER_LOADING" }
  | { type: "SIMULATOR_ERROR" }
  | { type: "SIMULATOR_SUCCESS" }
  | { type: "SIMULATOR_LOADING" };

export type AppStates = "error" | "success" | "loading" | "compilerSuccess";

export const createCloudAppState = (onChange: (state: AppStates) => void) => {
  const cloudAppState = createMachine<undefined, AppEvent2>({
    initial: "loading",
    states: {
      error: {
        on: {
          COMPILER_LOADING: "loading",
          COMPILER_SUCCESS: "compilerSuccess",
          SIMULATOR_SUCCESS: "success",
        },
      },
      success: {
        on: {
          COMPILER_LOADING: "loading",
          SIMULATOR_LOADING: "loading",
          COMPILER_SUCCESS: "compilerSuccess",
          SIMULATOR_ERROR: "error",
          COMPILER_ERROR: "error",
        },
      },
      loading: {
        on: {
          COMPILER_ERROR: "error",
          SIMULATOR_ERROR: "error",
          COMPILER_SUCCESS: "compilerSuccess",
          SIMULATOR_SUCCESS: "success",
        },
      },
      compilerSuccess: {
        on: {
          COMPILER_LOADING: "loading",
          COMPILER_ERROR: "error",
          SIMULATOR_ERROR: "error",
          SIMULATOR_SUCCESS: "success",
        },
      },
    },
  });

  const cloudAppStateService = interpret(cloudAppState)
    .onTransition((state) => {
      log.verbose(`cloud app state: ${state.value}`);
      onChange(state.value as AppStates);
    })
    .start();

  return cloudAppStateService;
};

export type CloudAppStateService = ReturnType<typeof createCloudAppState>;
