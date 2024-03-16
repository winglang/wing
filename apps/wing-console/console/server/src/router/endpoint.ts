import { ENDPOINT_FQN } from "@winglang/sdk/lib/cloud/endpoint.js";
import { type Endpoint } from "@winglang/sdk/lib/target-sim/endpoint.inflight.js";
import type { EndpointSchema } from "@winglang/sdk/lib/target-sim/schema-resources.js";
import * as z from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";
import type { Simulator } from "../wingsdk.js";

export type EndpointExposeStatus = "connected" | "disconnected" | "connecting";

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

const getExposeStatus = (
  simulator: Simulator,
  resourcePath: string,
): Promise<EndpointExposeStatus> => {
  const client = simulator.tryGetResource(resourcePath) as Endpoint;
  if (!client) {
    throw new Error(`Resource not found: ${resourcePath}`);
  }
  return client.exposeStatus();
};

const getEndpointDetails = async (
  simulator: Simulator,
  endpoint: EndpointSchema,
) => {
  const exposeStatus = await getExposeStatus(simulator, endpoint.path);
  return {
    id: endpoint.path,
    // The slice is for removing `"root/Default/"` from `endpoint.path`.
    label: endpoint.attrs.label ?? endpoint.path.slice(13),
    url: endpoint.attrs.url,
    localUrl: endpoint.attrs.inputUrl,
    browserSupport: endpoint.props.browserSupport ?? false,
    exposeStatus,
  };
};

export const createEndpointRouter = () => {
  return createRouter({
    "endpoint.list": createProcedure.query(async ({ input, ctx }) => {
      if (ctx.appState() !== "success") {
        return [];
      }
      const simulator = await ctx.simulator();
      const endpoints = listEndpoints(simulator);
      return Promise.all(
        endpoints.map(async (endpoint) => {
          return getEndpointDetails(simulator, endpoint);
        }),
      );
    }),
    "endpoint.get": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const endpoint = simulator.getResourceConfig(
          input.resourcePath,
        ) as EndpointSchema;

        return getEndpointDetails(simulator, endpoint);
      }),
    "endpoint.expose": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(input.resourcePath) as Endpoint;
        await client.expose();
        await simulator.reload(false);
      }),
    "endpoint.hide": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(input.resourcePath) as Endpoint;
        await client.hide();
        await simulator.reload(false);
      }),
  });
};
