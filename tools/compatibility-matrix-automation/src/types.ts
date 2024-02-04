export type CompatibilityMatrix = Record<
  string,
  Record<string, Record<string, { implemented: boolean; issue?: string }>>
>;

export interface CompatibilitySets {
  supportedOps: Set<string>;
  unsupportedOps: Set<string>;
}
