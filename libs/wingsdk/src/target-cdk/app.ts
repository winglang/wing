import { PolyconFactory } from "./factory";
import { CdkApp, IApp, AppProps } from "../core";

export class App extends CdkApp implements IApp {
  constructor(props: AppProps = {}) {
    super({
      ...props,
      customFactory: props.customFactory ?? new PolyconFactory(),
    });
  }
}