import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { Attribute, useTheme } from "@wingconsole/design-system";
import { DisplayMetaComponent } from "@wingconsole/server";
import classNames from "classnames";

import { useCustomResource } from "../services/use-custom-resource.js";
import { useOpenExternal } from "../services/use-open-external.js";
import { CustomResourceInteraction } from "../ui/custom-resource-interaction.js";

import { UnsupportedInteractionView } from "./unsupported-interaction-view.js";

export interface CustomResourceInteractionViewProps {
  resourcePath: string;
  resourceType: string;
}

export const CustomResourceInteractionView = ({
  resourcePath,
  resourceType,
}: CustomResourceInteractionViewProps) => {
  const { theme } = useTheme();
  const { displayComponents } = useCustomResource({ resourcePath });
  const { open } = useOpenExternal();

  const onComponentActionClick = (component: DisplayMetaComponent) => {
    switch (component.type) {
      case "link": {
        open(component.props.href);
      }
    }
  };

  if (!displayComponents) {
    return <UnsupportedInteractionView resourceType={resourceType} />;
  }

  return (
    <CustomResourceInteraction
      resourcePath={resourcePath}
      displayComponents={displayComponents}
      onComponentActionClick={onComponentActionClick}
    />
  );
};
