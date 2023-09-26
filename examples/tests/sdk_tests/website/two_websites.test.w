bring cloud;
bring http;


let w1 = new cloud.Website(path: "./website");
let w2 = new cloud.Website(path: "./website") as "website-2";


test "deploying two websites" {
    assert(http.get(w1.url).ok);
    assert(http.get(w2.url).ok);
} 