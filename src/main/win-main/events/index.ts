import type {
  BrowserWindow, App
} from 'electron'
import { appEvents } from './app'
import { fileEvents } from './file'
import { systemEvents } from './system'

export const mainWindowEvents = (window: BrowserWindow, app: App) => {
  appEvents(window, app)
  fileEvents(window, app)
  systemEvents(window, app)
}
