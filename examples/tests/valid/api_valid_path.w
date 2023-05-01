bring cloud;

let api = new cloud.Api();


let handler = inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    body: "ok",
    status: 200
  };
};

let test_invalid_path = (path:str) => {
  let var error = "";
  let expected = "Invalid path ${path}. Url cannot contain \":\", params contains only alpha-numeric chars or \"_\".";
  try {
    api.get(path, handler);
  } catch e {
    error = e;
  }
  assert(error == expected);
};

let test_valid_path = (path:str) => {
  let var error = "";
  try {
    api.get(path, handler);
  } catch e {
    error = e;
  }
  assert(error == "");
};

//invalid paths
test_invalid_path("/test/{sup:er/:annoying//path}");
test_invalid_path("/test/{::another:annoying:path}");
test_invalid_path("/test/n0t_alphanumer1cPa:th");
test_invalid_path("/test/path/{with}/{two:invali4d#}/variables");
test_invalid_path("/test/path/{unclosed");
test_invalid_path("/test/m{issplaced}");
test_invalid_path("/test/{misspla}ced");
test_invalid_path("/test/{}/empty");
  

// valid paths
test_valid_path("/test");
test_valid_path("/test/alphanumer1cPa_th");
test_valid_path("/test/regular/path");
test_valid_path("/test/pa-th/{with}/two/{variable_s}/f?bla=5&b=6");
test_valid_path("/test/param/is/{last}");
