import { expect, it } from "vitest";

import { createCloudAppState } from "../main/utils/cloudAppState.js";

const onChange = (state: string) => {
  console.log(state);
};

it("simulator success state should change the app state to success", () => {
  const cloudAppStateService = createCloudAppState(onChange);
  cloudAppStateService.send("SIMULATOR_SUCCESS");
  expect(cloudAppStateService.state.value).toBe("success");
});

it("compiler success state should change the app state to compilerSuccess", () => {
  const cloudAppStateService = createCloudAppState(onChange);
  cloudAppStateService.send("COMPILER_SUCCESS");
  expect(cloudAppStateService.state.value).toBe("compilerSuccess");
});

it("compiler error state should change the app state to error", () => {
  const cloudAppStateService = createCloudAppState(onChange);
  cloudAppStateService.send("COMPILER_ERROR");
  expect(cloudAppStateService.state.value).toBe("error");
});

it("simulator error state should change the app state to error", () => {
  const cloudAppStateService = createCloudAppState(onChange);
  cloudAppStateService.send("SIMULATOR_ERROR");
  expect(cloudAppStateService.state.value).toBe("error");
});

it("compiler loading state should the app state to loading", () => {
  const cloudAppStateService = createCloudAppState(onChange);
  cloudAppStateService.send("SIMULATOR_ERROR");
  cloudAppStateService.send("COMPILER_LOADING");
  expect(cloudAppStateService.state.value).toBe("loading");
});
