async handle(s) {
  const { r, r2 } = this;
  const connection = (await r.rawClient());
  (await connection.set("wing","does redis"));
  const value = (await connection.get("wing"));
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(value === "does redis")'`)})((value === "does redis"))};
  (await r2.set("wing","does redis again"));
  const value2 = (await r2.get("wing"));
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(value2 === "does redis again")'`)})((value2 === "does redis again"))};
}
