export const HTTP_METHODS = [
  "GET",
  "HEAD",
  "POST",
  "PUT",
  "DELETE",
  "CONNECT",
  "OPTIONS",
  "PATCH",
];

export const HTTP_HEADERS = {
  accept: [
    "text/html",
    "text/plain",
    "application/json",
    "application/xml",
    "application/javascript",
    "application/octet-stream",
    "multipart/form-data",
    "application/x-www-form-urlencoded",
  ],
  "accept-charset": ["utf8", "iso-8859-1", "windows-1252"],
  "accept-encoding": ["gzip", "deflate", "br"],
  authorization: [],
  "cache-control": [
    "no-cache",
    "no-store",
    "max-age=<seconds>",
    "max-stale=<seconds>",
    "min-fresh=<seconds>",
    "only-if-cached",
  ],
  connection: ["keep-alive", "close"],
  "content-length": [],
  "content-type": [
    "application/json",
    "application/x-www-form-urlencoded",
    "multipart/form-data",
  ],
  cookie: [],
  origin: [],
  "user-agent": [],
};

export interface ApiResponseHeader {
  key: string;
  value: string;
}

export interface ApiResponse {
  status: number;
  statusText: string;
  textResponse: string;
  duration: number;
  headers: ApiResponseHeader[];
}
