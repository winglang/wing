import {
  TreeDataProvider,
  TreeItem,
  TreeItemCollapsibleState,
  Event,
  EventEmitter,
  ThemeIcon,
  Uri,
} from "vscode";

export class EndpointsExplorerProvider
  implements TreeDataProvider<EndpointItem>
{
  private endpoints: EndpointItem[] = [];

  private _onDidChangeTreeData: EventEmitter<
    EndpointItem | undefined | null | void
  > = new EventEmitter<EndpointItem | undefined | null | void>();

  readonly onDidChangeTreeData: Event<EndpointItem | undefined | null | void> =
    this._onDidChangeTreeData.event;

  constructor(endpoints?: EndpointItem[]) {
    this.endpoints = endpoints || [];
  }

  public refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  public update(endpoints: EndpointItem[]): void {
    this.endpoints = endpoints;
    this.refresh();
  }

  public clear(): void {
    this.update([]);
  }

  public getEndpoints(): EndpointItem[] {
    return this.endpoints;
  }

  public getTreeItem(element: EndpointItem): TreeItem {
    element.command = {
      command: "vscode.open",
      title: "Open Call",
      arguments: [Uri.parse(element.url)],
    };
    return element;
  }

  public getChildren(element?: EndpointItem): Thenable<EndpointItem[]> {
    if (!element) {
      return Promise.resolve(
        this.endpoints.map((endpoint) => {
          return new EndpointItem(endpoint.id, endpoint.label, endpoint.url);
        }),
      );
    }
    return Promise.resolve([]);
  }
}

export class EndpointItem extends TreeItem {
  constructor(
    public readonly id: string,
    public readonly label: string,
    public readonly url: string,
  ) {
    super(label || "", TreeItemCollapsibleState.None);
    this.tooltip = this.url;
    this.id = id;
    this.url = url;
    this.iconPath = new ThemeIcon("link");
  }
}
