import { CIData } from "./collectors/ci-collector-factory";
import { CLIData } from "./collectors/cli-collector";
import { GitData } from "./collectors/git-collector";
import { NodeData } from "./collectors/node-collector";
import { OSData } from "./collectors/os-collector";

export interface AnalyticEvent {
  event: string;
  timestamp?: string;
  anonymousId?: string;
  properties: {
    inCI: boolean;
    cli: CLIData;
    os: OSData;
    node: NodeData;
    git?: GitData;
    ci?: CIData;
  }
}
