bring http;

test "parseUrl()" {
    let assertThrows = (expected: str, block: (): void) => {
        let var error = false;
        try {
            block();
        } catch actual {
            assert(actual == expected);
            error = true;
        }
        assert(error);
    };

    let INVALID_URL_STRING = "hello world";
    let INVALID_URL_ERROR = "Invalid URL: {INVALID_URL_STRING}";
    let URL_STRING = "http://username:password@www.example.com:3000/pathname?search=test#hash";

    let urlStruct = {
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
    assert(urlStruct == parsedUrlStruct);

    assertThrows(INVALID_URL_ERROR, () => {
        let invalidUrlStruct = http.parseUrl(INVALID_URL_STRING);
    });
}

test "formatUrl()" {
    let assertThrows = (expected: str, block: (): void) => {
        let var error = false;
        try {
            block();
        } catch actual {
            assert(actual == expected);
            error = true;
        }
        assert(error);
    };

    let UNABLE_TO_FORMAT_URL_STRUCT_ERROR = "Unable to format URL Struct: Invalid URL";
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

    let invalidUrlStruct = {
        href: "hello world",
        protocol: urlStruct.protocol,
        host: urlStruct.host,
        hostname: urlStruct.hostname,
        port: urlStruct.hostname,
        pathname: urlStruct.pathname,
        search: urlStruct.search,
        hash: urlStruct.hash,
        origin: urlStruct.origin,
        username: urlStruct.username,
        password: urlStruct.password,
    };

    assertThrows(UNABLE_TO_FORMAT_URL_STRUCT_ERROR, () => {
        http.formatUrl(invalidUrlStruct);
    });
}