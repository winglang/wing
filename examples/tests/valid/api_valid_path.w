bring cloud;

let api = new cloud.Api();


let handler = inflight (req: cloud.ApiRequest) -> cloud.ApiResponse {
  return cloud.ApiResponse {
    body: "ok",
    status: 200
  };
};

let testInvalidPath = (path:str) -> void {
  let var error = "";
  let expected = "Invalid path ${path}. Url cannot contain \":\", params contains only alpha-numeric chars or \"_\".";
  try {
    api.get(path, handler);
  } catch e {
    error = e;
  }
  assert(error == expected);
};

let testValidPath = (path:str) -> void {
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
  

// valid paths
testValidPath("/test");
testValidPath("/test/alphanumer1cPa_th");
testValidPath("/test/regular/path");
testValidPath("/test/pa-th/{with}/two/{variable_s}/f?bla=5&b=6");
testValidPath("/test/param/is/{last}");
