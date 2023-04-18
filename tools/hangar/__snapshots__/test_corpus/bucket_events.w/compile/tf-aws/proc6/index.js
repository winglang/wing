async handle() {
  const { b } = this;
  (await b.put("a","1"));
  (await b.put("b","1"));
  (await b.put("b","100"));
  (await b.put("c","1"));
  (await b.delete("c"));
}
