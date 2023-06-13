import { createReadStream } from "node:fs";
import { readFile } from "node:fs/promises";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const tag = await readFile("../../dist/releasetag.txt", "utf8");
const version = tag.slice(1);
const dmgFilename = `release/Wing Console-${version}.dmg`;
const dmgArm64Filename = `release/Wing Console-${version}-arm64.dmg`;
const exeFilename = `release/Wing Console Setup ${version}.exe`;

const client = new S3Client({
  region: "us-east-1",
});

await Promise.all([
  client.send(
    new PutObjectCommand({
      Key: "wing-console.dmg",
      Bucket: "wing-console",
      Body: createReadStream(dmgFilename),
      ACL: "public-read",
    }),
  ),
  client.send(
    new PutObjectCommand({
      Key: "wing-console-arm64.dmg",
      Bucket: "wing-console",
      Body: createReadStream(dmgArm64Filename),
      ACL: "public-read",
    }),
  ),
  client.send(
    new PutObjectCommand({
      Key: "wing-console.exe",
      Bucket: "wing-console",
      Body: createReadStream(exeFilename),
      ACL: "public-read",
    }),
  ),
]);
