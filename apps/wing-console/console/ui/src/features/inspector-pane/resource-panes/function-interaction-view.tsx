import { memo } from "react";

import { FunctionInteraction } from "./function-interaction.js";
import { useFunction } from "./use-function.js";

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
