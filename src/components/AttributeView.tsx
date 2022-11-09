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
      <div className="text-slate-500 min-w-[140px]">{attribute.key}</div>
      <div className="truncate text-slate-700 ml-2.5">
        {attribute.type === "url" ? (
          <Link href={attribute.url}>{attribute.value}</Link>
        ) : (
          attribute.value
        )}
      </div>
    </div>
  );
};
