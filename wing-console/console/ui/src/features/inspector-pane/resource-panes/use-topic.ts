import { trpc } from "../../../trpc.js";
import { useConsoleEnvironment } from "../../console-environment-context/console-environment-context.js";

export interface UseTopicOptions {
  resourcePath: string;
}
export const useTopic = ({ resourcePath }: UseTopicOptions) => {
  const publish = trpc["topic.publish"].useMutation();

  const { consoleEnvironment: environmentId } = useConsoleEnvironment();
  const publishMessage = (message: string) => {
    publish.mutate({
      environmentId,
      resourcePath,
      message,
    });
  };

  return {
    publishMessage,
  };
};
