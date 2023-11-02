import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";

export const NoTests = () => {
  const { theme } = useTheme();
  return (
    <div
      className={classNames(
        theme.text2,
        "flex flex-col text-2xs px-3 py-2 font-mono items-center",
      )}
    >
      <div>There are no tests.</div>
      <div>
        <span>Learn how to add tests </span>
        <a
          className="text-sky-500 hover:text-sky-600"
          href="https://www.winglang.io/docs/concepts/tests"
          target="_blank"
          rel="noreferrer"
        >
          here.
        </a>
      </div>
    </div>
  );
};
