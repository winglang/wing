import classNames from "classnames";
import { PropsWithChildren, useId } from "react";

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
  const id = useId();
  return (
    <div className="pl-4 flex flex-row items-center">
      <label htmlFor={id} className="text-slate-500 min-w-[100px]">
        {name}
      </label>
      {value !== undefined && type === "url" && (
        <div className="truncate">
          <Link id={id} href={url}>
            {value}
          </Link>
        </div>
      )}
      {value !== undefined && type !== "url" && (
        <input
          id={id}
          className="w-full bg-white border border-slate-300 opacity-70 ease-in-out focus:border-sky-500 focus:ring-2 focus:ring-sky-500/50 items-center outline-none px-2 select-text text-slate-600 text-sm transition truncate rounded"
          value={value}
          readOnly
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
