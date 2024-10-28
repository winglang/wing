---
title: URL parsing
id: url-parsing
slug: /url-parsing
sidebar_label: URL parsing
description: Parse urls in Wing
keywords: [Wing language, URL]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/27-url-parsing.md
---

Parse urls using the http module, works with inflight closures.

```js playground example title="main.w"
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
```

```bash title="Wing console output"
# Run locally with wing console and invoke the cloud function
host.com
host.com:5432
#f
null
user
pass
/path
5432
postgres:
?k=v
```




