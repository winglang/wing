import type extern from "./url_utils.extern";

export const isValidUrl: extern["isValidUrl"] = async (url) => {
  return URL.canParse(url);
}