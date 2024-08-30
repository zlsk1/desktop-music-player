import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type { OpenDialogOptions } from 'electron'

// Custom APIs for renderer
const api = {
  hideWindow: () => ipcRenderer.send('hide-window'),
  blurWindow: () => ipcRenderer.send('blur-window'),
  setMaximizeStatus: (status: boolean) => {
    if (status) ipcRenderer.send('set-maximize')
    else ipcRenderer.send('un-maximize')
  },
  quitApp: () => ipcRenderer.send('quit-app'),
  getLocalMusic: (paths: string[]) => ipcRenderer.invoke('get-local-music', paths),
  openDialog: (options?: OpenDialogOptions) => ipcRenderer.invoke('open-dialog', options),
  getUserInfo: () => ipcRenderer.invoke('get-user-info'),
  showItemInFolder: (fullPath: string) => ipcRenderer.send('show-item-in-folder', fullPath),
  trashItem: (path: string) => ipcRenderer.invoke('trash-item', path),
  getLocalMusicPath: () => ipcRenderer.invoke('get-local-music-path', 'music'),
  getLocalDownloadPath: () => ipcRenderer.invoke('get-local-download-path', 'downloads')
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
