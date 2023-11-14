import { Construct } from "constructs";
import { fqnForType } from "../constants";
import { App } from "../core";
import { Json, Node, Resource, Duration } from "../std"; 

/**
 * Global identifier for `Stream`
 */
export const STREAMS_TYPE_FQN = fqnForType("cloud.Stream");

export interface StreamProps {
    /**
     * The stream's name
     * 
     * @default - a new stream is created with a generated name
     */
    readonly name?: string;
    
    /**
     * The stream's data horizon
     * 
     * This defines the last of the end of the data that will be kept in the stream
     * Essentially, data younger than the horizon will be kept, everything else dropped
     * 
     * @default - 24h
     */
    readonly horizon?: Duration;
    
    /**
     * The stream's provisioned read capacity
     * 
     * This is a complex calculation based on shard amount and capacity per shard
     * 
     * @default - 1
     */
}

/**
 * Properties for `Streams`
 */
export interface StreamsProps {
  /**
   * The name of the stream
   */
  readonly name: string;
  /**
   * The description of the stream
   */
  readonly description?: string;
  /**
   * The schema of the stream
   */
  readonly schema: Json;
}