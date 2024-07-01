import * as Case from "case";
import * as reflect from "jsii-reflect";
import * as transpile from "./transpile";
import { submodulePath } from "../schema";

export class GoTranspile extends transpile.TranspileBase {
  constructor() {
    super(transpile.Language.GO);
  }

  public moduleLike(
    moduleLike: reflect.ModuleLike
  ): transpile.TranspiledModuleLike {
    if (moduleLike instanceof reflect.Submodule) {
      const parent = this.moduleLike(this.getParentModule(moduleLike));
      const parentFqn = parent.submodule
        ? `${parent.name}/${parent.submodule}`
        : parent.name;

      // `packageName` can be specified explicitly in configuration or
      // auto-generated from node package name.
      // Example: @aws-cdk/aws-ecr -> awscdkawsecr
      const packageName =
        moduleLike.targets?.go?.packageName ??
        moduleLike.name.toLowerCase().replace(/[^a-z0-9]/g, "");

      return { name: parentFqn, submodule: packageName };
    } else {
      // This is the root module
      const moduleName = moduleLike.targets?.go?.moduleName;

      // moduleName is required configuration for Go enabled packages
      // Validation in `Documentation` class prevents this
      if (!moduleName) {
        throw new Error(
          '"jsii.targets.go.moduleName" is a required field for Go enabled JSII modules'
        );
      }

      const packageName =
        moduleLike.targets?.go?.packageName ??
        (moduleLike as reflect.Assembly).name
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "");
      const version = Number.parseInt(
        (moduleLike as reflect.Assembly).version.split(".")[0]
      );
      const versionSegment = version >= 2 ? `/v${version}` : "";

      // Example: github.com/aws/constructs-go/constructs/v10
      const name = `${moduleName}/${packageName}${versionSegment}`;

      return { name };
    }
  }

  public type(type: reflect.Type): transpile.TranspiledType {
    const submodule = this.findSubmodule(type);
    const moduleLike = this.moduleLike(submodule ?? type.assembly);

    const fqn = [moduleLike.name];
    let namespace = type.namespace;
    if (namespace) {
      fqn.push(namespace);
    }
    fqn.push(type.name);

    return new transpile.TranspiledType({
      fqn: fqn.join("."),
      name: type.name,
      namespace: type.namespace,
      module: moduleLike.name,
      submodule: moduleLike.submodule,
      submodulePath: submodulePath(submodule),
      source: type,
      language: this.language,
    });
  }

  public callable(callable: reflect.Callable): transpile.TranspiledCallable {
    const type = this.type(callable.parentType);
    const isInitializer = reflect.Initializer.isInitializer(callable);
    const name = isInitializer ? type.name : Case.pascal(callable.name);

    const parameters = callable.parameters.sort(this.optionalityCompare);
    const paramsFormatted = parameters
      .map((p) => this.formatFnParam(this.parameter(p)))
      .join(", ");

    let returnType: transpile.TranspiledTypeReference | undefined;
    if (isInitializer) {
      returnType = this.typeReference(callable.parentType.reference);
    } else if (reflect.Method.isMethod(callable)) {
      returnType = this.typeReference(callable.returns.type);
    }
    const returns = returnType?.toString({
      typeFormatter: (t) => t.name,
    });

    const isStatic = reflect.Method.isMethod(callable) && callable.static;

    const packageName = this.packageName(type);

    const signatures = [
      `func ${isInitializer ? "New" : ""}${name}(${paramsFormatted})${
        returns ? ` ${returns}` : ""
      }`,
    ];
    const invocations = [
      isInitializer
        ? `${packageName}.New${name}(${paramsFormatted})${
            returns ? ` ${returns}` : ""
          }`
        : `${packageName}.${type.name}${
            isStatic ? "_" : "."
          }${name}(${paramsFormatted})${returns ? ` ${returns}` : ""}`,
    ];

    return {
      name,
      parentType: type,
      import: this.formatImport(type),
      parameters,
      signatures,
      invocations,
    };
  }

  public class(klass: reflect.ClassType): transpile.TranspiledClass {
    return {
      name: klass.name,
      type: this.type(klass),
    };
  }

  public struct(struct: reflect.InterfaceType): transpile.TranspiledStruct {
    const type = this.type(struct);
    const input = struct.allProperties.map((p) => {
      const property = this.property(p);
      return `\t${property.name}: ${property.typeReference},`;
    });
    return {
      type: type,
      name: struct.name,
      import: this.formatImport(type),
      initialization: this.formatStructBuilder(type, input),
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

  public parameter(
    parameter: reflect.Parameter
  ): transpile.TranspiledParameter {
    const typeRef = this.typeReference(parameter.type);
    const name = parameter.name;
    return {
      name,
      parentType: this.type(parameter.parentType),
      typeReference: typeRef,
      optional: parameter.optional,
      declaration: this.formatParameter(name, typeRef),
    };
  }

  public property(property: reflect.Property): transpile.TranspiledProperty {
    const typeRef = this.typeReference(property.type);
    const name = Case.pascal(property.name);
    return {
      name,
      parentType: this.type(property.parentType),
      typeReference: typeRef,
      optional: property.optional,
      declaration: this.formatProperty(name, typeRef, property),
    };
  }

  public enum(enu: reflect.EnumType): transpile.TranspiledEnum {
    return {
      fqn: this.type(enu).fqn,
      name: enu.name,
    };
  }

  public enumMember(em: reflect.EnumMember): transpile.TranspiledEnumMember {
    return {
      fqn: `${this.enum(em.enumType).fqn}_${em.name}`,
      name: `${em.enumType.name}_${em.name}`,
    };
  }

  public unionOf(): string {
    return this.any();
  }

  public listOf(type: string): string {
    return `*[]${type}`;
  }

  public mapOf(type: string): string {
    return `*map[string]${type}`;
  }

  public any(): string {
    return "interface{}";
  }

  public void(): string {
    return "";
  }

  public str(): string {
    return "*string";
  }

  public number(): string {
    return "*f64";
  }

  public boolean(): string {
    return "*bool";
  }

  public json(): string {
    return this.mapOf(this.any());
  }

  public date(): string {
    return "*time.Time";
  }

  public readme(readme: string): string {
    return readme;
  }

  private formatFnParam(
    transpiled: transpile.TranspiledParameter | transpile.TranspiledProperty
  ): string {
    return this.formatParameter(transpiled.name, transpiled.typeReference);
  }

  private formatImport(type: transpile.TranspiledType): string {
    return `import "${type.module}${
      type.submodule ? `/${type.submodule}` : ""
    }"`;
  }

  private formatParameter(
    name: string,
    typeReference: transpile.TranspiledTypeReference
  ) {
    const tf = typeReference.toString({
      typeFormatter: (t) => t.name,
    });

    return `${name} ${tf}`;
  }

  private formatStructBuilder(
    type: transpile.TranspiledType,
    properties: string[]
  ): string {
    return [
      `&${this.packageName(type)}.${type.name} {`,
      properties.join("\n"),
      "}",
    ].join("\n");
  }

  private formatProperty(
    name: string,
    typeReference: transpile.TranspiledTypeReference,
    property: reflect.Property
  ): string {
    const tf = typeReference.toString({
      typeFormatter: (t) => t.name,
    });

    return property.parentType.isDataType()
      ? `${name} ${tf}`
      : `func ${name}() ${tf}`;
  }

  private packageName(type: transpile.TranspiledType): string {
    return (
      type.submodule ??
      type.module.split("/").slice(/\/v\d+$/.test(type.module) ? -2 : -1)[0]
    );
  }
}
