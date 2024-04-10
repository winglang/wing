bring cloud;
bring expect;

let api = new cloud.Api();
let urlRegex = regex.compile("https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]\{1,256\}\\.[a-zA-Z0-9()]\{1,6\}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)");

// Verify the url is not a valid url (because it's a token)
expect.equal(urlRegex.test(api.url), false);

let tokenLength = api.url.length;


test "phase independent method on string evaluated inflight" {
  // Make sure api.url isn't a token but evaled inflight
  expect.equal(urlRegex.test(api.url), false);
  
  // Call a method on the url (should be called inflight)
  expect.equal(api.url.startsWith("http"), true);

  // Call the length property (should be called inflight) and make sure it's different than the preflight length
  expect.notEqual(api.url.length, tokenLength);
}