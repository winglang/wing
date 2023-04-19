async handle() {
  const { api, f } = this;
  const username = "tsuf";
  const res = (await f.get(`${api.url}/users/${username}`));
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((res)["status"] === 200)'`)})(((res)["status"] === 200))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(((res)["body"])["user"] === username)'`)})((((res)["body"])["user"] === username))};
}
