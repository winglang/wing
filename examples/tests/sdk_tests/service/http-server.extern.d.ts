export default interface extern {
  createServer: (body: string) => Promise<IHttpServer$Inflight>,
}
export interface Address {
  readonly port: number;
}
export interface IHttpServer$Inflight {
  readonly address: () => Promise<Address>;
  readonly close: () => Promise<void>;
}