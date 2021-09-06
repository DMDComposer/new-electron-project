import { ipcRenderer, contextBridge } from "electron";


export const API = {
    getVersion: () => ipcRenderer.invoke("get/version"),
}

contextBridge.exposeInMainWorld("api", API);