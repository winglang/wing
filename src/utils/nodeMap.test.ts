import { WingLocalSchema } from "@monadahq/wing-local-schema";
import { expect, test } from "vitest";

import { buildNodeMap } from "./nodeMap";

test("builds node map from tree.json", async () => {
  const tree = (await import("../assets/tree.json")) as WingLocalSchema;
  const nodeMap = buildNodeMap(tree.root);

  expect(nodeMap.record).toMatchObject({
    "": {
      id: "image-extractor-app",
      path: "image-extractor-app",
      type: "constructs.Construct",
      attributes: {},
      parent: undefined,
      children: ["image-extractor-app/ImageStore"],
    },
    "image-extractor-app": {
      id: "image-extractor-app",
      path: "image-extractor-app",
      type: "constructs.Construct",
      attributes: {},
      parent: undefined,
      children: ["image-extractor-app/ImageStore"],
    },
    "image-extractor-app/ImageStore": {
      id: "ImageStore",
      path: "image-extractor-app/ImageStore",
      type: "constructs.Construct",
      attributes: {},
      parent: "image-extractor-app",
      children: [
        "image-extractor-app/ImageStore/ImageStore.cloud.Function",
        "image-extractor-app/ImageStore/ImageStore.cloud.Bucket",
      ],
    },
    "image-extractor-app/ImageStore/ImageStore.cloud.Function": {
      id: "ImageStore.cloud.Function",
      path: "image-extractor-app/ImageStore/ImageStore.cloud.Function",
      type: "cloud.Function",
      attributes: {
        sourceCodeFile: "image-store.js",
        sourceCodeLanguage: "javascript",
        environmentVariables: {},
      },
      parent: "image-extractor-app/ImageStore",
      children: [],
    },
    "image-extractor-app/ImageStore/ImageStore.cloud.Bucket": {
      id: "ImageStore.cloud.Bucket",
      path: "image-extractor-app/ImageStore/ImageStore.cloud.Bucket",
      type: "cloud.Bucket",
      attributes: {},
      parent: "image-extractor-app/ImageStore",
      children: [],
    },
  });
});
