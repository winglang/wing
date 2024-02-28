---
title: array
id: array
---

# API Reference <a name="API Reference" id="api-reference"></a>


## Classes <a name="Classes" id="Classes"></a>

### Array <a name="Array" id="@winglang/sdk.std.Array"></a>

Immutable Array.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.Array.at">at</a></code> | Get the value at the given index. |
| <code><a href="#@winglang/sdk.std.Array.concat">concat</a></code> | Merge arr to the end of this array. |
| <code><a href="#@winglang/sdk.std.Array.contains">contains</a></code> | Checks if this array includes searchElement. |
| <code><a href="#@winglang/sdk.std.Array.copyMut">copyMut</a></code> | Create a mutable shallow copy of this array. |
| <code><a href="#@winglang/sdk.std.Array.indexOf">indexOf</a></code> | Returns the index of the first occurrence of searchElement found. |
| <code><a href="#@winglang/sdk.std.Array.join">join</a></code> | Returns a new string containing the concatenated values in this array, separated by commas or a specified separator string. |
| <code><a href="#@winglang/sdk.std.Array.lastIndexOf">lastIndexOf</a></code> | Returns the index of the last occurrence of searchElement found. |
| <code><a href="#@winglang/sdk.std.Array.tryAt">tryAt</a></code> | Get the value at the given index, returning nil if the index is out of bounds. |

---

##### `at` <a name="at" id="@winglang/sdk.std.Array.at"></a>

```wing
at(index: num): <T>
```

Get the value at the given index.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.Array.at.parameter.index"></a>

- *Type:* num

index of the value to get.

---

##### `concat` <a name="concat" id="@winglang/sdk.std.Array.concat"></a>

```wing
concat(arr: Array): Array
```

Merge arr to the end of this array.

###### `arr`<sup>Required</sup> <a name="arr" id="@winglang/sdk.std.Array.concat.parameter.arr"></a>

- *Type:* <a href="#@winglang/sdk.std.Array">Array</a>

array to merge.

---

##### `contains` <a name="contains" id="@winglang/sdk.std.Array.contains"></a>

```wing
contains(searchElement: <T>): bool
```

Checks if this array includes searchElement.

###### `searchElement`<sup>Required</sup> <a name="searchElement" id="@winglang/sdk.std.Array.contains.parameter.searchElement"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">&lt;T&gt;</a>

to search for.

---

##### `copyMut` <a name="copyMut" id="@winglang/sdk.std.Array.copyMut"></a>

```wing
copyMut(): MutArray
```

Create a mutable shallow copy of this array.

##### `indexOf` <a name="indexOf" id="@winglang/sdk.std.Array.indexOf"></a>

```wing
indexOf(searchElement: <T>): num
```

Returns the index of the first occurrence of searchElement found.

###### `searchElement`<sup>Required</sup> <a name="searchElement" id="@winglang/sdk.std.Array.indexOf.parameter.searchElement"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">&lt;T&gt;</a>

to search for.

---

##### `join` <a name="join" id="@winglang/sdk.std.Array.join"></a>

```wing
join(separator?: str): str
```

Returns a new string containing the concatenated values in this array, separated by commas or a specified separator string.

If the array has only
one item, then that item will be returned without using the separator.

###### `separator`<sup>Optional</sup> <a name="separator" id="@winglang/sdk.std.Array.join.parameter.separator"></a>

- *Type:* str

---

##### `lastIndexOf` <a name="lastIndexOf" id="@winglang/sdk.std.Array.lastIndexOf"></a>

```wing
lastIndexOf(searchElement: <T>): num
```

Returns the index of the last occurrence of searchElement found.

###### `searchElement`<sup>Required</sup> <a name="searchElement" id="@winglang/sdk.std.Array.lastIndexOf.parameter.searchElement"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">&lt;T&gt;</a>

to search for.

---

##### `tryAt` <a name="tryAt" id="@winglang/sdk.std.Array.tryAt"></a>

```wing
tryAt(index: num): <T>
```

Get the value at the given index, returning nil if the index is out of bounds.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.Array.tryAt.parameter.index"></a>

- *Type:* num

index of the value to get.

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.Array.property.length">length</a></code> | <code>num</code> | The length of the array. |

---

##### `length`<sup>Required</sup> <a name="length" id="@winglang/sdk.std.Array.property.length"></a>

```wing
length: num;
```

- *Type:* num

The length of the array.

---


### MutArray <a name="MutArray" id="@winglang/sdk.std.MutArray"></a>

Mutable Array.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.MutArray.at">at</a></code> | Get the value at the given index. |
| <code><a href="#@winglang/sdk.std.MutArray.concat">concat</a></code> | Merge arr to the end of this array. |
| <code><a href="#@winglang/sdk.std.MutArray.contains">contains</a></code> | Checks if this array includes searchElement. |
| <code><a href="#@winglang/sdk.std.MutArray.copy">copy</a></code> | Create an immutable shallow copy of this array. |
| <code><a href="#@winglang/sdk.std.MutArray.indexOf">indexOf</a></code> | Returns the index of the first occurrence of searchElement found. |
| <code><a href="#@winglang/sdk.std.MutArray.insert">insert</a></code> | Inserts a new value at the given index of an array. |
| <code><a href="#@winglang/sdk.std.MutArray.join">join</a></code> | Returns a new string containing the concatenated values in this array, separated by commas or a specified separator string. |
| <code><a href="#@winglang/sdk.std.MutArray.lastIndexOf">lastIndexOf</a></code> | Returns the index of the last occurrence of searchElement found. |
| <code><a href="#@winglang/sdk.std.MutArray.pop">pop</a></code> | Remove value from end of array. |
| <code><a href="#@winglang/sdk.std.MutArray.popAt">popAt</a></code> | Removes value from the given index of an array. |
| <code><a href="#@winglang/sdk.std.MutArray.push">push</a></code> | Add values to end of array. |
| <code><a href="#@winglang/sdk.std.MutArray.removeFirst">removeFirst</a></code> | Removes first occurrence of a given value in an array. |
| <code><a href="#@winglang/sdk.std.MutArray.set">set</a></code> | Sets a new value at the given index of an array. |

---

##### `at` <a name="at" id="@winglang/sdk.std.MutArray.at"></a>

```wing
at(index: num): <T>
```

Get the value at the given index.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.MutArray.at.parameter.index"></a>

- *Type:* num

index of the value to get.

---

##### `concat` <a name="concat" id="@winglang/sdk.std.MutArray.concat"></a>

```wing
concat(arr: MutArray): MutArray
```

Merge arr to the end of this array.

###### `arr`<sup>Required</sup> <a name="arr" id="@winglang/sdk.std.MutArray.concat.parameter.arr"></a>

- *Type:* <a href="#@winglang/sdk.std.MutArray">MutArray</a>

array to merge.

---

##### `contains` <a name="contains" id="@winglang/sdk.std.MutArray.contains"></a>

```wing
contains(searchElement: <T>): bool
```

Checks if this array includes searchElement.

###### `searchElement`<sup>Required</sup> <a name="searchElement" id="@winglang/sdk.std.MutArray.contains.parameter.searchElement"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">&lt;T&gt;</a>

to search for.

---

##### `copy` <a name="copy" id="@winglang/sdk.std.MutArray.copy"></a>

```wing
copy(): Array
```

Create an immutable shallow copy of this array.

##### `indexOf` <a name="indexOf" id="@winglang/sdk.std.MutArray.indexOf"></a>

```wing
indexOf(searchElement: <T>): num
```

Returns the index of the first occurrence of searchElement found.

###### `searchElement`<sup>Required</sup> <a name="searchElement" id="@winglang/sdk.std.MutArray.indexOf.parameter.searchElement"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">&lt;T&gt;</a>

to search for.

---

##### `insert` <a name="insert" id="@winglang/sdk.std.MutArray.insert"></a>

```wing
insert(index: num, value: <T>): void
```

Inserts a new value at the given index of an array.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.MutArray.insert.parameter.index"></a>

- *Type:* num

the index to insert the value at.

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.MutArray.insert.parameter.value"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">&lt;T&gt;</a>

the value to insert at the given index.

---

##### `join` <a name="join" id="@winglang/sdk.std.MutArray.join"></a>

```wing
join(separator?: str): str
```

Returns a new string containing the concatenated values in this array, separated by commas or a specified separator string.

If the array has only
one item, then that item will be returned without using the separator.

###### `separator`<sup>Optional</sup> <a name="separator" id="@winglang/sdk.std.MutArray.join.parameter.separator"></a>

- *Type:* str

---

##### `lastIndexOf` <a name="lastIndexOf" id="@winglang/sdk.std.MutArray.lastIndexOf"></a>

```wing
lastIndexOf(searchElement: <T>): num
```

Returns the index of the last occurrence of searchElement found.

###### `searchElement`<sup>Required</sup> <a name="searchElement" id="@winglang/sdk.std.MutArray.lastIndexOf.parameter.searchElement"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">&lt;T&gt;</a>

to search for.

---

##### `pop` <a name="pop" id="@winglang/sdk.std.MutArray.pop"></a>

```wing
pop(): <T>
```

Remove value from end of array.

##### `popAt` <a name="popAt" id="@winglang/sdk.std.MutArray.popAt"></a>

```wing
popAt(index: num): <T>
```

Removes value from the given index of an array.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.MutArray.popAt.parameter.index"></a>

- *Type:* num

the index to remove the value at.

---

##### `push` <a name="push" id="@winglang/sdk.std.MutArray.push"></a>

```wing
push(...values: Array<<T>>): void
```

Add values to end of array.

###### `values`<sup>Required</sup> <a name="values" id="@winglang/sdk.std.MutArray.push.parameter.values"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">&lt;T&gt;</a>

values to add.

---

##### `removeFirst` <a name="removeFirst" id="@winglang/sdk.std.MutArray.removeFirst"></a>

```wing
removeFirst(value: <T>): bool
```

Removes first occurrence of a given value in an array.

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.MutArray.removeFirst.parameter.value"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">&lt;T&gt;</a>

the value to remove.

---

##### `set` <a name="set" id="@winglang/sdk.std.MutArray.set"></a>

```wing
set(index: num, value: <T>): void
```

Sets a new value at the given index of an array.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.MutArray.set.parameter.index"></a>

- *Type:* num

the index to set the value at.

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.MutArray.set.parameter.value"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">&lt;T&gt;</a>

the value to set at the given index.

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.MutArray.property.length">length</a></code> | <code>num</code> | The length of the array. |

---

##### `length`<sup>Required</sup> <a name="length" id="@winglang/sdk.std.MutArray.property.length"></a>

```wing
length: num;
```

- *Type:* num

The length of the array.

---




