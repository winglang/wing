---
title: Bytes
id: bytes
slug: /bytes
sidebar_label: Bytes
description: Hash values in Wing with SHA256
keywords: [Wing language, Hash, SHA256]
image: /img/wing-by-example.png
---

When working with binary files like images, audio, or other binary formats, you often need to manipulate data at the byte level.

```js playground example title="main.w"
// get bytes from raw value
let rawData: bytes = bytes.fromRaw([104, 101, 108, 108, 111]);

// get the bytes from a string
let rawString: bytes = bytes.fromString("hello");

// get bytes from base64 encoded value
let base64: bytes = bytes.fromBase64("aGVsbG8=");

// get bytes from hex value
let hex: bytes = bytes.fromHex("68656c6c6f");

log(Json.stringify(rawData));
log(Json.stringify(rawString));
log(Json.stringify(base64));
log(Json.stringify(hex));
```

```bash title="Wing console output"
# Run locally with wing console
{"_data":{"0":104,"1":101,"2":108,"3":108,"4":111}}
{"_data":{"0":104,"1":101,"2":108,"3":108,"4":111}}
{"_data":{"0":104,"1":101,"2":108,"3":108,"4":111}}
{"_data":{"0":104,"1":101,"2":108,"3":108,"4":111}}
```




