/*\
skipPlatforms:
  - win32
  - darwin
\*/

bring cloud;
bring ex;
bring util;

let table = new ex.DynamodbTable(
    name: "blog",
    attributeDefinitions: {
        type: "S",
        id: "S",
        createdAt: "N"
    },
    hashKey: "type",
    rangeKey: "id",
    globalSecondaryIndex: [{
        name: "CreatedAtIndex",
        hashKey: "type",
        rangeKey: "createdAt",
        projectionType: "ALL"
    }],
);

// Only Hash Key
let table2 = new ex.DynamodbTable(
    name: "blog2",
    attributeDefinitions: {
        type: "S",
        id: "S",
    },
    hashKey: "type",
    rangeKey: "id",
    globalSecondaryIndex: [{
        name: "TypeIndex",
        hashKey: "type",
        projectionType: "ALL"
    }],
) as "blog2";

test "Global secondary index" {
    let idCreated = [
        {id: "zuegksw", createdAt: 1},
        {id: "dirnfhw", createdAt: 3},
        {id: "pdkeruf", createdAt: 5},
        {id: "azjekfw", createdAt: 7},
    ];

    for i in idCreated {
        let id = i.get("id").asStr();
        let createAt = i.get("createdAt").asNum();

        table.putItem({
            item: {
                "type": "post",
                "id": id,
                "title": "Title #{i}",
                "createdAt": createAt,
            },
        });
    }

    let items = table.query({
        keyConditionExpression: "#type = :type",
        expressionAttributeNames: {
            "#type": "type",
        },
        expressionAttributeValues: {
            ":type": "post",
        },
        scanIndexForward: false,
    });

    // log("{Json.stringify(items.items)}");

    // returns all items order by id desc
    let ids = ["zuegksw", "pdkeruf", "dirnfhw", "azjekfw"];
    for i in 0..ids.length {
        assert(items.items.at(i).get("id") == ids.at(i));
    }

    let itemsCreatedAtIndex = table.query({
        indexName: "CreatedAtIndex",
        keyConditionExpression: "#type = :type",
        expressionAttributeNames: {
            "#type": "type",
        },
        expressionAttributeValues: {
            ":type": "post",
        },
        scanIndexForward: false,
    });

    // log("{Json.stringify(itemsCreatedAtIndex.items)}");

    // returns all items order by createdAt desc
    let idsOrderByCreatedAt = ["azjekfw", "pdkeruf", "dirnfhw", "zuegksw"];
    for i in 0..idsOrderByCreatedAt.length {
        assert(itemsCreatedAtIndex.items.at(i).get("id") == idsOrderByCreatedAt.at(i));
    }
}
