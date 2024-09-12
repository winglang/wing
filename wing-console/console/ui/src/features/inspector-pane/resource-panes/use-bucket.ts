import { useCallback, useEffect, useMemo, useState } from "react";

import { trpc } from "../../../trpc.js";
import { useDownloadFile } from "../../../use-download-file.js";
import { useUploadFile } from "../../../use-upload-file.js";
import { useConsoleEnvironment } from "../../console-environment-context/console-environment-context.js";

export interface UseBucketOptions {
  resourcePath: string;
  currentFile?: string;
}
export const useBucket = ({ resourcePath, currentFile }: UseBucketOptions) => {
  const [files, setFiles] = useState<string[]>([]);
  const { readBlob } = useUploadFile();
  const { download: downloadFileLocally, downloadFiles: downloadFilesLocally } =
    useDownloadFile();

  const { consoleEnvironment: environmentId } = useConsoleEnvironment();
  const list = trpc["bucket.list"].useQuery(
    { environmentId, resourcePath },
    {
      onSuccess(data) {
        setFiles(data);
      },
    },
  );
  const putMutation = trpc["bucket.put"].useMutation();
  const deleteMutation = trpc["bucket.delete"].useMutation();
  const downloadMutation = trpc["bucket.download"].useMutation();
  const currentFileContentQuery = trpc["bucket.get"].useQuery(
    {
      environmentId,
      fileName: currentFile ?? "",
      resourcePath,
    },
    {
      enabled: currentFile !== undefined,
      keepPreviousData: false,
    },
  );
  const [currentFileContent, setCurrentFileContent] = useState<string>();

  useEffect(() => {
    if (currentFileContentQuery.data) {
      setCurrentFileContent(currentFileContentQuery.data);
    }
  }, [currentFileContentQuery.data]);

  useEffect(() => {
    if (!list.data) return;
    setFiles([...list.data]);
  }, [list.data]);

  const putFile = useCallback(
    (fileName: string, fileContent: string) => {
      return putMutation.mutateAsync({
        environmentId,
        resourcePath,
        fileName,
        fileContent,
      });
    },
    [environmentId, putMutation, resourcePath],
  );

  const uploadFiles = useCallback(
    async (files: FileList) => {
      for (const file of files) {
        const fileContent = await readBlob(file.name, file);
        void putFile(file.name, fileContent);
      }
    },
    [putFile, readBlob],
  );

  const downloadFiles = useCallback(
    async (files: string[]) => {
      if (files.length === 0) {
        return;
      }
      if (files.length === 1 && files[0]) {
        const content =
          currentFileContent ||
          (await downloadMutation.mutateAsync({
            environmentId,
            resourcePath,
            fileName: files[0],
          }));
        void downloadFileLocally(files[0], content);
      }
      if (files.length > 1) {
        const promises = files.map(async (file) => {
          const content = await downloadMutation.mutateAsync({
            environmentId,
            resourcePath,
            fileName: file,
          });
          return { filename: file, content };
        });

        const result = await Promise.all(promises);
        void downloadFilesLocally(result);
      }
    },
    [
      environmentId,
      downloadMutation,
      downloadFileLocally,
      downloadFilesLocally,
      resourcePath,
      currentFileContent,
    ],
  );

  const deleteFile = useCallback(
    async (fileNames: string[]) => {
      return deleteMutation.mutateAsync({
        environmentId,
        resourcePath,
        fileNames,
      });
    },
    [environmentId, deleteMutation, resourcePath],
  );

  const isLoading = useMemo(() => {
    return currentFileContentQuery.isFetching;
  }, [currentFileContentQuery.isFetching]);

  return {
    uploadFiles,
    downloadFile: downloadFileLocally,
    downloadFiles,
    deleteFile,
    currentFileContent,
    isLoading,
    files,
  };
};
