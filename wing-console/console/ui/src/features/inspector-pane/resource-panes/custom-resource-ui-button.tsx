import { useTheme, Button } from "@wingconsole/design-system";
import classNames from "classnames";
import { useCallback, useId } from "react";

import { trpc } from "../../../trpc.js";

export interface CustomResourceUiButtomItemProps {
  label: string;
  handlerPath: string;
}

export const CustomResourceUiButtonItem = ({
  label,
  handlerPath,
}: CustomResourceUiButtomItemProps) => {
  const { theme } = useTheme();
  const { mutate: invokeMutation } = trpc["uiButton.invoke"].useMutation();
  const invoke = useCallback(() => {
    invokeMutation({
      resourcePath: handlerPath,
    });
  }, [handlerPath, invokeMutation]);

  const id = useId();
  return (
    <div className="pl-4 flex flex-row items-center">
      <label
        htmlFor={id}
        className={classNames("min-w-[100px] invisible", theme.text2)}
      >
        {label}
      </label>
      <Button id={id} title={label} label={label} onClick={invoke} />
    </div>
  );
};
