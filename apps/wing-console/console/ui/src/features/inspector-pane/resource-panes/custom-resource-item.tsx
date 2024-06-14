import type {
  UIComponent,
  UIField,
  UIButton,
  UISection,
} from "@winglang/sdk/lib/core";

import type {
  UIFileBrowser,
  UIHttpClient,
} from "../../../../../../libs/wingsdk/lib/core/index.js";

import { CustomResourceFileBrowser } from "./custom-resource-file-browser.js";
import { CustomResourceHttpClientItem } from "./custom-resource-http-client.js";
import { CustomResourceUiButtonItem } from "./custom-resource-ui-button.js";
import { CustomResourceUiFieldItem } from "./custom-resource-ui-field.js";

const getUiComponent = (item: UIComponent) => {
  if (item.kind === "field") {
    return item as UIField;
  }
  if (item.kind === "button") {
    return item as UIButton;
  }
  if (item.kind === "section") {
    return item as UISection;
  }
  if (item.kind === "file-browser") {
    return item as UIFileBrowser;
  }
  if (item.kind === "http-client") {
    return item as UIHttpClient;
  }
  return item;
};

export const CustomResourceUiItem = ({ item }: { item: UIComponent }) => {
  const uiComponent = getUiComponent(item);
  return (
    <>
      {uiComponent.kind === "field" && (
        <CustomResourceUiFieldItem
          label={uiComponent.label}
          handlerPath={uiComponent.handler}
          link={uiComponent.link}
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
