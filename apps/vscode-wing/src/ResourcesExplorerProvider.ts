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
      // return Promise.resolve([
      //   new ResourceItem(this.node.label, TreeItemCollapsibleState.Expanded),
      // ]);
      return Promise.resolve(
        this.node.childItems?.map((child) => {
          return new ResourceItem(
            child.label,
            TreeItemCollapsibleState.Expanded
          );
        }) || []
      );
    }

    // find the child item recursively in the node.childItems
    const childItem = this.node.childItems.find((child) => {
      return child.label === element.label;
    });

    if (!childItem?.childItems) {
      return Promise.resolve([]);
    }

    return Promise.resolve(
      childItem.childItems.map((child) => {
        return new ResourceItem(child.label, TreeItemCollapsibleState.Expanded);
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
    this.description = this.label;
  }
}
