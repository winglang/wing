export interface Capture {
  /** The captured object */
  readonly obj: any;

  /** Which methods are called on the captured object */
  readonly methods?: string[];
}

export interface ICapturable {
  capture(consumer: any, capture: Capture): string;
}

export interface ProcessProps {
  readonly path: string;
  readonly captures?: { [name: string]: Capture };
}

export class Process {
  public readonly path: string;
  public readonly captures: { [name: string]: Capture };

  constructor(props: ProcessProps) {
    console.log(props);
    this.path = props.path;
    this.captures = props.captures ?? {};
  }
}
