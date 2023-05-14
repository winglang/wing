import * as reflect from "jsii-reflect";
import * as transpile from "./transpile";
import { TranspiledTypeReferenceToStringOptions } from "./transpile";
import { submodulePath } from "../schema";

// Helpers
const formatArguments = (inputs: string[]) => {
  return inputs.join(", ");
};

const typeToString: TranspiledTypeReferenceToStringOptions = {
  typeFormatter: (type: transpile.TranspiledType) => {
    return type.name;
  },
};

const formatStructInitialization = (type: transpile.TranspiledType) => {
  const target = type.submodule ? `${type.namespace}.${type.name}` : type.name;
  return `let ${type.name} = ${target}{ ... }`;
};

const formatClassInitialization = (
  type: transpile.TranspiledType,
  inputs: string[]
) => {
  const target = type.submodule ? `${type.namespace}.${type.name}` : type.name;
  return `new ${target}(${formatArguments(inputs)})`;
};

const formatInvocation = (
  type: transpile.TranspiledType,
  inputs: string[],
  method: string
) => {
  let target = type.submodule ? `${type.namespace}.${type.name}` : type.name;
  if (method) {
    target = `${target}.${method}`;
  }
  return `${target}(${formatArguments(inputs)})`;
};

const formatImport = (type: transpile.TranspiledType) => {
  // TODO idk
  if (type.module.endsWith("/sdk")) {
    return `bring ${type.submodule};`;
  }
  if (type.submodule) {
    return `bring { ${type.submodule} } from "${type.module}"`;
  } else {
    return `bring { ${type.name} } from "${type.module}"`;
  }
};

const formatSignature = (name: string, inputs: string[], returns?: string) => {
  return `${name}(${formatArguments(inputs)})${returns ? ": " + returns : ""}`;
};

/**
 * A Wing transpiler.
 */
export class WingTranspile extends transpile.TranspileBase {
  constructor() {
    super(transpile.Language.WING);
  }

  public readme(readme: string): string {
    return readme;
  }

  public unionOf(_types: string[]): string {
    // TODO: No union support?
    return "any";
  }

  public listOf(type: string): string {
    return `MutArray&lt;${type}&gt;`;
  }

  public mapOf(type: string): string {
    return `MutMap&lt;${type}&gt;`;
  }

  public any(): string {
    return "any";
  }

  public void(): string {
    return "void";
  }

  public boolean(): string {
    return "bool";
  }

  public str(): string {
    return "str";
  }

  public number(): string {
    return "num";
  }

  public date(): string {
    return "datetime";
  }

  public json(): string {
    return "json";
  }

  public enum(enu: reflect.EnumType): transpile.TranspiledEnum {
    return {
      fqn: this.type(enu).fqn,
      name: enu.name,
    };
  }

  public enumMember(em: reflect.EnumMember): transpile.TranspiledEnumMember {
    return {
      fqn: `${this.enum(em.enumType).fqn}.${em.name}`,
      name: em.name,
    };
  }

  public property(property: reflect.Property): transpile.TranspiledProperty {
    const name = property.name;
    const typeRef = this.typeReference(property.type);
    return {
      name,
      parentType: this.type(property.parentType),
      typeReference: typeRef,
      optional: property.optional,
      declaration: this.formatProperty(name, typeRef),
    };
  }

  public class(klass: reflect.ClassType): transpile.TranspiledClass {
    return {
      name: klass.name,
      type: this.type(klass),
    };
  }

  public parameter(
    parameter: reflect.Parameter
  ): transpile.TranspiledParameter {
    const name = parameter.name;
    const typeRef = this.typeReference(parameter.type);
    return {
      name,
      parentType: this.type(parameter.parentType),
      typeReference: typeRef,
      optional: parameter.optional,
      declaration: this.formatProperty(name, typeRef),
    };
  }

  public struct(struct: reflect.InterfaceType): transpile.TranspiledStruct {
    const type = this.type(struct);
    return {
      type: type,
      name: struct.name,
      import: formatImport(type),
      initialization: formatStructInitialization(type),
    };
  }

  public callable(callable: reflect.Callable): transpile.TranspiledCallable {
    const type = this.type(callable.parentType);
    const parameters = callable.parameters
      .filter((p) => {
        return p.name !== "scope" && p.name !== "id";
      })
      .sort(this.optionalityCompare);
    const name = callable.name;
    const inputs = parameters.map((p) =>
      this.formatParameters(this.parameter(p))
    );

    const invocation = reflect.Initializer.isInitializer(callable)
      ? formatClassInitialization(type, inputs)
      : formatInvocation(type, inputs, name);

    let returnType: transpile.TranspiledTypeReference | undefined;
    if (reflect.Initializer.isInitializer(callable)) {
      returnType = this.typeReference(callable.parentType.reference);
    } else if (reflect.Method.isMethod(callable)) {
      returnType = this.typeReference(callable.returns.type);
    }
    const returns = returnType?.toString(typeToString);

    return {
      name,
      parentType: type,
      import: formatImport(type),
      parameters,
      signatures: [formatSignature(name, inputs, returns)],
      invocations: [invocation],
      returnType,
    };
  }

  public interface(
    iface: reflect.InterfaceType
  ): transpile.TranspiledInterface {
    return {
      name: iface.name,
      type: this.type(iface),
    };
  }

  public type(type: reflect.Type): transpile.TranspiledType {
    const submodule = this.findSubmodule(type);
    const moduleLike = this.moduleLike(submodule ? submodule : type.assembly);

    const fqn = [moduleLike.name];

    if (type.namespace) {
      fqn.push(type.namespace);
    }
    fqn.push(type.name);

    let typeName = type.name;
    if (typeName === "inflight") {
      typeName = "~inflight";
    }

    return new transpile.TranspiledType({
      fqn: fqn.filter((s) => s !== "@winglang/sdk").join("."),
      name: typeName,
      namespace: type.namespace,
      module: moduleLike.name,
      submodule: moduleLike.submodule,
      submodulePath: submodulePath(submodule),
      source: type,
      language: this.language,
    });
  }

  public moduleLike(
    moduleLike: reflect.ModuleLike
  ): transpile.TranspiledModuleLike {
    if (moduleLike instanceof reflect.Submodule) {
      const fqnParts = moduleLike.fqn.split(".");
      return { name: fqnParts[0], submodule: fqnParts[1] };
    }
    return { name: moduleLike.fqn };
  }

  private formatParameters(
    transpiled: transpile.TranspiledParameter | transpile.TranspiledProperty
  ): string {
    let tf = transpiled.typeReference.toString(typeToString);
    if (tf === "Inflight") {
      tf = "~Inflight";
    }
    return `${transpiled.name}${transpiled.optional ? "?" : ""}: ${tf}`;
  }

  private formatProperty(
    name: string,
    typeReference: transpile.TranspiledTypeReference
  ): string {
    let tf = typeReference.toString(typeToString);
    if (tf === "Inflight") {
      tf = "~Inflight";
    }
    return `${name}: ${tf};`;
  }
}
