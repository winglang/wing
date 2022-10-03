import { z } from "zod";

import { createRouter } from "../context";

export const bucketRouter = createRouter().query("bucket.listFiles", {
  input: z.object({
    directory: z.string(),
  }),
  async resolve({ input }) {
    return [input.directory];
  },
});
