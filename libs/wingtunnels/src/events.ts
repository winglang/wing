import { EventEmitter } from "node:events";

export const eventHandler = new EventEmitter();

export enum Events {
  UrlAssigned = "URL_ASSIGNED"
}
