import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import {
  FormEventHandler,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { AppContext } from "../../AppContext.js";
import { Button } from "../../design-system/Button.js";
import { TreeEntry, Tree } from "../../design-system/Tree.js";
import { trpc } from "../../utils/trpc.js";
import { useDownloadFile } from "../../utils/useDownloadFile.js";
import { JsonResponseInput } from "../JsonResponseInput.js";

export interface BucketViewProps {
  resourcePath: string;
}

const getFileType = (fileName: string) => {
  return fileName.split(".").pop();
};

const canBePreviewed = (fileName: string) => {
  const validFileTypes = ["txt", "json"];
  const fileType = getFileType(fileName);
  if (!fileType) {
    return false;
  }
  return validFileTypes.includes(fileType);
};

export const BucketView = ({ resourcePath }: BucketViewProps) => {
  const { theme } = useTheme();
  const { appMode } = useContext(AppContext);

  const bucketList = trpc["bucket.list"].useQuery({ resourcePath });
  const putFile = trpc["bucket.put"].useMutation();
  const [currentFile, setCurrentFile] = useState<string>();
  const currentFileContents = trpc["bucket.get"].useQuery(
    {
      fileName: currentFile ?? "",
      resourcePath,
    },
    {
      enabled: currentFile !== undefined && canBePreviewed(currentFile),
      keepPreviousData: false,
    },
  );
  const deleteFile = trpc["bucket.delete"].useMutation();
  const downloadFile = trpc["bucket.download"].useMutation();

  const [entries, setEntries] = useState<TreeEntry[]>([]);
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileInputId, setFileInputId] = useState(new Date().toString());

  const { download, downloadFiles } = useDownloadFile();

  const uploadSelectedEntries: FormEventHandler<HTMLInputElement> = async (
    event,
  ) => {
    for (const file of event.currentTarget.files ?? []) {
      putFile.mutateAsync({
        resourcePath,
        fileName: file.name,
        // TODO: Fix the missing `file.path` declaration. Seems to come from electron.d.ts...
        // @ts-ignore
        filePath: file.path,
      });
    }
    // force re-render to avoid problems uploading the same file twice
    setFileInputId(new Date().toString());
  };

  const deleteSelectedEntries = async () => {
    if (currentFile) {
      setCurrentFile(undefined);
    }
    await deleteFile.mutateAsync({
      resourcePath,
      fileNames: selectedEntries,
    });

    setSelectedEntries([]);
  };

  const downloadSelectedEntries = useCallback(async () => {
    if (selectedEntries.length === 0) {
      return;
    }

    if (selectedEntries.length === 1 && selectedEntries[0]) {
      const entry = selectedEntries[0];
      if (!entry) {
        return;
      }
      const content = await downloadFile.mutateAsync({
        resourcePath,
        fileName: entry,
      });
      download(entry, content);
    }
    if (selectedEntries.length > 1) {
      const promises = selectedEntries.map(async (entry) => {
        const content = await downloadFile.mutateAsync({
          resourcePath,
          fileName: entry,
        });
        return { filename: entry, content };
      });

      const files = await Promise.all(promises);
      downloadFiles(files);
    }
    setSelectedEntries([]);
  }, [selectedEntries, download, downloadFile, downloadFiles, resourcePath]);

  // todo [sa] make it work better with actual file objects and not only keys
  useEffect(() => {
    setEntries(
      bucketList.data?.map((file) => ({
        id: file,
        name: file,
      })) ?? [],
    );
    setCurrentFile(undefined);
    setSelectedEntries([]);
  }, [bucketList.data]);

  return (
    <div className="h-full flex-1 flex flex-col text-sm space-y-1.5">
      <div className="flex justify-between items-center gap-1">
        <div className="flex items-center gap-1">
          <Button
            label="Download"
            disabled={selectedEntries.length === 0}
            onClick={downloadSelectedEntries}
          />
          <Button
            label="Delete"
            disabled={selectedEntries.length === 0}
            onClick={deleteSelectedEntries}
          />
        </div>

        <div>
          <input
            key={fileInputId}
            ref={fileInputRef}
            type="file"
            className="hidden"
            onInput={uploadSelectedEntries}
            multiple
          />
          {appMode !== "webapp" && (
            <Button
              label="Upload"
              onClick={() => {
                fileInputRef.current?.click();
              }}
            />
          )}
        </div>
      </div>

      {entries.length === 0 && (
        <div
          className={classNames(
            theme.bgInput,
            theme.text2,
            theme.borderInput,
            "px-2.5 py-1.5",
            "outline-none rounded borderpy-0.5 text-center inline-block w-full text-xs",
          )}
        >
          No files
        </div>
      )}
      {entries.length > 0 && (
        <Tree
          entries={entries}
          selectedEntries={selectedEntries}
          onCurrentChange={setCurrentFile}
          onSelectionChange={setSelectedEntries}
          className="min-h-[6rem] h-48 overflow-y-auto resize-y"
        />
      )}

      {currentFile && (
        <div className="space-y-1 mt-1">
          <div className={classNames(theme.text2, "text-sm truncate")}>
            {currentFile}
          </div>
          <JsonResponseInput
            value={
              (canBePreviewed(currentFile) && currentFileContents.data) || ""
            }
            loading={currentFileContents.isFetching}
            json={getFileType(currentFile) === "json"}
            placeholder="No preview available"
            className="max-h-[20rem]"
          />
        </div>
      )}
    </div>
  );
};
