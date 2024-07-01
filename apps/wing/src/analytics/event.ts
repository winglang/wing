import { CIData } from "./collectors/ci-collector";
import { CLIData } from "./collectors/cli-collector";
import { NodeData } from "./collectors/node-collector";
import { OSData } from "./collectors/os-collector";

export interface AnalyticEvent {
  event: string;
  timestamp?: string;
  anonymousId?: string;
  properties: {
    anonymous_repo_id?: string;
    cli: CLIData;
    os: OSData;
    node: NodeData;
    ci?: CIData;
  };
}
