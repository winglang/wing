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
