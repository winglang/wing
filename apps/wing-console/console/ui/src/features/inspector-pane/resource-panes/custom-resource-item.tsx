import type {
  UIComponent,
  UIField,
  UIButton,
  UISection,
  UIFileBrowser,
  UIHttpClient,
  UITable,
} from "@winglang/sdk/lib/core";

import { CustomResourceFileBrowser } from "./custom-resource-file-browser.js";
import { CustomResourceHttpClientItem } from "./custom-resource-http-client.js";
import { CustomResourceUiButtonItem } from "./custom-resource-ui-button.js";
import { CustomResourceUiFieldItem } from "./custom-resource-ui-field.js";

export interface UIComponentLike {
  readonly kind: string;
  readonly label?: string | undefined;
  readonly handler?: string | undefined;
}

const getUiComponent = (item: UIComponentLike) => {
  if (item.kind === "field") {
    return item as UIField;
  }
  if (item.kind === "button") {
    return item as UIButton;
  }
  if (item.kind === "section") {
    return item as unknown as UISection;
  }
  if (item.kind === "file-browser") {
    return item as unknown as UIFileBrowser;
  }
  if (item.kind === "http-client") {
    return item as unknown as UIHttpClient;
  }
  if (item.kind === "table") {
    return item as unknown as UITable;
  }
  return item as UIComponent;
};

export const CustomResourceUiItem = ({ item }: { item: UIComponentLike }) => {
  const uiComponent = getUiComponent(item);
  return (
    <>
      {uiComponent.kind === "field" && (
        <CustomResourceUiFieldItem
          label={uiComponent.label}
          handlerPath={uiComponent.handler}
          link={uiComponent.link ?? false}
        />
      )}
      {uiComponent.kind === "button" && (
        <CustomResourceUiButtonItem
          label={uiComponent.label}
          handlerPath={uiComponent.handler}
        />
      )}
      {uiComponent.kind === "file-browser" && (
        <CustomResourceFileBrowser
          label={uiComponent.label}
          putHandler={uiComponent.putHandler}
          getHandler={uiComponent.getHandler}
          listHandler={uiComponent.listHandler}
          deleteHandler={uiComponent.deleteHandler}
        />
      )}
      {uiComponent.kind === "http-client" && (
        <CustomResourceHttpClientItem
          label={uiComponent.label}
          getUrlHandler={uiComponent.getUrlHandler}
          getApiSpecHandler={uiComponent.getApiSpecHandler}
        />
      )}
    </>
  );
};
