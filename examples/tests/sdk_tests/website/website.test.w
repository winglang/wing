bring cloud;
bring http;
bring fs;

let w = new cloud.Website(path: "./website");
let config = Json { json: 1 };
let htmlContent = "<html>Hello World!</html>";
 
let indexFile = fs.readFile("{w.path}/index.html");
let otherFile = fs.readFile("{w.path}/inner-folder/other.html");

w.addJson("config.json", config);
w.addFile("another-file.html", htmlContent, contentType: "text/html");


// asserting the website path exists and points to the right folder
assert(w.path.endsWith("sdk_tests/website/website") || w.path.endsWith("sdk_tests\\website\\website"));


test "access files on the website" {
    assert(http.get(w.url).body == indexFile);
    assert(http.get(w.url + "/inner-folder/other.html").body == otherFile);
    assert(http.get(w.url + "/config.json").body == Json.stringify(config));
    assert(http.get(w.url + "/another-file.html").body == htmlContent);

}  
