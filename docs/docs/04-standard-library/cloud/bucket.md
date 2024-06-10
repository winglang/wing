---
title: Bucket
id: bucket
description: A built-in resource for handling object storage in the cloud.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    Object storage,
    Buckets,
  ]
sidebar_position: 1
---

The `cloud.Bucket` resource represents a container for storing data in the cloud.

Buckets are a common way to store arbitrary files (images, videos, etc.), but can also be used to store structured data like JSON or CSV files.

Buckets in the cloud use object storage, which is optimized for storing large amounts of data with high availability.
Unlike other kinds of storage like file storage, data is not stored in a hierarchical structure, but rather as a flat list of objects, each associated with a key.

## Usage

### Defining a bucket

```js
bring cloud;

let bucket = new cloud.Bucket(
  public: true, // optional, defaults to `false`
);
```

### Populating objects during deployment

If you have static data that you want to upload to the bucket each time your app is deployed, you can call the preflight method `addObject`:

```js
bring cloud;

let bucket = new cloud.Bucket();

bucket.addObject("my-file.txt", "Hello, world!");
```

### Using a bucket inflight

```js playground
bring cloud;

let bucket = new cloud.Bucket();

let bucketFunc = inflight () => {
  bucket.put("file.txt", "Hello, world!");
  bucket.putJson("person.json", Json { name: "Alice" });

  let fileData = bucket.get("file.txt");
  assert(fileData == "Hello, world!");

  let jsonData = bucket.getJson("person.json");
  assert(jsonData.get("name") == "Alice");

  let keys = bucket.list();
  assert(keys.at(0) == "file.txt");
  assert(keys.at(1) == "person.json");

  bucket.delete("file.txt");
};

new cloud.Function(bucketFunc);
```

### Run code on bucket events

You can use the preflight methods `onCreate`, `onUpdate`, and `onDelete` to define code that should run when an object is uploaded, updated, or removed from the bucket.
Use the `onEvent` method for responding to any event.

Each method creates a new `cloud.Function` resource which will be triggered by the given event type.

```js playground
bring cloud;

let store = new cloud.Bucket();
let copies = new cloud.Bucket() as "Backup";

store.onCreate(inflight (key: str) => {
  let data = store.get(key);
  if !key.endsWith(".log") {
    copies.put(key, data);
  }
});

store.onDelete(inflight (key: str) => {
  copies.delete(key);
  log("Deleted {key}");
});
```

## Target-specific details

### Simulator (`sim`)

Under the hood, the simulator uses a temporary local directory to store bucket data.

Note that bucket data is not persisted between simulator runs.

### AWS (`tf-aws` and `awscdk`)

The AWS implementation of `cloud.Bucket` uses [Amazon S3](https://aws.amazon.com/s3/).

### Azure (`tf-azure`)

The Azure implementation of `cloud.Bucket` uses [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview).

### GCP (`tf-gcp`)

The Google Cloud implementation of `cloud.Bucket` uses [Google Cloud Storage](https://cloud.google.com/storage).
## API Reference <a name="API Reference" id="API Reference"></a>

### Bucket <a name="Bucket" id="@winglang/sdk.cloud.Bucket"></a>

A cloud object store.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Bucket.Initializer"></a>

```wing
bring cloud;

new cloud.Bucket(props?: BucketProps);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Bucket.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.BucketProps">BucketProps</a></code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Bucket.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.BucketProps">BucketProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

##### Preflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Bucket.addFile">addFile</a></code> | Add a file to the bucket from system folder. |
| <code><a href="#@winglang/sdk.cloud.Bucket.addObject">addObject</a></code> | Add a file to the bucket that is uploaded when the app is deployed. |
| <code><a href="#@winglang/sdk.cloud.Bucket.onCreate">onCreate</a></code> | Run an inflight whenever a file is uploaded to the bucket. |
| <code><a href="#@winglang/sdk.cloud.Bucket.onDelete">onDelete</a></code> | Run an inflight whenever a file is deleted from the bucket. |
| <code><a href="#@winglang/sdk.cloud.Bucket.onEvent">onEvent</a></code> | Run an inflight whenever a file is uploaded, modified, or deleted from the bucket. |
| <code><a href="#@winglang/sdk.cloud.Bucket.onUpdate">onUpdate</a></code> | Run an inflight whenever a file is updated in the bucket. |

##### Inflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.copy">copy</a></code> | Copy an object to a new location in the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.delete">delete</a></code> | Delete an existing object using a key from the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.exists">exists</a></code> | Check if an object exists in the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.get">get</a></code> | Retrieve an object from the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.getJson">getJson</a></code> | Retrieve a Json object from the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.list">list</a></code> | Retrieve existing objects keys from the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.metadata">metadata</a></code> | Get the metadata of an object in the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.publicUrl">publicUrl</a></code> | Returns a url to the given file. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.put">put</a></code> | Put an object in the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.putJson">putJson</a></code> | Put a Json object in the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.rename">rename</a></code> | Move an object to a new location in the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.signedUrl">signedUrl</a></code> | Returns a signed url to the given file. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.tryDelete">tryDelete</a></code> | Delete an object from the bucket if it exists. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.tryGet">tryGet</a></code> | Get an object from the bucket if it exists If the bytes returned are not a valid UTF-8 string, an error is thrown. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.tryGetJson">tryGetJson</a></code> | Gets an object from the bucket if it exists, parsing it as Json. |

---

##### `addFile` <a name="addFile" id="@winglang/sdk.cloud.Bucket.addFile"></a>

```wing
addFile(key: str, path: str, encoding?: str): void
```

Add a file to the bucket from system folder.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.Bucket.addFile.parameter.key"></a>

- *Type:* str

The key or name to associate with the file.

---

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.Bucket.addFile.parameter.path"></a>

- *Type:* str

The path to the file on the local system.

---

###### `encoding`<sup>Optional</sup> <a name="encoding" id="@winglang/sdk.cloud.Bucket.addFile.parameter.encoding"></a>

- *Type:* str

The encoding to use when reading the file.

Defaults to "utf-8".

---

##### `addObject` <a name="addObject" id="@winglang/sdk.cloud.Bucket.addObject"></a>

```wing
addObject(key: str, body: str): void
```

Add a file to the bucket that is uploaded when the app is deployed.

TODO: In the future this will support uploading any `Blob` type or
referencing a file from the local filesystem.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.Bucket.addObject.parameter.key"></a>

- *Type:* str

---

###### `body`<sup>Required</sup> <a name="body" id="@winglang/sdk.cloud.Bucket.addObject.parameter.body"></a>

- *Type:* str

---

##### `onCreate` <a name="onCreate" id="@winglang/sdk.cloud.Bucket.onCreate"></a>

```wing
onCreate(fn: IBucketEventHandler, opts?: BucketOnCreateOptions): void
```

Run an inflight whenever a file is uploaded to the bucket.

###### `fn`<sup>Required</sup> <a name="fn" id="@winglang/sdk.cloud.Bucket.onCreate.parameter.fn"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IBucketEventHandler">IBucketEventHandler</a>

---

###### `opts`<sup>Optional</sup> <a name="opts" id="@winglang/sdk.cloud.Bucket.onCreate.parameter.opts"></a>

- *Type:* <a href="#@winglang/sdk.cloud.BucketOnCreateOptions">BucketOnCreateOptions</a>

---

##### `onDelete` <a name="onDelete" id="@winglang/sdk.cloud.Bucket.onDelete"></a>

```wing
onDelete(fn: IBucketEventHandler, opts?: BucketOnDeleteOptions): void
```

Run an inflight whenever a file is deleted from the bucket.

###### `fn`<sup>Required</sup> <a name="fn" id="@winglang/sdk.cloud.Bucket.onDelete.parameter.fn"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IBucketEventHandler">IBucketEventHandler</a>

---

###### `opts`<sup>Optional</sup> <a name="opts" id="@winglang/sdk.cloud.Bucket.onDelete.parameter.opts"></a>

- *Type:* <a href="#@winglang/sdk.cloud.BucketOnDeleteOptions">BucketOnDeleteOptions</a>

---

##### `onEvent` <a name="onEvent" id="@winglang/sdk.cloud.Bucket.onEvent"></a>

```wing
onEvent(fn: IBucketEventHandler, opts?: BucketOnEventOptions): void
```

Run an inflight whenever a file is uploaded, modified, or deleted from the bucket.

###### `fn`<sup>Required</sup> <a name="fn" id="@winglang/sdk.cloud.Bucket.onEvent.parameter.fn"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IBucketEventHandler">IBucketEventHandler</a>

---

###### `opts`<sup>Optional</sup> <a name="opts" id="@winglang/sdk.cloud.Bucket.onEvent.parameter.opts"></a>

- *Type:* <a href="#@winglang/sdk.cloud.BucketOnEventOptions">BucketOnEventOptions</a>

---

##### `onUpdate` <a name="onUpdate" id="@winglang/sdk.cloud.Bucket.onUpdate"></a>

```wing
onUpdate(fn: IBucketEventHandler, opts?: BucketOnUpdateOptions): void
```

Run an inflight whenever a file is updated in the bucket.

###### `fn`<sup>Required</sup> <a name="fn" id="@winglang/sdk.cloud.Bucket.onUpdate.parameter.fn"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IBucketEventHandler">IBucketEventHandler</a>

---

###### `opts`<sup>Optional</sup> <a name="opts" id="@winglang/sdk.cloud.Bucket.onUpdate.parameter.opts"></a>

- *Type:* <a href="#@winglang/sdk.cloud.BucketOnUpdateOptions">BucketOnUpdateOptions</a>

---

##### `copy` <a name="copy" id="@winglang/sdk.cloud.IBucketClient.copy"></a>

```wing
inflight copy(srcKey: str, dstKey: str): void
```

Copy an object to a new location in the bucket.

If the destination object
already exists, it will be overwritten.

###### `srcKey`<sup>Required</sup> <a name="srcKey" id="@winglang/sdk.cloud.IBucketClient.copy.parameter.srcKey"></a>

- *Type:* str

The key of the source object you wish to copy.

---

###### `dstKey`<sup>Required</sup> <a name="dstKey" id="@winglang/sdk.cloud.IBucketClient.copy.parameter.dstKey"></a>

- *Type:* str

The key of the destination object after copying.

---

##### `delete` <a name="delete" id="@winglang/sdk.cloud.IBucketClient.delete"></a>

```wing
inflight delete(key: str, opts?: BucketDeleteOptions): void
```

Delete an existing object using a key from the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.delete.parameter.key"></a>

- *Type:* str

Key of the object.

---

###### `opts`<sup>Optional</sup> <a name="opts" id="@winglang/sdk.cloud.IBucketClient.delete.parameter.opts"></a>

- *Type:* <a href="#@winglang/sdk.cloud.BucketDeleteOptions">BucketDeleteOptions</a>

Options available for delete an item from a bucket.

---

##### `exists` <a name="exists" id="@winglang/sdk.cloud.IBucketClient.exists"></a>

```wing
inflight exists(key: str): bool
```

Check if an object exists in the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.exists.parameter.key"></a>

- *Type:* str

Key of the object.

---

##### `get` <a name="get" id="@winglang/sdk.cloud.IBucketClient.get"></a>

```wing
inflight get(key: str, options?: BucketGetOptions): str
```

Retrieve an object from the bucket.

If the bytes returned are not a valid UTF-8 string, an error is thrown.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.get.parameter.key"></a>

- *Type:* str

Key of the object.

---

###### `options`<sup>Optional</sup> <a name="options" id="@winglang/sdk.cloud.IBucketClient.get.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.cloud.BucketGetOptions">BucketGetOptions</a>

Additional get options.

---

##### `getJson` <a name="getJson" id="@winglang/sdk.cloud.IBucketClient.getJson"></a>

```wing
inflight getJson(key: str): Json
```

Retrieve a Json object from the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.getJson.parameter.key"></a>

- *Type:* str

Key of the object.

---

##### `list` <a name="list" id="@winglang/sdk.cloud.IBucketClient.list"></a>

```wing
inflight list(prefix?: str): MutArray<str>
```

Retrieve existing objects keys from the bucket.

###### `prefix`<sup>Optional</sup> <a name="prefix" id="@winglang/sdk.cloud.IBucketClient.list.parameter.prefix"></a>

- *Type:* str

Limits the response to keys that begin with the specified prefix.

---

##### `metadata` <a name="metadata" id="@winglang/sdk.cloud.IBucketClient.metadata"></a>

```wing
inflight metadata(key: str): ObjectMetadata
```

Get the metadata of an object in the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.metadata.parameter.key"></a>

- *Type:* str

Key of the object.

---

##### `publicUrl` <a name="publicUrl" id="@winglang/sdk.cloud.IBucketClient.publicUrl"></a>

```wing
inflight publicUrl(key: str): str
```

Returns a url to the given file.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.publicUrl.parameter.key"></a>

- *Type:* str

---

##### `put` <a name="put" id="@winglang/sdk.cloud.IBucketClient.put"></a>

```wing
inflight put(key: str, body: str, options?: BucketPutOptions): void
```

Put an object in the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.put.parameter.key"></a>

- *Type:* str

Key of the object.

---

###### `body`<sup>Required</sup> <a name="body" id="@winglang/sdk.cloud.IBucketClient.put.parameter.body"></a>

- *Type:* str

Content of the object we want to store into the bucket.

---

###### `options`<sup>Optional</sup> <a name="options" id="@winglang/sdk.cloud.IBucketClient.put.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.cloud.BucketPutOptions">BucketPutOptions</a>

Additional options.

---

##### `putJson` <a name="putJson" id="@winglang/sdk.cloud.IBucketClient.putJson"></a>

```wing
inflight putJson(key: str, body: Json): void
```

Put a Json object in the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.putJson.parameter.key"></a>

- *Type:* str

Key of the object.

---

###### `body`<sup>Required</sup> <a name="body" id="@winglang/sdk.cloud.IBucketClient.putJson.parameter.body"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

Json object that we want to store into the bucket.

---

##### `rename` <a name="rename" id="@winglang/sdk.cloud.IBucketClient.rename"></a>

```wing
inflight rename(srcKey: str, dstKey: str): void
```

Move an object to a new location in the bucket.

If the destination object
already exists, it will be overwritten. Returns once the renaming is finished.

###### `srcKey`<sup>Required</sup> <a name="srcKey" id="@winglang/sdk.cloud.IBucketClient.rename.parameter.srcKey"></a>

- *Type:* str

The key of the source object you wish to rename.

---

###### `dstKey`<sup>Required</sup> <a name="dstKey" id="@winglang/sdk.cloud.IBucketClient.rename.parameter.dstKey"></a>

- *Type:* str

The key of the destination object after renaming.

---

##### `signedUrl` <a name="signedUrl" id="@winglang/sdk.cloud.IBucketClient.signedUrl"></a>

```wing
inflight signedUrl(key: str, options?: BucketSignedUrlOptions): str
```

Returns a signed url to the given file.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.signedUrl.parameter.key"></a>

- *Type:* str

The key to access the cloud object.

---

###### `options`<sup>Optional</sup> <a name="options" id="@winglang/sdk.cloud.IBucketClient.signedUrl.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.cloud.BucketSignedUrlOptions">BucketSignedUrlOptions</a>

The signedUrlOptions where you can provide the configurations of the signed url.

---

##### `tryDelete` <a name="tryDelete" id="@winglang/sdk.cloud.IBucketClient.tryDelete"></a>

```wing
inflight tryDelete(key: str): bool
```

Delete an object from the bucket if it exists.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.tryDelete.parameter.key"></a>

- *Type:* str

Key of the object.

---

##### `tryGet` <a name="tryGet" id="@winglang/sdk.cloud.IBucketClient.tryGet"></a>

```wing
inflight tryGet(key: str, options?: BucketTryGetOptions): str?
```

Get an object from the bucket if it exists If the bytes returned are not a valid UTF-8 string, an error is thrown.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.tryGet.parameter.key"></a>

- *Type:* str

Key of the object.

---

###### `options`<sup>Optional</sup> <a name="options" id="@winglang/sdk.cloud.IBucketClient.tryGet.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.cloud.BucketTryGetOptions">BucketTryGetOptions</a>

Additional get options.

---

##### `tryGetJson` <a name="tryGetJson" id="@winglang/sdk.cloud.IBucketClient.tryGetJson"></a>

```wing
inflight tryGetJson(key: str): Json?
```

Gets an object from the bucket if it exists, parsing it as Json.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.tryGetJson.parameter.key"></a>

- *Type:* str

Key of the object.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Bucket.onLiftType">onLiftType</a></code> | A hook called by the Wing compiler once for each inflight host that needs to use this type inflight. |
| <code><a href="#@winglang/sdk.cloud.Bucket.toInflight">toInflight</a></code> | Generates an asynchronous JavaScript statement which can be used to create an inflight client for a resource. |

---

##### `onLiftType` <a name="onLiftType" id="@winglang/sdk.cloud.Bucket.onLiftType"></a>

```wing
bring cloud;

cloud.Bucket.onLiftType(host: IInflightHost, ops: MutArray<str>);
```

A hook called by the Wing compiler once for each inflight host that needs to use this type inflight.

The list of requested inflight methods
needed by the inflight host are given by `ops`.

This method is commonly used for adding permissions, environment variables, or
other capabilities to the inflight host.

###### `host`<sup>Required</sup> <a name="host" id="@winglang/sdk.cloud.Bucket.onLiftType.parameter.host"></a>

- *Type:* <a href="#@winglang/sdk.std.IInflightHost">IInflightHost</a>

---

###### `ops`<sup>Required</sup> <a name="ops" id="@winglang/sdk.cloud.Bucket.onLiftType.parameter.ops"></a>

- *Type:* MutArray&lt;str&gt;

---

##### `toInflight` <a name="toInflight" id="@winglang/sdk.cloud.Bucket.toInflight"></a>

```wing
bring cloud;

cloud.Bucket.toInflight(obj: IResource);
```

Generates an asynchronous JavaScript statement which can be used to create an inflight client for a resource.

NOTE: This statement must be executed within an async context.

###### `obj`<sup>Required</sup> <a name="obj" id="@winglang/sdk.cloud.Bucket.toInflight.parameter.obj"></a>

- *Type:* <a href="#@winglang/sdk.std.IResource">IResource</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Bucket.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Bucket.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---



## Structs <a name="Structs" id="Structs"></a>

### BucketDeleteOptions <a name="BucketDeleteOptions" id="@winglang/sdk.cloud.BucketDeleteOptions"></a>

Options for `Bucket.delete()`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.BucketDeleteOptions.Initializer"></a>

```wing
bring cloud;

let BucketDeleteOptions = cloud.BucketDeleteOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.BucketDeleteOptions.property.mustExist">mustExist</a></code> | <code>bool</code> | Check failures on the method and retrieve errors if any. |

---

##### `mustExist`<sup>Optional</sup> <a name="mustExist" id="@winglang/sdk.cloud.BucketDeleteOptions.property.mustExist"></a>

```wing
mustExist: bool;
```

- *Type:* bool
- *Default:* false

Check failures on the method and retrieve errors if any.

---

### BucketEvent <a name="BucketEvent" id="@winglang/sdk.cloud.BucketEvent"></a>

On_event notification payload- will be in use after solving issue: https://github.com/winglang/wing/issues/1927.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.BucketEvent.Initializer"></a>

```wing
bring cloud;

let BucketEvent = cloud.BucketEvent{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.BucketEvent.property.key">key</a></code> | <code>str</code> | The bucket key that triggered the event. |
| <code><a href="#@winglang/sdk.cloud.BucketEvent.property.type">type</a></code> | <code><a href="#@winglang/sdk.cloud.BucketEventType">BucketEventType</a></code> | Type of event. |

---

##### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.BucketEvent.property.key"></a>

```wing
key: str;
```

- *Type:* str

The bucket key that triggered the event.

---

##### `type`<sup>Required</sup> <a name="type" id="@winglang/sdk.cloud.BucketEvent.property.type"></a>

```wing
type: BucketEventType;
```

- *Type:* <a href="#@winglang/sdk.cloud.BucketEventType">BucketEventType</a>

Type of event.

---

### BucketGetOptions <a name="BucketGetOptions" id="@winglang/sdk.cloud.BucketGetOptions"></a>

Options for `Bucket.get()`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.BucketGetOptions.Initializer"></a>

```wing
bring cloud;

let BucketGetOptions = cloud.BucketGetOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.BucketGetOptions.property.endByte">endByte</a></code> | <code>num</code> | The ending byte to read up to (including). |
| <code><a href="#@winglang/sdk.cloud.BucketGetOptions.property.startByte">startByte</a></code> | <code>num</code> | The starting byte to read from. |

---

##### `endByte`<sup>Optional</sup> <a name="endByte" id="@winglang/sdk.cloud.BucketGetOptions.property.endByte"></a>

```wing
endByte: num;
```

- *Type:* num
- *Default:* undefined

The ending byte to read up to (including).

---

##### `startByte`<sup>Optional</sup> <a name="startByte" id="@winglang/sdk.cloud.BucketGetOptions.property.startByte"></a>

```wing
startByte: num;
```

- *Type:* num
- *Default:* undefined

The starting byte to read from.

---

### BucketOnCreateOptions <a name="BucketOnCreateOptions" id="@winglang/sdk.cloud.BucketOnCreateOptions"></a>

`onCreate` event options.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.BucketOnCreateOptions.Initializer"></a>

```wing
bring cloud;

let BucketOnCreateOptions = cloud.BucketOnCreateOptions{ ... };
```


### BucketOnDeleteOptions <a name="BucketOnDeleteOptions" id="@winglang/sdk.cloud.BucketOnDeleteOptions"></a>

`onDelete` event options.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.BucketOnDeleteOptions.Initializer"></a>

```wing
bring cloud;

let BucketOnDeleteOptions = cloud.BucketOnDeleteOptions{ ... };
```


### BucketOnEventOptions <a name="BucketOnEventOptions" id="@winglang/sdk.cloud.BucketOnEventOptions"></a>

`onEvent` options.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.BucketOnEventOptions.Initializer"></a>

```wing
bring cloud;

let BucketOnEventOptions = cloud.BucketOnEventOptions{ ... };
```


### BucketOnUpdateOptions <a name="BucketOnUpdateOptions" id="@winglang/sdk.cloud.BucketOnUpdateOptions"></a>

`onUpdate` event options.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.BucketOnUpdateOptions.Initializer"></a>

```wing
bring cloud;

let BucketOnUpdateOptions = cloud.BucketOnUpdateOptions{ ... };
```


### BucketProps <a name="BucketProps" id="@winglang/sdk.cloud.BucketProps"></a>

Options for `Bucket`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.BucketProps.Initializer"></a>

```wing
bring cloud;

let BucketProps = cloud.BucketProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.BucketProps.property.public">public</a></code> | <code>bool</code> | Whether the bucket's objects should be publicly accessible. |

---

##### `public`<sup>Optional</sup> <a name="public" id="@winglang/sdk.cloud.BucketProps.property.public"></a>

```wing
public: bool;
```

- *Type:* bool
- *Default:* false

Whether the bucket's objects should be publicly accessible.

---

### BucketPutOptions <a name="BucketPutOptions" id="@winglang/sdk.cloud.BucketPutOptions"></a>

Options for `Bucket.put()`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.BucketPutOptions.Initializer"></a>

```wing
bring cloud;

let BucketPutOptions = cloud.BucketPutOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.BucketPutOptions.property.contentType">contentType</a></code> | <code>str</code> | The HTTP Content-Type of the object. |

---

##### `contentType`<sup>Required</sup> <a name="contentType" id="@winglang/sdk.cloud.BucketPutOptions.property.contentType"></a>

```wing
contentType: str;
```

- *Type:* str
- *Default:* Determined by file extension or fallback to "application/octet-stream"

The HTTP Content-Type of the object.

> [https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type)

---

### BucketSignedUrlOptions <a name="BucketSignedUrlOptions" id="@winglang/sdk.cloud.BucketSignedUrlOptions"></a>

Options for `Bucket.signedUrl()`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.BucketSignedUrlOptions.Initializer"></a>

```wing
bring cloud;

let BucketSignedUrlOptions = cloud.BucketSignedUrlOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.BucketSignedUrlOptions.property.action">action</a></code> | <code><a href="#@winglang/sdk.cloud.BucketSignedUrlAction">BucketSignedUrlAction</a></code> | The action allowed by the signed URL. |
| <code><a href="#@winglang/sdk.cloud.BucketSignedUrlOptions.property.duration">duration</a></code> | <code><a href="#@winglang/sdk.std.Duration">duration</a></code> | The duration for the signed URL to expire. |

---

##### `action`<sup>Optional</sup> <a name="action" id="@winglang/sdk.cloud.BucketSignedUrlOptions.property.action"></a>

```wing
action: BucketSignedUrlAction;
```

- *Type:* <a href="#@winglang/sdk.cloud.BucketSignedUrlAction">BucketSignedUrlAction</a>
- *Default:* BucketSignedUrlAction.DOWNLOAD

The action allowed by the signed URL.

---

##### `duration`<sup>Optional</sup> <a name="duration" id="@winglang/sdk.cloud.BucketSignedUrlOptions.property.duration"></a>

```wing
duration: duration;
```

- *Type:* <a href="#@winglang/sdk.std.Duration">duration</a>
- *Default:* 15m

The duration for the signed URL to expire.

---

### BucketTryGetOptions <a name="BucketTryGetOptions" id="@winglang/sdk.cloud.BucketTryGetOptions"></a>

Options for `Bucket.tryGet()`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.BucketTryGetOptions.Initializer"></a>

```wing
bring cloud;

let BucketTryGetOptions = cloud.BucketTryGetOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.BucketTryGetOptions.property.endByte">endByte</a></code> | <code>num</code> | The ending byte to read up to (including). |
| <code><a href="#@winglang/sdk.cloud.BucketTryGetOptions.property.startByte">startByte</a></code> | <code>num</code> | The starting byte to read from. |

---

##### `endByte`<sup>Optional</sup> <a name="endByte" id="@winglang/sdk.cloud.BucketTryGetOptions.property.endByte"></a>

```wing
endByte: num;
```

- *Type:* num
- *Default:* undefined

The ending byte to read up to (including).

---

##### `startByte`<sup>Optional</sup> <a name="startByte" id="@winglang/sdk.cloud.BucketTryGetOptions.property.startByte"></a>

```wing
startByte: num;
```

- *Type:* num
- *Default:* undefined

The starting byte to read from.

---

### ObjectMetadata <a name="ObjectMetadata" id="@winglang/sdk.cloud.ObjectMetadata"></a>

Metadata of a bucket object.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ObjectMetadata.Initializer"></a>

```wing
bring cloud;

let ObjectMetadata = cloud.ObjectMetadata{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.ObjectMetadata.property.lastModified">lastModified</a></code> | <code><a href="#@winglang/sdk.std.Datetime">datetime</a></code> | The time the object was last modified. |
| <code><a href="#@winglang/sdk.cloud.ObjectMetadata.property.size">size</a></code> | <code>num</code> | The size of the object in bytes. |
| <code><a href="#@winglang/sdk.cloud.ObjectMetadata.property.contentType">contentType</a></code> | <code>str</code> | The content type of the object, if it is known. |

---

##### `lastModified`<sup>Required</sup> <a name="lastModified" id="@winglang/sdk.cloud.ObjectMetadata.property.lastModified"></a>

```wing
lastModified: datetime;
```

- *Type:* <a href="#@winglang/sdk.std.Datetime">datetime</a>

The time the object was last modified.

---

##### `size`<sup>Required</sup> <a name="size" id="@winglang/sdk.cloud.ObjectMetadata.property.size"></a>

```wing
size: num;
```

- *Type:* num

The size of the object in bytes.

---

##### `contentType`<sup>Optional</sup> <a name="contentType" id="@winglang/sdk.cloud.ObjectMetadata.property.contentType"></a>

```wing
contentType: str;
```

- *Type:* str

The content type of the object, if it is known.

---

## Protocols <a name="Protocols" id="Protocols"></a>

### IBucketEventHandler <a name="IBucketEventHandler" id="@winglang/sdk.cloud.IBucketEventHandler"></a>

- *Extends:* <a href="#@winglang/sdk.std.IInflight">IInflight</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IBucketEventHandler">IBucketEventHandler</a>

**Inflight client:** [@winglang/sdk.cloud.IBucketEventHandlerClient](#@winglang/sdk.cloud.IBucketEventHandlerClient)

A resource with an inflight "handle" method that can be passed to the bucket events.



### IBucketEventHandlerClient <a name="IBucketEventHandlerClient" id="@winglang/sdk.cloud.IBucketEventHandlerClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IBucketEventHandlerClient">IBucketEventHandlerClient</a>

A resource with an inflight "handle" method that can be passed to the bucket events.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IBucketEventHandlerClient.handle">handle</a></code> | Function that will be called when an event notification is fired. |

---

##### `handle` <a name="handle" id="@winglang/sdk.cloud.IBucketEventHandlerClient.handle"></a>

```wing
inflight handle(key: str, type: BucketEventType): void
```

Function that will be called when an event notification is fired.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketEventHandlerClient.handle.parameter.key"></a>

- *Type:* str

---

###### `type`<sup>Required</sup> <a name="type" id="@winglang/sdk.cloud.IBucketEventHandlerClient.handle.parameter.type"></a>

- *Type:* <a href="#@winglang/sdk.cloud.BucketEventType">BucketEventType</a>

---


## Enums <a name="Enums" id="Enums"></a>

### BucketEventType <a name="BucketEventType" id="@winglang/sdk.cloud.BucketEventType"></a>

Bucket events to subscribe to.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.BucketEventType.CREATE">CREATE</a></code> | Create. |
| <code><a href="#@winglang/sdk.cloud.BucketEventType.DELETE">DELETE</a></code> | Delete. |
| <code><a href="#@winglang/sdk.cloud.BucketEventType.UPDATE">UPDATE</a></code> | Update. |

---

##### `CREATE` <a name="CREATE" id="@winglang/sdk.cloud.BucketEventType.CREATE"></a>

Create.

---


##### `DELETE` <a name="DELETE" id="@winglang/sdk.cloud.BucketEventType.DELETE"></a>

Delete.

---


##### `UPDATE` <a name="UPDATE" id="@winglang/sdk.cloud.BucketEventType.UPDATE"></a>

Update.

---


### BucketSignedUrlAction <a name="BucketSignedUrlAction" id="@winglang/sdk.cloud.BucketSignedUrlAction"></a>

Specifies the action permitted by a presigned URL for a bucket.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.BucketSignedUrlAction.DOWNLOAD">DOWNLOAD</a></code> | Represents a HTTP GET request for a presigned URL, allowing read access for an object in the bucket. |
| <code><a href="#@winglang/sdk.cloud.BucketSignedUrlAction.UPLOAD">UPLOAD</a></code> | Represents a HTTP PUT request for a presigned URL, allowing write access for an object in the bucket. |

---

##### `DOWNLOAD` <a name="DOWNLOAD" id="@winglang/sdk.cloud.BucketSignedUrlAction.DOWNLOAD"></a>

Represents a HTTP GET request for a presigned URL, allowing read access for an object in the bucket.

---


##### `UPLOAD` <a name="UPLOAD" id="@winglang/sdk.cloud.BucketSignedUrlAction.UPLOAD"></a>

Represents a HTTP PUT request for a presigned URL, allowing write access for an object in the bucket.

---

