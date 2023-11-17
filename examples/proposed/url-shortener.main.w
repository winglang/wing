bring cloud;
bring math;
bring http;

class UrlShortener {
  lookup: cloud.Bucket;

  new() {
    // map from ids to urls
    this.lookup = new cloud.Bucket() as "IdLookup";
  }

  // Generates a short id for the given url.
  pub inflight getId(url: str): str {
    let id = this._makeId();
    this.lookup.put(id, url);
    return id;
  }

  // Get the url for the given id. Returns nil if the id is invalid.
  pub inflight getUrl(id: str): str? {
    return this.lookup.tryGet(id);
  }

  inflight _makeId(): str {
    let ALPHANUMERIC_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let var id = "";
    for i in 0..5 {
      let randomIndex = math.floor(math.random() * ALPHANUMERIC_CHARS.length);
      id = id + ALPHANUMERIC_CHARS.at(randomIndex);
    }
    return id;
  }
}

class UrlShortenerApi {
  pub api: cloud.Api;
  shortener: UrlShortener;

  new(shortener: UrlShortener) {
    this.shortener = shortener;
    this.api = new cloud.Api();

    this.api.post("/create", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let var requestUrl = "";
      try {
        requestUrl = str.fromJson(Json.parse(req.body).get("url"));
      } catch e {
        log(e);
        return cloud.ApiResponse {
          status: 400,
          body: Json.stringify(Json {
            "error": "missing url field",
          }),
        };
      }
      log("Generating shortened URL for {requestUrl}");

      let id = this.shortener.getId(requestUrl);

      // return the shortened url
      let shortenedUrl = "{this.api.url}/u/\{id}";
      log("Shortened URL: {shortenedUrl}");
      return cloud.ApiResponse {
        status: 200,
        body: Json.stringify(Json {
          "shortenedUrl": shortenedUrl,
        }),
      };
    });

    this.api.get("/u/\{id}", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let id = req.vars.get("id");
      let fullUrl = this.shortener.getUrl(id);

      if let fullUrl = fullUrl {
        return cloud.ApiResponse {
          status: 302,
          headers: Map<str>{
            "Content-Type" => "text/xml",
            "Location" => fullUrl
          }
        };
      } else {
        return cloud.ApiResponse {
          status: 404,
          body: Json.stringify(Json {
            "error": "url not found",
          }),
        };
      }
    });
  }
}

let urlShortener = new UrlShortener();
let urlShortenerApi = new UrlShortenerApi(urlShortener);

// --- tests ---

let TEST_URL = "https://news.ycombinator.com/";

test "shorten url" {
  let response = http.post("{urlShortenerApi.api.url}/create", body: Json.stringify({ url: TEST_URL }));
  let newUrl = str.fromJson(Json.parse(response.body).get("shortenedUrl"));
  assert(newUrl.startsWith(urlShortenerApi.api.url));
}

test "shorten same url twice" {
  let response1 = http.post("{urlShortenerApi.api.url}/create", body: Json.stringify({ url: TEST_URL }));
  let newUrl1 = Json.parse(response1.body).get("shortenedUrl").asStr();
  let response2 = http.post("{urlShortenerApi.api.url}/create", body: Json.stringify({ url: TEST_URL }));
  let newUrl2 = Json.parse(response2.body).get("shortenedUrl").asStr();
  assert(newUrl1 != newUrl2);
}

test "redirect sends to correct page" {
  let createResponse = http.post("{urlShortenerApi.api.url}/create", body: Json.stringify({ url: TEST_URL }));
  let newUrl = Json.parse(createResponse.body).get("shortenedUrl").asStr();
  let redirectedResponse = http.get(newUrl);
  assert(redirectedResponse.body.contains("<title>Hacker News</title>"));
}

test "invalid short url" {
  let response = http.get("{urlShortenerApi.api.url}/u/invalid");
  assert(response.body.contains("url not found"));
}
