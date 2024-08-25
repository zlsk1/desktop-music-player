import { create } from 'zustand'
import { isNil, createSelector } from '../utils'

export interface DefaultSetting {
  localMusicPath: string[],
  /**
   * @description 退出应用的方式 0为最小化到托盘 1为直接退出
   */
  exitType: 0 | 1
}

export interface SettingStore {
  setting: DefaultSetting,
  updateSetting: (setting: DefaultSetting) => void,
}

export const defaultSetting: DefaultSetting = {
  localMusicPath: ['我的音乐', '下载', 'F:/CloudMusic'],
  exitType: 0
}

const updateSetting = (newSetting?: Partial<DefaultSetting>) => {
  const mergeSetting: DefaultSetting = {
    ...defaultSetting,
    ...newSetting
  }
  localStorage.setItem('setting', JSON.stringify(mergeSetting))
  return mergeSetting
}

const getSetting = () => {
  const setting = localStorage.getItem('setting')

  if (!isNil(setting)) {
    return JSON.parse(setting) as DefaultSetting
  }

  const defaultsetting = updateSetting()

  return defaultsetting
}

const useSettingStoreBase = create<SettingStore>((set) => ({
  setting: getSetting(),
  updateSetting: (setting: DefaultSetting) => set(() => ({ setting: updateSetting(setting) }))
}))

export const useSettingStore = createSelector(useSettingStoreBase)
