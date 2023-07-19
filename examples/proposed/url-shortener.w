bring cloud;
bring math;
bring http;

let ALPHANUMERIC_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

class UrlShortener {
  urlLookup: cloud.Bucket;
  idLookup: cloud.Bucket;

  init() {
    // map from urls to ids
    this.urlLookup = new cloud.Bucket() as "UrlLookup";

    // map from ids to urls
    this.idLookup = new cloud.Bucket() as "IdLookup";
  }

  // Returns a short id for the given url. Creates a new id if one does not
  // already exist.
  //
  // In the current implementation, when a new URL is shortened, two
  // transactions are performed:
  //
  // 1. The url is added to the urlLookup bucket.
  // 2. The id is added to the idLookup bucket.
  //
  // If the second transaction fails, the first transaction is not rolled
  // back. This means that the urlLookup bucket may contain urls that do
  // not have a corresponding id in the idLookup bucket. This is not a
  // problem, since `getId` will only return a shortened ID once both
  // transactions have completed successfully.
  inflight getId(url: str): str {
    let id = this.urlLookup.tryGet(url);
    if let id = id {
      // ensure that the id exists in idLookup
      if !this.idLookup.exists(id) {
        this.idLookup.put(id, url);
      }
      return id;
    }
  
    let newId = this._makeId();

    // (transaction 1)
    this.urlLookup.put(url, newId);

    // (transaction 2)
    this.idLookup.put(newId, url);

    return newId;
  }

  // Get the url for the given id. Returns nil if the url does not have a
  // corresponding id.
  inflight getUrl(id: str): str? {
    return this.idLookup.tryGet(id);
  }

  inflight _makeId(): str {
    let var id = "";

    for i in 0..5 {
      let randomIndex = math.floor(math.random() * ALPHANUMERIC_CHARS.length);
      id = id + ALPHANUMERIC_CHARS.at(randomIndex);
    }

    return id;
  }
}

class UrlShortenerApi {
  api: cloud.Api;
  shortener: UrlShortener;

  init(shortener: UrlShortener) {
    this.shortener = shortener;
    this.api = new cloud.Api();

    this.api.post("/create", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let var requestUrl = "";
      try {
        if let body = req.body {
          requestUrl = str.fromJson(Json.parse(body).get("url"));
        }
      } catch e {
        log(e);
        return cloud.ApiResponse {
          status: 400,
          body: Json.stringify(Json {
            "error": "missing url field",
          }),
        };
      }
      log("Generating shortened URL for ${requestUrl}");

      let id = this.shortener.getId(requestUrl);

      // return the shortened url
      let shortenedUrl = "${this.api.url}/u/${id}";
      log("Shortened URL: ${shortenedUrl}");
      return cloud.ApiResponse {
        status: 200,
        body: Json.stringify(Json {
          "shortenedUrl": shortenedUrl,
        }),
      };
    });

    this.api.get("/u/{id}", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
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
  let response = http.post("${urlShortenerApi.api.url}/create", body: Json.stringify({ url: TEST_URL }));
  let newUrl = str.fromJson(Json.parse(response.body ?? "").get("shortenedUrl"));
  assert(newUrl.startsWith(urlShortenerApi.api.url));
}

test "shorten url twice" {
  let response1 = http.post("${urlShortenerApi.api.url}/create", body: Json.stringify({ url: TEST_URL }));
  let newUrl1 = Json.tryParse(response1.body ?? "")?.get("shortenedUrl")?.asStr();
  let response2 = http.post("${urlShortenerApi.api.url}/create", body: Json.stringify({ url: TEST_URL }));
  let newUrl2 = Json.tryParse(response2.body ?? "")?.get("shortenedUrl")?.asStr();
  assert(newUrl1 == newUrl2);
}

test "redirect sends to correct page" {
  let createResponse = http.post("${urlShortenerApi.api.url}/create", body: Json.stringify({ url: TEST_URL }));
  if let newUrl = Json.tryParse(createResponse.body ?? "")?.get("shortenedUrl")?.asStr() {
    let redirectedResponse = http.get(newUrl);
    assert(redirectedResponse.body?.contains("<title>Hacker News</title>") ?? false);
  } else {
    assert(false);
  }
}

test "invalid short url" {
  let response = http.get("${urlShortenerApi.api.url}/u/invalid");
  assert(response.body?.contains("url not found") ?? false);
}
