import {
  TreeDataProvider,
  TreeItem,
  TreeItemCollapsibleState,
  Event,
  EventEmitter,
} from "vscode";

export type TestStatus = "success" | "error" | "running" | "pending";

export interface Test {
  id: string;
  label: string;
  status: TestStatus;
  time?: number;
  runAllDisabled?: boolean;
}

export class TestsExplorerProvider implements TreeDataProvider<TestItem> {
  private tests: Test[] = [];

  private _onDidChangeTreeData: EventEmitter<
    TestItem | undefined | null | void
  > = new EventEmitter<TestItem | undefined | null | void>();

  readonly onDidChangeTreeData: Event<TestItem | undefined | null | void> =
    this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  update(tests: Test[]): void {
    this.tests = tests;
    this.refresh();
  }

  getTests(): Test[] {
    return this.tests;
  }

  getTreeItem(element: TestItem): TreeItem {
    return element;
  }

  getChildren(element?: TestItem): Thenable<TestItem[]> {
    return Promise.resolve(
      this.tests.map((test) => {
        return new TestItem(
          test.id,
          test.label,
          test.time || 0,
          test.status || "pending",
          TreeItemCollapsibleState.None
        );
      })
    );
  }
}

export class TestItem extends TreeItem {
  constructor(
    public readonly id: string,
    public readonly label: string,
    public readonly time: number,
    public readonly status: string,
    public readonly collapsibleState?: TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.tooltip = this.label;
    this.id = id;

    let description = this.status;
    if (this.time) {
      description = `${description} (${this.time}ms)`;
    }
    this.description = description;
  }
}
