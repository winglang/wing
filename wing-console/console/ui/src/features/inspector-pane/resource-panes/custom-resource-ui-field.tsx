import { Attribute } from "@wingconsole/design-system";
import { Link } from "@wingconsole/design-system";

import { trpc } from "../../../trpc.js";
import { useConsoleEnvironment } from "../../console-environment-context/console-environment-context.js";

export interface CustomResourceUiFieldItemProps {
  label: string;
  handlerPath: string;
  link: boolean;
}

export const CustomResourceUiFieldItem = ({
  label,
  handlerPath,
  link,
}: CustomResourceUiFieldItemProps) => {
  const { consoleEnvironment: environmentId } = useConsoleEnvironment();
  const field = trpc["uiField.get"].useQuery(
    {
      environmentId,
      resourcePath: handlerPath,
    },
    { enabled: !!handlerPath },
  );
  const fieldValue = String(field.data?.value ?? "");
  return (
    <Attribute name={label} value={link ? "" : fieldValue}>
      {link && (
        <Link id={label} href={fieldValue} target="_blank" className="truncate">
          {fieldValue}
        </Link>
      )}
    </Attribute>
  );
};
