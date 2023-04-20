async handle(s) {
  const { str_to_str } = this;
  (await str_to_str.invoke("one"));
  {console.log((await str_to_str.invoke("two")))};
}
