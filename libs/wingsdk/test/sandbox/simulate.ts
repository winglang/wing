import { join } from "path";
import { testing, cloud } from "../../src";

async function main() {
  const mySim = new testing.Simulator({
    simfile: join(__dirname, "app.wsim"),
  });
  await mySim.start();

  console.log(mySim.listResources());

  const fn = mySim.getResource(
    "root/HelloWorld/Function"
  ) as cloud.IFunctionClient;
  await fn.invoke("hello!");

  const bucket = mySim.getResource(
    "root/HelloWorld/MyBucket/Bucket"
  ) as cloud.IBucketClient;
  await bucket.list();

  await mySim.stop();

  console.log(mySim.listTraces());
}

void main();
