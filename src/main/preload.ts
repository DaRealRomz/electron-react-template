import { contextBridge, ipcRenderer } from "electron";

const electronHandler = {
  versions: {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
  },
  ping: () => ipcRenderer.invoke("ping"),
};

contextBridge.exposeInMainWorld("electron", electronHandler);

export type ElectronHandler = typeof electronHandler;
