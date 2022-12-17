import { join } from "path";
import { testing, cloud } from "../../src";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

  console.log(mySim.listTraces());

  const bucket = mySim.getResource(
    "root/HelloWorld/MyBucket/Bucket"
  ) as cloud.IBucketClient;
  await bucket.list();

  const queue = mySim.getResource(
    "root/HelloWorld/Queue"
  ) as cloud.IQueueClient;
  await queue.push("test");

  await sleep(500);

  await mySim.stop();

  console.log(mySim.listTraces());
}

void main();
