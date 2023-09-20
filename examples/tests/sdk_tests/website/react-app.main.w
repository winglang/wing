bring util;
bring ex;
bring cloud;
bring http;

let api = new cloud.Api();

api.get("/", inflight () => {
  return {body: "hi!", status: 200};
});

// the project isn't actually react (since it can make wing's size much larger) 
// but a mock with start and build commands
let website = new ex.ReactApp(
  projectPath: "./react-website", 
  buildDir: "/build/public",
  isDevRun: util.tryEnv("ENV") == "dev"
);

let preflightVariable = "preflight variable";
website.addEnvironmentVariable("apiUrl", api.url);
website.addEnvironmentVariable("anotherEnvVar", preflightVariable);

test "website is working" {
  let res = http.get(website.url);
  assert(res.ok);
  // unfortunately we can't test the env variables, since it's js and get added in the browser...
}

