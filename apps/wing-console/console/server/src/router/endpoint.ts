import { ENDPOINT_FQN } from "@winglang/sdk/lib/cloud/endpoint.js";
import { EndpointSchema } from "@winglang/sdk/lib/target-sim/schema-resources.js";

import { createProcedure, createRouter } from "../utils/createRouter.js";
import { Simulator } from "../wingsdk.js";

const listEndpoints = (simulator: Simulator) => {
  const endpoints = simulator
    .listResources()
    .map((r) => simulator.getResourceConfig(r))
    .filter((r) => {
      return r.type === ENDPOINT_FQN;
    })
    .map((r) => r as EndpointSchema);
  return endpoints;
};

export const createEndpointRouter = () => {
  return createRouter({
    "endpoint.list": createProcedure.query(async ({ input, ctx }) => {
      if (ctx.appState() !== "success") {
        return [];
      }
      const endpoints = listEndpoints(await ctx.simulator());
      return endpoints.map((endpoint) => {
        return {
          id: endpoint.path,
          label: endpoint.attrs.label || endpoint.path.slice(13),
          url: endpoint.attrs.url,
          browserSupport: endpoint.props.browserSupport ?? false,
        };
      });
    }),
  });
};
