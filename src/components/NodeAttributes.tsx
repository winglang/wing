import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import type { BaseResourceSchema } from "@monadahq/wingsdk/lib/sim";

import { ResourceIcon } from "../stories/utils.js";

export interface NodeAttribute {
  key: string;
  value?: string;
  render?(): JSX.Element;
}

export interface BaseNodeAttributesProps {
  attributes: NodeAttribute[];
}

export function BaseNodeAttributes({ attributes }: BaseNodeAttributesProps) {
  return (
    <div className="">
      <dl className="sm:divide-y sm:divide-slate-200">
        {attributes.map((attribute) => {
          return (
            <div
              key={attribute.key}
              className="px-3 py-2.5 sm:grid sm:grid-cols-4 sm:gap-2 group"
            >
              <dt className="text-sm font-medium text-slate-500">
                {attribute.key}
              </dt>
              <dd
                className="mt-1 text-sm text-slate-900 sm:col-span-3 sm:mt-0 flex items-center gap-2 min-w-0"
                title={attribute.value}
              >
                <span className="truncate">
                  {attribute.render?.() ?? attribute.value}
                </span>
                {attribute.value && (
                  <button className="invisible group-hover:visible flex-shrink-0 max-w-full truncate bg-slate-50 border border-slate-300 shadow-sm text-xs px-1.5 py-0.5 items-center gap-1.5 cursor-pointer hover:bg-slate-100 min-w-0 rounded">
                    <DocumentDuplicateIcon
                      className="w-4 h-4 text-slate-600"
                      aria-hidden="true"
                    />
                  </button>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

function getBaseAttributes(node: BaseResourceSchema): NodeAttribute[] {
  return [
    {
      key: "ID",
      value: node.path,
    },
    {
      key: "Path",
      // TODO: Ask if we can get `node.id` to Chris.
      value: node.path,
    },
    {
      key: "Type",
      value: node.type,
      render: () => (
        <div className="truncate cursor-auto select-none">
          <div className="inline-flex items-center gap-1 px-1 bg-slate-100 border border-slate-200 rounded max-w-full truncate">
            <ResourceIcon
              resourceType={node.type}
              className="w-4 h-4"
              aria-hidden="true"
            />
            <div className="truncate">{node.type}</div>
          </div>
        </div>
      ),
    },
    // {
    //   key: "Source File",
    //   value: "/Users/Wing/Code/wing-demo/src/demo.w",
    //   render: () => (
    //     <button className="font-medium text-sky-600 hover:text-sky-500">
    //       {meta.source.fileName} ({meta.source.line}:{meta.source.column})
    //     </button>
    //   ),
    // },
  ];
}

function getNodeAttributes(node: BaseResourceSchema) {
  let attributes = getBaseAttributes(node);

  // if (node.type === "wingsdk.cloud.Endpoint") {
  //   attributes = [...attributes, {key: "URL", value: node.props.}]
  // }

  if (node.type === "wingsdk.cloud.Function") {
    attributes = [
      ...attributes,
      { key: "Filename", value: node?.props?.sourceCodeFile },
      { key: "Language", value: node?.props?.sourceCodeLanguage },
      {
        key: "Environment",
        value: JSON.stringify(node?.props?.environmentVariables),
        render: () => (
          <pre className="bg-slate-100 px-1 rounded border text-slate-700">
            {JSON.stringify(node?.props?.environmentVariables)}
          </pre>
        ),
      },
    ];
  } else if (node.type === "wingsdk.cloud.Queue") {
    attributes = [
      ...attributes,
      { key: "Timeout", value: `${node?.props?.timeout}ms` },
    ];
  }

  return attributes;
}

export interface NodeAttributesProps {
  node: BaseResourceSchema;
}

export function NodeAttributes({ node }: NodeAttributesProps) {
  const attributes = getNodeAttributes(node);
  return <BaseNodeAttributes attributes={attributes} />;
}
