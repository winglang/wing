const $logger = (function(env) {
        let handle = process.env[env];
        if (!handle) {
          throw new Error("Missing environment variable: " + env);
        }
        return $simulator.findInstance(handle);
      })("LOGGER_HANDLE_76f7e65b");
console.log = (...args) => $logger.print(...args);
exports.handler = async function(event) {
  return await (new (require("/home/runner/work/console/console/node_modules/.pnpm/@winglang+sdk@0.6.0_constructs@10.1.272/node_modules/@winglang/sdk/lib/target-sim/topic.onmessage.inflight.js")).TopicOnMessageHandlerClient({ handler: new ((function(){
return class Handler {
  constructor(clients) {
    for (const [name, client] of Object.entries(clients)) {
      this[name] = client;
    }
  }
  async handle(message) { const {  } = this; {
  {console.log(`Topic subscriber #1: ${message}`)};
  return message;
} };
};
})())({

}) })).handle(event);
};