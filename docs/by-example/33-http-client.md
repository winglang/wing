---
title: HTTP Client
id: http-client
slug: /http-client
sidebar_label: HTTP Client
description: Directories
keywords: [Wing language, HTTP]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/33-http-client.md
---

The Wing standard library comes with [HTTP support](/docs/api/standard-library/http/api-reference).

In this example we’ll use it to issue a simple HTTP request.

```js playground example title="main.w"
bring http;
bring cloud;

struct Pokemon {
  id: num;
  name: str;
  order: num;
  weight: num;
}

new cloud.Function(inflight () => {
  let x = http.get("https://pokeapi.co/api/v2/pokemon/ditto");

  // response status
  log(x.status);

  // parse string response as a JSON object
  let data = Json.parse(x.body);

  // cast JSON response into struct
  let ditto = Pokemon.fromJson(data);
  log(ditto.name);
});
```

```bash title="Wing console output"
# Run locally with wing console
200
ditto
```
