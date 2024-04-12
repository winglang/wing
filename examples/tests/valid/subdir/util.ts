import type extern from "./util.extern";

export const greet: extern["greet"] = async (name) => {
  return "Hello " + name;
}

export const preflightGreet: extern["preflightGreet"] = (name) => {
  return "Hello " + name;
} 
