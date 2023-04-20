async handle() {
  const { fn } = this;
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await fn.invoke("test")) === "hello world!")'`)})(((await fn.invoke("test")) === "hello world!"))};
}
