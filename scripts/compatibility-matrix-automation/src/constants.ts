import { join } from "path";

export const SKIPPED_RESOURCES = "TestRunner";
export const MATRIX_PATH = join(
  __dirname,
  "../../../../docs/docs/04-standard-library/compatibility/compatibility.json"
);
export const OUT_PATH = join(__dirname, "../../../out.json");

export const PLATFORMS = {
  "tf-aws": "tf-aws",
  "tf-gcp": "tf-gcp",
  "tf-azure": "tf-azure",
  awscdk: "awscdk",
  sim: "sim",
};
