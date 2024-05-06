import { ShareIcon } from "@heroicons/react/24/outline";
import { Attribute } from "@wingconsole/design-system";
import { Link } from "@wingconsole/design-system";

import { trpc } from "../services/trpc.js";

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
        <Link id={label} href={fieldValue}>
          <ShareIcon title={fieldValue} className="w-4 h-4 text-blue-500" />
        </Link>
      )}
    </Attribute>
  );
};
