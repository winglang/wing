import { Direction, Resource } from "../core";

export function addBindConnections(resource: Resource, captureScope: Resource) {
  resource.addConnection({
    direction: Direction.INBOUND,
    relationship: `inflight-reference`,
    resource: captureScope,
  });
  captureScope.addConnection({
    direction: Direction.OUTBOUND,
    relationship: `inflight-reference`,
    resource: resource,
  });
}
