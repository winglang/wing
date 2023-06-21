export interface LogInterface {
  info(message?: any, ...optionalParameters: any[]): void;
  verbose(message?: any, ...optionalParameters: any[]): void;
  error(message?: any, ...optionalParameters: any[]): void;
}
