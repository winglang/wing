import { GlobeAltIcon, LinkIcon } from "@heroicons/react/24/outline";
import {
  ScrollableArea,
  Toolbar,
  TreeItem,
  TreeView,
  useTheme,
} from "@wingconsole/design-system";
import classNames from "classnames";

import { EndpointItem } from "../shared/endpoint-item.js";

import { NoEndpoints } from "./no-endpoints.js";

export interface EndpointTreeProps {
  endpointList: EndpointItem[];
}

export const EndpointTree = ({ endpointList }: EndpointTreeProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={classNames("w-full h-full flex flex-col", theme.bg3)}
      data-testid="endpoint-tree-menu"
    >
      <Toolbar title="Endpoints"></Toolbar>

      <div className="relative grow">
        <div className="absolute inset-0">
          <ScrollableArea
            overflowY
            className={classNames(
              "h-full w-full text-sm flex flex-col gap-1",
              theme.bg3,
              theme.text2,
            )}
          >
            <div className="flex flex-col">
              {endpointList.length === 0 && <NoEndpoints />}
              <TreeView>
                {endpointList.map((endpoint) => (
                  <TreeItem
                    key={endpoint.id}
                    itemId={endpoint.id}
                    selectable={false}
                    label={
                      <a
                        href={endpoint.url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline text-sky-500 hover:text-sky-600"
                      >
                        {endpoint.label}
                      </a>
                    }
                    title={endpoint.url}
                    icon={
                      <>
                        {endpoint.browserSupport && (
                          <GlobeAltIcon
                            className={classNames("w-4 h-4", theme.text1)}
                          />
                        )}
                        {!endpoint.browserSupport && (
                          <LinkIcon
                            className={classNames("w-4 h-4", theme.text1)}
                          />
                        )}
                      </>
                    }
                  />
                ))}
              </TreeView>
            </div>
          </ScrollableArea>
        </div>
      </div>
    </div>
  );
};
