import path from "path";
import { ExplorerItem } from "@wingconsole/server";
import { TreeItemCollapsibleState, TreeItem, TreeDataProvider } from "vscode";

export class ResourcesExplorerProvider
  implements TreeDataProvider<ResourceItem>
{
  public readonly node: ExplorerItem;

  constructor(private item: ExplorerItem) {
    this.node = item;
  }

  getTreeItem(element: ResourceItem): TreeItem {
    return element;
  }

  getChildren(element?: ResourceItem): Thenable<ResourceItem[]> {
    if (!element) {
      return Promise.resolve(
        this.node.childItems?.map((child: ExplorerItem) => {
          return new ResourceItem(
            child.label,
            child.childItems?.length > 0
              ? TreeItemCollapsibleState.Expanded
              : TreeItemCollapsibleState.None
          );
        }) || []
      );
    }

    const childItem = this.node.childItems.find((child: ExplorerItem) => {
      return child.label === element.label;
    });

    if (!childItem?.childItems) {
      return Promise.resolve([]);
    }

    return Promise.resolve(
      childItem.childItems.map((child: ExplorerItem) => {
        return new ResourceItem(
          child.label,
          child.childItems?.length > 0
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
    public readonly label: string,
    public readonly collapsibleState: TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.tooltip = `${this.label}`;
    //this.description = this.label;
  }
}
