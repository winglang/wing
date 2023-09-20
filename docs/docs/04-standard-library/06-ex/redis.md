---
title: Redis
id: redis
description: A cloud redis db.
keywords: [Redis, DB, database, store, cache]
sidebar_position: 1
---

# API Reference <a name="API Reference" id="api-reference"></a>

## Resources <a name="Resources" id="Resources"></a>

### DynamodbTable <a name="DynamodbTable" id="@winglang/sdk.ex.DynamodbTable"></a>

A cloud Dynamodb table.

#### Initializers <a name="Initializers" id="@winglang/sdk.ex.DynamodbTable.Initializer"></a>

```wing
bring ex;

new ex.DynamodbTable(props: DynamodbTableProps);
```

| **Name**                                                                                     | **Type**                                                                           | **Description**   |
| -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------------- |
| <code><a href="#@winglang/sdk.ex.DynamodbTable.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.ex.DynamodbTableProps">DynamodbTableProps</a></code> | _No description._ |

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.ex.DynamodbTable.Initializer.parameter.props"></a>

- _Type:_ <a href="#@winglang/sdk.ex.DynamodbTableProps">DynamodbTableProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

##### Inflight Methods

| **Name**                                                                                                | **Description**                                                              |
| ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.deleteItem">deleteItem</a></code>                 | Delete an item from the table.                                               |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.getItem">getItem</a></code>                       | Get an item from the table.                                                  |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.putItem">putItem</a></code>                       | Put an item into the table.                                                  |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.scan">scan</a></code>                             | Get the table.                                                               |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.transactWriteItems">transactWriteItems</a></code> | Perform a synchronous write operation that groups up to 100 action requests. |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.updateItem">updateItem</a></code>                 | Get an item from the table.                                                  |

---

##### `deleteItem` <a name="deleteItem" id="@winglang/sdk.ex.IDynamodbTableClient.deleteItem"></a>

```wing
inflight deleteItem(key: Json): void
```

Delete an item from the table.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.IDynamodbTableClient.deleteItem.parameter.key"></a>

- _Type:_ <a href="#@winglang/sdk.std.Json">Json</a>

key of the item.

---

##### `getItem` <a name="getItem" id="@winglang/sdk.ex.IDynamodbTableClient.getItem"></a>

```wing
inflight getItem(key: Json): Json
```

Get an item from the table.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.IDynamodbTableClient.getItem.parameter.key"></a>

- _Type:_ <a href="#@winglang/sdk.std.Json">Json</a>

key of the item.

---

##### `putItem` <a name="putItem" id="@winglang/sdk.ex.IDynamodbTableClient.putItem"></a>

```wing
inflight putItem(item: Json, props?: DynamodbTablePutItemProps): void
```

Put an item into the table.

###### `item`<sup>Required</sup> <a name="item" id="@winglang/sdk.ex.IDynamodbTableClient.putItem.parameter.item"></a>

- _Type:_ <a href="#@winglang/sdk.std.Json">Json</a>

data to be inserted.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.ex.IDynamodbTableClient.putItem.parameter.props"></a>

- _Type:_ <a href="#@winglang/sdk.ex.DynamodbTablePutItemProps">DynamodbTablePutItemProps</a>

dynamodb PutItem props.

---

##### `scan` <a name="scan" id="@winglang/sdk.ex.IDynamodbTableClient.scan"></a>

```wing
inflight scan(): MutArray<Json>
```

Get the table.

##### `transactWriteItems` <a name="transactWriteItems" id="@winglang/sdk.ex.IDynamodbTableClient.transactWriteItems"></a>

```wing
inflight transactWriteItems(props: DynamodbTransactWriteItemsProps): void
```

Perform a synchronous write operation that groups up to 100 action requests.

###### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.ex.IDynamodbTableClient.transactWriteItems.parameter.props"></a>

- _Type:_ <a href="#@winglang/sdk.ex.DynamodbTransactWriteItemsProps">DynamodbTransactWriteItemsProps</a>

properties for the transact write items operation.

---

##### `updateItem` <a name="updateItem" id="@winglang/sdk.ex.IDynamodbTableClient.updateItem"></a>

```wing
inflight updateItem(key: Json, props?: DynamodbTableUpdateItemProps): Json
```

Get an item from the table.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.IDynamodbTableClient.updateItem.parameter.key"></a>

- _Type:_ <a href="#@winglang/sdk.std.Json">Json</a>

key of the item.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.ex.IDynamodbTableClient.updateItem.parameter.props"></a>

- _Type:_ <a href="#@winglang/sdk.ex.DynamodbTableUpdateItemProps">DynamodbTableUpdateItemProps</a>

dynamodb UpdateItem props.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                      | **Type**                     | **Description** |
| ----------------------------------------------------------------------------- | ---------------------------- | --------------- |
| <code><a href="#@winglang/sdk.ex.DynamodbTable.property.node">node</a></code> | <code>constructs.Node</code> | The tree node.  |
| <code><a href="#@winglang/sdk.ex.DynamodbTable.property.name">name</a></code> | <code>str</code>             | Table name.     |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.ex.DynamodbTable.property.node"></a>

```wing
node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

##### `name`<sup>Required</sup> <a name="name" id="@winglang/sdk.ex.DynamodbTable.property.name"></a>

```wing
name: str;
```

- _Type:_ str

Table name.

---

### Redis <a name="Redis" id="@winglang/sdk.ex.Redis"></a>

A cloud redis db.

#### Initializers <a name="Initializers" id="@winglang/sdk.ex.Redis.Initializer"></a>

```wing
bring ex;

new ex.Redis();
```

| **Name** | **Type** | **Description** |
| -------- | -------- | --------------- |

---

#### Methods <a name="Methods" id="Methods"></a>

##### Inflight Methods

| **Name**                                                                      | **Description**                                                         |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.ex.IRedisClient.del">del</a></code>             | Removes the specified key.                                              |
| <code><a href="#@winglang/sdk.ex.IRedisClient.get">get</a></code>             | Get value at given key.                                                 |
| <code><a href="#@winglang/sdk.ex.IRedisClient.hget">hget</a></code>           | Returns the value associated with field in the hash stored at key.      |
| <code><a href="#@winglang/sdk.ex.IRedisClient.hset">hset</a></code>           | Sets the specified field to respective value in the hash stored at key. |
| <code><a href="#@winglang/sdk.ex.IRedisClient.rawClient">rawClient</a></code> | Get raw redis client (currently IoRedis).                               |
| <code><a href="#@winglang/sdk.ex.IRedisClient.sadd">sadd</a></code>           | Add the specified members to the set stored at key.                     |
| <code><a href="#@winglang/sdk.ex.IRedisClient.set">set</a></code>             | Set key value pair.                                                     |
| <code><a href="#@winglang/sdk.ex.IRedisClient.smembers">smembers</a></code>   | Returns all the members of the set value stored at key.                 |
| <code><a href="#@winglang/sdk.ex.IRedisClient.url">url</a></code>             | Get url of redis server.                                                |

---

##### `del` <a name="del" id="@winglang/sdk.ex.IRedisClient.del"></a>

```wing
inflight del(key: str): num
```

Removes the specified key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.IRedisClient.del.parameter.key"></a>

- _Type:_ str

the key.

---

##### `get` <a name="get" id="@winglang/sdk.ex.IRedisClient.get"></a>

```wing
inflight get(key: str): str
```

Get value at given key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.IRedisClient.get.parameter.key"></a>

- _Type:_ str

the key to get.

---

##### `hget` <a name="hget" id="@winglang/sdk.ex.IRedisClient.hget"></a>

```wing
inflight hget(key: str, field: str): str
```

Returns the value associated with field in the hash stored at key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.IRedisClient.hget.parameter.key"></a>

- _Type:_ str

the key.

---

###### `field`<sup>Required</sup> <a name="field" id="@winglang/sdk.ex.IRedisClient.hget.parameter.field"></a>

- _Type:_ str

the field at given key.

---

##### `hset` <a name="hset" id="@winglang/sdk.ex.IRedisClient.hset"></a>

```wing
inflight hset(key: str, field: str, value: str): num
```

Sets the specified field to respective value in the hash stored at key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.IRedisClient.hset.parameter.key"></a>

- _Type:_ str

key to set.

---

###### `field`<sup>Required</sup> <a name="field" id="@winglang/sdk.ex.IRedisClient.hset.parameter.field"></a>

- _Type:_ str

field in key to set.

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.ex.IRedisClient.hset.parameter.value"></a>

- _Type:_ str

value to set at field in key.

---

##### `rawClient` <a name="rawClient" id="@winglang/sdk.ex.IRedisClient.rawClient"></a>

```wing
inflight rawClient(): any
```

Get raw redis client (currently IoRedis).

##### `sadd` <a name="sadd" id="@winglang/sdk.ex.IRedisClient.sadd"></a>

```wing
inflight sadd(key: str, value: str): num
```

Add the specified members to the set stored at key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.IRedisClient.sadd.parameter.key"></a>

- _Type:_ str

the key.

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.ex.IRedisClient.sadd.parameter.value"></a>

- _Type:_ str

the value to add to the set at given key.

---

##### `set` <a name="set" id="@winglang/sdk.ex.IRedisClient.set"></a>

```wing
inflight set(key: str, value: str): void
```

Set key value pair.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.IRedisClient.set.parameter.key"></a>

- _Type:_ str

the key to set.

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.ex.IRedisClient.set.parameter.value"></a>

- _Type:_ str

the value to store at given key.

---

##### `smembers` <a name="smembers" id="@winglang/sdk.ex.IRedisClient.smembers"></a>

```wing
inflight smembers(key: str): MutArray<str>
```

Returns all the members of the set value stored at key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.IRedisClient.smembers.parameter.key"></a>

- _Type:_ str

the key.

---

##### `url` <a name="url" id="@winglang/sdk.ex.IRedisClient.url"></a>

```wing
inflight url(): str
```

Get url of redis server.

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                              | **Type**                     | **Description** |
| --------------------------------------------------------------------- | ---------------------------- | --------------- |
| <code><a href="#@winglang/sdk.ex.Redis.property.node">node</a></code> | <code>constructs.Node</code> | The tree node.  |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.ex.Redis.property.node"></a>

```wing
node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

## Classes <a name="Classes" id="Classes"></a>

### DynamodbTableClientBase <a name="DynamodbTableClientBase" id="@winglang/sdk.ex.DynamodbTableClientBase"></a>

- _Implements:_ <a href="#@winglang/sdk.ex.IDynamodbTableClient">IDynamodbTableClient</a>

Base class for `DynamodbTable` Client.

#### Initializers <a name="Initializers" id="@winglang/sdk.ex.DynamodbTableClientBase.Initializer"></a>

```wing
bring ex;

new ex.DynamodbTableClientBase(tableName: str);
```

| **Name**                                                                                                       | **Type**         | **Description** |
| -------------------------------------------------------------------------------------------------------------- | ---------------- | --------------- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.Initializer.parameter.tableName">tableName</a></code> | <code>str</code> | the table name. |

---

##### `tableName`<sup>Required</sup> <a name="tableName" id="@winglang/sdk.ex.DynamodbTableClientBase.Initializer.parameter.tableName"></a>

- _Type:_ str

the table name.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                                                   | **Description**                                                              |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.deleteItem">deleteItem</a></code>                 | Delete an item from the table.                                               |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.getItem">getItem</a></code>                       | Get an item from the table.                                                  |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.putItem">putItem</a></code>                       | Put an item into the table.                                                  |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.scan">scan</a></code>                             | Get the table.                                                               |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.transactWriteItems">transactWriteItems</a></code> | Perform a synchronous write operation that groups up to 100 action requests. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.updateItem">updateItem</a></code>                 | Get an item from the table.                                                  |

---

##### `deleteItem` <a name="deleteItem" id="@winglang/sdk.ex.DynamodbTableClientBase.deleteItem"></a>

```wing
deleteItem(key: Json): void
```

Delete an item from the table.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.DynamodbTableClientBase.deleteItem.parameter.key"></a>

- _Type:_ <a href="#@winglang/sdk.std.Json">Json</a>

---

##### `getItem` <a name="getItem" id="@winglang/sdk.ex.DynamodbTableClientBase.getItem"></a>

```wing
getItem(key: Json): Json
```

Get an item from the table.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.DynamodbTableClientBase.getItem.parameter.key"></a>

- _Type:_ <a href="#@winglang/sdk.std.Json">Json</a>

---

##### `putItem` <a name="putItem" id="@winglang/sdk.ex.DynamodbTableClientBase.putItem"></a>

```wing
putItem(item: Json, props?: DynamodbTablePutItemProps): void
```

Put an item into the table.

###### `item`<sup>Required</sup> <a name="item" id="@winglang/sdk.ex.DynamodbTableClientBase.putItem.parameter.item"></a>

- _Type:_ <a href="#@winglang/sdk.std.Json">Json</a>

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.ex.DynamodbTableClientBase.putItem.parameter.props"></a>

- _Type:_ <a href="#@winglang/sdk.ex.DynamodbTablePutItemProps">DynamodbTablePutItemProps</a>

---

##### `scan` <a name="scan" id="@winglang/sdk.ex.DynamodbTableClientBase.scan"></a>

```wing
scan(): MutArray<Json>
```

Get the table.

##### `transactWriteItems` <a name="transactWriteItems" id="@winglang/sdk.ex.DynamodbTableClientBase.transactWriteItems"></a>

```wing
transactWriteItems(props: DynamodbTransactWriteItemsProps): void
```

Perform a synchronous write operation that groups up to 100 action requests.

###### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.ex.DynamodbTableClientBase.transactWriteItems.parameter.props"></a>

- _Type:_ <a href="#@winglang/sdk.ex.DynamodbTransactWriteItemsProps">DynamodbTransactWriteItemsProps</a>

---

##### `updateItem` <a name="updateItem" id="@winglang/sdk.ex.DynamodbTableClientBase.updateItem"></a>

```wing
updateItem(key: Json, props?: DynamodbTableUpdateItemProps): Json
```

Get an item from the table.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.DynamodbTableClientBase.updateItem.parameter.key"></a>

- _Type:_ <a href="#@winglang/sdk.std.Json">Json</a>

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.ex.DynamodbTableClientBase.updateItem.parameter.props"></a>

- _Type:_ <a href="#@winglang/sdk.ex.DynamodbTableUpdateItemProps">DynamodbTableUpdateItemProps</a>

---

### RedisClientBase <a name="RedisClientBase" id="@winglang/sdk.ex.RedisClientBase"></a>

- _Implements:_ <a href="#@winglang/sdk.ex.IRedisClient">IRedisClient</a>

Base class for `Redis` Client.

#### Initializers <a name="Initializers" id="@winglang/sdk.ex.RedisClientBase.Initializer"></a>

```wing
bring ex;

new ex.RedisClientBase();
```

| **Name** | **Type** | **Description** |
| -------- | -------- | --------------- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                         | **Description**                                                         |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.ex.RedisClientBase.del">del</a></code>             | Removes the specified key.                                              |
| <code><a href="#@winglang/sdk.ex.RedisClientBase.get">get</a></code>             | Get value at given key.                                                 |
| <code><a href="#@winglang/sdk.ex.RedisClientBase.hget">hget</a></code>           | Returns the value associated with field in the hash stored at key.      |
| <code><a href="#@winglang/sdk.ex.RedisClientBase.hset">hset</a></code>           | Sets the specified field to respective value in the hash stored at key. |
| <code><a href="#@winglang/sdk.ex.RedisClientBase.rawClient">rawClient</a></code> | Get raw redis client (currently IoRedis).                               |
| <code><a href="#@winglang/sdk.ex.RedisClientBase.sadd">sadd</a></code>           | Add the specified members to the set stored at key.                     |
| <code><a href="#@winglang/sdk.ex.RedisClientBase.set">set</a></code>             | Set key value pair.                                                     |
| <code><a href="#@winglang/sdk.ex.RedisClientBase.smembers">smembers</a></code>   | Returns all the members of the set value stored at key.                 |
| <code><a href="#@winglang/sdk.ex.RedisClientBase.url">url</a></code>             | Get url of redis server.                                                |

---

##### `del` <a name="del" id="@winglang/sdk.ex.RedisClientBase.del"></a>

```wing
del(key: str): num
```

Removes the specified key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.RedisClientBase.del.parameter.key"></a>

- _Type:_ str

---

##### `get` <a name="get" id="@winglang/sdk.ex.RedisClientBase.get"></a>

```wing
get(key: str): str
```

Get value at given key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.RedisClientBase.get.parameter.key"></a>

- _Type:_ str

---

##### `hget` <a name="hget" id="@winglang/sdk.ex.RedisClientBase.hget"></a>

```wing
hget(key: str, field: str): str
```

Returns the value associated with field in the hash stored at key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.RedisClientBase.hget.parameter.key"></a>

- _Type:_ str

---

###### `field`<sup>Required</sup> <a name="field" id="@winglang/sdk.ex.RedisClientBase.hget.parameter.field"></a>

- _Type:_ str

---

##### `hset` <a name="hset" id="@winglang/sdk.ex.RedisClientBase.hset"></a>

```wing
hset(key: str, field: str, value: str): num
```

Sets the specified field to respective value in the hash stored at key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.RedisClientBase.hset.parameter.key"></a>

- _Type:_ str

---

###### `field`<sup>Required</sup> <a name="field" id="@winglang/sdk.ex.RedisClientBase.hset.parameter.field"></a>

- _Type:_ str

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.ex.RedisClientBase.hset.parameter.value"></a>

- _Type:_ str

---

##### `rawClient` <a name="rawClient" id="@winglang/sdk.ex.RedisClientBase.rawClient"></a>

```wing
rawClient(): any
```

Get raw redis client (currently IoRedis).

##### `sadd` <a name="sadd" id="@winglang/sdk.ex.RedisClientBase.sadd"></a>

```wing
sadd(key: str, value: str): num
```

Add the specified members to the set stored at key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.RedisClientBase.sadd.parameter.key"></a>

- _Type:_ str

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.ex.RedisClientBase.sadd.parameter.value"></a>

- _Type:_ str

---

##### `set` <a name="set" id="@winglang/sdk.ex.RedisClientBase.set"></a>

```wing
set(key: str, value: str): void
```

Set key value pair.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.RedisClientBase.set.parameter.key"></a>

- _Type:_ str

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.ex.RedisClientBase.set.parameter.value"></a>

- _Type:_ str

---

##### `smembers` <a name="smembers" id="@winglang/sdk.ex.RedisClientBase.smembers"></a>

```wing
smembers(key: str): MutArray<str>
```

Returns all the members of the set value stored at key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.RedisClientBase.smembers.parameter.key"></a>

- _Type:_ str

---

##### `url` <a name="url" id="@winglang/sdk.ex.RedisClientBase.url"></a>

```wing
url(): str
```

Get url of redis server.
