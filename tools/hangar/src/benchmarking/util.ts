export function parseRoundedJson(json: string) {
  return JSON.parse(json, (_, value) => {
    if (typeof value === "number") {
      return Math.round(value * 100) / 100;
    }
    return value;
  });
}