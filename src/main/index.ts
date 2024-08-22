import {
  app, BrowserWindow, Tray, Menu
} from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import type { BrowserWindow as BrowserWindowType } from 'electron'
import { getNativeImagePath } from './utils'
import { createMainWindow } from './win-main/index'

let mainWindow: BrowserWindowType | null = null

function setTasks() {
  app.setUserTasks([
    {
      program: process.execPath,
      arguments: '--new-window',
      iconPath: process.execPath,
      iconIndex: 0,
      title: 'New Window',
      description: 'Create a new window'
    }
  ])
}

function setTray() {
  const trayIcon = getNativeImagePath('play-fill.png')
  const tray = new Tray(trayIcon)

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '设置',
      type: 'normal',
      icon: getNativeImagePath('settings-line.png')
    },
    {
      label: '退出',
      type: 'normal',
      icon: getNativeImagePath('logout-circle-line.png'),
      click: () => app.quit()
    }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
  tray.addListener('double-click', () => {
    if (mainWindow) {
      if (!mainWindow.isVisible()) mainWindow.show()
      else mainWindow.hide()
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  setTasks()
  setTray()

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  mainWindow = createMainWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) mainWindow = createMainWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
