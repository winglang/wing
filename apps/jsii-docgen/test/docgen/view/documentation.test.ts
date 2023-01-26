import { Documentation, Language } from "../../../src";
import * as path from "path";

jest.setTimeout(30 * 1000);

describe("wing", () => {
  test("single package", async () => {
    const docs = await Documentation.forProject(
      path.join(__dirname, "../../__fixtures__/libraries/construct-library")
    );
    try {
      const json = await docs.toJson({ language: Language.WING });
      const markdown = await docs.toMarkdown({ language: Language.WING });

      expect(json.content).toMatchSnapshot();
      expect(markdown.render()).toMatchSnapshot();
    } finally {
      await docs.cleanup();
    }
  });
});
