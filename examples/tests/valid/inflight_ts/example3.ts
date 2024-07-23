import inflight from "./.example3.inflight";

export default inflight(async ({ example }) => {
  return await example.getMessage()
});
