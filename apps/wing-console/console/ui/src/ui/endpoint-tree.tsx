import { LinkIcon } from "@heroicons/react/24/outline";
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
                      <div className="flex items-center gap-1">
                        <span className="truncate">{endpoint.label}</span>
                      </div>
                    }
                    secondaryLabel={
                      <div
                        className={classNames("items-center hover:underline ")}
                      >
                        <a href={endpoint.url} target="_blank" rel="noreferrer">
                          {endpoint.url}
                        </a>
                        {/* <PlayIcon className="w-4 h-4" /> */}
                      </div>
                    }
                    title={endpoint.label}
                    icon={
                      <>
                        <LinkIcon className="w-4 h-4" />
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
