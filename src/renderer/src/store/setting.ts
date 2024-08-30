import { create } from 'zustand'
import localforage from 'localforage'
import type { UserInfo } from 'node:os'
import { isNil, createSelector } from '../utils'
import { useDefaultSetting } from '../hooks'

export interface Setting {
  /**
   * @description 本地音乐目录
   */
  localMusicDirectory: string[],
  /**
   * @description 已选择本地音乐目录
   */
  localMusicDirectorySelected: string[],
  /**
   * @description 退出应用的方式 0为最小化到托盘 1为直接退出
   */
  exitType: 0 | 1,
  /**
   * @description 退出应用时是否提示
   */
  appearingExitTip: boolean,
  /**
   * @description 系统级用户的信息
   */
  systemUserInfo: UserInfo<string>
}

export interface SettingStore {
  setting: Setting,
  updateSetting: (setting: Setting) => void,
}

export const defaultSetting = await useDefaultSetting()

const updateSetting = (setting: Setting) => {
  localforage.setItem('setting', setting)
  return setting
}

let settings: Setting | string | null = null

const getSetting = async () => {
  settings = await localforage.getItem<string | null>('setting')

  if (!isNil(settings)) {
    return settings
  }

  settings = updateSetting(defaultSetting)

  return settings
}

await getSetting()

const useSettingStoreBase = create<SettingStore>((set) => ({
  setting: settings as Setting,
  updateSetting: (setting: Setting) => set(() => ({ setting: updateSetting(setting) }))
}))

export const useSettingStore = createSelector(useSettingStoreBase)
