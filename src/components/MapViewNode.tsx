import {
  CubeIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export interface MapViewNodeProps {
  defaultOpen?: boolean;
  resource: {
    name: string;
    id: string;
    type: string;
    icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  };
}

export function MapViewNode({ resource, defaultOpen }: MapViewNodeProps) {
  const [isOpen, setOpen] = useState(defaultOpen ?? false);

  // return <div className="text-slate-700 bg-slate-100 p-2">MapViewNode</div>;
  return (
    <div className="inline-block max-w-xs text-slate-700 rounded-t border border-slate-200 rounded shadow-sm overflow-hidden">
      <div className="flex justify-between items-center gap-2 px-2.5 py-1 bg-slate-100 border-b border-slate-200">
        <div className="flex items-center gap-1.5 -ml-1.5">
          <div className="bg-white p-0.5 rounded border border-slate-300">
            <resource.icon
              className="w-3.5 h-3.5 text-violet-500"
              aria-hidden="true"
            />
          </div>
          <span className="text-sm">{resource.name}</span>
        </div>

        <div className="flex items-center">
          <button
            className="-mr-1.5 p-1 rounded hover:bg-slate-200"
            onClick={() => setOpen(!isOpen)}
          >
            {isOpen ? (
              <ChevronUpIcon
                className="w-3.5 h-3.5 text-slate-700"
                aria-hidden="true"
              />
            ) : (
              <ChevronDownIcon
                className="w-3.5 h-3.5 text-slate-700"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="px-1.5 py-1 text-xs border-b border-slate-200 bg-white">
          {/* <div className="flex gap-2 min-w-0"> */}
          <div
            className="grid grid-cols-2 gap-x-4 gap-y-1"
            style={{ gridTemplateColumns: "auto 1fr" }}
          >
            <div className="text-slate-500 text-right">id:</div>
            <bdo dir="rtl" className="min-w-0 text-left">
              <div className="truncate" title={resource.id}>
                <bdo dir="ltr">{resource.id}</bdo>
              </div>
            </bdo>

            <div className="text-slate-500 text-right">type:</div>
            <div className="truncate">
              <div className="inline-flex items-center gap-1 px-1 bg-slate-100 border border-slate-200 rounded max-w-full truncate">
                <resource.icon
                  className="w-3.5 h-3.5 text-violet-500"
                  aria-hidden="true"
                />
                <div className="truncate">{resource.type}</div>
              </div>
            </div>
            {/* {details.map(([key, value]) => (
              <>
                <div className="text-slate-500 text-right">{key}:</div>
                <div className="truncate" title={value}>
                  {value}
                </div>
              </>
            ))} */}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center gap-2 px-1 py-1 rounded-b bg-slate-50">
        <div></div>
        <div>
          <ItemButton>Open</ItemButton>
        </div>
      </div>
    </div>
  );
}

interface ItemButtonProps {
  title?: string;
  onClick?: () => void;
}

function ItemButton({
  title,
  onClick,
  children,
}: React.PropsWithChildren<ItemButtonProps>) {
  return (
    <button
      className="flex-shrink-0 max-w-full truncate bg-slate-50 border border-slate-300/75 shadow-sm text-xs px-2.5 py-0.5 flex items-center gap-1.5 cursor-pointer hover:bg-slate-100 min-w-0 rounded"
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
