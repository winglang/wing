import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";

export const NoEndpoints = () => {
  const { theme } = useTheme();
  return (
    <div
      className={classNames(
        theme.text2,
        "flex flex-col text-xs px-3 py-2 items-center",
      )}
    >
      <div>There are no endpoints.</div>
      <div>
        <span>Learn how to add endpoints </span>
        <a
          className="text-sky-500 hover:text-sky-600"
          href="https://www.winglang.io/docs/standard-library/cloud/endpoint"
          target="_blank"
          rel="noreferrer"
        >
          here.
        </a>
      </div>
    </div>
  );
};
