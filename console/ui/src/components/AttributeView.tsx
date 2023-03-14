import classNames from "classnames";
import { PropsWithChildren } from "react";

import { Link } from "../design-system/Link.js";

interface AttributeViewProps {
  name: string;
  value?: string;
  type?: "url";
  url?: string;
}

export const AttributeView = ({
  name,
  value,
  type,
  url,
  children,
}: PropsWithChildren<AttributeViewProps>) => {
  return (
    <div className="pl-4 flex flex-row items-center gap-x-1">
      <div className="text-slate-500 min-w-[100px]">{name}</div>
      {value !== undefined && type === "url" && (
        <div className="truncate">
          <Link href={url}>{value}</Link>
        </div>
      )}
      {value !== undefined && type !== "url" && (
        <input
          className="w-full bg-transparent ease-in-out focus:border-sky-500 focus:ring-2 focus:ring-sky-500/50 items-center outline-none select-text text-slate-600 text-sm transition truncate"
          value={value}
          disabled
        />
      )}
      {value === undefined && (
        <div className="w-full bg-transparent items-center select-text text-slate-600 text-sm transition truncate">
          {children}
        </div>
      )}
    </div>
  );
};
