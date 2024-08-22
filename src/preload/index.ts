import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  hideWindow: () => ipcRenderer.send('hide-window'),
  blurWindow: () => ipcRenderer.send('blur-window'),
  setMaximizeStatus: (status: boolean) => {
    if (status) ipcRenderer.send('set-maximize')
    else ipcRenderer.send('un-maximize')
  }
}

const windowStatus = {
  isMaximized: () => ipcRenderer.invoke('get-maximize-status')
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('windowStatus', windowStatus)
  }
  catch (error) {
    console.error(error)
  }
}
else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  // @ts-ignore (define in dts)
  window.windowStatus = windowStatus
}
