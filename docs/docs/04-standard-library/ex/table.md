---
title: Table
id: table
description: A NoSQL database table that can be used to store and query data.
keywords: [dynamoDB, NoSQL, store, DB, database, cache]
sidebar_position: 1
---
# API Reference <a name="API Reference" id="api-reference"></a>

## Resources <a name="Resources" id="Resources"></a>

### Table <a name="Table" id="@winglang/sdk.ex.Table"></a>

A NoSQL database table that can be used to store and query data.

#### Initializers <a name="Initializers" id="@winglang/sdk.ex.Table.Initializer"></a>

```wing example
bring ex;

new ex.Table(props: TableProps);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.Table.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.ex.TableProps">TableProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.ex.Table.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.ex.TableProps">TableProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

##### Preflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.ex.Table.addRow">addRow</a></code> | Add a row to the table that is created when the app is deployed. |

##### Inflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.ex.ITableClient.delete">delete</a></code> | Delete a row from the table, by primary key. |
| <code><a href="#@winglang/sdk.ex.ITableClient.get">get</a></code> | Get a row from the table, by primary key. |
| <code><a href="#@winglang/sdk.ex.ITableClient.insert">insert</a></code> | Insert a row into the table. |
| <code><a href="#@winglang/sdk.ex.ITableClient.list">list</a></code> | List all rows in the table. |
| <code><a href="#@winglang/sdk.ex.ITableClient.tryGet">tryGet</a></code> | Get a row from the table if exists, by primary key. |
| <code><a href="#@winglang/sdk.ex.ITableClient.update">update</a></code> | Update a row in the table. |
| <code><a href="#@winglang/sdk.ex.ITableClient.upsert">upsert</a></code> | Insert a row into the table if it doesn't exist, otherwise update it. |

---

##### `addRow` <a name="addRow" id="@winglang/sdk.ex.Table.addRow"></a>

```wing
addRow(key: str, row: Json): void
```

Add a row to the table that is created when the app is deployed.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.Table.addRow.parameter.key"></a>

- *Type:* str

---

###### `row`<sup>Required</sup> <a name="row" id="@winglang/sdk.ex.Table.addRow.parameter.row"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

---

##### `delete` <a name="delete" id="@winglang/sdk.ex.ITableClient.delete"></a>

```wing
inflight delete(key: str): void
```

Delete a row from the table, by primary key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.ITableClient.delete.parameter.key"></a>

- *Type:* str

primary key to delete the row.

---

##### `get` <a name="get" id="@winglang/sdk.ex.ITableClient.get"></a>

```wing
inflight get(key: str): Json
```

Get a row from the table, by primary key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.ITableClient.get.parameter.key"></a>

- *Type:* str

primary key to search.

---

##### `insert` <a name="insert" id="@winglang/sdk.ex.ITableClient.insert"></a>

```wing
inflight insert(key: str, row: Json): void
```

Insert a row into the table.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.ITableClient.insert.parameter.key"></a>

- *Type:* str

primary key to insert the row.

---

###### `row`<sup>Required</sup> <a name="row" id="@winglang/sdk.ex.ITableClient.insert.parameter.row"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

data to be inserted.

---

##### `list` <a name="list" id="@winglang/sdk.ex.ITableClient.list"></a>

```wing
inflight list(): MutArray<Json>
```

List all rows in the table.

##### `tryGet` <a name="tryGet" id="@winglang/sdk.ex.ITableClient.tryGet"></a>

```wing
inflight tryGet(key: str): Json?
```

Get a row from the table if exists, by primary key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.ITableClient.tryGet.parameter.key"></a>

- *Type:* str

primary key to search.

---

##### `update` <a name="update" id="@winglang/sdk.ex.ITableClient.update"></a>

```wing
inflight update(key: str, row: Json): void
```

Update a row in the table.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.ITableClient.update.parameter.key"></a>

- *Type:* str

primary key to update the row.

---

###### `row`<sup>Required</sup> <a name="row" id="@winglang/sdk.ex.ITableClient.update.parameter.row"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

data to be updated.

---

##### `upsert` <a name="upsert" id="@winglang/sdk.ex.ITableClient.upsert"></a>

```wing
inflight upsert(key: str, row: Json): void
```

Insert a row into the table if it doesn't exist, otherwise update it.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.ITableClient.upsert.parameter.key"></a>

- *Type:* str

primary key to upsert the row.

---

###### `row`<sup>Required</sup> <a name="row" id="@winglang/sdk.ex.ITableClient.upsert.parameter.row"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

data to be upserted.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.ex.Table.onLiftType">onLiftType</a></code> | A hook called by the Wing compiler once for each inflight host that needs to use this type inflight. |
| <code><a href="#@winglang/sdk.ex.Table.toInflight">toInflight</a></code> | Generates an asynchronous JavaScript statement which can be used to create an inflight client for a resource. |

---

##### `onLiftType` <a name="onLiftType" id="@winglang/sdk.ex.Table.onLiftType"></a>

```wing
bring ex;

ex.Table.onLiftType(host: IInflightHost, ops: MutArray<str>);
```

A hook called by the Wing compiler once for each inflight host that needs to use this type inflight.

The list of requested inflight methods
needed by the inflight host are given by `ops`.

This method is commonly used for adding permissions, environment variables, or
other capabilities to the inflight host.

###### `host`<sup>Required</sup> <a name="host" id="@winglang/sdk.ex.Table.onLiftType.parameter.host"></a>

- *Type:* <a href="#@winglang/sdk.std.IInflightHost">IInflightHost</a>

---

###### `ops`<sup>Required</sup> <a name="ops" id="@winglang/sdk.ex.Table.onLiftType.parameter.ops"></a>

- *Type:* MutArray&lt;str&gt;

---

##### `toInflight` <a name="toInflight" id="@winglang/sdk.ex.Table.toInflight"></a>

```wing
bring ex;

ex.Table.toInflight(obj: IResource);
```

Generates an asynchronous JavaScript statement which can be used to create an inflight client for a resource.

NOTE: This statement must be executed within an async context.

###### `obj`<sup>Required</sup> <a name="obj" id="@winglang/sdk.ex.Table.toInflight.parameter.obj"></a>

- *Type:* <a href="#@winglang/sdk.std.IResource">IResource</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.Table.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.ex.Table.property.columns">columns</a></code> | <code>MutMap&lt;<a href="#@winglang/sdk.ex.ColumnType">ColumnType</a>&gt;</code> | Table columns. |
| <code><a href="#@winglang/sdk.ex.Table.property.name">name</a></code> | <code>str</code> | Table name. |
| <code><a href="#@winglang/sdk.ex.Table.property.primaryKey">primaryKey</a></code> | <code>str</code> | Table primary key name. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.ex.Table.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `columns`<sup>Required</sup> <a name="columns" id="@winglang/sdk.ex.Table.property.columns"></a>

```wing
columns: MutMap<ColumnType>;
```

- *Type:* MutMap&lt;<a href="#@winglang/sdk.ex.ColumnType">ColumnType</a>&gt;

Table columns.

---

##### `name`<sup>Required</sup> <a name="name" id="@winglang/sdk.ex.Table.property.name"></a>

```wing
name: str;
```

- *Type:* str

Table name.

---

##### `primaryKey`<sup>Required</sup> <a name="primaryKey" id="@winglang/sdk.ex.Table.property.primaryKey"></a>

```wing
primaryKey: str;
```

- *Type:* str

Table primary key name.

---



## Structs <a name="Structs" id="Structs"></a>

### TableProps <a name="TableProps" id="@winglang/sdk.ex.TableProps"></a>

Properties for `Table`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.TableProps.Initializer"></a>

```wing
bring ex;

let TableProps = ex.TableProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.TableProps.property.columns">columns</a></code> | <code>MutMap&lt;<a href="#@winglang/sdk.ex.ColumnType">ColumnType</a>&gt;</code> | The table's columns. |
| <code><a href="#@winglang/sdk.ex.TableProps.property.initialRows">initialRows</a></code> | <code>MutMap&lt;<a href="#@winglang/sdk.std.Json">Json</a>&gt;</code> | The table's initial rows. |
| <code><a href="#@winglang/sdk.ex.TableProps.property.name">name</a></code> | <code>str</code> | The table's name. |
| <code><a href="#@winglang/sdk.ex.TableProps.property.primaryKey">primaryKey</a></code> | <code>str</code> | The table's primary key. |

---

##### `columns`<sup>Optional</sup> <a name="columns" id="@winglang/sdk.ex.TableProps.property.columns"></a>

```wing
columns: MutMap<ColumnType>;
```

- *Type:* MutMap&lt;<a href="#@winglang/sdk.ex.ColumnType">ColumnType</a>&gt;
- *Default:* undefined

The table's columns.

---

##### `initialRows`<sup>Optional</sup> <a name="initialRows" id="@winglang/sdk.ex.TableProps.property.initialRows"></a>

```wing
initialRows: MutMap<Json>;
```

- *Type:* MutMap&lt;<a href="#@winglang/sdk.std.Json">Json</a>&gt;
- *Default:* undefined

The table's initial rows.

---

##### `name`<sup>Optional</sup> <a name="name" id="@winglang/sdk.ex.TableProps.property.name"></a>

```wing
name: str;
```

- *Type:* str
- *Default:* undefined

The table's name.

---

##### `primaryKey`<sup>Optional</sup> <a name="primaryKey" id="@winglang/sdk.ex.TableProps.property.primaryKey"></a>

```wing
primaryKey: str;
```

- *Type:* str
- *Default:* undefined

The table's primary key.

No two rows can have the same value for the
primary key.

---


## Enums <a name="Enums" id="Enums"></a>

### ColumnType <a name="ColumnType" id="@winglang/sdk.ex.ColumnType"></a>

Table column types.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.ex.ColumnType.STRING">STRING</a></code> | String type. |
| <code><a href="#@winglang/sdk.ex.ColumnType.NUMBER">NUMBER</a></code> | Number type. |
| <code><a href="#@winglang/sdk.ex.ColumnType.BOOLEAN">BOOLEAN</a></code> | Bool type. |
| <code><a href="#@winglang/sdk.ex.ColumnType.DATE">DATE</a></code> | Date type. |
| <code><a href="#@winglang/sdk.ex.ColumnType.JSON">JSON</a></code> | Json type. |

---

##### `STRING` <a name="STRING" id="@winglang/sdk.ex.ColumnType.STRING"></a>

String type.

---


##### `NUMBER` <a name="NUMBER" id="@winglang/sdk.ex.ColumnType.NUMBER"></a>

Number type.

---


##### `BOOLEAN` <a name="BOOLEAN" id="@winglang/sdk.ex.ColumnType.BOOLEAN"></a>

Bool type.

---


##### `DATE` <a name="DATE" id="@winglang/sdk.ex.ColumnType.DATE"></a>

Date type.

---


##### `JSON` <a name="JSON" id="@winglang/sdk.ex.ColumnType.JSON"></a>

Json type.

---

