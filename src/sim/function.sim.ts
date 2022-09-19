import { FunctionSchema } from "./schema";

export async function init(
  props: FunctionSchema["props"]
): Promise<
  NonNullable<FunctionSchema["attributes"] & FunctionSchema["props"]>
> {
  if (props.sourceCodeLanguage !== "javascript") {
    throw new Error("Only JavaScript is supported");
  }

  return {
    ...props,
  };
}
