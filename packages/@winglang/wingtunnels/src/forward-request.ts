import { type WebSocket } from "ws";
import { request, RequestOptions, IncomingMessage } from "http";
import { request as httpsRequest } from "https";
import { ForwardRequestMessage } from "./messages.js";
import { forwardResponse } from "./forward-response.js";
import debug from "debug";
import { format, parse } from "url";
const log = debug("wing:tunnels");

export interface ForwardRequestMessageProps {
  ws: WebSocket;
  port: number;
  message: ForwardRequestMessage;
  hostname?: string;
}

export default async function forwardRequest({ message, ws, port, hostname }: ForwardRequestMessageProps) {
  const { requestId, path, headers, method, body } = message;

  let requestBody : Buffer | undefined = undefined;
  if (body) {
    requestBody = Buffer.from(body, "base64");
    headers["Content-length"] = requestBody.length.toString();
  }

  let hs = hostname;
  let p = path;
  let h = headers;
  let requestFn = request;

  // For testing
  if (hs?.includes("https://")) {
    hs = hs.replace("https://", "");
    requestFn = httpsRequest;

    if (hs?.includes("/")) {
      const parts = hs.split("/");
      hs = parts[0];
      p = "/" + parts.slice(1).join("/")
      if (path !== "/") {
        p = p + path;
      }
    }

    delete h["Via"];
    delete h["Host"]
  }

  const url = parse(format({
    protocol: "http",
    hostname: hs ?? "localhost",
    pathname: p,
    query: message.query,
  }), true);

  const requestOptions : RequestOptions = {
    hostname: url.hostname,
    method,
    port,
    path: url.path,
    headers: h,
  };

  log("request", requestOptions, body);

  const req = requestFn(requestOptions, (response : IncomingMessage) => {
    log("response status", response.statusCode);
    let responseBody : Buffer;
    response.on('data', (chunk: Buffer) => {
      if (typeof responseBody === 'undefined') {
        responseBody = chunk;
      } else {
        responseBody = Buffer.concat([responseBody, chunk]);
      }
    });

    response.on("error", (err) => {
      log("response error", err.message);
    });

    response.on('end', () => {
      log("response", response.statusCode, response.headers, responseBody);
      forwardResponse({ ws, message: {
        action: "FORWARD_RESPONSE",
        requestId,
        status: response.statusCode,
        path,
        method,
        headers: response.headers,
        body: Buffer.isBuffer(responseBody) ? responseBody.toString('base64') : undefined
      }});
    })
  });

  if (requestBody && body) {
    req.write(requestBody);
    log("request body write", requestBody)
  }

  req.on('error', (error : any) => {
    log("request error", error);
  });

  req.end();
}