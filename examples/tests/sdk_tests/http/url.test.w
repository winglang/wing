bring http;

test "parseUrl()" {
    let URL_STRING = "http://username:password@www.example.com:3000/pathname?search=test#hash";

    let checkUrlStruct = {
        href: URL_STRING,
        protocol: "http:",
        host: "www.example.com:3000",
        hostname: "www.example.com",
        port: "3000",
        pathname: "/pathname",
        search: "?search=test",
        hash: "#hash",
        origin: "http://www.example.com:3000",
        username: "username",
        password: "password",
    };

    let parsedUrlStruct = http.parseUrl(URL_STRING);

    assert(parsedUrlStruct == checkUrlStruct);
}

test "formatUrl()" {
    let urlStruct = http.parseUrl("https://a:b@測試.com/path?query=1#fragment");

    // the domain part is Punycode-encoded because it contains non-ASCII characters
    assert(http.formatUrl(urlStruct, { unicode: false }) == "https://a:b@xn--g6w251d.com/path?query=1#fragment");
    assert(http.formatUrl(urlStruct, { unicode: true }) == "https://a:b@測試.com/path?query=1#fragment");

    assert(http.formatUrl(urlStruct, { fragment: false }) == "https://a:b@xn--g6w251d.com/path?query=1");
    assert(http.formatUrl(urlStruct, { fragment: true }) == "https://a:b@xn--g6w251d.com/path?query=1#fragment");

    assert(http.formatUrl(urlStruct, { search: false }) == "https://a:b@xn--g6w251d.com/path#fragment");
    assert(http.formatUrl(urlStruct, { search: true }) == "https://a:b@xn--g6w251d.com/path?query=1#fragment");

    assert(http.formatUrl(urlStruct, { auth: false }) == "https://xn--g6w251d.com/path?query=1#fragment");
    assert(http.formatUrl(urlStruct, { auth: true }) == "https://a:b@xn--g6w251d.com/path?query=1#fragment");
}