bring cloud;
bring expect;

let api = new cloud.Api() as "default api";

let handler = inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    body: "ok",
    status: 200
  };
};

let testInvalidPath = (path:str, apiInstance: cloud.Api?) => {
  let var error = "";
  let expected = "Invalid path {path}. Url parts can only contain alpha-numeric chars, \"-\", \"_\" and \".\". Params can only contain alpha-numeric chars and \"_\".";
  try {
    (apiInstance ?? api).get(path, handler);
  } catch e {
    error = e;
  }
  expect.equal(error, expected);
};


let testValidPath = (path:str, apiInstance: cloud.Api?) => {
  let var error = "";
  try {
    (apiInstance ?? api).get(path, handler);
  } catch e {
    error = e;
  }
  expect.equal(error, "");
};

//invalid paths
testInvalidPath("/test/:sup\{er/:annoying//path");
testInvalidPath("/test/\{::another:annoying:path}");
testInvalidPath("/test/n0t_alphanumer1cPa*th");
testInvalidPath("/test/path/:with/:two\{invali4d#/variables");
testInvalidPath("/test/path/:/empty");
testInvalidPath("/test/m:issplaced");
testInvalidPath("/test/misspla:/ced");
testInvalidPath("/:sup\{er/\{annoying//path}");
testInvalidPath("/:^^another^annoying^path");
testInvalidPath("/n0t_alphanumer1cPa\{th");
testInvalidPath("/:with/:two}invali4d#/variables");
testInvalidPath("/m:issplaced");
testInvalidPath("/missplaced:");
testInvalidPath("test");
testInvalidPath("/:/empty");
testInvalidPath("/:");
testInvalidPath("/:no.dots.here");


// valid paths
testValidPath("/test/path");
testValidPath("/test/alphanumer1cPa_th");
testValidPath("/test/regular/path");
testValidPath("/test/pa-th/:with/two/:variable_s/f?bla=5&b=6");
testValidPath("/test/param/is/:last");
testValidPath("/test/path/:param");
testValidPath("/:param");
testValidPath("/t/:param");
testValidPath("/test/regular/path/:param");
testValidPath("/test/segment1/:param1/segment2?query1=value1?query2=value2");
testValidPath("/test/segment1/segment2?query=value1&query2=value2");
testValidPath("/test/path.withDots");
testValidPath("/test/path/.withDots/:param/:param-dash/x");
testValidPath("/", new cloud.Api() as "api for root path");
