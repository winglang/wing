export async function consoleAppPath() {
  const path = require.resolve("@wingconsole/app");
  console.log(path);
}
