import { TreeDataProvider, TreeItem, TreeItemCollapsibleState } from "vscode";

export class TestsExplorerProvider implements TreeDataProvider<TestItem> {
  public tests: {
    id: string;
    label: string;
  }[] = [];

  constructor(
    testList: {
      id: string;
      label: string;
    }[]
  ) {
    this.tests = testList;
  }

  getTreeItem(element: TestItem): TreeItem {
    return element;
  }

  getChildren(element?: TestItem): Thenable<TestItem[]> {
    return Promise.resolve(
      this.tests.map((test) => {
        return new TestItem(test.label, TreeItemCollapsibleState.None);
      })
    );
  }
}

class TestItem extends TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState?: TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.tooltip = this.label;
    //this.description = this.label;
  }
}
