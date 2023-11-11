import { memo } from "react";

import { useFunction } from "../services/use-function.js";
import { FunctionInteraction } from "../ui/function-interaction.js";

export interface FunctionViewProps {
  resourcePath: string;
}

export const FunctionInteractionView = memo(
  ({ resourcePath }: FunctionViewProps) => {
    const { isLoading, invokeFunction, response } = useFunction({
      resourcePath,
    });

    return (
      <FunctionInteraction
        resourceId={resourcePath}
        onInvokeClick={invokeFunction}
        isLoading={isLoading}
        response={response}
      />
    );
  },
);
