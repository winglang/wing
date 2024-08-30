import { Attribute } from "@wingconsole/design-system";
import { Link } from "@wingconsole/design-system";

import { trpc } from "../../../trpc.js";

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
  const field = trpc["uiField.get"].useQuery(
    {
      resourcePath: handlerPath,
    },
    { enabled: !!handlerPath },
  );
  const fieldValue = field.data?.value ?? "";
  return (
    <Attribute name={label} value={link ? undefined : fieldValue}>
      {link && (
        <Link id={label} href={fieldValue} target="_blank" className="truncate">
          {fieldValue}
        </Link>
      )}
    </Attribute>
  );
};
