import { createReadStream } from "node:fs";
import { readFile } from "node:fs/promises";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const version = await readFile("dist/version.txt", "utf8");
const dmgFilename = `release/Wing Console-${version}.dmg`;

const client = new S3Client({
  region: "us-east-1",
});
await client.send(
  new PutObjectCommand({
    Key: "wing-console.dmg",
    Bucket: "wing-console",
    Body: createReadStream(dmgFilename),
  }),
);
