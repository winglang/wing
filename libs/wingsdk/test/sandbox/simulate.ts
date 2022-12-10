import { join } from "path";
import * as sdk from "../../src";

async function main() {
  const mySim = new sdk.testing.Simulator({
    simfile: join(__dirname, "app.wsim"),
  });
  await mySim.start();

  console.log(mySim.listResources());

  const fn = mySim.getResource(
    "root/HelloWorld/Function"
  ) as sdk.cloud.IFunctionClient;
  const response = await fn.invoke("hello!");

  console.log(response);

  console.log(mySim.listTraces());

  await mySim.stop();
}

void main();
