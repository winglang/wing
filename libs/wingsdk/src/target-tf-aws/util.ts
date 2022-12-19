import { Direction, IInflightHost, Resource } from "../core";

export function addConnections(resource: Resource, host: IInflightHost) {
  if (!(host instanceof Resource)) {
    throw new Error(`Expected host to be an instanceof Resource`);
  }
  resource.addConnection({
    direction: Direction.INBOUND,
    relationship: `inflight-reference`,
    resource: host,
  });
  host.addConnection({
    direction: Direction.OUTBOUND,
    relationship: `inflight-reference`,
    resource: resource,
  });
}
