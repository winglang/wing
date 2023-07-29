import path from "path";
import { ExplorerItem } from "@wingconsole/server";
import {
  TreeItemCollapsibleState,
  TreeItem,
  TreeDataProvider,
  Event,
  EventEmitter,
} from "vscode";

export class ResourcesExplorerProvider
  implements TreeDataProvider<ResourceItem>
{
  private node?: ExplorerItem;

  private _onDidChangeTreeData: EventEmitter<
    ResourceItem | undefined | null | void
  > = new EventEmitter<ResourceItem | undefined | null | void>();

  readonly onDidChangeTreeData: Event<ResourceItem | undefined | null | void> =
    this._onDidChangeTreeData.event;

  constructor(node?: ExplorerItem) {
    this.node = node;
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  update(item: ExplorerItem): void {
    if (this.node !== item) {
      this.node = item;
      this.refresh();
    }
  }

  getTreeItem(element: ResourceItem): TreeItem {
    return {
      ...element,
      command: {
        command: "wingConsole.openResource",
        arguments: [element.id],
        title: "Select Resource",
      },
    };
  }

  getChildren(element?: ResourceItem): Thenable<ResourceItem[]> {
    if (!element) {
      return Promise.resolve(
        this.node?.childItems?.map((child: ExplorerItem) => {
          return new ResourceItem(
            child.id,
            child.label,
            child.type || "",
            child.childItems?.length && child.childItems.length > 0
              ? TreeItemCollapsibleState.Expanded
              : TreeItemCollapsibleState.None
          );
        }) || []
      );
    }

    const childItem = this.node?.childItems?.find((child: ExplorerItem) => {
      return child.label === element.label;
    });

    if (!childItem?.childItems) {
      return Promise.resolve([]);
    }

    return Promise.resolve(
      childItem.childItems.map((child: ExplorerItem) => {
        return new ResourceItem(
          child.id,
          child.label,
          child.type || "",
          child.childItems?.length && child.childItems.length > 0
            ? TreeItemCollapsibleState.Expanded
            : TreeItemCollapsibleState.None
        );
      })
    );
  }
}

export class ResourceItem extends TreeItem {
  constructor(
    public readonly id: string,
    public readonly label: string,
    public readonly resourceType: string,
    public readonly collapsibleState?: TreeItemCollapsibleState
  ) {
    super(label || "", collapsibleState);
    this.id = id;
    this.tooltip = this.label;
    this.resourceType = resourceType;
    this.iconPath = path.join(
      __filename,
      "../../node_modules/heroicons/24/outline",
      `${this.getResourceIconName(resourceType, id)}.svg`
    );
  }

  private matchTest = (resourceId: string) => {
    const isTest = /(\/test$|\/test:([^/\\])+$)/;
    const isTestHandler = /(\/test$|\/test:.*\/Handler$)/;

    return isTest.test(resourceId) || isTestHandler.test(resourceId);
  };

  private getResourceIconName = (
    resourceType: string | undefined,
    resourceId?: string
  ) => {
    if (resourceId && this.matchTest(resourceId)) {
      return "beaker";
    }
    switch (resourceType) {
      case "wingsdk.cloud.Bucket": {
        return "archive-box";
      }
      case "wingsdk.cloud.Function": {
        return "bolt";
      }
      case "wingsdk.cloud.Queue": {
        return "queue-list";
      }
      case "wingsdk.cloud.Website":
      case "wingsdk.cloud.Endpoint": {
        return "globe-alt";
      }
      case "wingsdk.cloud.Counter": {
        return "calculator";
      }
      case "wingsdk.cloud.Topic": {
        return "megaphone";
      }
      case "wingsdk.cloud.Api": {
        return "cloud";
      }
      case "wingsdk.cloud.Table": {
        return "table-cells";
      }
      case "wingsdk.cloud.Schedule": {
        return "clock";
      }
      case "wingsdk.redis.Redis": {
        return "redis";
      }
      case "wingsdk.cloud.Test": {
        return "beaker";
      }
      default: {
        return "cube";
      }
    }
  };
}
