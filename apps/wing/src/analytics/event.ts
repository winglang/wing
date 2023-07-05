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

export interface CLIData {
  target: string;
  version: string;
  options: string;
}

export interface OSData {
  arch: string;
  platform: string;
  release: string;
}

export interface NodeData {
  version: string;
}

export interface GitData {
  contributors: {
    total: number;
    last90Days: number;
  }
  version: string;
  originUrl: string;
}

export interface CIData {
  name: string;
  serverUrl: string;
  toBranch: string;
  fromBranch: string;
  prId: string;
  prUrl: string;
  runId: string;
  runUrl: string;
  commitHash: string;
  commitUrl: string;
  repositoryUrl: string;
  authorName: string;
}