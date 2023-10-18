import { ComponentType, VisualModelComponent } from "@wingconsole/server";

import { useOpenExternal } from "../services/use-open-external.js";
import { useVisualModel } from "../services/use-visual-model.js";
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
  const { visualModelData } = useVisualModel({ resourcePath });
  const { open } = useOpenExternal();

  const onComponentActionClick = (component: VisualModelComponent) => {
    switch (component.type) {
      case ComponentType.LINK: {
        open(component.props.href);
      }
    }
  };

  if (!visualModelData?.components) {
    return <UnsupportedInteractionView resourceType={resourceType} />;
  }

  return (
    <CustomResourceInteraction
      resourcePath={resourcePath}
      visualModel={visualModelData}
      onComponentActionClick={onComponentActionClick}
    />
  );
};
