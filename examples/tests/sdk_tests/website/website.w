bring cloud;

let w = new cloud.Website(path: "./website");
let config = Json { json: 1 };

class Util {
  extern "../external/http.js" static inflight http(url: str): Json;
  extern "../external/fs.js" static readFile(path: str): str;    
}
 
let indexFile = Util.readFile("./website/website/index.html");
let otherFile = Util.readFile("./website/website/inner-folder/other.html");

w.addJson("config.json", config);

// asserting the website path exists and points to the right folder
assert(w.path.endsWith("sdk_tests/website/website") || w.path.endsWith("sdk_tests\\website\\website"));


test "access files on the website" {
    //TODO doesn't work on tf-aws, w.url is undefined https://github.com/winglang/wing/issues/2829
    assert(Json.stringify(Util.http(w.url).get("body")) == Json.stringify(indexFile));
    assert(Json.stringify(Util.http(w.url + "/inner-folder/other.html").get("body")) == Json.stringify(otherFile));
    assert(Json.stringify(Util.http(w.url + "/config.json").get("body")) == Json.stringify(Json.stringify(config)));
}  
