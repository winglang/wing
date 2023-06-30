export interface AnalyticsReport {
  anonymousId?: string;
  events: AnalyticEvent[];
}

export interface AnalyticEvent {
  event: string;
  timestamp?: string;
  anonymousId?: string;
  properties: {
    inCI: boolean;
    cli: CLIData;
    os: OSData;
    node: NodeData;
  }
}

export interface CLIData {
  target: string;
  version: string;
  options: string;
}

export interface OSData {
  name: string;
  arch: string;
  platform: string;
  release: string;
}

export interface NodeData {
  version: string;
}
