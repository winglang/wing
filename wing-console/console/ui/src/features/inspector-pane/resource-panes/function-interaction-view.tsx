import { memo } from "react";

import { useConsoleEnvironment } from "../../console-environment-context/console-environment-context.js";

import { FunctionInteraction } from "./function-interaction.js";
import { useFunction } from "./use-function.js";

export interface FunctionViewProps {
  resourcePath: string;
}

export const FunctionInteractionView = memo(
  ({ resourcePath }: FunctionViewProps) => {
    const { consoleEnvironment: environmentId } = useConsoleEnvironment();
    const { isLoading, invokeFunction, response } = useFunction({
      environmentId,
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
