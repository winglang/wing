import path from "path";
import { ExplorerItem } from "@wingconsole/server";
import {
  TreeItemCollapsibleState,
  TreeItem,
  TreeDataProvider,
  Event,
  EventEmitter,
  ProviderResult,
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

  public refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  public update(item?: ExplorerItem): void {
    if (this.node !== item) {
      this.node = item;
      this.refresh();
    }
  }

  public clear(): void {
    this.node = undefined;
    this.refresh();
  }

  public getTreeItem(element: ResourceItem): TreeItem {
    return {
      ...element,
      command: {
        command: "wingConsole.openResource",
        arguments: [element.id],
        title: "Select Resource",
      },
    };
  }

  private getResource(id: string): ExplorerItem | undefined {
    if (!this.node) {
      return undefined;
    }
    const searchChild = (node: ExplorerItem): ExplorerItem | undefined => {
      if (node.id === id) {
        return node;
      }

      if (!node.childItems) {
        return;
      }
      for (const child of node.childItems) {
        const resource = searchChild(child);
        if (resource) {
          return resource;
        }
      }

      return;
    };

    return searchChild(this.node);
  }

  private getParentResource(id: string): ExplorerItem | undefined {
    if (!this.node) {
      return;
    }

    const searchParent = (node: ExplorerItem): ExplorerItem | undefined => {
      if (!node.childItems) {
        return;
      }
      for (const child of node.childItems) {
        if (child.id === id) {
          return node;
        }
        const resource = searchParent(child);
        if (resource) {
          return resource;
        }
      }
      return;
    };

    return searchParent(this.node);
  }

  public getParent(element: ResourceItem): ProviderResult<ResourceItem> {
    if (!this.node || !element.id) {
      return null;
    }

    const parentItem = this.getParentResource(element.id);

    if (!parentItem) {
      return;
    }

    return new ResourceItem({
      id: parentItem.id,
      label: parentItem.label,
      type: parentItem.type,
      state: TreeItemCollapsibleState.Expanded,
    });
  }

  public getChildren(element?: ResourceItem): Thenable<ResourceItem[]> {
    if (!this.node) {
      return Promise.resolve([]);
    }
    if (!element || !element.id) {
      return Promise.resolve([
        new ResourceItem({
          id: this.node.id,
          label: this.node.label,
          type: this.node.type,
          state: TreeItemCollapsibleState.Expanded,
        }),
      ]);
    }

    const childItem = this.getResource(element.id);

    if (!childItem?.childItems) {
      return Promise.resolve([]);
    }

    return Promise.resolve(
      childItem.childItems.map((child: ExplorerItem) => {
        return new ResourceItem({
          id: child.id,
          label: child.label,
          type: child.type || "",
          state:
            child.childItems?.length && child.childItems.length > 0
              ? TreeItemCollapsibleState.Expanded
              : TreeItemCollapsibleState.None,
        });
      })
    );
  }
}

export class ResourceItem extends TreeItem {
  constructor({
    id,
    label,
    type,
    state,
  }: {
    id?: string;
    label?: string;
    type?: string;
    state?: TreeItemCollapsibleState;
  }) {
    super(label || "", state);

    this.id = id;
    this.tooltip = label;

    this.iconPath = {
      light: path.join(
        __filename,
        "../../resources/resource-icons/light",
        `${this.getResourceIconName(type, id)}.svg`
      ),
      dark: path.join(
        __filename,
        "../../resources/resource-icons/dark",
        `${this.getResourceIconName(type, id)}.svg`
      ),
    };
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
