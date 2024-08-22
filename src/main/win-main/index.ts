import {
  shell, BrowserWindow
} from 'electron'
import path from 'path'
import { is } from '@electron-toolkit/utils'
import type { BrowserWindow as BrowserWindowType } from 'electron'
import { getNativeImagePath } from '../utils'
import { ipcMainWindow } from './ipc'

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

export function createMainWindow(): BrowserWindowType {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 740,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    titleBarStyle: 'hidden',
    ...(process.platform === 'linux' ? {} : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  watchMainWindow()
  ipcMainWindow(mainWindow)

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  }
  else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }

  return mainWindow
}
