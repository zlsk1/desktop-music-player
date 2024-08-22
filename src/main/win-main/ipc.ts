import { ipcMain } from 'electron'
import type { BrowserWindow } from 'electron'

export const ipcMainWindow = (window: BrowserWindow) => {
  ipcMain.on('hide-window', () => window.hide())
  ipcMain.on('blur-window', () => window.blur())
  ipcMain.on('set-maximize', () => window.maximize())
  ipcMain.on('un-maximize', () => window.unmaximize())
  ipcMain.handle('get-maximize-status', () => {
    return window.isMaximized()
  })
}
