class Foo  {
  constructor({  }) {
  }
  static async regex_inflight(pattern, text)  {
    return (require(require.resolve("./external_js.js", {paths: [process.env.WING_PROJECT_DIR]}))["regex_inflight"])(pattern, text)
  }
  static async get_uuid()  {
    return (require(require.resolve("./external_js.js", {paths: [process.env.WING_PROJECT_DIR]}))["get_uuid"])()
  }
  static async get_data()  {
    return (require(require.resolve("./external_js.js", {paths: [process.env.WING_PROJECT_DIR]}))["get_data"])()
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
