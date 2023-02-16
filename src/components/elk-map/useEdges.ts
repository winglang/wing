import { useState } from "react";

import { Edge } from "./Edge.js";

export const useEdges = (initialState?: Edge[] | (() => Edge[])) => {
  return useState(initialState);
};
