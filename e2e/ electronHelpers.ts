export async function pause(ms: number) {
  return new Promise((f) => setTimeout(f, ms));
}
