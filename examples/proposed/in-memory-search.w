bring cloud;

// high level concept:
// generate a large search index at compile time, and spread the search index
// data (and the work of processing through it) across N cloud functions.
// when a request to the search engine is made, all N cloud functions are
// called, and their results are joined.
//
// inspiration: https://boyter.org/posts/abusing-aws-to-make-a-search-engine/

let search_index_1: Map<Array<str>> = {
  "apple": ["fruits.com"],
  "banana": ["fruits.com", "dole.com"],
};
let search_index_2: Map<Array<str>> = {
  "cherry": ["fruits.com"],
  "donut": ["krispykreme.com", "bakery.com"],
};
let search_index_3: Map<Array<str>> = {
  "eclair": ["bakery.com"],
  "fruit": ["fruits.com"],
};

let search_index_chunks = [
  search_index_1,
  search_index_2,
  search_index_3,
  // ...
];

struct WebsiteSummary {
  url: str;
  title: str;
  description: str;
}

let lookup_website = inflight (url: str): WebsiteSummary => {
  // pseudocode:
  // - fetch url
  // - extract title from <title> tag
  // - extract description from <meta name="description"> tag
};

let make_worker = (chunk: Map<Array<str>>): cloud.Function => {
  return new cloud.Function(inflight (terms: Array<str>): Array<str> => {
    let website_urls = new MutSet<str>();
    for term in terms {
      if chunk.has(term) {
        for url in chunk[term] {
          website_urls.add(url);
        }
      }
    }
    return website_urls.to_arr(); // converts MutSet<str> to Array<str>
  });
};

let workers = search_index_chunks.map(search_index_chunks); // inferred: Array<cloud.Function>

let api = new cloud.Api();
api.on_post("/search", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
  let terms_str = request.query_params.get("terms"); // "cherry,donut"
  let terms = terms_str.split(",");
  let worker_calls = new MutArray<Promise<Array<str>>>();
  for worker in workers {
    worker_calls.append(defer worker.invoke(terms));
  }

  // wait for all promises in the array to resolve
  // `worker_results` is inferred as Array<Array<str>>
  let worker_results = Promise.all(worker_calls);
  let website_urls = new Set<str>(worker_results.flatten());
  let summaries = new MutArray<WebsiteSummary>();
  for url in website_urls {
    summaries.append(lookup_website(url));
  }
  return {
    status_code: 200,
    payload: summaries.to_json(),
  };
});
