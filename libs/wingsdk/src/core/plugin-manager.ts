import { writeFileSync } from "fs";
import { resolve } from "path";
import { IConstruct } from "constructs";

/**
 * Behavioral interface of a plugin hook.
 */
export interface ICompilationHook {
  /**
   *  Name of plugin can be set by plugin as export
   *
   * @default - absolute path to plugin file
   */
  name: string;
  /** PreSynth hook */
  preSynth?(app: IConstruct): void;
  /** PostSynth hook */
  postSynth?(config: any): any;
  /** Validate hook */
  validate?(config: any): void;
}

enum CompilationPhase {
  PRE_SYNTH = "preSynth",
  POST_SYNTH = "postSynth",
  VALIDATE = "validate",
}

/**
 * Plugin manager is responsible for loading hooks from plugins and
 * managing their execution during compilation process.
 */
export class PluginManager {
  private hooks: ICompilationHook[];

  constructor(plugins: string[]) {
    this.hooks = [];

    for (const plugin of plugins) {
      this.add(plugin);
    }
  }

  /**
   * Add plugins to the plugin manager based on the plugin type.
   *
   * @param pluginAbsolutePath the plugin to add
   */
  public add(pluginAbsolutePath: string) {
    // maybe we support other plugin types in the future (e.g. npm modules)
    if (!pluginAbsolutePath.endsWith(".js")) {
      throw new Error(
        `Currently only javascript files are supported as plugins. Got: ${pluginAbsolutePath}`
      );
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      this.hooks.push(require(pluginAbsolutePath));
    } catch (err) {
      throw new Error(
        `Failed to load plugin from "${pluginAbsolutePath}":\n${err}`
      );
    }
  }

  /**
   * Call all preSynth hooks
   *
   * This phase is mutable, allowing plugins to modify the app construct
   * before any synthesis takes place.
   *
   * @param app app construct to be passed to the preSynth hooks
   */
  public preSynth(app: IConstruct) {
    this.callAllHooks(CompilationPhase.PRE_SYNTH, (hook) => hook.preSynth(app));
  }

  /**
   * Call all postSynth hooks
   *
   * This hook is mutable, allowing plugins to modify the Terraform config
   * after synthesis has occurred then overwrite the config file on disk
   * with the modified one.
   *
   * @param config Terraform config to be passed to the postSyth hooks
   * @param synthesizedStackPath path to the synthesized stack json file
   */
  public postSynth(config: any, synthesizedStackPath: string): any {
    this.callAllHooks(CompilationPhase.POST_SYNTH, (hook) => {
      config = hook.postSynth(config) ?? config;
    });

    // Only overwrite the config file if it has been modified
    if (this.hooks.length > 0) {
      writeFileSync(
        resolve(synthesizedStackPath),
        JSON.stringify(config, null, 2)
      );
    }

    return config;
  }

  /**
   * Call all validate hooks
   *
   * This hook is immutable, allowing plugins to perform validations
   * on the Terraform config after all modifications have been made.
   *
   * @param config Terraform config to be passed to the validate hooks
   */
  public validate(config: any) {
    this.callAllHooks(CompilationPhase.VALIDATE, (hook) =>
      hook.validate(config)
    );
  }

  private callAllHooks(phase: CompilationPhase, callHook: (hook: any) => any) {
    for (const hook of this.hooks) {
      if (!hook[phase]) {
        continue;
      }
      try {
        callHook(hook);
      } catch (err) {
        throw new Error(
          `Plugin "${hook.name}" failed, during "${phase}". ${err}`
        );
      }
    }
  }
}
