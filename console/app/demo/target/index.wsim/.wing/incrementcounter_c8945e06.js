const $logger = (function(env) {
        let handle = process.env[env];
        if (!handle) {
          throw new Error("Missing environment variable: " + env);
        }
        return $simulator.findInstance(handle);
      })("LOGGER_HANDLE_76f7e65b");
console.log = (...args) => $logger.print(...args);
exports.handler = async function(event) {
  return await (new ((function(){
return class Handler {
  constructor(clients) {
    for (const [name, client] of Object.entries(clients)) {
      this[name] = client;
    }
  }
  async handle(message) { const { counter } = this; {
  (await counter.inc());
  {console.log(`Counter is now ${(await counter.inc(0))}`)};
  return message;
} };
};
})())({
counter: (function(env) {
        let handle = process.env[env];
        if (!handle) {
          throw new Error("Missing environment variable: " + env);
        }
        return $simulator.findInstance(handle);
      })("COUNTER_HANDLE_e5a56560")
})).handle(event);
};