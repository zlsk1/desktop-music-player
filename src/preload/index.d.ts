import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      hideWindow: () => void,
      blurWindow: () => void,
      setMaximizeStatus: (status: boolean) => void,
    },
    windowStatus: {
      isMaximized: () => Promise<boolean>
    }
  }
}
