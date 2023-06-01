import { useEffect, useMemo, useState } from "react";

import { trpc } from "../utils/trpc.js";

export interface UseRedisOptions {
  resourcePath: string;
}
export const useRedis = ({ resourcePath }: UseRedisOptions) => {
  const info = trpc["redis.info"].useQuery({ resourcePath });
  const exec = trpc["redis.exec"].useMutation();

  const [redisUrl, setRedisUrl] = useState<string>("");

  useEffect(() => {
    if (info.data) {
      setRedisUrl(info.data.url);
    }
  }, [info.data]);

  const execCommand = async (command: string) => {
    return exec.mutateAsync({
      resourcePath,
      command,
    });
  };

  const isLoading = useMemo(() => {
    return exec.isLoading;
  }, [exec.isLoading]);

  return {
    execCommand,
    isLoading,
    redisUrl,
  };
};
