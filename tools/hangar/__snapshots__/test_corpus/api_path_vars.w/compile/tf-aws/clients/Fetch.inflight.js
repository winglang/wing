class  Fetch {
  constructor({ stateful }) {
    this.stateful = stateful;
  }
  async get(url)  {
    return (require("<ABSOLUTE_PATH>/api_path_vars.js")["get"])(url)
  }
}
exports.Fetch = Fetch;
