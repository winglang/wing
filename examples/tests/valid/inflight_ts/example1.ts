import inflight from "./.example1.inflight";

export default inflight(async ({}, arg) => {
  return arg;
})