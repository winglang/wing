import inflight from "./example2.inflight";

export const main = inflight(async ({ example, numbers }, message) => {
  const exampleMessage = await example.getMessage();
  console.log(`"${message}" should be "${exampleMessage}"`);
  console.log(numbers);
  if (message !== exampleMessage) {
    throw new Error("Message is not the same");
  }
  await example.done();
});
