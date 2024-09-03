import * as fs from "fs";
import * as path from "path";
import { SPEC_FILE_NAME, loadAssemblyFromFile } from "@jsii/spec";
import * as reflect from "jsii-reflect";

/**
 * Singelton class to expose various assemblies for test purposes.
 *
 * Use `Assemblies.instance` to obtain it.
 */
export class Assemblies {
  public static readonly AWSCDK_1_106_0 = `${__dirname}/../__fixtures__/assemblies`;

  private static _instance: Assemblies;

  private readonly ts: reflect.TypeSystem;

  public static get instance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new Assemblies();
    return this._instance;
  }

  private constructor() {
    this.ts = new reflect.TypeSystem();
    this.addAssemblies(Assemblies.AWSCDK_1_106_0);
  }

  public get withoutSubmodules(): reflect.Assembly {
    return this.ts.findAssembly("@aws-cdk/aws-ecr");
  }

  public get withSubmodules(): reflect.Assembly {
    return this.ts.findAssembly("aws-cdk-lib");
  }

  private addAssemblies(p: string) {
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      fs.readdirSync(p).forEach((f) => this.addAssemblies(path.join(p, f)));
    } else {
      if (p.endsWith(SPEC_FILE_NAME)) {
        const assembly = loadAssemblyFromFile(p);
        this.ts.addAssembly(new reflect.Assembly(this.ts, assembly));
      }
    }
  }
}
