import classNames from "classnames";

import { Link } from "../design-system/Link.js";

export interface Attribute {
  key: string;
  value: string;
  type?: "url";
  url?: string;
}

export const AttributeView = ({ attribute }: { attribute: Attribute }) => {
  return (
    <div className="pl-4 flex flex-row items-center">
      <div className="text-slate-500 min-w-[100px]">{attribute.key}</div>
      {attribute.type === "url" ? (
        <div className="truncate">
          <Link href={attribute.url}>{attribute.value}</Link>
        </div>
      ) : (
        <input
          className="w-full bg-slate-100 border border-slate-300 ease-in-out focus:border-sky-500 focus:ring-2 focus:ring-sky-500/50 items-center outline-none px-2.5 rounded select-text text-slate-600 text-sm transition truncate"
          value={attribute.value}
          disabled
        />
      )}
    </div>
  );
};
