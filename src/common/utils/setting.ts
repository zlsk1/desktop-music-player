import { isNil } from './types'

export type DefaultSetting = {
  localMusicPath: string[]
}

export const defaultSetting = {
  localMusicPath: ['我的音乐', '下载', 'F:/CloudMusic']
}

export const handleSetting = (newSetting: Partial<DefaultSetting>) => {
  const mergeSetting = {
    ...defaultSetting,
    ...newSetting
  }
  localStorage.setItem('setting', JSON.stringify(mergeSetting))
}

export const getSetting = () => {
  const setting = localStorage.getItem('setting')

  if (!isNil(setting)) {
    return JSON.parse(setting)
  }
  return undefined
}
