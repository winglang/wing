import * as path from "path";
import * as vscode from "vscode";

export class TestsExplorerProvider
  implements vscode.TreeDataProvider<ResourceItem>
{
  getTreeItem(element: ResourceItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: ResourceItem): Thenable<ResourceItem[]> {
    return Promise.resolve([
      new ResourceItem("Test 1"),
      new ResourceItem("Test 2"),
    ]);
  }
}

class ResourceItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState?: vscode.TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.tooltip = `${this.label}`;
    this.description = this.label;
  }
}
