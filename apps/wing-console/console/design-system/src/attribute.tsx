import classNames from "classnames";
import { PropsWithChildren, useId } from "react";

import { Link } from "./link.js";
import { useTheme } from "./theme-provider.js";

interface AttributeProps {
  name: string;
  value?: string;
  type?: "url";
  url?: string;
  noLeftPadding?: boolean;
  dataTestId?: string;
}

export const Attribute = ({
  name,
  value,
  type,
  url,
  children,
  noLeftPadding = false,
  dataTestId,
}: PropsWithChildren<AttributeProps>) => {
  const { theme } = useTheme();
  const id = useId();
  return (
    <div className={classNames("flex flex-row", !noLeftPadding && "pl-4")}>
      <label htmlFor={id} className={classNames(theme.text2, "min-w-[100px]")}>
        {name}
      </label>
      {value !== undefined && type === "url" && (
        <div className="truncate">
          <Link id={id} href={url} dataTestid={dataTestId}>
            {value}
          </Link>
        </div>
      )}
      {value !== undefined && type !== "url" && (
        <input
          id={id}
          className={classNames(
            theme.bgInput,
            theme.textInput,
            theme.focusInput,
            theme.borderInput,
            "w-full border opacity-70 ease-in-out",
            "items-center px-2 select-text text-sm transition truncate rounded",
          )}
          value={value}
          readOnly
          data-testid={dataTestId}
        />
      )}
      {value === undefined && children}
    </div>
  );
};
