bring cloud;

let api = new cloud.Api();


let handler = inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    body: "ok",
    status: 200
  };
};

let testInvalidPath = (path:str) => {
  let var error = "";
  let expected = "Invalid path ${path}. Url cannot contain \":\", params contains only alpha-numeric chars or \"_\".";
  try {
    api.get(path, handler);
  } catch e {
    error = e;
  }
  assert(error == expected);
};

let testValidPath = (path:str) => {
  let var error = "";
  try {
    api.get(path, handler);
  } catch e {
    error = e;
  }
  assert(error == "");
};

//invalid paths
testInvalidPath("/test/{sup:er/:annoying//path}");
testInvalidPath("/test/{::another:annoying:path}");
testInvalidPath("/test/n0t_alphanumer1cPa:th");
testInvalidPath("/test/path/{with}/{two:invali4d#}/variables");
testInvalidPath("/test/path/{unclosed");
testInvalidPath("/test/m{issplaced}");
testInvalidPath("/test/{misspla}ced");
testInvalidPath("/test/{}/empty");
testInvalidPath("/{sup:er/:annoying//path}");
testInvalidPath("/{::another:annoying:path}");
testInvalidPath("/n0t_alphanumer1cPa:th");
testInvalidPath("/{with}/{two:invali4d#}/variables");
testInvalidPath("/{unclosed");
testInvalidPath("/m{issplaced}");
testInvalidPath("/{misspla}ced");
testInvalidPath("test");
testInvalidPath("/{}/empty");
testInvalidPath("/{}");


// valid paths
testValidPath("/test");
testValidPath("/test/alphanumer1cPa_th");
testValidPath("/test/regular/path");
testValidPath("/test/pa-th/{with}/two/{variable_s}/f?bla=5&b=6");
testValidPath("/test/param/is/{last}");
testValidPath("/test/{param}");
testValidPath("/{param}");
testValidPath("/t/{param}");
testValidPath("/test/regular/path/{param}");
testValidPath("/test/segment1/{param1}/segment2?query1=value1?query2=value2");
testValidPath("/test/segment1/segment2?query=value1&query2=value2");
