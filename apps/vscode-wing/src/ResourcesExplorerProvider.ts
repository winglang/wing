import * as path from "path";
import * as vscode from "vscode";

export class ResourcesExplorerProvider
  implements vscode.TreeDataProvider<ResourceItem>
{
  constructor(private workspaceRoot: string) {}

  getTreeItem(element: ResourceItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: ResourceItem): Thenable<ResourceItem[]> {
    if (element?.label === "root" || !element) {
      return Promise.resolve([
        new ResourceItem("Bucket", vscode.TreeItemCollapsibleState.None),
        new ResourceItem("Queue", vscode.TreeItemCollapsibleState.None),
      ]);
    }

    return Promise.resolve([
      new ResourceItem("root", vscode.TreeItemCollapsibleState.Expanded),
    ]);
  }
}

class ResourceItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.tooltip = `${this.label}`;
    this.description = this.label;
  }

  // iconPath = {
  //   light: path.join(
  //     __filename,
  //     "..",
  //     "..",
  //     "resources",
  //     "light",
  //     "dependency.svg"
  //   ),
  //   dark: path.join(
  //     __filename,
  //     "..",
  //     "..",
  //     "resources",
  //     "dark",
  //     "dependency.svg"
  //   ),
  // };
}
