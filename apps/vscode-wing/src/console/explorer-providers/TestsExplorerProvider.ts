import {
  TreeDataProvider,
  TreeItem,
  TreeItemCollapsibleState,
  Event,
  EventEmitter,
  ThemeIcon,
} from "vscode";

export type TestStatus = "success" | "error" | "running" | "pending";

export class TestsExplorerProvider implements TreeDataProvider<TestItem> {
  private tests: TestItem[] = [];

  private _onDidChangeTreeData: EventEmitter<
    TestItem | undefined | null | void
  > = new EventEmitter<TestItem | undefined | null | void>();

  readonly onDidChangeTreeData: Event<TestItem | undefined | null | void> =
    this._onDidChangeTreeData.event;

  constructor(tests?: TestItem[]) {
    this.tests = tests || [];
  }

  public refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  public update(tests: TestItem[]): void {
    this.tests = tests;
    this.refresh();
  }

  public clear(): void {
    this.update([]);
  }

  public getTests(): TestItem[] {
    return this.tests;
  }

  public getTreeItem(element: TestItem): TreeItem {
    return element;
  }

  public getChildren(element?: TestItem): Thenable<TestItem[]> {
    if (!element) {
      return Promise.resolve(
        this.tests.map((test) => {
          return new TestItem(test.id, test.label, test.time, test.status);
        }),
      );
    }
    return Promise.resolve([]);
  }
}

export class TestItem extends TreeItem {
  constructor(
    public readonly id: string,
    public readonly label?: string,
    public readonly time?: number,
    public readonly status?: TestStatus,
  ) {
    super(label || "", TreeItemCollapsibleState.None);
    this.tooltip = this.label;
    this.id = id;

    this.description =
      time && status !== "pending" ? `${status} (${time}ms)` : "";

    let iconName = "issues";
    if (status === "success") {
      iconName = "check";
    } else if (status === "error") {
      iconName = "error";
    } else if (status === "running") {
      iconName = "sync~spin";
    }
    this.iconPath = new ThemeIcon(iconName);
  }
}
