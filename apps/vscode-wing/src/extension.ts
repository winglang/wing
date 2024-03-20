import { FSWatcher, watch } from "fs";
import {
  commands,
  ExtensionContext,
  languages,
  workspace,
  window,
} from "vscode";
import { getWingBin, updateStatusBar } from "./bin-helper";
import { CFG_WING, CFG_WING_BIN } from "./constants";
import { Loggers } from "./logging";
import { LanguageServerManager } from "./lsp";

let wingBinWatcher: FSWatcher | undefined;
let languageServerManager: LanguageServerManager | undefined;

export async function deactivate() {
  wingBinWatcher?.close();
  await languageServerManager?.stop();
  await wingConsoleContext?.stop();
}

export async function activate(context: ExtensionContext) {
  // For some reason, the word pattern is not set correctly by the language config file
  // https://github.com/microsoft/vscode/issues/42649
  languages.setLanguageConfiguration("wing", {
    wordPattern: /([a-zA-Z_$][A-Za-z_$0-9]*)/,
  });

  languageServerManager = new LanguageServerManager();

  const wingBinChanged = async () => {
    Loggers.default.appendLine(`Setting up wing bin...`);
    const currentWingBin = await getWingBin();
    if (currentWingBin) {
      const hasWingBin = await updateStatusBar(currentWingBin);

      wingBinWatcher?.close();
      wingBinWatcher = watch(
        currentWingBin,
        {
          persistent: false,
        },
        async () => {
          // wait for a second to make sure the file is done moving or being written
          await new Promise((resolve) => setTimeout(resolve, 1000, undefined));

          await wingBinChanged();
        }
      );

      if (hasWingBin) {
        Loggers.default.appendLine(`Using wing from "${currentWingBin}"`);

        languageServerManager?.setWingBin(currentWingBin);

        await languageServerManager?.start();
      } else {
        void window.showErrorMessage(`wing not found at "${currentWingBin}"`);
      }
    } else {
      Loggers.default.appendLine(`wing not found`);
    }
  };

  const wingIt = async () => {
    const filePath = window.activeTextEditor?.document.fileName;
    if (!filePath) {
      return;
    }
    const terminalName = `Wing it: ${filePath.split("/").pop()}`;

    const existingTerminal = window.terminals.find(
      (t) => t.name === terminalName
    );
    if (existingTerminal) {
      existingTerminal.dispose();
    }
    const terminal = window.createTerminal(terminalName);
    terminal.show();
    terminal.sendText(`wing it "${filePath}"`);
  };

  //watch for config changes
  workspace.onDidChangeConfiguration(async (e) => {
    // see if WING_BIN has changed
    if (e.affectsConfiguration(`${CFG_WING}.${CFG_WING_BIN}`)) {
      await wingBinChanged();
    }
  });

  // add command to preview wing files
  context.subscriptions.push(
    commands.registerCommand("wing.openConsole", wingIt)
  );

  await wingBinChanged();
}
