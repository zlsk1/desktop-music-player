import { ipcMain, dialog, shell } from 'electron'
import os from 'os'
import type {
  BrowserWindow, App, IpcMainInvokeEvent, OpenDialogOptions
} from 'electron'
import { normalizePath } from '../../utils'

export const systemEvents = (window: BrowserWindow, app: App) => {
  ipcMain.on('show-item-in-folder', (event: IpcMainInvokeEvent, fullPath: string) => shell.showItemInFolder(normalizePath(fullPath)))
  ipcMain.handle('open-dialog', async (event: IpcMainInvokeEvent, options?: OpenDialogOptions) => {
    const res = await dialog.showOpenDialog({ ...options })
    return res
  })
  ipcMain.handle('get-user-info', () => os.userInfo())
  ipcMain.handle('trash-item', async (event: IpcMainInvokeEvent, path: string) => {
    const result = await shell.trashItem(normalizePath(path))
    return result
  })
}
