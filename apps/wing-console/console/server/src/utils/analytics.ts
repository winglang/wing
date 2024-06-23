export interface Analytics {
  track(event: string, properties?: Record<string, any>): void;
}
