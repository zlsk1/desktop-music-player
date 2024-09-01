import { ipcMain } from 'electron'
import fg from 'fast-glob'
import fs from 'fs'
import dayjs from 'dayjs'
import type {
  BrowserWindow, IpcMainInvokeEvent, App
} from 'electron'
import { store } from '../../store/instance'
import {
  getSongNameFromPath, formatBytes, getMusicMetadata, getMusicInfo
} from '../../../common/utils'
import type { LocalMusic } from '../../../common/types/global.d.ts'

export const fileEvents = (window: BrowserWindow, app: App) => {
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
    }) as Promise<LocalMusic>[]

    const result = await Promise.all(tasks)

    return result
  })
  ipcMain.handle('get-local-music-path', (event: IpcMainInvokeEvent, path: any) => app.getPath(path))
  ipcMain.handle('get-local-download-path', (event: IpcMainInvokeEvent, path: any) => app.getPath(path))
}
