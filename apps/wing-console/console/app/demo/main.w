bring cloud;

interface Storage {
    inflight putObject(key: str, contents: str): void;
    inflight getObject(key: str): str;

    onObjectCreated(callback: inflight (str): void): void;
}

class BucketStorage impl Storage {
    bucket: cloud.Bucket;

    new() {
        this.bucket = new cloud.Bucket();
    }

    pub inflight putObject(key: str, contents: str) {
        this.bucket.put(key, contents);
    }

    pub inflight getObject(key: str): str {
        return this.bucket.get(key);
    }

    pub onObjectCreated(callback: inflight (str): void) {
        this.bucket.onCreate(inflight (key) => {
            callback(key);
        });
    }
}

// class TableStorage impl Storage {
//     table: dynamodb.Table;
//     topic: cloud.Topic;

//     new() {
//         this.table = new dynamodb.Table(
//             hashKey: "key",
//             attributes: [
//                 { name: "key", type: "S" },
//             ],
//         );

//         this.topic = new cloud.Topic();
//     }

//     pub inflight putObject(key: str, contents: str) {
//         this.table.put(
//             Item: {
//                 key,
//                 contents,
//             },
//         );
//         this.topic.publish(key);
//     }

//     pub inflight getObject(key: str): str {
//         let item = this.table.get(
//             Key: {
//                 key,
//             },
//         ).Item!;
//         return item.get("contents").asStr();
//     }

//     pub onObjectCreated(callback: inflight (str): void) {
//         this.topic.onMessage(inflight (key) => {
//             callback(key);
//         });
//     }
// }

class FileProcessor {
    uploads: Storage;
    processedObjects: Storage;

    new(uploads: Storage, processed: Storage) {
        this.uploads = uploads;
        this.processedObjects = processed;

        this.uploads.onObjectCreated(inflight (key) => {
            let contents = this.uploads.getObject(key);
            let uppercaseContents = contents.uppercase();
            this.processedObjects.putObject(key, uppercaseContents);
        });
    }

    pub inflight processObject(key: str, contents: str) {
        this.uploads.putObject(key, contents);
    }

    pub inflight getProcessedObject(key: str): str {
        return this.processedObjects.getObject(key);
    }

    pub onFileProcessed(callback: inflight (str): void) {
        this.processedObjects.onObjectCreated(inflight (key) => {
            callback(key);
        });
    }
}

let processor = new FileProcessor(
    new BucketStorage() as "UploadsStorage",
    new BucketStorage() as "ProcessedStorage",
);

processor.onFileProcessed(inflight (key) => {
    let fileContents = processor.getProcessedObject(key);
    log("File [{key}] was processed: {fileContents}");
});

new cloud.Function(inflight () => {
    processor.processObject("hello-3", "cristian");
}) as "ProcessHelloWorldFile";
