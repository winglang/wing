import { Attribute } from "@wingconsole/design-system";

import { trpc } from "../services/trpc.js";

export interface CustomResourceUiFieldItemProps {
  label: string;
  handlerPath: string;
}

export const CustomResourceUiFieldItem = ({
  label,
  handlerPath,
}: CustomResourceUiFieldItemProps) => {
  const field = trpc["uiField.get"].useQuery(
    {
      resourcePath: handlerPath,
    },
    { enabled: !!handlerPath },
  );
  return <Attribute name={label} value={field.data?.value ?? ""} />;
};
