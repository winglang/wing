export type Colors =
  | "orange"
  | "sky"
  | "emerald"
  | "lime"
  | "pink"
  | "amber"
  | "cyan"
  | "purple"
  | "red"
  | "violet"
  | "slate";

export const isOfTypeColors = (keyInput?: string): keyInput is Colors => {
  return [
    "orange",
    "sky",
    "emerald",
    "lime",
    "pink",
    "amber",
    "cyan",
    "purple",
    "red",
    "violet",
    "slate",
  ].includes(keyInput || "");
};
