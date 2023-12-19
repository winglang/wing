---
title: set
id: set
---


# API Reference <a name="API Reference" id="api-reference"></a>


## Classes <a name="Classes" id="Classes"></a>

### MutSet <a name="MutSet" id="@winglang/sdk.std.MutSet"></a>

Mutable Set.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.MutSet.add">add</a></code> | Add value to set. |
| <code><a href="#@winglang/sdk.std.MutSet.clear">clear</a></code> | The clear() method removes all elements from a set. |
| <code><a href="#@winglang/sdk.std.MutSet.copy">copy</a></code> | Create an immutable shallow copy of this set. |
| <code><a href="#@winglang/sdk.std.MutSet.delete">delete</a></code> | Removes a specified value from a set, if it is in the set. |
| <code><a href="#@winglang/sdk.std.MutSet.has">has</a></code> | Returns a boolean indicating whether an element with the specified value exists in the set. |
| <code><a href="#@winglang/sdk.std.MutSet.toArray">toArray</a></code> | Create an immutable array shallow copy of this set. |

---

##### `add` <a name="add" id="@winglang/sdk.std.MutSet.add"></a>

```wing
add(value: <T>): MutSet
```

Add value to set.

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.MutSet.add.parameter.value"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">&lt;T&gt;</a>

value to add.

---

##### `clear` <a name="clear" id="@winglang/sdk.std.MutSet.clear"></a>

```wing
clear(): void
```

The clear() method removes all elements from a set.

##### `copy` <a name="copy" id="@winglang/sdk.std.MutSet.copy"></a>

```wing
copy(): Set
```

Create an immutable shallow copy of this set.

##### `delete` <a name="delete" id="@winglang/sdk.std.MutSet.delete"></a>

```wing
delete(value: <T>): bool
```

Removes a specified value from a set, if it is in the set.

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.MutSet.delete.parameter.value"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">&lt;T&gt;</a>

The value to remove from the set.

---

##### `has` <a name="has" id="@winglang/sdk.std.MutSet.has"></a>

```wing
has(value: <T>): bool
```

Returns a boolean indicating whether an element with the specified value exists in the set.

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.MutSet.has.parameter.value"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">&lt;T&gt;</a>

The value to test for presence in the Set object.

---

##### `toArray` <a name="toArray" id="@winglang/sdk.std.MutSet.toArray"></a>

```wing
toArray(): Array
```

Create an immutable array shallow copy of this set.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.MutSet.property.size">size</a></code> | <code>num</code> | The length of the set. |

---

##### `size`<sup>Required</sup> <a name="size" id="@winglang/sdk.std.MutSet.property.size"></a>

```wing
size: num;
```

- *Type:* num

The length of the set.

---


### Set <a name="Set" id="@winglang/sdk.std.Set"></a>

Immutable Set.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.Set.copyMut">copyMut</a></code> | Create a mutable shallow copy of this set. |
| <code><a href="#@winglang/sdk.std.Set.has">has</a></code> | Returns a boolean indicating whether an element with the specified value exists in the set. |
| <code><a href="#@winglang/sdk.std.Set.toArray">toArray</a></code> | Create an immutable array shallow copy of this set. |

---

##### `copyMut` <a name="copyMut" id="@winglang/sdk.std.Set.copyMut"></a>

```wing
copyMut(): MutSet
```

Create a mutable shallow copy of this set.

##### `has` <a name="has" id="@winglang/sdk.std.Set.has"></a>

```wing
has(value: <T>): bool
```

Returns a boolean indicating whether an element with the specified value exists in the set.

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.Set.has.parameter.value"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">&lt;T&gt;</a>

The value to test for presence in the Set object.

---

##### `toArray` <a name="toArray" id="@winglang/sdk.std.Set.toArray"></a>

```wing
toArray(): Array
```

Create an immutable array shallow copy of this set.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.Set.property.size">size</a></code> | <code>num</code> | The length of the set. |

---

##### `size`<sup>Required</sup> <a name="size" id="@winglang/sdk.std.Set.property.size"></a>

```wing
size: num;
```

- *Type:* num

The length of the set.

---




