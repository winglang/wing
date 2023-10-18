import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { Attribute, useTheme } from "@wingconsole/design-system";
import {
  ComponentType,
  VisualModel,
  VisualModelComponent,
} from "@wingconsole/server";
import classNames from "classnames";

export interface CustomResourceInteractionProps {
  resourcePath: string;
  visualModel: VisualModel;
  onComponentActionClick: (component: VisualModelComponent) => void;
}
export const CustomResourceInteraction = ({
  resourcePath,
  visualModel,
  onComponentActionClick,
}: CustomResourceInteractionProps) => {
  const { theme } = useTheme();

  //todo [sa] move to our design system and create some sort of Components factory
  const getUIComponent = (component: VisualModelComponent) => {
    switch (component.type) {
      case ComponentType.LINK: {
        return (
          <div className="h-full flex-1 flex flex-col text-sm space-y-1">
            <div className="relative grow flex-row flex items-center">
              <Attribute
                name={component.props.text}
                value={component.props.href}
                noLeftPadding
                dataTestId="cloud.website:url"
              />
              <ArrowTopRightOnSquareIcon
                className={classNames(
                  theme.text2,
                  "text-sm flex ml-2 h-4 w-4 cursor-pointer",
                )}
                onClick={() => onComponentActionClick(component)}
                data-testid={`${resourcePath}:open-url`}
              />
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className={"flex flex-col gap-y-1"}>
      {visualModel?.components?.map((component, id) => (
        <div key={id} className="flex flex-row gap-x-4">
          {getUIComponent(component)}
        </div>
      ))}
    </div>
  );
};
