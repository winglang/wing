import { Construct } from 'constructs';
import { Process } from '../core';

export class Endpoint extends Construct {
  private readonly routes = new Array<Route>();

  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  public onGet(route: string, proc: Process) {
    this.routes.push({
      method: 'GET',
      proc,
      url: route,
    });
  }
}

interface Route {
  readonly method: string;
  readonly url: string;
  readonly proc: Process;
}