export async function consolePath() {
  const wingconsolePath = require.resolve("@wingconsole/app");
  console.log(wingconsolePath);
}
