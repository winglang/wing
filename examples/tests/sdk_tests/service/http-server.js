const http = require("http");

exports.createServer = async function(body) {
  return new Promise((resolve, reject) => {
    const server = http.createServer();
    server.on("request", (_, res) => res.end(body));
    server.on("error", reject);
    server.on("listening", () => resolve({
      address: () => server.address(),
      close: () => new Promise((resolve) => server.close(resolve)),
    }));
    server.listen();
  });
};
