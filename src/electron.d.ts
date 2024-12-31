/* eslint-disable */
/* @typescript-eslint-disable */

export interface IElectronAPI {
  ipcRenderer: {
    on(channel: string, func: (...args: any[]) => void): void;
    off(channel: string, func: (...args: any[]) => void): void;
    send(channel: string, ...args: any[]): void;
    invoke(channel: string, ...args: any[]): Promise<any>;
  };
  ping: () => Promise<string>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
