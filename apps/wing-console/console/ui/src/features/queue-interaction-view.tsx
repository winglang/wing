import { useQueue } from "../services/use-queue.js";
import { QueueInteraction } from "../ui/queue-interaction.js";

export interface QueueViewProps {
  resourcePath: string;
}

export const QueueInteractionView = ({ resourcePath }: QueueViewProps) => {
  const { isLoading, pushMessage } = useQueue({ resourcePath });
  return (
    <QueueInteraction isLoading={isLoading} onPushMessageClick={pushMessage} />
  );
};
