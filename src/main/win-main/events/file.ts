import { ipcMain } from 'electron'
import fg from 'fast-glob'
import dayjs from 'dayjs'
import type {
  BrowserWindow, IpcMainInvokeEvent, App
} from 'electron'
import type { Entry } from 'fast-glob'
import {
  getSongNameFromPath, formatBytes, getMusicMetadata, getMusicInfo
} from '../../../common/utils'
import type { LocalMusic } from '../../../common/types/global'

const getLocalMusic = (
  event: IpcMainInvokeEvent,
  filepaths: string[]
): Promise<LocalMusic[]> => {
  return new Promise((resolve, reject) => {
    const globs = filepaths.map((filepath) => {
      return fg('**/*.{mp3, webm, ogg}', {
        cwd: filepath,
        absolute: true,
        onlyFiles: true,
        deep: 1,
        stats: true
      })
    })

    Promise.all(globs)
      .then((globPaths) => {
        const localPaths: Omit<Entry, 'dirent'>[] = globPaths.flat().map((item) => ({
          name: item.name,
          path: item.path,
          stats: item.stats
        }))

        const tasks = localPaths.map((localPath) => {
          return getMusicMetadata(localPath.path).then((metadata) => {
            const {
              title, artist, artists, album, formatDuration, duration, img
            } = getMusicInfo(metadata)

            return {
              title: title || getSongNameFromPath(localPath.path),
              size: formatBytes(localPath.stats?.size || 0),
              ctime: dayjs(localPath.stats?.birthtime).format('YYYY-MM-DD'),
              path: decodeURIComponent(localPath.path),
              key: localPath.stats?.ino,
              metadata,
              artist,
              artists,
              album,
              img,
              formatDuration,
              duration
            }
          })
        }) as Promise<LocalMusic>[]

        Promise.all(tasks)
          .then((taskResult) => resolve(taskResult))
          .catch((err) => reject(err))
      })
  })
}

export const fileEvents = (window: BrowserWindow, app: App) => {
  ipcMain.handle('get-local-music', getLocalMusic)
  ipcMain.handle('get-local-music-path', (event: IpcMainInvokeEvent, path: any) => app.getPath(path))
  ipcMain.handle('get-local-download-path', (event: IpcMainInvokeEvent, path: any) => app.getPath(path))
}
