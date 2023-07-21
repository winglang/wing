import { TreeDataProvider, TreeItem, TreeItemCollapsibleState } from "vscode";

export class TestsExplorerProvider implements TreeDataProvider<ResourceItem> {
  public readonly tests: {
    id: string;
    label: string;
  }[] = [];

  constructor(
    private testList: {
      id: string;
      label: string;
    }[]
  ) {
    this.tests = testList;
  }

  getTreeItem(element: ResourceItem): TreeItem {
    return element;
  }

  getChildren(element?: ResourceItem): Thenable<ResourceItem[]> {
    return Promise.resolve(
      this.tests.map((test) => {
        return new ResourceItem(test.label, TreeItemCollapsibleState.None);
      })
    );
  }
}

class ResourceItem extends TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState?: TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.tooltip = `${this.label}`;
    this.description = this.label;
  }
}
