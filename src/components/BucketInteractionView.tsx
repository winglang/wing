import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  DocumentIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { FolderIcon } from "@heroicons/react/24/solid";
import { BucketSchema } from "@monadahq/wing-local-schema";
import prettyBytes from "pretty-bytes";
import { FormEventHandler, useCallback, useRef, useState } from "react";

import { Button } from "@/design-system/Button";
import { Checkbox } from "@/design-system/Checkbox";
import { Input } from "@/design-system/Input";

export interface BucketInteractionViewProps {
  node: BucketSchema;
}

export interface FileExplorerEntry {
  type: "directory" | "file";
  name: string;
  updatedAt: number;
  fileSize?: number;
}

export const BucketInteractionView = ({ node }: BucketInteractionViewProps) => {
  const [path] = useState("/");
  const [entries, setEntries] = useState<FileExplorerEntry[]>(() => {
    return [
      { type: "directory", name: ".vscode", updatedAt: Date.now() },
      { type: "directory", name: "src", updatedAt: Date.now() },
      {
        type: "file",
        name: "package.json",
        updatedAt: Date.now(),
        fileSize: 12,
      },
      {
        type: "file",
        name: "README.md",
        updatedAt: Date.now(),
        fileSize: 1500,
      },
    ];
  });
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);
  const [dateFormatter] = useState(
    () =>
      new Intl.DateTimeFormat(undefined, {
        // dateStyle: "long",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }),
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addNewEntries: FormEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const newEntries = new Array<FileExplorerEntry>();
      for (const file of event.currentTarget.files ?? []) {
        console.log({ file });
        newEntries.push({
          type: "file",
          name: file.name,
          fileSize: file.size,
          updatedAt: file.lastModified,
        });
      }
      setEntries([...entries, ...newEntries]);
    },
    [setEntries, entries],
  );

  const deleteSelectedEntries = useCallback(() => {
    setEntries((entries) => {
      setSelectedEntries([]);
      return entries.filter(
        (entry) => selectedEntries.includes(entry.name) === false,
      );
    });
  }, [selectedEntries]);

  return (
    <div className="h-full flex-1 space-y-2 p-2 flex flex-col text-sm">
      <div className="flex justify-between items-center gap-1">
        <div className="flex items-center gap-1">
          <Button
            icon={ArrowDownTrayIcon}
            label="Download"
            disabled={selectedEntries.length === 0}
          />
          <Button
            icon={TrashIcon}
            label="Delete"
            disabled={selectedEntries.length === 0}
            onClick={deleteSelectedEntries}
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
              <th className="px-2 border-b border-slate-200 font-semibold">
                Size
              </th>
              <th className="px-2 border-b border-slate-200 font-semibold">
                Last Modified
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

                  <td className="px-2 text-slate-500">
                    {entry.fileSize ? prettyBytes(entry.fileSize) : ""}
                  </td>

                  <td className="px-2 text-slate-500">
                    {dateFormatter.format(entry.updatedAt)}
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
