async handle(msg) {
  const { b, file_name } = this;
  const x = (await b.getJson(file_name));
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(((((x)["persons"])[0])["fears"])[1] === "failure")'`)})((((((x)["persons"])[0])["fears"])[1] === "failure"))};
}
