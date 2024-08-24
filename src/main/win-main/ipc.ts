import { ipcMain } from 'electron'
import fg from 'fast-glob'
import fs from 'fs'
import dayjs from 'dayjs'
import type { BrowserWindow, IpcMainInvokeEvent } from 'electron'
import { getSongNameFromPath, formatBytes } from '../../common/utils'

export const ipcMainWindow = (window: BrowserWindow) => {
  ipcMain.on('hide-window', () => window.hide())
  ipcMain.on('blur-window', () => window.blur())
  ipcMain.on('set-maximize', () => window.maximize())
  ipcMain.on('un-maximize', () => window.unmaximize())
  ipcMain.handle('get-maximize-status', () => {
    return window.isMaximized()
  })
  ipcMain.handle('get-local-music', (event: IpcMainInvokeEvent, filepaths: string[]) => {
    const localMucisPaths = filepaths.map((filepath) => {
      return fg.sync('**/*.mp3', {
        cwd: filepath,
        absolute: true,
        onlyFiles: true
      })
    })

    const flatPaths = localMucisPaths.flat()
    const result: any[] = []

    flatPaths.forEach((flatpath, key) => {
      const status = fs.statSync(flatpath)
      result.push({
        name: getSongNameFromPath(flatpath),
        size: formatBytes(status.size),
        ctime: dayjs(status.birthtime).format('YYYY-MM-DD'),
        path: decodeURI(flatpath),
        key
      })
    })

    return result
  })
}
