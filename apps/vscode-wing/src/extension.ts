import { commands, ExtensionContext, languages } from "vscode";
import { WingConsoleManager } from "./console";
import { LanguageServerManager } from "./lsp";

const disposables: { (): Promise<void> }[] = [];

export async function deactivate() {
  await Promise.all(disposables);
}

export async function activate(context: ExtensionContext) {
  // For some reason, the word pattern is not set correctly by the language config file
  // https://github.com/microsoft/vscode/issues/42649
  languages.setLanguageConfiguration("wing", {
    wordPattern: /([a-zA-Z_$][A-Za-z_$0-9]*)/,
  });

  const wingConsoleContext = new WingConsoleManager(context);
  const languageServerManager = new LanguageServerManager(context);

  // add command to preview wing files
  context.subscriptions.push(
    commands.registerCommand("wing.openFile", () =>
      wingConsoleContext.openFile()
    ),
    commands.registerCommand("wing.openConsole", () =>
      wingConsoleContext.openConsole()
    )
  );

  await languageServerManager.start();
  disposables.push(languageServerManager.stop);
}
