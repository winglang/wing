import { Direction, Resource } from "../core";

export function addBindConnections(resource: Resource, host: Resource) {
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
