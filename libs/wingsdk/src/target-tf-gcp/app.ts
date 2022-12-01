import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
import { Polycons } from "polycons";
import { AppProps, CdktfApp, IApp } from "../core";
import { PolyconFactory } from "./factory";

export interface GcpAppProps extends AppProps {
  readonly projectId?: string;
}

/**
 * An app that knows how to synthesize constructs into a Terraform configuration
 * for AWS resources.
 */
export class App extends CdktfApp implements IApp {
  constructor(props: GcpAppProps) {
    super(props);
    Polycons.register(this, props.customFactory ?? new PolyconFactory());

    const projectId = props.projectId ?? process.env.GOOGLE_PROJECT_ID;
    new GoogleProvider(this, "google", {
      project: projectId,
    });
  }
}
