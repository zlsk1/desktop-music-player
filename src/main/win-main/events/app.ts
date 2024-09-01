import { ipcMain } from 'electron'
import type {
  BrowserWindow, App
} from 'electron'

export const appEvents = (window: BrowserWindow, app: App) => {
  ipcMain.on('hide-window', () => window.hide())
  ipcMain.on('blur-window', () => window.blur())
  ipcMain.on('set-maximize', () => window.maximize())
  ipcMain.on('un-maximize', () => window.unmaximize())
  ipcMain.on('quit-app', () => app.quit())
  ipcMain.handle('get-maximize-status', () => window.isMaximized())
}
