import { useFunction } from "../services/use-function.js";
import { FunctionInteraction } from "../ui/function-interaction.js";

export interface FunctionViewProps {
  resourcePath: string;
}

export const FunctionInteractionView = ({
  resourcePath,
}: FunctionViewProps) => {
  const { isLoading, invokeFunction, response } = useFunction({ resourcePath });

  return (
    <FunctionInteraction
      onInvokeClick={invokeFunction}
      isLoading={isLoading}
      response={response}
    />
  );
};
