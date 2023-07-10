---
title: Table
id: table
description: Represents a NoSQL database table that can be used to store and query data.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    tables,
  ]
sidebar_position: 1
---
## API Reference <a name="API Reference" id="API Reference"></a>

### Table <a name="Table" id="@winglang/sdk.cloud.Table"></a>

**Inflight client:** [@winglang/sdk.cloud.ITableClient](#@winglang/sdk.cloud.ITableClient)

Represents a NoSQL database table that can be used to store and query data.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Table.Initializer"></a>

```wing
bring cloud;

new cloud.Table(props: TableProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Table.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.TableProps">TableProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.cloud.Table.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.TableProps">TableProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Table.addRow">addRow</a></code> | Add a row to the table that is created when the app is deployed. |

---

##### `addRow` <a name="addRow" id="@winglang/sdk.cloud.Table.addRow"></a>

```wing
addRow(key: str, row: Json): void
```

Add a row to the table that is created when the app is deployed.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.Table.addRow.parameter.key"></a>

- *Type:* str

---

###### `row`<sup>Required</sup> <a name="row" id="@winglang/sdk.cloud.Table.addRow.parameter.row"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Table.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Table.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |
| <code><a href="#@winglang/sdk.cloud.Table.property.columns">columns</a></code> | <code>MutMap&lt;<a href="#@winglang/sdk.cloud.ColumnType">ColumnType</a>&gt;</code> | Table columns. |
| <code><a href="#@winglang/sdk.cloud.Table.property.name">name</a></code> | <code>str</code> | Table name. |
| <code><a href="#@winglang/sdk.cloud.Table.property.primaryKey">primaryKey</a></code> | <code>str</code> | Table primary key name. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Table.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.Table.property.display"></a>

```wing
display: Display;
```

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---

##### `columns`<sup>Required</sup> <a name="columns" id="@winglang/sdk.cloud.Table.property.columns"></a>

```wing
columns: MutMap<ColumnType>;
```

- *Type:* MutMap&lt;<a href="#@winglang/sdk.cloud.ColumnType">ColumnType</a>&gt;

Table columns.

---

##### `name`<sup>Required</sup> <a name="name" id="@winglang/sdk.cloud.Table.property.name"></a>

```wing
name: str;
```

- *Type:* str

Table name.

---

##### `primaryKey`<sup>Required</sup> <a name="primaryKey" id="@winglang/sdk.cloud.Table.property.primaryKey"></a>

```wing
primaryKey: str;
```

- *Type:* str

Table primary key name.

---


## Structs <a name="Structs" id="Structs"></a>

### TableProps <a name="TableProps" id="@winglang/sdk.cloud.TableProps"></a>

Properties for `Table`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.TableProps.Initializer"></a>

```wing
bring cloud;

let TableProps = cloud.TableProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.TableProps.property.columns">columns</a></code> | <code>MutMap&lt;<a href="#@winglang/sdk.cloud.ColumnType">ColumnType</a>&gt;</code> | The table's columns. |
| <code><a href="#@winglang/sdk.cloud.TableProps.property.initialRows">initialRows</a></code> | <code>MutMap&lt;<a href="#@winglang/sdk.std.Json">Json</a>&gt;</code> | The table's initial rows. |
| <code><a href="#@winglang/sdk.cloud.TableProps.property.name">name</a></code> | <code>str</code> | The table's name. |
| <code><a href="#@winglang/sdk.cloud.TableProps.property.primaryKey">primaryKey</a></code> | <code>str</code> | The table's primary key. |

---

##### `columns`<sup>Optional</sup> <a name="columns" id="@winglang/sdk.cloud.TableProps.property.columns"></a>

```wing
columns: MutMap<ColumnType>;
```

- *Type:* MutMap&lt;<a href="#@winglang/sdk.cloud.ColumnType">ColumnType</a>&gt;
- *Default:* undefined

The table's columns.

---

##### `initialRows`<sup>Optional</sup> <a name="initialRows" id="@winglang/sdk.cloud.TableProps.property.initialRows"></a>

```wing
initialRows: MutMap<Json>;
```

- *Type:* MutMap&lt;<a href="#@winglang/sdk.std.Json">Json</a>&gt;
- *Default:* undefined

The table's initial rows.

---

##### `name`<sup>Optional</sup> <a name="name" id="@winglang/sdk.cloud.TableProps.property.name"></a>

```wing
name: str;
```

- *Type:* str
- *Default:* undefined

The table's name.

---

##### `primaryKey`<sup>Optional</sup> <a name="primaryKey" id="@winglang/sdk.cloud.TableProps.property.primaryKey"></a>

```wing
primaryKey: str;
```

- *Type:* str
- *Default:* undefined

The table's primary key.

No two rows can have the same value for the
primary key.

---


## Protocols <a name="Protocols" id="Protocols"></a>

### ITableClient <a name="ITableClient" id="@winglang/sdk.cloud.ITableClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.ITableClient">ITableClient</a>

Inflight interface for `Table`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.ITableClient.delete">delete</a></code> | Delete a row from the table, by primary key. |
| <code><a href="#@winglang/sdk.cloud.ITableClient.get">get</a></code> | Get a row from the table, by primary key. |
| <code><a href="#@winglang/sdk.cloud.ITableClient.insert">insert</a></code> | Insert a row into the table. |
| <code><a href="#@winglang/sdk.cloud.ITableClient.list">list</a></code> | List all rows in the table. |
| <code><a href="#@winglang/sdk.cloud.ITableClient.update">update</a></code> | Update a row in the table. |

---

##### `delete` <a name="delete" id="@winglang/sdk.cloud.ITableClient.delete"></a>

```wing
delete(key: str): void
```

**Inflight client:** [true](#true)

Delete a row from the table, by primary key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.ITableClient.delete.parameter.key"></a>

- *Type:* str

primary key to delete the row.

---

##### `get` <a name="get" id="@winglang/sdk.cloud.ITableClient.get"></a>

```wing
get(key: str): Json
```

**Inflight client:** [true](#true)

Get a row from the table, by primary key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.ITableClient.get.parameter.key"></a>

- *Type:* str

primary key to search.

---

##### `insert` <a name="insert" id="@winglang/sdk.cloud.ITableClient.insert"></a>

```wing
insert(key: str, row: Json): void
```

**Inflight client:** [true](#true)

Insert a row into the table.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.ITableClient.insert.parameter.key"></a>

- *Type:* str

primary key to insert the row.

---

###### `row`<sup>Required</sup> <a name="row" id="@winglang/sdk.cloud.ITableClient.insert.parameter.row"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

data to be inserted.

---

##### `list` <a name="list" id="@winglang/sdk.cloud.ITableClient.list"></a>

```wing
list(): MutArray<Json>
```

**Inflight client:** [true](#true)

List all rows in the table.

##### `update` <a name="update" id="@winglang/sdk.cloud.ITableClient.update"></a>

```wing
update(key: str, row: Json): void
```

**Inflight client:** [true](#true)

Update a row in the table.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.ITableClient.update.parameter.key"></a>

- *Type:* str

primary key to update the row.

---

###### `row`<sup>Required</sup> <a name="row" id="@winglang/sdk.cloud.ITableClient.update.parameter.row"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

data to be updated.

---


## Enums <a name="Enums" id="Enums"></a>

### ColumnType <a name="ColumnType" id="@winglang/sdk.cloud.ColumnType"></a>

Table column types.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.ColumnType.STRING">STRING</a></code> | string type. |
| <code><a href="#@winglang/sdk.cloud.ColumnType.NUMBER">NUMBER</a></code> | number type. |
| <code><a href="#@winglang/sdk.cloud.ColumnType.BOOLEAN">BOOLEAN</a></code> | bool type. |
| <code><a href="#@winglang/sdk.cloud.ColumnType.DATE">DATE</a></code> | date type. |
| <code><a href="#@winglang/sdk.cloud.ColumnType.JSON">JSON</a></code> | json type. |

---

##### `STRING` <a name="STRING" id="@winglang/sdk.cloud.ColumnType.STRING"></a>

string type.

---


##### `NUMBER` <a name="NUMBER" id="@winglang/sdk.cloud.ColumnType.NUMBER"></a>

number type.

---


##### `BOOLEAN` <a name="BOOLEAN" id="@winglang/sdk.cloud.ColumnType.BOOLEAN"></a>

bool type.

---


##### `DATE` <a name="DATE" id="@winglang/sdk.cloud.ColumnType.DATE"></a>

date type.

---


##### `JSON` <a name="JSON" id="@winglang/sdk.cloud.ColumnType.JSON"></a>

json type.

---

