class  Foo {
  constructor({ stateful }) {
    this.stateful = stateful;
  }
  static async regex_inflight(pattern, text)  {
    return (require("<ABSOLUTE_PATH>/external_js.js")["regex_inflight"])(pattern, text)
  }
  static async get_uuid()  {
    return (require("<ABSOLUTE_PATH>/external_js.js")["get_uuid"])()
  }
  static async get_data()  {
    return (require("<ABSOLUTE_PATH>/external_js.js")["get_data"])()
  }
  async print(msg)  {
    return (require("<ABSOLUTE_PATH>/external_js.js")["print"])(msg)
  }
  async call()  {
    {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await Foo.regex_inflight("[a-z]+-\\d+","abc-123"))'`)})((await Foo.regex_inflight("[a-z]+-\\d+","abc-123")))};
      const uuid = (await Foo.get_uuid());
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(uuid.length === 36)'`)})((uuid.length === 36))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await Foo.get_data()) === "Cool data!")'`)})(((await Foo.get_data()) === "Cool data!"))};
    }
  }
}
exports.Foo = Foo;
