import { BindResourceUrl } from "../hostUtils.js";
import { Simulator } from "../wingsdk.js";

export async function bindSimulatorResourceUrls(
  simulator: Simulator,
  bindResourceUrl: BindResourceUrl,
) {
  const resources = simulator.listResources();
  for (let resource of resources) {
    const config = simulator.getResourceConfig(resource);
    if (typeof config.attrs.url === "string") {
      config.attrs.url = await bindResourceUrl(resource, config.attrs.url);
    }
  }
}
