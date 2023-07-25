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
  public node: ExplorerItem;

  private _onDidChangeTreeData: EventEmitter<
    ResourceItem | undefined | null | void
  > = new EventEmitter<ResourceItem | undefined | null | void>();

  readonly onDidChangeTreeData: Event<ResourceItem | undefined | null | void> =
    this._onDidChangeTreeData.event;

  constructor(item: ExplorerItem) {
    this.node = item;
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: ResourceItem): TreeItem {
    return {
      id: element.id,
      label: element.label,
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
        this.node.childItems?.map((child: ExplorerItem) => {
          return new ResourceItem(
            child.id,
            child.label,
            child.childItems?.length && child.childItems.length > 0
              ? TreeItemCollapsibleState.Expanded
              : TreeItemCollapsibleState.None
          );
        }) || []
      );
    }

    const childItem = this.node.childItems?.find((child: ExplorerItem) => {
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
          child.childItems?.length && child.childItems.length > 0
            ? TreeItemCollapsibleState.Expanded
            : TreeItemCollapsibleState.None
        );
      })
    );
  }
}

class ResourceItem extends TreeItem {
  iconPath = {
    light: path.join(
      __filename,
      "..",
      "..",
      "resources",
      "light",
      "dependency.svg"
    ),
    dark: path.join(
      __filename,
      "..",
      "..",
      "resources",
      "dark",
      "dependency.svg"
    ),
  };

  constructor(
    public readonly id: string,
    public readonly label: string,
    public readonly collapsibleState: TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.tooltip = this.label;
    this.id = id;
  }
}
