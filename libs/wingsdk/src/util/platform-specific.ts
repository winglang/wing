export const getPlatformSpecificValues = (
  path: string,
  argument: string
): string | undefined => {
  const wingValues = process.env.WING_VALUES;
  if (!wingValues) return;

  const valuesList = wingValues.split(",");
  for (const v of valuesList) {
    const x = v.split("=");

    const lastDotIndex = x[0].lastIndexOf(".");
    const pathPart = x[0].substring(0, lastDotIndex);
    const argumentPart = x[0].substring(lastDotIndex + 1);

    if (pathPart === path && argumentPart === argument) {
      return x[1];
    }
  }
  return;
};
