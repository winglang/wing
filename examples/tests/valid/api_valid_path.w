bring cloud;

let api = new cloud.Api();


let handler = inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    body: "ok",
    status: 200
  };
};

// invalid paths:
try {
  api.get("/test/{sup:er/:annoying//path}", handler);
} catch error {
  assert(error == "Invalid route /test/{sup:er/:annoying//path}. Routes and params should consist of alpha-numeric characters only.");
}

try {
  api.get("/test/{::another:annoying:path}", handler);
} catch error {
  assert(error == "Invalid route /test/{::another:annoying:path}. Routes and params should consist of alpha-numeric characters only.");
}

try {
  api.get("/test/n0t_alphanumer1cPa:th", handler);
} catch error {
  assert(error == "Invalid route /test/n0t_alphanumer1cPa:th. Routes and params should consist of alpha-numeric characters only.");
}

try {
  api.get("/test/path/{with}/{two:invali4d#}/variables", handler);
} catch error {
  assert(error == "Invalid route /test/path/{with}/{two:invali4d#}/variables. Routes and params should consist of alpha-numeric characters only.");
}

try {
  api.get("/test/path/{unclosed", handler);
} catch error {
  assert(error == "Invalid route /test/path/{unclosed. Routes and params should consist of alpha-numeric characters only.");
}

try {
  api.get("/test/m{issplaced}", handler);
} catch error {
  assert(error == "Invalid route /test/m{issplaced}. Routes and params should consist of alpha-numeric characters only.");
}

try {
  api.get("/test/{misspla}ced", handler);
} catch error {
  assert(error == "Invalid route /test/{misspla}ced. Routes and params should consist of alpha-numeric characters only.");
}
try {
  api.get("/test/{}/empty", handler);
} catch error {
  assert(error == "Invalid route /test/{}/empty. Routes and params should consist of alpha-numeric characters only.");
}

// valid paths
api.get("/test", handler);
api.get("/test/alphanumer1cPa_th", handler);
api.get("/test/regular/path", handler);
api.get("/test/path/{with}/two/{variable_s}/f?bla=5&b=6", handler);
api.get("/test/param/is/{last}", handler);
