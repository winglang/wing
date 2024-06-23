export type EndpointExposeStatus = "connected" | "disconnected" | "connecting";

export interface EndpointItem {
  id: string;
  label: string;
  url: string;
  localUrl: string;
  browserSupport: boolean;
  exposeStatus: EndpointExposeStatus;
}
