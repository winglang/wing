import { trpc } from "../../../trpc.js";

export const useEndpointsWarning = () => {
  const requireAcceptWarning = trpc["endpoint.requireAcceptWarning"].useQuery();

  const notifyWarningAccepted =
    trpc["endpoint.notifyWarningAccepted"].useMutation();

  return {
    requireAcceptWarning,
    notifyWarningAccepted,
  };
};
