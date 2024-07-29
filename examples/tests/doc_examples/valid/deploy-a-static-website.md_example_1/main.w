// This file was auto generated from an example found in: deploy-a-static-website.md_example_1
// Example metadata: {"valid":true}
bring cloud;
bring util;
bring http;
bring expect;

let website = new cloud.Website(
  path: "./static",
);

let api = new cloud.Api({
  cors: true,
  corsOptions: {
    allowHeaders: ["*"],
    allowMethods: [http.HttpMethod.POST],
  },
});
website.addJson("config.json", { api: api.url });

let counter = new cloud.Counter() as "website-counter";

api.post("/hello-static", inflight (request) => {
  return {
    status: 200,
    headers: {
      "Content-Type" => "text/html",
      "Access-Control-Allow-Origin" => "*",
    },
    body: "<div id=\"hello\" class=\"mt-4\">Hello {counter.inc()}</div>",
  };
});

