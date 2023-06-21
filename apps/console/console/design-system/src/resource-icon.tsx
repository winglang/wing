import classNames from "classnames";
import { FunctionComponent, SVGProps } from "react";

import {
  getResourceIconColors,
  getResourceIconComponent,
} from "./utils/icon-utils.js";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {}

export interface ResourceIconProps extends IconProps {
  resourceType: string | undefined;
  resourcePath?: string;
  darkenOnGroupHover?: boolean;
  forceDarken?: boolean;
  solid?: boolean;
}

export interface IconComponent extends FunctionComponent<IconProps> {}

export const ResourceIcon = ({
  resourceType,
  resourcePath,
  darkenOnGroupHover,
  forceDarken,
  className,
  solid,
  ...props
}: ResourceIconProps) => {
  const Component = getResourceIconComponent(resourceType, {
    solid,
    resourceId: resourcePath,
  });
  const colors = getResourceIconColors({
    resourceType,
    darkenOnGroupHover,
    forceDarken,
  });
  return <Component className={classNames(className, colors)} {...props} />;
};
