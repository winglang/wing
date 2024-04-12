// From https://github.com/microsoft/vscode/blob/main/src/vs/platform/extensions/common/extensions.ts

export interface VSCodeExtensionContributions {
  readonly breakpoints?: { language: string }[];
  readonly commands?: VSCodeCommand[];
  readonly configuration?: VSCodeConfiguration | VSCodeConfiguration[];
  readonly debuggers?: VSCodeDebugger[];
  readonly grammars?: VSCodeGrammar[];
  readonly jsonValidation?: VSCodeJSONValidation[];
  readonly keybindings?: VSCodeKeyBinding[];
  readonly languages?: VSCodeLanguage[];
  readonly menus?: { [context: string]: VSCodeMenu[] };
  readonly snippets?: VSCodeSnippet[];
  readonly themes?: VSCodeTheme[];
  readonly iconThemes?: VSCodeTheme[];
  readonly productIconThemes?: VSCodeTheme[];
  readonly viewsContainers?: { [location: string]: VSCodeViewContainer[] };
  readonly views?: { [location: string]: VSCodeView[] };
  readonly colors?: VSCodeColor[];
  readonly taskDefinitions?: VSCodeTaskDefinitions[];
  readonly customEditors?: readonly VSCodeWebviewEditor[];
  readonly codeActions?: readonly VSCodeCodeActionContribution[];
  readonly authentication?: VSCodeAuthenticationContribution[];
  readonly walkthroughs?: VSCodeWalkthrough[];
  readonly startEntries?: VSCodeStartEntry[];
  readonly notebooks?: VSCodeNotebookEntry[];
  readonly notebookRenderer?: VSCodeNotebookRendererContribution[];
}

export interface VSCodeTaskDefinitions {
  type?: string;
  required?: string[];
  properties?: any;
  when?: string;
}

export interface VSCodeConfigurationProperty {
  readonly description: string;
  readonly type: string | string[];
  readonly default?: any;
  readonly editPresentation?: string;
}

export interface VSCodeConfiguration {
  readonly id?: string;
  readonly order?: number;
  readonly title?: string;
  readonly properties: { [key: string]: VSCodeConfigurationProperty };
}

export interface VSCodeDebugger {
  readonly label?: string;
  readonly type: string;
  readonly runtime?: string;
  readonly program?: string;
  readonly request?: string;
  readonly variables?: string;
  readonly configurationAttributes?: any;
  readonly initialConfigurations?: any[];
  readonly configurationSnippets?: any[];
}

export interface VSCodeGrammar {
  readonly language?: string;
  readonly scopeName: string;
  readonly path: string;
  readonly injectTo?: string[];
  readonly embeddedLanguages?: { [scope: string]: string };
}

export interface VSCodeJSONValidation {
  readonly fileMatch: string | string[];
  readonly url: string;
}

export interface VSCodeKeyBinding {
  readonly command: string;
  readonly key: string;
  readonly when?: string;
  readonly mac?: string;
  readonly linux?: string;
  readonly win?: string;
}

export interface VSCodeLanguage {
  readonly id: string;
  readonly extensions: string[];
  readonly aliases: string[];
  readonly configuration: string;
  readonly icon?: string | { dark: string; light: string; hc?: string };
}

export interface VSCodeMenu {
  readonly command: string;
  readonly alt?: string;
  readonly when?: string;
  readonly group?: string;
}

export interface VSCodeSnippet {
  readonly language: string;
}

export interface VSCodeTheme {
  readonly label: string;
}

export interface VSCodeViewContainer {
  readonly id: string;
  readonly title: string;
  readonly icon?: string | { dark: string; light: string; hc?: string };
}

export interface VSCodeView {
  readonly id: string;
  readonly name: string;
}

export interface VSCodeColor {
  readonly id: string;
  readonly description: string;
  readonly defaults: { light: string; dark: string; highContrast: string };
}

export interface VSCodeWebviewEditor {
  readonly viewType: string;
  readonly priority: string;
  readonly selector: readonly {
    readonly filenamePattern?: string;
  }[];
}

export interface VSCodeCodeActionContributionAction {
  readonly kind: string;
  readonly title: string;
  readonly description?: string;
}

export interface VSCodeCodeActionContribution {
  readonly languages: readonly string[];
  readonly actions: readonly VSCodeCodeActionContributionAction[];
}

export interface VSCodeAuthenticationContribution {
  readonly id: string;
  readonly label: string;
}

export interface VSCodeWalkthroughStep {
  readonly id: string;
  readonly title: string;
  readonly description: string | undefined;
  readonly media:
    | {
        image: string | { dark: string; light: string; hc: string };
        altText: string;
        markdown?: never;
        svg?: never;
      }
    | { markdown: string; image?: never; svg?: never }
    | { svg: string; altText: string; markdown?: never; image?: never };
  readonly completionEvents?: string[];
  /** @deprecated use `completionEvents: 'onCommand:...'` */
  readonly doneOn?: { command: string };
  readonly when?: string;
}

export interface VSCodeWalkthrough {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly steps: VSCodeWalkthroughStep[];
  readonly featuredFor: string[] | undefined;
  readonly when?: string;
}

export interface VSCodeStartEntry {
  readonly title: string;
  readonly description: string;
  readonly command: string;
  readonly when?: string;
  readonly category: "file" | "folder" | "notebook";
}

export interface VSCodeNotebookEntry {
  readonly type: string;
  readonly displayName: string;
}

export interface VSCodeNotebookRendererContribution {
  readonly id: string;
  readonly displayName: string;
  readonly mimeTypes: string[];
}

export interface VSCodeCommand {
  readonly command: string;
  readonly title: string;
  readonly category?: string;
  readonly icon?: string | { dark: string; light: string; hc?: string };
}

export const ALL_EXTENSION_KINDS: readonly ExtensionKind[] = [
  "ui",
  "workspace",
  "web",
];
export type ExtensionKind = "ui" | "workspace" | "web";

export interface VSCodeExtensionCapabilities {
  readonly virtualWorkspaces?: ExtensionVirtualWorkspaceSupport;
  readonly untrustedWorkspaces?: ExtensionUntrustedWorkspaceSupport;
}
export type ExtensionUntrustedWorkspaceSupport =
  | { supported: true }
  | { supported: false; description: string }
  | {
      supported: LimitedWorkspaceSupportType;
      description: string;
      restrictedConfigurations?: string[];
    };
export type LimitedWorkspaceSupportType = "limited";
export type ExtensionUntrustedWorkspaceSupportType =
  | boolean
  | LimitedWorkspaceSupportType;
export type ExtensionVirtualWorkspaceSupportType =
  | boolean
  | LimitedWorkspaceSupportType;
export type ExtensionVirtualWorkspaceSupport =
  | boolean
  | { supported: true }
  | { supported: false | LimitedWorkspaceSupportType; description: string };
