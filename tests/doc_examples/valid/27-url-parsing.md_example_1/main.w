// This file was auto generated from an example found in: 27-url-parsing.md_example_1
// Example metadata: {"valid":true}
bring http;
bring cloud;

new cloud.Function(inflight () => {
  let parts = http.parseUrl("postgres://user:pass@host.com:5432/path?k=v#f");

  log(parts.hostname);
  log(parts.host);
  log(parts.hash);
  log(parts.origin);
  log(parts.username);
  log(parts.password);
  log(parts.pathname);
  log(parts.port);
  log(parts.protocol);
  log(parts.search);

});
