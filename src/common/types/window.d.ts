import { ElectronAPI } from '@electron-toolkit/preload'

interface LosicMusic {
  name: string;
  ctime: string;
  size: string;
  key?: string,
  duration?: number,
  path: string
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      hideWindow: () => void,
      blurWindow: () => void,
      setMaximizeStatus: (status: boolean) => void,
      getLocalMusic: (paths: string[]) => Promise<LosicMusic[]>,
    },
    windowStatus: {
      isMaximized: () => Promise<boolean>
    }
  }
}
