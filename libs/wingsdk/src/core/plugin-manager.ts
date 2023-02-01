import { IApp } from "./app";
import vm from "vm";
import fs from "fs";
import { resolve } from "path";

/**
 * Behavioral interface of a plugin hook.
 */
export interface IHook {
  /** preSynth phase */
  preSynth(app: IApp): void;
  /** postSynth phase */
  postSynth(config: any): any;
  /** validate phase */
  validate(config: any): void;
}


/**
 * Plugin manager is responsible for loading hooks from plugins and 
 * managing their executions during the various phases of the plugin lifecycle.
 */
export class PluginManager {
  private hooks: IHook[];
  private context?: vm.Context;
  
  constructor(plugins: string[], context?: vm.Context) {
    this.hooks = [];
    this.context = context;

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
    if (plugin.endsWith(".js")) {
      this.addPluginFromFilePath(plugin);
    } else {
      throw new Error(`Currently only javascript files are supported as plugins. Got: ${plugin}`);
    }
  }

  /**
   * Loads hooks from a plugin file and adds them to the list of hooks
   * that will later be run in the various plugin phases.
   * 
   * @param filePath path to the plugin file
   */
  public addPluginFromFilePath(filePath: string) {
    const hooks: IHook = {} as any;
    const context = this.context ?? vm.createContext({require, console, exports: hooks});
    const pluginCode = fs.readFileSync(resolve(filePath), 'utf8');
    const script = new vm.Script(pluginCode);
    script.runInNewContext(context);
    this.hooks.push(hooks);
  }

  /**
   * Call all preSynth hooks
   * 
   * This phase is mutable, allowing plugins to modify the app construct
   * before any synthesis takes place.
   * 
   * @param app app construct to be passed to the preSynth hooks
   */
  public preSynth(app: IApp) {
    for (const hook of this.hooks) {
      if (hook.preSynth) {
        hook.preSynth(app);
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
  public postSynth(config: any, synthesizedStackPath: string) {
    for (const hook of this.hooks) {
      if (hook.postSynth) {
        config = hook.postSynth(config);
      }
    }
    // Overwrite the config with the modified one
    fs.writeFileSync(resolve(synthesizedStackPath), JSON.stringify(config, null, 2));
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
        hook.validate(config);
      }
    }
  }
}