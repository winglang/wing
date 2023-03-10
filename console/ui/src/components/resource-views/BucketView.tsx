import classNames from "classnames";
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Button } from "../../design-system/Button.js";
import { Popover } from "../../design-system/Popover.js";
import { SpinnerLoader } from "../../design-system/SpinnerLoader.js";
import { TextHighlight } from "../../design-system/TextHighlight.js";
import { TreeEntry, Tree } from "../../design-system/Tree.js";
import { trpc } from "../../utils/trpc.js";
import { File, useDownloadFile } from "../../utils/useDownloadFile.js";

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
  }, [selectedEntries]);

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
          <div className="relative">
            <Popover label="Delete" disabled={selectedEntries.length === 0}>
              {({ close }) => (
                <>
                  <span>
                    Are you sure you want to delete {selectedEntries.length}{" "}
                    file
                    {selectedEntries.length > 1 && "s"}?
                  </span>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button label="Cancel" onClick={close} />
                    <Button
                      label="Confirm"
                      onClick={async () => {
                        close();
                        await deleteSelectedEntries();
                      }}
                    />
                  </div>
                </>
              )}
            </Popover>
          </div>
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
          <Button
            label="Upload"
            onClick={() => {
              fileInputRef.current?.click();
            }}
          />
        </div>
      </div>

      {entries.length === 0 && (
        <div className="bg-white outline-none rounded border border-slate-300 py-0.5 text-center text-slate-400 inline-block w-full">
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
          <div className="text-sm text-slate-500 truncate">{currentFile}</div>

          {!canBePreviewed(currentFile) && (
            <div
              className={classNames(
                "flex-1 text-center text-slate-600 text-xs",
                "px-2 py-1 border rounded border-slate-200 bg-slate-100",
              )}
            >
              No preview available
            </div>
          )}

          {canBePreviewed(currentFile) && currentFileContents.isFetching && (
            <div className="flex justify-center items-center h-20">
              <SpinnerLoader className="h-5 w-5" />
            </div>
          )}

          {canBePreviewed(currentFile) && currentFileContents.data && (
            <TextHighlight
              className={classNames(
                "flex-1 font-mono w-full",
                "p-2 border rounded border-slate-200 bg-white",
                "select-text text-slate-600 text-xs",
                "break-words whitespace-pre-wrap",
                "min-h-[6rem] h-48 resize-y overflow-y-auto",
              )}
              text={currentFileContents.data}
              json={getFileType(currentFile) === "json"}
            />
          )}
        </div>
      )}
    </div>
  );
};
