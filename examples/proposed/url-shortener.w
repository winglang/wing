bring cloud;

let EMPTY_JSON = Json "empty";

class Utils {
  extern "./url-shortener.js" inflight makeId(): str;
  extern "./url-shortener.js" inflight fetch(url: str, method: str, body: Json?): str;
}
let utils = new Utils();

class UrlShortener {
  urlLookup: cloud.Bucket;
  idLookup: cloud.Bucket;

  init() {
    // map from urls to ids
    this.urlLookup = new cloud.Bucket() as "UrlLookup";

    // map from ids to urls
    this.idLookup = new cloud.Bucket() as "IdLookup";
  }

  // Returns an id for the given long url. Creates a new id if one does not
  // already exist.
  inflight getId(url: str): str {
    let id = this.urlLookup.tryGet(url);
    if let id = id {
      return id;
    }
  
    let newId = utils.makeId();
    this.idLookup.put(newId, url);
    this.urlLookup.put(url, newId);
    return newId;
  }

  // Get the url for the given id. Returns nil if the url does not have a
  // corresponding id.
  inflight getUrl(id: str): str? {
    if this.idLookup.exists(id) {
      return this.idLookup.get(id);
    } else {
      return nil;
    }
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
        // TODO: use `x ?? throw()` syntax
        requestUrl = str.fromJson((req.body ?? EMPTY_JSON).get("url"));
      } catch e {
        log(e);
        return cloud.ApiResponse {
          status: 400,
          body: Json {
            "error": "missing url field",
          },
        };
      }
      log("Generating shortened URL for ${requestUrl}");

      let id = this.shortener.getId(requestUrl);

      // return the shortened url
      let shortenedUrl = "${this.api.url}/u/${id}";
      log("Shortened URL: ${shortenedUrl}");
      return cloud.ApiResponse {
        status: 200,
        body: Json {
          "shortenedUrl": shortenedUrl,
        },
      };
    });

    this.api.get("/u/{id}", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let id = req.vars.get("id");
      let fullUrl = this.shortener.getUrl(id);

      if let fullUrl = fullUrl {
        return cloud.ApiResponse {
          status: 302,
          headers: Map<str>{
            "Content-Type": "text/xml",
            Location: fullUrl
          }
        };
      } else {
        return cloud.ApiResponse {
          status: 404,
          body: Json {
            "error": "url not found",
          },
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
  let response = utils.fetch("${urlShortenerApi.api.url}/create", "POST", Json { url: TEST_URL });
  let newUrl = str.fromJson(Json.parse(response).get("shortenedUrl"));
  assert(newUrl.startsWith(urlShortenerApi.api.url));
}

test "shorten url twice" {
  let response1 = utils.fetch("${urlShortenerApi.api.url}/create", "POST", Json { url: TEST_URL });
  let newUrl1 = str.fromJson(Json.parse(response1).get("shortenedUrl"));

  let response2 = utils.fetch("${urlShortenerApi.api.url}/create", "POST", Json { url: TEST_URL });
  let newUrl2 = str.fromJson(Json.parse(response2).get("shortenedUrl"));
  assert(newUrl1 == newUrl2);
}

test "redirect sends to correct page" {
  let createResponse = utils.fetch("${urlShortenerApi.api.url}/create", "POST", Json { url: TEST_URL });
  let newUrl = str.fromJson(Json.parse(createResponse).get("shortenedUrl"));

  let redirectedResponse = utils.fetch(newUrl, "GET");
  assert(redirectedResponse.contains("<title>Hacker News</title>"));
}

test "invalid short url" {
  let response = utils.fetch("${urlShortenerApi.api.url}/u/invalid", "GET");
  assert(response.contains("url not found"));
}
