import { AxiosRequestConfig } from 'axios';
export type AxiosConfig = AxiosRequestConfig;

export interface HttpModuleOptionsFactory {
  createHttpOptions(): Promise<AxiosConfig> | AxiosConfig;
}
