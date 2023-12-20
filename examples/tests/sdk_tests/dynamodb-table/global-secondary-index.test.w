bring cloud;
bring ex;
bring util;

let api = new cloud.Api();

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
    for i in 1..11 {
        let var id = util.nanoid();

        // Make the first item entered last, and the last item first
        if i == 1 {
            id = "0" + id;
        } elif i == 10 {
            id = "z" + id;
        }

        table.putItem({
            item: {
                "type": "post",
                "id": id,
                "title": "Title #{i}",
                "createdAt": i,
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

    assert(items.items.at(0).get("createdAt") != 1);

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

    for i in 0..10 {
        assert(itemsCreatedAtIndex.items.at(i).get("createdAt") == 10 - i);
    }
}
