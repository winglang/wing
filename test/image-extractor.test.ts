import { core } from "../src";
import { ImageExtractor } from "./image-extractor-app";

test("hello", () => {
  const app = new core.App();
  new ImageExtractor(app, "ImageExtractor");
  app.synth();
});
