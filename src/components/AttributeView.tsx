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
    <div className={"flex flex-row"}>
      <div className="text-slate-500 min-w-[100px]">{attribute.key}</div>
      <div
        // TODO: We can use "break-all" to show the full text, but we need a toggle.
        className={classNames(
          "text-slate-700 ml-2.5",
          // "break-all",
          "truncate",
        )}
      >
        {attribute.type === "url" ? (
          <Link href={attribute.url}>{attribute.value}</Link>
        ) : (
          attribute.value
        )}
      </div>
    </div>
  );
};
