export type BindResourceUrl = (resourcePath: string, url: string) => Promise<void>;

export interface HostUtils {
  openExternal(url: string): Promise<void>;
  bindResourceUrl?: BindResourceUrl;
}
