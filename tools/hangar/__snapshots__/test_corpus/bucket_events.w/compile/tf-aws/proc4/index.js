async handle(key) {
  const { other } = this;
  {console.log(`last key ${key}`)};
  (await other.put("last_operation_key",((args) => { return JSON.stringify(args[0], null, args[1]) })([key])));
}
