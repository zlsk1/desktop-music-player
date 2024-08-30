import { ElectronAPI } from '@electron-toolkit/preload'
import type { IAudioMetadata  } from 'music-metadata'
import type { OpenDialogReturnValue, OpenDialogOptions, OpenExternalOptions } from 'electron'
import type { UserInfo } from 'node:os'

interface LocalMusic {
  title: string,
  ctime: string,
  size: string,
  path: string,
  artist?: string,
  artists?: string[],
  album?: string,
  metadata?: IAudioMetadata,
  key?: string,
  formatDuration?: string,
  duration?: number,
  img?: string
}

declare class FileSystemDirectoryHandle extends window.FileSystemHandle {

}

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      hideWindow: () => void,
      blurWindow: () => void,
      setMaximizeStatus: (status: boolean) => void,
      quitApp: () => void,
      getLocalMusic: (paths: string[]) => Promise<LocalMusic[]>,
      openDialog: (options?: OpenDialogOptions) => Promise<OpenDialogReturnValue>,
      getUserInfo: () => Promise<UserInfo<string>>,
      showItemInFolder: (fullPath: string) => void,
      trashItem: (path: string) => Promise<void>,
      getLocalMusicPath: () => Promise<string>,
      getLocalDownloadPath: () => Promise<string>,
    },
    windowStatus: {
      isMaximized: () => Promise<boolean>
    },
    showDirectoryPicker: (id?: any, mode?: 'read' | 'readwrite', startIn?: any) => Promise<FileSystemDirectoryHandle>
  }
}
