---
title: Redis
id: redis
description: A cloud redis db.
keywords: [Redis, DB, database, store, cache]
sidebar_position: 1
---
# API Reference <a name="API Reference" id="api-reference"></a>

## Resources <a name="Resources" id="Resources"></a>

### Redis <a name="Redis" id="@winglang/sdk.ex.Redis"></a>

A cloud redis db.

#### Initializers <a name="Initializers" id="@winglang/sdk.ex.Redis.Initializer"></a>

```wing
bring ex;

new ex.Redis();
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

##### Inflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.ex.IRedisClient.del">del</a></code> | Removes the specified key. |
| <code><a href="#@winglang/sdk.ex.IRedisClient.get">get</a></code> | Get value at given key. |
| <code><a href="#@winglang/sdk.ex.IRedisClient.hget">hget</a></code> | Returns the value associated with field in the hash stored at key. |
| <code><a href="#@winglang/sdk.ex.IRedisClient.hset">hset</a></code> | Sets the specified field to respective value in the hash stored at key. |
| <code><a href="#@winglang/sdk.ex.IRedisClient.rawClient">rawClient</a></code> | Get raw redis client (currently IoRedis). |
| <code><a href="#@winglang/sdk.ex.IRedisClient.sadd">sadd</a></code> | Add the specified members to the set stored at key. |
| <code><a href="#@winglang/sdk.ex.IRedisClient.set">set</a></code> | Set key value pair. |
| <code><a href="#@winglang/sdk.ex.IRedisClient.smembers">smembers</a></code> | Returns all the members of the set value stored at key. |
| <code><a href="#@winglang/sdk.ex.IRedisClient.url">url</a></code> | Get url of redis server. |

---

##### `del` <a name="del" id="@winglang/sdk.ex.IRedisClient.del"></a>

```wing
inflight del(key: str): num
```

Removes the specified key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.IRedisClient.del.parameter.key"></a>

- *Type:* str

the key.

---

##### `get` <a name="get" id="@winglang/sdk.ex.IRedisClient.get"></a>

```wing
inflight get(key: str): str
```

Get value at given key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.IRedisClient.get.parameter.key"></a>

- *Type:* str

the key to get.

---

##### `hget` <a name="hget" id="@winglang/sdk.ex.IRedisClient.hget"></a>

```wing
inflight hget(key: str, field: str): str
```

Returns the value associated with field in the hash stored at key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.IRedisClient.hget.parameter.key"></a>

- *Type:* str

the key.

---

###### `field`<sup>Required</sup> <a name="field" id="@winglang/sdk.ex.IRedisClient.hget.parameter.field"></a>

- *Type:* str

the field at given key.

---

##### `hset` <a name="hset" id="@winglang/sdk.ex.IRedisClient.hset"></a>

```wing
inflight hset(key: str, field: str, value: str): num
```

Sets the specified field to respective value in the hash stored at key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.IRedisClient.hset.parameter.key"></a>

- *Type:* str

key to set.

---

###### `field`<sup>Required</sup> <a name="field" id="@winglang/sdk.ex.IRedisClient.hset.parameter.field"></a>

- *Type:* str

field in key to set.

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.ex.IRedisClient.hset.parameter.value"></a>

- *Type:* str

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

- *Type:* str

the key.

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.ex.IRedisClient.sadd.parameter.value"></a>

- *Type:* str

the value to add to the set at given key.

---

##### `set` <a name="set" id="@winglang/sdk.ex.IRedisClient.set"></a>

```wing
inflight set(key: str, value: str): void
```

Set key value pair.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.IRedisClient.set.parameter.key"></a>

- *Type:* str

the key to set.

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.ex.IRedisClient.set.parameter.value"></a>

- *Type:* str

the value to store at given key.

---

##### `smembers` <a name="smembers" id="@winglang/sdk.ex.IRedisClient.smembers"></a>

```wing
inflight smembers(key: str): MutArray<str>
```

Returns all the members of the set value stored at key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.IRedisClient.smembers.parameter.key"></a>

- *Type:* str

the key.

---

##### `url` <a name="url" id="@winglang/sdk.ex.IRedisClient.url"></a>

```wing
inflight url(): str
```

Get url of redis server.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.Redis.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.ex.Redis.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Classes <a name="Classes" id="Classes"></a>

### RedisClientBase <a name="RedisClientBase" id="@winglang/sdk.ex.RedisClientBase"></a>

- *Implements:* <a href="#@winglang/sdk.ex.IRedisClient">IRedisClient</a>

Base class for `Redis` Client.

#### Initializers <a name="Initializers" id="@winglang/sdk.ex.RedisClientBase.Initializer"></a>

```wing
bring ex;

new ex.RedisClientBase();
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.ex.RedisClientBase.del">del</a></code> | Removes the specified key. |
| <code><a href="#@winglang/sdk.ex.RedisClientBase.get">get</a></code> | Get value at given key. |
| <code><a href="#@winglang/sdk.ex.RedisClientBase.hget">hget</a></code> | Returns the value associated with field in the hash stored at key. |
| <code><a href="#@winglang/sdk.ex.RedisClientBase.hset">hset</a></code> | Sets the specified field to respective value in the hash stored at key. |
| <code><a href="#@winglang/sdk.ex.RedisClientBase.rawClient">rawClient</a></code> | Get raw redis client (currently IoRedis). |
| <code><a href="#@winglang/sdk.ex.RedisClientBase.sadd">sadd</a></code> | Add the specified members to the set stored at key. |
| <code><a href="#@winglang/sdk.ex.RedisClientBase.set">set</a></code> | Set key value pair. |
| <code><a href="#@winglang/sdk.ex.RedisClientBase.smembers">smembers</a></code> | Returns all the members of the set value stored at key. |
| <code><a href="#@winglang/sdk.ex.RedisClientBase.url">url</a></code> | Get url of redis server. |

---

##### `del` <a name="del" id="@winglang/sdk.ex.RedisClientBase.del"></a>

```wing
del(key: str): num
```

Removes the specified key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.RedisClientBase.del.parameter.key"></a>

- *Type:* str

---

##### `get` <a name="get" id="@winglang/sdk.ex.RedisClientBase.get"></a>

```wing
get(key: str): str
```

Get value at given key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.RedisClientBase.get.parameter.key"></a>

- *Type:* str

---

##### `hget` <a name="hget" id="@winglang/sdk.ex.RedisClientBase.hget"></a>

```wing
hget(key: str, field: str): str
```

Returns the value associated with field in the hash stored at key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.RedisClientBase.hget.parameter.key"></a>

- *Type:* str

---

###### `field`<sup>Required</sup> <a name="field" id="@winglang/sdk.ex.RedisClientBase.hget.parameter.field"></a>

- *Type:* str

---

##### `hset` <a name="hset" id="@winglang/sdk.ex.RedisClientBase.hset"></a>

```wing
hset(key: str, field: str, value: str): num
```

Sets the specified field to respective value in the hash stored at key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.RedisClientBase.hset.parameter.key"></a>

- *Type:* str

---

###### `field`<sup>Required</sup> <a name="field" id="@winglang/sdk.ex.RedisClientBase.hset.parameter.field"></a>

- *Type:* str

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.ex.RedisClientBase.hset.parameter.value"></a>

- *Type:* str

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

- *Type:* str

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.ex.RedisClientBase.sadd.parameter.value"></a>

- *Type:* str

---

##### `set` <a name="set" id="@winglang/sdk.ex.RedisClientBase.set"></a>

```wing
set(key: str, value: str): void
```

Set key value pair.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.RedisClientBase.set.parameter.key"></a>

- *Type:* str

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.ex.RedisClientBase.set.parameter.value"></a>

- *Type:* str

---

##### `smembers` <a name="smembers" id="@winglang/sdk.ex.RedisClientBase.smembers"></a>

```wing
smembers(key: str): MutArray<str>
```

Returns all the members of the set value stored at key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.RedisClientBase.smembers.parameter.key"></a>

- *Type:* str

---

##### `url` <a name="url" id="@winglang/sdk.ex.RedisClientBase.url"></a>

```wing
url(): str
```

Get url of redis server.






