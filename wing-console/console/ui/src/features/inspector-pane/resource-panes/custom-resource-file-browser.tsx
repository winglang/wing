import { useCallback, useEffect, useMemo, useState } from "react";

import { trpc } from "../../../trpc.js";
import { useDownloadFile } from "../../../use-download-file.js";
import { useUploadFile } from "../../../use-upload-file.js";
import { useConsoleEnvironment } from "../../console-environment-context/console-environment-context.js";

import { FileBrowserView } from "./file-browser-view.js";

export interface CustomResourceFileBrowserProps {
  label: string;
  putHandler: string;
  deleteHandler: string;
  getHandler: string;
  listHandler: string;
}

export const CustomResourceFileBrowser = ({
  listHandler,
  deleteHandler,
  putHandler,
  getHandler,
}: CustomResourceFileBrowserProps) => {
  const { download: downloadFileLocally, downloadFiles: downloadFilesLocally } =
    useDownloadFile();
  const { readBlob } = useUploadFile();

  const [currentFile, setCurrentFile] = useState<string>();

  const { consoleEnvironment: environmentId } = useConsoleEnvironment();
  const listQuery = trpc["fileBrowser.list"].useQuery(
    {
      environmentId,
      resourcePath: listHandler,
    },
    { enabled: !!listHandler },
  );

  const currentFileContentQuery = trpc["fileBrowser.get"].useQuery(
    {
      environmentId,
      fileName: currentFile ?? "",
      resourcePath: getHandler,
    },
    {
      enabled: currentFile !== undefined,
      keepPreviousData: false,
    },
  );

  const deleteMutation = trpc["fileBrowser.delete"].useMutation();
  const downloadMutation = trpc["fileBrowser.download"].useMutation();
  const putMutation = trpc["fileBrowser.put"].useMutation();

  const [currentFileContent, setCurrentFileContent] = useState<string>();

  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    if (currentFileContentQuery.data) {
      setCurrentFileContent(currentFileContentQuery.data);
    }
  }, [currentFileContentQuery.data]);

  useEffect(() => {
    if (listQuery.data) {
      setFiles(listQuery.data);
    }
  }, [listQuery.data]);

  const deleteFiles = useCallback(
    async (files: string[]) => {
      for (const file of files) {
        await deleteMutation.mutateAsync({
          environmentId,
          resourcePath: deleteHandler,
          fileName: file,
        });
      }
    },
    [environmentId, deleteHandler, deleteMutation],
  );

  const downloadFiles = useCallback(
    async (files: string[]) => {
      if (files.length === 0) {
        return;
      }
      if (files.length === 1 && files[0]) {
        const content =
          currentFileContent ||
          (await downloadMutation.mutate({
            environmentId,
            resourcePath: getHandler,
            fileName: files[0],
          }));
        void downloadFileLocally(files[0], content || "");
      }
      if (files.length > 1) {
        const promises = files.map(async (file) => {
          const content = await downloadMutation.mutateAsync({
            environmentId,
            resourcePath: getHandler,
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
      downloadFileLocally,
      downloadFilesLocally,
      getHandler,
      downloadMutation,
      currentFileContent,
    ],
  );

  const putFile = useCallback(
    (fileName: string, fileContent: string) => {
      return putMutation.mutateAsync({
        environmentId,
        resourcePath: putHandler,
        fileName,
        fileContent,
      });
    },
    [environmentId, putHandler, putMutation],
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

  const isLoading = useMemo(() => {
    return currentFileContentQuery.isFetching;
  }, [currentFileContentQuery.isFetching]);

  return (
    <FileBrowserView
      isLoading={isLoading}
      files={files}
      deleteFilesHandler={deleteFiles}
      downloadFilesHandler={downloadFiles}
      uploadFilesHandler={uploadFiles}
      currentFileContent={currentFileContent}
      onCurrentFileChange={setCurrentFile}
    />
  );
};
