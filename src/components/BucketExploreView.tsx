import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  DocumentIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { FolderIcon } from "@heroicons/react/24/solid";
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Button } from "../design-system/Button.js";
import { Checkbox } from "../design-system/Checkbox.js";
import { Input } from "../design-system/Input.js";
import { trpc } from "../utils/trpc.js";
import { useDownloadFile } from "../utils/useDownloadFile.js";

export interface BucketInteractionViewProps {
  resourcePath: string;
}

export interface FileExplorerEntry {
  type: "directory" | "file";
  name: string;
  updatedAt?: number;
  fileSize?: number;
}

export const BucketExploreView = ({
  resourcePath,
}: BucketInteractionViewProps) => {
  const [path] = useState("/");
  const bucketList = trpc.useQuery(["bucket.list", { resourcePath }]);
  const putFile = trpc.useMutation(["bucket.put"]);
  const getFile = trpc.useMutation(["bucket.get"]);
  const [entries, setEntries] = useState<FileExplorerEntry[]>([]);
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { download } = useDownloadFile();

  const addNewEntries: FormEventHandler<HTMLInputElement> = async (event) => {
    for (const file of event.currentTarget.files ?? []) {
      await putFile.mutateAsync({
        resourcePath,
        fileName: file.name,
        filePath: file.path,
      });
    }
  };

  // todo [sa] make it work better with actual file objects and not only keys
  useEffect(() => {
    setEntries(
      bucketList.data?.map((file) => ({
        type: "file",
        name: file,
      })) ?? [],
    );
  }, [bucketList.data]);

  // todo [sa] delete file from bucket
  // const deleteSelectedEntries = useCallback(() => {
  //   setEntries((entries) => {
  //     setSelectedEntries([]);
  //     return entries.filter(
  //       (entry) => selectedEntries.includes(entry.name) === false,
  //     );
  //   });
  // }, [selectedEntries]);

  const downloadSelectedEntries = useCallback(async () => {
    for (const entry of selectedEntries) {
      const file = await getFile.mutateAsync({
        resourcePath,
        fileName: entry,
      });
      download(entry, file);
    }
  }, [selectedEntries]);

  return (
    <div className="h-full flex-1 space-y-2 p-4 flex flex-col text-sm">
      <div className="flex justify-between items-center gap-1">
        <div className="flex items-center gap-1">
          <Button
            icon={ArrowDownTrayIcon}
            label="Download"
            disabled={selectedEntries.length === 0}
            onClick={downloadSelectedEntries}
          />
          <Button
            icon={TrashIcon}
            label="Delete"
            disabled={selectedEntries.length === 0}
            // onClick={deleteSelectedEntries}
          />
        </div>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onInput={addNewEntries}
          />
          <Button
            icon={ArrowUpTrayIcon}
            label="Upload"
            primary
            onClick={() => {
              fileInputRef.current?.click();
            }}
          />
        </div>
      </div>

      <Input
        ref={inputRef}
        type="text"
        className="py-1"
        leftIcon={FolderIcon}
        value={path}
        readOnly
        onFocus={() => {
          if (inputRef.current) {
            inputRef.current.setSelectionRange(
              0,
              inputRef.current.value.length,
            );
          }
        }}
      />

      <div className="flex-1 bg-white rounded border border-slate-200 h-96">
        <table className="w-full bg-slate-100 rounded">
          <thead>
            <tr className="text-left text-sm text-slate-900">
              <th className="px-2 border-b border-slate-200 font-semibold">
                Name
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {entries.map((entry) => {
              return (
                <tr key={entry.name}>
                  <td className="px-2">
                    <div className="flex items-center gap-1.5">
                      <Checkbox
                        checked={selectedEntries.includes(entry.name)}
                        onChange={(event) => {
                          const { checked } = event.currentTarget;
                          setSelectedEntries(([...checkedEntries]) => {
                            if (checked) {
                              return [...checkedEntries, entry.name];
                            } else {
                              const index = checkedEntries.indexOf(entry.name);
                              if (index !== -1) {
                                checkedEntries.splice(index, 1);
                              }
                              return checkedEntries;
                            }
                          });
                        }}
                      />

                      {entry.type === "directory" && (
                        <FolderIcon className="w-5 h-5 text-sky-500" />
                      )}
                      {entry.type === "file" && (
                        <DocumentIcon className="w-5 h-5 text-slate-500" />
                      )}
                      <span className="text-slate-900">{entry.name}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
