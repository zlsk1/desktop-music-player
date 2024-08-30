import { ipcMain, dialog, shell } from 'electron'
import fg from 'fast-glob'
import fs from 'fs'
import os from 'os'
import dayjs from 'dayjs'
import type {
  BrowserWindow, IpcMainInvokeEvent, OpenDialogOptions, App
} from 'electron'
import type { LocalMusic } from '../../common/types/global'
import {
  getSongNameFromPath, formatBytes, getMusicMetadata, getMusicInfo
} from '../../common/utils'
import { normalizePath } from '../utils'

export const ipcMainWindow = (window: BrowserWindow, app: App) => {
  ipcMain.on('hide-window', () => window.hide())
  ipcMain.on('blur-window', () => window.blur())
  ipcMain.on('set-maximize', () => window.maximize())
  ipcMain.on('un-maximize', () => window.unmaximize())
  ipcMain.handle('get-maximize-status', () => window.isMaximized())
  ipcMain.handle('get-local-music', async (event: IpcMainInvokeEvent, filepaths: string[]): Promise<LocalMusic[]> => {
    const localMucisPaths = filepaths.map((filepath) => {
      return fg.sync('**/*.{mp3, mp4, webm, ogg}', {
        cwd: filepath,
        absolute: true,
        onlyFiles: true
      })
    })

    const flatPaths = localMucisPaths.flat()

    const tasks = flatPaths.map(async (flatPath) => {
      const status = await fs.promises.stat(flatPath)
      const metadata = await getMusicMetadata(flatPath)
      const {
        title, artist, artists, album, formatDuration, duration, img
      } = getMusicInfo(metadata)

      return {
        title: title || getSongNameFromPath(flatPath),
        size: formatBytes(status.size),
        ctime: dayjs(status.birthtime).format('YYYY-MM-DD'),
        path: decodeURIComponent(flatPath),
        key: decodeURIComponent(flatPath),
        metadata,
        artist,
        artists,
        album,
        img,
        formatDuration,
        duration
      }
    })

    const result = await Promise.all(tasks)

    return result
  })
  ipcMain.handle('open-dialog', async (event: IpcMainInvokeEvent, options?: OpenDialogOptions) => {
    const res = await dialog.showOpenDialog({ ...options })
    return res
  })
  ipcMain.handle('get-user-info', () => os.userInfo())
  ipcMain.on('show-item-in-folder', (event: IpcMainInvokeEvent, fullPath: string) => shell.showItemInFolder(normalizePath(fullPath)))
  ipcMain.handle('trash-item', async (event: IpcMainInvokeEvent, path: string) => {
    const result = await shell.trashItem(normalizePath(path))
    return result
  })
  ipcMain.handle('get-local-music-path', (event: IpcMainInvokeEvent, path: any) => app.getPath(path))
  ipcMain.handle('get-local-download-path', (event: IpcMainInvokeEvent, path: any) => app.getPath(path))
}
