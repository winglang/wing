import { trpc } from "../../../trpc.js";

export const useEndpointsWarning = () => {
  const warningAccepted = trpc["endpoint.warningAccepted"].useQuery();

  const notifyWarningAccepted =
    trpc["endpoint.notifyWarningAccepted"].useMutation();

  return {
    warningAccepted,
    notifyWarningAccepted,
  };
};
