import { create } from 'zustand'
import localforage from 'localforage'
import { isNil, createSelector } from '../utils'

export interface Setting {
  localMusicDirectory: string[],
  localMusicDirectorySelected: string[],
  /**
   * @description 退出应用的方式 0为最小化到托盘 1为直接退出
   */
  exitType: 0 | 1
}

export interface SettingStore {
  setting: Setting,
  updateSetting: (setting: Setting) => void,
}

export const defaultSetting: Setting = {
  localMusicDirectory: ['我的音乐', '下载', 'F:/CloudMusic'],
  localMusicDirectorySelected: ['我的音乐', '下载', 'F:/CloudMusic'],
  exitType: 0
}

const updateSetting = (setting: Setting) => {
  localforage.setItem('setting', setting)
  return setting
}

let initialSettings: Setting | string | null = null

const getSetting = async () => {
  initialSettings = await localforage.getItem<string | null>('setting')

  if (!isNil(initialSettings)) {
    return initialSettings
  }

  initialSettings = updateSetting(defaultSetting)

  return initialSettings
}

await getSetting()

const useSettingStoreBase = create<SettingStore>((set) => ({
  setting: initialSettings as Setting,
  updateSetting: (setting: Setting) => set(() => ({ setting: updateSetting(setting) }))
}))

export const useSettingStore = createSelector(useSettingStoreBase)
