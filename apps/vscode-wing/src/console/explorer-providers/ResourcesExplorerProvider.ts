import path from "path";
import type { ExplorerItem } from "@wingconsole/server";
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
    this.node = item;
    this.refresh();
  }

  public clear(): void {
    this.update();
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

    return new ResourceItem(
      parentItem.id,
      parentItem.label,
      parentItem.type,
      TreeItemCollapsibleState.Expanded
    );
  }

  public getChildren(element?: ResourceItem): Thenable<ResourceItem[]> {
    if (!this.node) {
      return Promise.resolve([]);
    }
    if (!element || !element.id) {
      return Promise.resolve([
        new ResourceItem(
          this.node.id,
          this.node.label,
          this.node.type,
          TreeItemCollapsibleState.Expanded
        ),
      ]);
    }

    const childItem = this.getResource(element.id);

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
    id: string,
    label?: string,
    type?: string,
    state?: TreeItemCollapsibleState
  ) {
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
      case "@winglang/sdk.cloud.Bucket": {
        return "archive-box";
      }
      case "@winglang/sdk.cloud.Function": {
        return "bolt";
      }
      case "@winglang/sdk.cloud.Queue": {
        return "queue-list";
      }
      case "@winglang/sdk.cloud.Website":
      case "@winglang/sdk.cloud.Endpoint": {
        return "globe-alt";
      }
      case "@winglang/sdk.cloud.Counter": {
        return "calculator";
      }
      case "@winglang/sdk.cloud.Topic": {
        return "megaphone";
      }
      case "@winglang/sdk.cloud.Api": {
        return "cloud";
      }
      case "@winglang/sdk.ex.Table": {
        return "table-cells";
      }
      case "@winglang/sdk.cloud.Schedule": {
        return "clock";
      }
      case "@winglang/sdk.ex.Redis": {
        return "redis";
      }
      case "@winglang/sdk.std.Test": {
        return "beaker";
      }
      default: {
        return "cube";
      }
    }
  };
}
