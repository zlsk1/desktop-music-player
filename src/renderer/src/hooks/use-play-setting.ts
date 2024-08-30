import localforage from 'localforage'

export type PlaySetting = {
  /**
   * @description 当前播放歌曲的下标
   */
  index: number,
  /**
   * @description 歌曲音量
   */
  volume: number,
  /**
   * @description 播放模式 顺序、随机、单曲循环
   */
  mode: 0 | 1 | 2,
  /**
   * @description 是否自动播放
   */
  autoplay: boolean
}

export const defaultPlaySetting: PlaySetting = {
  index: 0,
  volume: 0.5,
  mode: 0,
  autoplay: false
}

export const usePlaySetting = () => {
  const setPlaySetting = async (setting: Partial<PlaySetting>) => {
    const lastSetting = await localforage.getItem<PlaySetting>('setting-play')
    if (!lastSetting) await localforage.setItem<PlaySetting>('setting-play', { ...defaultPlaySetting, ...setting })
    else await localforage.setItem<PlaySetting>('setting-play', { ...lastSetting, ...setting })
  }
  const getPlaySetting = async () => {
    const setting = await localforage.getItem<PlaySetting>('setting-play')
    if (!setting) {
      await setPlaySetting(defaultPlaySetting)
      return defaultPlaySetting
    }
    return setting
  }

  return {
    setPlaySetting,
    getPlaySetting
  }
}
