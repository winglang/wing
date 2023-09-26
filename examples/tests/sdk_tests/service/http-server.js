const http = require("http");

class HttpServer {
  startServer(body) {
    return new Promise((resolve, reject) => {
      this.server = http.createServer();
      this.server.on("request", (_, res) => res.end(body));
      this.server.on("error", reject);
      this.server.on("listening", () => resolve(this.server.address().port));
      this.server.listen();
    });
  }

  stopServer() {
    return new Promise((resolve, _) => {
      this.server.close(resolve);
    });
  }
}

module.exports = new HttpServer();

// let server;

// exports.startHttpServer = async function(body) {
//   return new Promise((resolve, reject) => {
//     console.log("starting http server...");
//     server = http.createServer();
//     server.on("request", (_, res) => res.end(body));
//     server.on("error", reject);
//     server.on("listening", () => resolve(server.address().port));
//     server.listen();
//   });
// };

// exports.stopHttpServer = async function() {
//   return new Promise((resolve, _) => {
//     console.log("stopping http server...");
//     server.close(resolve);
//   });
// };