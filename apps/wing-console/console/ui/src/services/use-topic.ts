import { trpc } from "./trpc.js";

export interface UseTopicOptions {
  resourcePath: string;
}
export const useTopic = ({ resourcePath }: UseTopicOptions) => {
  const publish = trpc["topic.publish"].useMutation();

  const publishMessage = (message: string) => {
    publish.mutate({
      resourcePath,
      message,
    });
  };

  return {
    publishMessage,
  };
};
