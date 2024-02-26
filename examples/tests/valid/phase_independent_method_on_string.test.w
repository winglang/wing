bring cloud;
bring regex;

let api = new cloud.Api();
let url_regex = "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]\{1,256\}\\.[a-zA-Z0-9()]\{1,6\}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)";

// Verify the url is not a valid url (because it's a token)
assert(!regex.match(url_regex, api.url));

let token_len = api.url.length;


test "phase independent method on string evaluated inflight" {
  // Make sure api.url isn't a token but evaled inflight
  assert(regex.match(url_regex, api.url));
  
  // Call a method on the url (should be called inflight)
  assert(api.url.startsWith("http"));

  // Call the length property (should be called inflight) and make sure it's different than the preflight length
  assert(api.url.length != token_len);
}