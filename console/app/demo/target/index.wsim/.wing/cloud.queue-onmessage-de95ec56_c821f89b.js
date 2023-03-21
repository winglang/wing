const $logger = (function(env) {
        let handle = process.env[env];
        if (!handle) {
          throw new Error("Missing environment variable: " + env);
        }
        return $simulator.findInstance(handle);
      })("LOGGER_HANDLE_76f7e65b");
console.log = (...args) => $logger.print(...args);
exports.handler = async function(event) {
  return await (new (require("/home/runner/work/console/console/node_modules/.pnpm/@winglang+sdk@0.6.0_constructs@10.1.272/node_modules/@winglang/sdk/lib/target-sim/queue.onmessage.inflight.js")).QueueOnMessageHandlerClient({ handler: new ((function(){
return class Handler {
  constructor(clients) {
    for (const [name, client] of Object.entries(clients)) {
      this[name] = client;
    }
  }
  async handle(message) { const { bucket } = this; {
  (await bucket.put("hello.txt",`Hello, ${message}!`));
  {console.log(`Hello, ${message}!`)};
  return message;
} };
};
})())({
bucket: (function(env) {
        let handle = process.env[env];
        if (!handle) {
          throw new Error("Missing environment variable: " + env);
        }
        return $simulator.findInstance(handle);
      })("BUCKET_HANDLE_2cd0933d")
}) })).handle(event);
};