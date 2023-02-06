import { IConstruct } from "constructs";
import fs from "fs";
import { resolve } from "path";
import vm from "vm";

/**
 * Behavioral interface of a plugin hook.
 */
export interface IPluginHooks {
  /** name of plugin */
  name: string;
  /** targets that hook is compatible with */
  compatibleTargets?: string[];
  /** preSynth phase */
  preSynth?(app: IConstruct): void;
  /** postSynth phase */
  postSynth?(config: any): any;
  /** validate phase */
  validate?(config: any): void;
}

enum PluginPhases {
  PRE_SYNTH = "preSynth",
  POST_SYNTH = "postSynth",
  VALIDATE = "validate",
}

export interface PluginManagerProps {
  /**
   * vm context to load plugins in with
   * 
   * @default - create a new context with (require, console, exports, process, __dirname)
   */
  context?: vm.Context;
}

/**
 * Plugin manager is responsible for loading hooks from plugins and
 * managing their executions during the various phases of the plugin lifecycle.
 */
export class PluginManager {
  private hooks: IPluginHooks[];
  private context?: vm.Context;

  constructor(plugins: string[], props: PluginManagerProps = {}) {
    this.hooks = [];
    this.context = props.context;

    for (const plugin of plugins) {
      this.add(plugin);
    }
  }

  /**
   * Add plugins to the plugin manager based on the plugin type.
   *
   * @param plugin the plugin to add
   */
  public add(plugin: string) {
    // maybe we support other plugin types in the future (e.g. npm modules)
    if (!plugin.endsWith(".js")) {
      throw new Error(
        `Currently only javascript files are supported as plugins. Got: ${plugin}`
      );
      
    }
    this.addPluginFromFilePath(plugin);
  }

  /**
   * Loads hooks from a plugin file and adds them to the list of hooks
   * that will later be run in the various plugin phases.
   *
   * @param filePath absolute file path to the plugin
   */
  private addPluginFromFilePath(filePath: string) {
    const pluginHooks: IPluginHooks = {
      name: filePath,
    };
    
    const pluginDir = resolve(filePath).split("/").slice(0, -1).join("/");

    const context =
      this.context ??
      vm.createContext({
        require, 
        console, 
        exports: pluginHooks, 
        process, 
        __dirname: pluginDir 
      });
    
    const pluginCode = fs.readFileSync(resolve(filePath), "utf8");
    const script = new vm.Script(pluginCode);
    script.runInNewContext(context);

    if (this.isHookCompatible(pluginHooks)) {
      this.hooks.push(pluginHooks);
    } else {
      console.log(
        `Skipping plugin ${filePath} as is not compatible with target ${process.env.WING_TARGET}`
      );
    }

  }

  private isHookCompatible(hook: IPluginHooks): boolean {
    if (hook.compatibleTargets) {
      return hook.compatibleTargets.includes(process.env.WING_TARGET!);
    }
    // if no explicit compatible targets defined assume it's compatible
    return true;
  }

  private throwHookInvocationError(stage: string, name: string, err: any) {
    throw new Error(`Plugin: "${name}" failed, during stage: "${stage}". cause: ${err.message}`);
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
    for (const hook of this.hooks) {
      if (hook.preSynth) {
        try {
          hook.preSynth(app);
        } catch (err) {
          this.throwHookInvocationError(PluginPhases.PRE_SYNTH, hook.name, err)
        }
      }
    }
  }

  /**
   * Call all postSynth hooks
   *
   * This phase is mutable, allowing plugins to modify the Terraform config
   * after synthesis has occurred then overwrite the config file on disk
   * with the modified one.
   *
   * @param config Terraform config to be passed to the postSyth hooks
   * @param synthesizedStackPath path to the synthesized stack json file
   */
  public postSynth(config: any, synthesizedStackPath: string): any {
    for (const hook of this.hooks) {
      if (hook.postSynth) {
        try {
          config = hook.postSynth(config) ?? config;
        } catch (err) {
          this.throwHookInvocationError(PluginPhases.POST_SYNTH, hook.name, err);
        }
      }
    }
    // Overwrite the config with the modified one
    fs.writeFileSync(
      resolve(synthesizedStackPath),
      JSON.stringify(config, null, 2)
    );
    return config;
  }

  /**
   * Call all validate hooks
   *
   * This phase is immutable, allowing plugins to perform validations
   * on the Terraform config after all modifications have been made.
   *
   * @param config Terraform config to be passed to the validate hooks
   */
  public validate(config: any) {
    for (const hook of this.hooks) {
      if (hook.validate) {
        try {
          hook.validate(config);
        } catch (err) {
          this.throwHookInvocationError(PluginPhases.VALIDATE, hook.name, err);
        }
      }
    }
  }
}
