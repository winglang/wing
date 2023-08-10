bring cloud;
bring http;


let w1 = new cloud.Website(path: "./website");
let w2 = new cloud.Website(path: "./website") as "website-2";


test "deploying two websites" {
    let var url1 = w1.url;
    if (!url1.startsWith("http")) {
      url1 = "http://" + url1;
    }
    let var url2 = w2.url;
    if (!url2.startsWith("http")) {
      url2 = "http://" + url2;
    }
    
    assert(http.get(url1).ok);
    assert(http.get(url2).ok);
} 