---
title: map
id: map
---


# API Reference <a name="API Reference" id="api-reference"></a>


## Classes <a name="Classes" id="Classes"></a>

### Map <a name="Map" id="@winglang/sdk.std.Map"></a>

Immutable Map.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.Map.copyMut">copyMut</a></code> | Create a mutable shallow copy of this map. |
| <code><a href="#@winglang/sdk.std.Map.get">get</a></code> | Returns a specified element from the map. |
| <code><a href="#@winglang/sdk.std.Map.has">has</a></code> | Returns a boolean indicating whether an element with the specified key exists or not. |
| <code><a href="#@winglang/sdk.std.Map.keys">keys</a></code> | Returns the keys of this map. |
| <code><a href="#@winglang/sdk.std.Map.size">size</a></code> | Returns the number of elements in the map. |
| <code><a href="#@winglang/sdk.std.Map.tryGet">tryGet</a></code> | Optionally returns a specified element from the map. |
| <code><a href="#@winglang/sdk.std.Map.values">values</a></code> | Returns the values of this map. |

---

##### `copyMut` <a name="copyMut" id="@winglang/sdk.std.Map.copyMut"></a>

```wing
copyMut(): MutMap
```

Create a mutable shallow copy of this map.

##### `get` <a name="get" id="@winglang/sdk.std.Map.get"></a>

```wing
get(key: str): <T>
```

Returns a specified element from the map.

If the value that is associated to the provided key is an object, then you will get a reference
to that object and any change made to that object will effectively modify it inside the map.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.Map.get.parameter.key"></a>

- *Type:* str

The key of the element to return.

---

##### `has` <a name="has" id="@winglang/sdk.std.Map.has"></a>

```wing
has(key: str): bool
```

Returns a boolean indicating whether an element with the specified key exists or not.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.Map.has.parameter.key"></a>

- *Type:* str

The key of the element to test for presence.

---

##### `keys` <a name="keys" id="@winglang/sdk.std.Map.keys"></a>

```wing
keys(): MutArray<str>
```

Returns the keys of this map.

##### `size` <a name="size" id="@winglang/sdk.std.Map.size"></a>

```wing
size(): num
```

Returns the number of elements in the map.

TODO: For now this has to be a method rather than a getter as macros only work on methods https://github.com/winglang/wing/issues/1658

##### `tryGet` <a name="tryGet" id="@winglang/sdk.std.Map.tryGet"></a>

```wing
tryGet(key: str): <T>
```

Optionally returns a specified element from the map.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.Map.tryGet.parameter.key"></a>

- *Type:* str

The key of the element to return.

---

##### `values` <a name="values" id="@winglang/sdk.std.Map.values"></a>

```wing
values(): Array
```

Returns the values of this map.




### MutMap <a name="MutMap" id="@winglang/sdk.std.MutMap"></a>

Mutable Map.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.MutMap.clear">clear</a></code> | Removes all elements. |
| <code><a href="#@winglang/sdk.std.MutMap.copy">copy</a></code> | Create an immutable shallow copy of this map. |
| <code><a href="#@winglang/sdk.std.MutMap.delete">delete</a></code> | Removes the specified element from a map. |
| <code><a href="#@winglang/sdk.std.MutMap.get">get</a></code> | Returns a specified element from the map. |
| <code><a href="#@winglang/sdk.std.MutMap.has">has</a></code> | Returns a boolean indicating whether an element with the specified key exists or not. |
| <code><a href="#@winglang/sdk.std.MutMap.keys">keys</a></code> | Returns the keys of this map. |
| <code><a href="#@winglang/sdk.std.MutMap.set">set</a></code> | Adds or updates an entry in a Map object with a specified key and a value. |
| <code><a href="#@winglang/sdk.std.MutMap.size">size</a></code> | Returns the number of elements in the map. |
| <code><a href="#@winglang/sdk.std.MutMap.tryGet">tryGet</a></code> | Optionally returns a specified element from the map. |
| <code><a href="#@winglang/sdk.std.MutMap.values">values</a></code> | Returns the values of this map. |

---

##### `clear` <a name="clear" id="@winglang/sdk.std.MutMap.clear"></a>

```wing
clear(): void
```

Removes all elements.

##### `copy` <a name="copy" id="@winglang/sdk.std.MutMap.copy"></a>

```wing
copy(): Map
```

Create an immutable shallow copy of this map.

##### `delete` <a name="delete" id="@winglang/sdk.std.MutMap.delete"></a>

```wing
delete(key: str): bool
```

Removes the specified element from a map.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.MutMap.delete.parameter.key"></a>

- *Type:* str

The key.

---

##### `get` <a name="get" id="@winglang/sdk.std.MutMap.get"></a>

```wing
get(key: str): <T>
```

Returns a specified element from the map.

If the value that is associated to the provided key is an object, then you will get a reference
to that object and any change made to that object will effectively modify it inside the map.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.MutMap.get.parameter.key"></a>

- *Type:* str

The key of the element to return.

---

##### `has` <a name="has" id="@winglang/sdk.std.MutMap.has"></a>

```wing
has(key: str): bool
```

Returns a boolean indicating whether an element with the specified key exists or not.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.MutMap.has.parameter.key"></a>

- *Type:* str

The key of the element to test for presence.

---

##### `keys` <a name="keys" id="@winglang/sdk.std.MutMap.keys"></a>

```wing
keys(): MutArray<str>
```

Returns the keys of this map.

##### `set` <a name="set" id="@winglang/sdk.std.MutMap.set"></a>

```wing
set(key: str, value: <T>): void
```

Adds or updates an entry in a Map object with a specified key and a value.

TODO: revisit this macro after we support indexed args https://github.com/winglang/wing/issues/1659

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.MutMap.set.parameter.key"></a>

- *Type:* str

The key of the element to add.

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.MutMap.set.parameter.value"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">&lt;T&gt;</a>

The value of the element to add.

---

##### `size` <a name="size" id="@winglang/sdk.std.MutMap.size"></a>

```wing
size(): num
```

Returns the number of elements in the map.

TODO: For now this has to be a method rather than a getter as macros only work on methods https://github.com/winglang/wing/issues/1658

##### `tryGet` <a name="tryGet" id="@winglang/sdk.std.MutMap.tryGet"></a>

```wing
tryGet(key: str): <T>
```

Optionally returns a specified element from the map.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.MutMap.tryGet.parameter.key"></a>

- *Type:* str

The key of the element to return.

---

##### `values` <a name="values" id="@winglang/sdk.std.MutMap.values"></a>

```wing
values(): Array
```

Returns the values of this map.






