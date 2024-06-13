import { test, describe, expect } from "vitest";
import { WebSocketServer, WebSocket } from "ws";
import { connect } from "../src/index.js";
import * as http from "http";

describe("wing tunnels", async () => {
  test("will forward a message", async () => {
    process.env["WING_TUNNELS_URL"] = "ws://localhost:4567";
    const wss = new WebSocketServer({ port: 4567 });
    let _ws: WebSocket | undefined = undefined;
    const messages = new Promise((resolve) => {
      wss.on("connection", (ws) => {
        _ws = ws;
        ws.on("message", (message) => {
          const data = JSON.parse(message.toString("utf8"));
          if (data.action === "INITIALIZE") {
            expect(data).toStrictEqual({"action":"INITIALIZE"});
            ws.send(JSON.stringify({
              url: "https://example.com",
              subdomain: "example",
              action: "INITIALIZED"
            }));
          } else if (data.action === "FORWARD_RESPONSE") {
            expect(data.requestId).toBe("123");
            expect(data.status).toBe(200);
            resolve(true);
          } else {
            throw "Invalid action"
          }
        });
      });
    });

    const server = http.createServer(function (req, res) {
      if (req.method == "GET") {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("OK");
      }
    }).listen(4568);

    const res = await connect("http://localhost:4568");
    expect(res.url).toBe("https://example.com");

    if (_ws !== undefined) {
      const ws = _ws as WebSocket;
      ws.send(JSON.stringify({
        action: "FORWARD_REQUEST",
        requestId: "123",
        path: "/",
        method: "GET",
      }));
    }

    await messages;

    wss.close();
    server.close();
  });
});