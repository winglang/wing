---
title: Dynamodb Table
id: dynamodb-table
description: A cloud Dynamodb table.
keywords: [dynamoDB, NoSQL, store, DB, database, cache, table]
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

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTable.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.ex.DynamodbTableProps">DynamodbTableProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.ex.DynamodbTable.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableProps">DynamodbTableProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

##### Inflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.deleteItem">deleteItem</a></code> | Delete an item from the table. |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.getItem">getItem</a></code> | Get an item from the table. |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.putItem">putItem</a></code> | Put an item into the table. |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.scan">scan</a></code> | Get the table. |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.transactWriteItems">transactWriteItems</a></code> | Perform a synchronous write operation that groups up to 100 action requests. |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.updateItem">updateItem</a></code> | Get an item from the table. |

---

##### `deleteItem` <a name="deleteItem" id="@winglang/sdk.ex.IDynamodbTableClient.deleteItem"></a>

```wing
inflight deleteItem(key: Json): void
```

Delete an item from the table.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.IDynamodbTableClient.deleteItem.parameter.key"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

key of the item.

---

##### `getItem` <a name="getItem" id="@winglang/sdk.ex.IDynamodbTableClient.getItem"></a>

```wing
inflight getItem(key: Json): Json
```

Get an item from the table.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.IDynamodbTableClient.getItem.parameter.key"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

key of the item.

---

##### `putItem` <a name="putItem" id="@winglang/sdk.ex.IDynamodbTableClient.putItem"></a>

```wing
inflight putItem(item: Json, props?: DynamodbTablePutItemProps): void
```

Put an item into the table.

###### `item`<sup>Required</sup> <a name="item" id="@winglang/sdk.ex.IDynamodbTableClient.putItem.parameter.item"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

data to be inserted.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.ex.IDynamodbTableClient.putItem.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTablePutItemProps">DynamodbTablePutItemProps</a>

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

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTransactWriteItemsProps">DynamodbTransactWriteItemsProps</a>

properties for the transact write items operation.

---

##### `updateItem` <a name="updateItem" id="@winglang/sdk.ex.IDynamodbTableClient.updateItem"></a>

```wing
inflight updateItem(key: Json, props?: DynamodbTableUpdateItemProps): Json
```

Get an item from the table.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.IDynamodbTableClient.updateItem.parameter.key"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

key of the item.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.ex.IDynamodbTableClient.updateItem.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableUpdateItemProps">DynamodbTableUpdateItemProps</a>

dynamodb UpdateItem props.

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTable.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.ex.DynamodbTable.property.name">name</a></code> | <code>str</code> | Table name. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.ex.DynamodbTable.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `name`<sup>Required</sup> <a name="name" id="@winglang/sdk.ex.DynamodbTable.property.name"></a>

```wing
name: str;
```

- *Type:* str

Table name.

---


## Classes <a name="Classes" id="Classes"></a>

### DynamodbTableClientBase <a name="DynamodbTableClientBase" id="@winglang/sdk.ex.DynamodbTableClientBase"></a>

- *Implements:* <a href="#@winglang/sdk.ex.IDynamodbTableClient">IDynamodbTableClient</a>

Base class for `DynamodbTable` Client.

#### Initializers <a name="Initializers" id="@winglang/sdk.ex.DynamodbTableClientBase.Initializer"></a>

```wing
bring ex;

new ex.DynamodbTableClientBase(tableName: str);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.Initializer.parameter.tableName">tableName</a></code> | <code>str</code> | the table name. |

---

##### `tableName`<sup>Required</sup> <a name="tableName" id="@winglang/sdk.ex.DynamodbTableClientBase.Initializer.parameter.tableName"></a>

- *Type:* str

the table name.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.deleteItem">deleteItem</a></code> | Delete an item from the table. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.getItem">getItem</a></code> | Get an item from the table. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.putItem">putItem</a></code> | Put an item into the table. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.scan">scan</a></code> | Get the table. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.transactWriteItems">transactWriteItems</a></code> | Perform a synchronous write operation that groups up to 100 action requests. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.updateItem">updateItem</a></code> | Get an item from the table. |

---

##### `deleteItem` <a name="deleteItem" id="@winglang/sdk.ex.DynamodbTableClientBase.deleteItem"></a>

```wing
deleteItem(key: Json): void
```

Delete an item from the table.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.DynamodbTableClientBase.deleteItem.parameter.key"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

---

##### `getItem` <a name="getItem" id="@winglang/sdk.ex.DynamodbTableClientBase.getItem"></a>

```wing
getItem(key: Json): Json
```

Get an item from the table.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.DynamodbTableClientBase.getItem.parameter.key"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

---

##### `putItem` <a name="putItem" id="@winglang/sdk.ex.DynamodbTableClientBase.putItem"></a>

```wing
putItem(item: Json, props?: DynamodbTablePutItemProps): void
```

Put an item into the table.

###### `item`<sup>Required</sup> <a name="item" id="@winglang/sdk.ex.DynamodbTableClientBase.putItem.parameter.item"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.ex.DynamodbTableClientBase.putItem.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTablePutItemProps">DynamodbTablePutItemProps</a>

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

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTransactWriteItemsProps">DynamodbTransactWriteItemsProps</a>

---

##### `updateItem` <a name="updateItem" id="@winglang/sdk.ex.DynamodbTableClientBase.updateItem"></a>

```wing
updateItem(key: Json, props?: DynamodbTableUpdateItemProps): Json
```

Get an item from the table.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.DynamodbTableClientBase.updateItem.parameter.key"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.ex.DynamodbTableClientBase.updateItem.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableUpdateItemProps">DynamodbTableUpdateItemProps</a>

---




## Structs <a name="Structs" id="Structs"></a>

### DynamodbTableProps <a name="DynamodbTableProps" id="@winglang/sdk.ex.DynamodbTableProps"></a>

Properties for `DynamodbTable`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableProps.Initializer"></a>

```wing
bring ex;

let DynamodbTableProps = ex.DynamodbTableProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableProps.property.attributeDefinitions">attributeDefinitions</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | Table attribute definitions. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableProps.property.hashKey">hashKey</a></code> | <code>str</code> | Hash key for this table. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableProps.property.name">name</a></code> | <code>str</code> | The table's name. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableProps.property.rangeKey">rangeKey</a></code> | <code>str</code> | Range key for this table. |

---

##### `attributeDefinitions`<sup>Required</sup> <a name="attributeDefinitions" id="@winglang/sdk.ex.DynamodbTableProps.property.attributeDefinitions"></a>

```wing
attributeDefinitions: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

Table attribute definitions.

e.g.  { "myKey": "S", "myOtherKey": "S" }.

---

##### `hashKey`<sup>Required</sup> <a name="hashKey" id="@winglang/sdk.ex.DynamodbTableProps.property.hashKey"></a>

```wing
hashKey: str;
```

- *Type:* str

Hash key for this table.

---

##### `name`<sup>Required</sup> <a name="name" id="@winglang/sdk.ex.DynamodbTableProps.property.name"></a>

```wing
name: str;
```

- *Type:* str

The table's name.

---

##### `rangeKey`<sup>Optional</sup> <a name="rangeKey" id="@winglang/sdk.ex.DynamodbTableProps.property.rangeKey"></a>

```wing
rangeKey: str;
```

- *Type:* str
- *Default:* undefined

Range key for this table.

---

### DynamodbTablePutItemProps <a name="DynamodbTablePutItemProps" id="@winglang/sdk.ex.DynamodbTablePutItemProps"></a>

Properties for `DynamodbTable.putItem`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTablePutItemProps.Initializer"></a>

```wing
bring ex;

let DynamodbTablePutItemProps = ex.DynamodbTablePutItemProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTablePutItemProps.property.conditionExpression">conditionExpression</a></code> | <code>str</code> | A condition that must be satisfied in order for an operation to succeed. |

---

##### `conditionExpression`<sup>Optional</sup> <a name="conditionExpression" id="@winglang/sdk.ex.DynamodbTablePutItemProps.property.conditionExpression"></a>

```wing
conditionExpression: str;
```

- *Type:* str
- *Default:* undefined

A condition that must be satisfied in order for an operation to succeed.

---

### DynamodbTableUpdateItemProps <a name="DynamodbTableUpdateItemProps" id="@winglang/sdk.ex.DynamodbTableUpdateItemProps"></a>

Properties for `DynamodbTable.updateItem`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableUpdateItemProps.Initializer"></a>

```wing
bring ex;

let DynamodbTableUpdateItemProps = ex.DynamodbTableUpdateItemProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableUpdateItemProps.property.expressionAttributeValues">expressionAttributeValues</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more values that can be substituted in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableUpdateItemProps.property.updateExpression">updateExpression</a></code> | <code>str</code> | An expression that defines one or more attributes to be updated. |

---

##### `expressionAttributeValues`<sup>Optional</sup> <a name="expressionAttributeValues" id="@winglang/sdk.ex.DynamodbTableUpdateItemProps.property.expressionAttributeValues"></a>

```wing
expressionAttributeValues: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>
- *Default:* undefined

One or more values that can be substituted in an expression.

---

##### `updateExpression`<sup>Optional</sup> <a name="updateExpression" id="@winglang/sdk.ex.DynamodbTableUpdateItemProps.property.updateExpression"></a>

```wing
updateExpression: str;
```

- *Type:* str
- *Default:* undefined

An expression that defines one or more attributes to be updated.

---

### DynamodbTransactWriteItem <a name="DynamodbTransactWriteItem" id="@winglang/sdk.ex.DynamodbTransactWriteItem"></a>

Dynamodb transact write operation.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTransactWriteItem.Initializer"></a>

```wing
bring ex;

let DynamodbTransactWriteItem = ex.DynamodbTransactWriteItem{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItem.property.delete">delete</a></code> | <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemDeleteProps">DynamodbTransactWriteItemDeleteProps</a></code> | A request to perform a delete operation. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItem.property.put">put</a></code> | <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemPutProps">DynamodbTransactWriteItemPutProps</a></code> | A request to perform a put operation. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItem.property.update">update</a></code> | <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemUpdateProps">DynamodbTransactWriteItemUpdateProps</a></code> | A request to perform a update operation. |

---

##### `delete`<sup>Optional</sup> <a name="delete" id="@winglang/sdk.ex.DynamodbTransactWriteItem.property.delete"></a>

```wing
delete: DynamodbTransactWriteItemDeleteProps;
```

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTransactWriteItemDeleteProps">DynamodbTransactWriteItemDeleteProps</a>

A request to perform a delete operation.

---

##### `put`<sup>Optional</sup> <a name="put" id="@winglang/sdk.ex.DynamodbTransactWriteItem.property.put"></a>

```wing
put: DynamodbTransactWriteItemPutProps;
```

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTransactWriteItemPutProps">DynamodbTransactWriteItemPutProps</a>

A request to perform a put operation.

---

##### `update`<sup>Optional</sup> <a name="update" id="@winglang/sdk.ex.DynamodbTransactWriteItem.property.update"></a>

```wing
update: DynamodbTransactWriteItemUpdateProps;
```

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTransactWriteItemUpdateProps">DynamodbTransactWriteItemUpdateProps</a>

A request to perform a update operation.

---

### DynamodbTransactWriteItemDeleteProps <a name="DynamodbTransactWriteItemDeleteProps" id="@winglang/sdk.ex.DynamodbTransactWriteItemDeleteProps"></a>

Properties for transact write item's delete operation.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTransactWriteItemDeleteProps.Initializer"></a>

```wing
bring ex;

let DynamodbTransactWriteItemDeleteProps = ex.DynamodbTransactWriteItemDeleteProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemDeleteProps.property.key">key</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The item to delete. |

---

##### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.DynamodbTransactWriteItemDeleteProps.property.key"></a>

```wing
key: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The item to delete.

---

### DynamodbTransactWriteItemPutProps <a name="DynamodbTransactWriteItemPutProps" id="@winglang/sdk.ex.DynamodbTransactWriteItemPutProps"></a>

Properties for transact write item's update operation.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTransactWriteItemPutProps.Initializer"></a>

```wing
bring ex;

let DynamodbTransactWriteItemPutProps = ex.DynamodbTransactWriteItemPutProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemPutProps.property.item">item</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The item to put. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemPutProps.property.conditionExpression">conditionExpression</a></code> | <code>str</code> | A condition that must be satisfied in order for an operation to succeed. |

---

##### `item`<sup>Required</sup> <a name="item" id="@winglang/sdk.ex.DynamodbTransactWriteItemPutProps.property.item"></a>

```wing
item: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The item to put.

---

##### `conditionExpression`<sup>Optional</sup> <a name="conditionExpression" id="@winglang/sdk.ex.DynamodbTransactWriteItemPutProps.property.conditionExpression"></a>

```wing
conditionExpression: str;
```

- *Type:* str
- *Default:* undefined

A condition that must be satisfied in order for an operation to succeed.

---

### DynamodbTransactWriteItemsProps <a name="DynamodbTransactWriteItemsProps" id="@winglang/sdk.ex.DynamodbTransactWriteItemsProps"></a>

Properties for `DynamodbTable.transactWriteItems`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTransactWriteItemsProps.Initializer"></a>

```wing
bring ex;

let DynamodbTransactWriteItemsProps = ex.DynamodbTransactWriteItemsProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemsProps.property.transactItems">transactItems</a></code> | <code>MutArray&lt;<a href="#@winglang/sdk.ex.DynamodbTransactWriteItem">DynamodbTransactWriteItem</a>&gt;</code> | The write transact items. |

---

##### `transactItems`<sup>Required</sup> <a name="transactItems" id="@winglang/sdk.ex.DynamodbTransactWriteItemsProps.property.transactItems"></a>

```wing
transactItems: MutArray<DynamodbTransactWriteItem>;
```

- *Type:* MutArray&lt;<a href="#@winglang/sdk.ex.DynamodbTransactWriteItem">DynamodbTransactWriteItem</a>&gt;

The write transact items.

---

### DynamodbTransactWriteItemUpdateProps <a name="DynamodbTransactWriteItemUpdateProps" id="@winglang/sdk.ex.DynamodbTransactWriteItemUpdateProps"></a>

Properties for transact write item's update operation.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTransactWriteItemUpdateProps.Initializer"></a>

```wing
bring ex;

let DynamodbTransactWriteItemUpdateProps = ex.DynamodbTransactWriteItemUpdateProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemUpdateProps.property.key">key</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The item to update. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemUpdateProps.property.expressionAttributeValues">expressionAttributeValues</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more values that can be substituted in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemUpdateProps.property.updateExpression">updateExpression</a></code> | <code>str</code> | An expression that defines one or more attributes to be updated. |

---

##### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.DynamodbTransactWriteItemUpdateProps.property.key"></a>

```wing
key: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The item to update.

---

##### `expressionAttributeValues`<sup>Optional</sup> <a name="expressionAttributeValues" id="@winglang/sdk.ex.DynamodbTransactWriteItemUpdateProps.property.expressionAttributeValues"></a>

```wing
expressionAttributeValues: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>
- *Default:* undefined

One or more values that can be substituted in an expression.

---

##### `updateExpression`<sup>Optional</sup> <a name="updateExpression" id="@winglang/sdk.ex.DynamodbTransactWriteItemUpdateProps.property.updateExpression"></a>

```wing
updateExpression: str;
```

- *Type:* str
- *Default:* undefined

An expression that defines one or more attributes to be updated.

---


