import {
  app, shell, BrowserWindow, ipcMain, Tray, Menu
} from 'electron'
import path from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import type { BrowserWindow as BrowserWindowType } from 'electron'
import { getNativeImagePath } from './utils'

let mainWindow: BrowserWindowType | null = null

function setThumbarButtons() {
  mainWindow?.setThumbarButtons([
    {
      tooltip: '上一首',
      icon: getNativeImagePath('skip-back-fill.png'),
      click() { console.log('button2 clicked.') }
    },
    {
      tooltip: '播放',
      icon: getNativeImagePath('play-fill.png'),
      click() { console.log('button1 clicked') }
    },
    {
      tooltip: '下一首',
      icon: getNativeImagePath('skip-forward-fill.png'),
      click() { console.log('button2 clicked.') }
    }
  ])
}

function watchMainWindow() {
  if (!mainWindow) return
  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
    setThumbarButtons()
  })

  mainWindow.on('show', () => {
    setThumbarButtons()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
}

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 740,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    titleBarStyle: 'hidden',
    // titleBarOverlay: {
    //   height: 10,
    //   color: '#409eff'
    // },
    ...(process.platform === 'linux' ? {} : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  watchMainWindow()

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  }
  else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

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
      label: '退出',
      type: 'normal',
      icon: getNativeImagePath('logout-circle-line.png')
    },
    {
      label: '设置',
      type: 'normal',
      icon: getNativeImagePath('settings-line.png')
    }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
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

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
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
