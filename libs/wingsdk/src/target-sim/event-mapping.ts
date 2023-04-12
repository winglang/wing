import { Construct } from "constructs";
import { fqnForType } from "../constants";
import { Resource, App } from "../core";

export const EVENT_MAP_FQN = fqnForType("sim.EventMapping");

export interface EventProps {}

export abstract class EventMapping extends Resource {
    public readonly stateful = true;

    public static _newEvent(
        scope: Construct,
        id: string,
        props: EventProps = {}
    ): Event {
        return App.of(scope).newAbstract(EVENT_MAP_FQN, scope, id, props);
    }

    constructor(scope: Construct, id: string, props: EventProps = {}) {
        super(scope, id);
        props;
    }
}
