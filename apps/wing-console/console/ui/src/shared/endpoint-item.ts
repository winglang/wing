export type EndpointExposeStatus = "connected" | "disconnected" | "connecting";

export interface EndpointItem {
  id: string;
  label: string;
  url: string;
  browserSupport: boolean;
  exposeStatus: EndpointExposeStatus;
}
