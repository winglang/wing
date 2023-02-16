import { useState } from "react";

import { Node } from "./Node.js";

export const useNodes = <T>(initialState?: Node<T>[] | (() => Node<T>[])) => {
  return useState(initialState);
};
