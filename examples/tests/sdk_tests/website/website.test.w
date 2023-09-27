bring cloud;
bring http;

let w = new cloud.Website(path: "./website");
let config = Json { json: 1 };
let htmlContent = "<html>Hello World!</html>";

class Util {
  extern "../external/fs.js" pub static readFile(path: str): str;    
}
 
let indexFile = Util.readFile("./website/website/index.html");
let otherFile = Util.readFile("./website/website/inner-folder/other.html");

w.addJson("config.json", config);
w.addFile("another-file.html", htmlContent, "text/html");


// asserting the website path exists and points to the right folder
assert(w.path.endsWith("sdk_tests/website/website") || w.path.endsWith("sdk_tests\\website\\website"));


test "access files on the website" {
    assert(http.get(w.url).body == indexFile);
    assert(http.get(w.url + "/inner-folder/other.html").body == otherFile);
    assert(http.get(w.url + "/config.json").body == Json.stringify(config));
    assert(http.get(w.url + "/another-file.html").body == htmlContent);

}  
