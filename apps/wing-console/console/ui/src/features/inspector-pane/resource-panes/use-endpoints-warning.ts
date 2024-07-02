import { trpc } from "../../../trpc.js";

export const useEndpointsWarning = () => {
  const requireAcceptWarning = trpc["endpoint.requireAcceptWarning"].useQuery();

  const notifyAcceptWarning =
    trpc["endpoint.notifyAcceptWarning"].useMutation();

  return {
    requireAcceptWarning,
    notifyAcceptWarning,
  };
};
