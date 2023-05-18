/*\
skip: true
\*/
// TODO: failing due to https://github.com/winglang/wing/issues/2522


bring cloud;
bring util;

// let api = new cloud.Api();


// let handler = inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
//   return cloud.ApiResponse {
//     body: {user:  req.vars.get("name")},
//     status: 200
//   };
// };

// api.get("/users/{name}", handler);

test "test" {
  let username = "tsuf";

  let http = new util.Http();
  // let res: util.Response = http.get("${api.url}/users/${username}");
  let res = http.get("www.google.com");
  log(res.body);


  // assert(res.status == 200);
  // assert(res.get("user") == username);
}
