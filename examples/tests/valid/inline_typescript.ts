import inflight from "./inline_typescript.inflight";

export default inflight(async ({ example }, message) => {
  const exampleMessage = await example.getMessage();
  console.log(`"${message}" should be "${exampleMessage}"`);
  if (message !== exampleMessage) {
    throw new Error("Message is not the same");
  }
  await example.done();
});
