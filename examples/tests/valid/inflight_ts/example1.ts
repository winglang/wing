import extern from "./example1.inflight";

export default extern(async ({}, arg) => {
  return arg;
})