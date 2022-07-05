/**
 * Indicates that a construct can be captured.
 */
export interface ICapturable {
  capture(symbol: string, binding: Binding): ICaptureSource;
}

export interface ICaptureTarget {
  addEnvironment(key: string, value: string): void;
}

export interface ICaptureSource {
  readonly factoryCode: string;
  readonly requireCode: string;
  bind(target: ICaptureTarget): void;
}

export interface Binding {
  /** The captured object */
  readonly obj: ICapturable;

  /** Which methods are called on the captured object */
  readonly methods?: string[];
}

export interface ProcessProps {
  readonly path: string;
  readonly bindings?: { [symbol: string]: Binding };
}

export class Process {
  /**
   * The captures of this proc.
   */
  public readonly captures = new Array<ICaptureSource>();

  constructor(props: ProcessProps) {
    props;
  }
}
