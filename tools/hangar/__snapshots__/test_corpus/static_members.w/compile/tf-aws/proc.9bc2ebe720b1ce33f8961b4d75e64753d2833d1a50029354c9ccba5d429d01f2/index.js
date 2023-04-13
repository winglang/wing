async handle(s) {
  const {  } = this;
  class InflightClass {
    constructor()  {
    }
    async inflight_method()  {
      {
        return "Inflight method";
      }
    }
    static async static_inflight_method()  {
      {
        return "Static inflight method";
      }
    }
  }
  const inflight_class = new InflightClass();
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await inflight_class.inflight_method()) === "Inflight method")'`)})(((await inflight_class.inflight_method()) === "Inflight method"))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await InflightClass.static_inflight_method()) === "Static inflight method")'`)})(((await InflightClass.static_inflight_method()) === "Static inflight method"))};
}
