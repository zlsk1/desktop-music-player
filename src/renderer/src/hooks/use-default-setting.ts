import type { UserInfo } from 'node:os'
import { escapePath } from '../utils'
import type { Setting } from '../store'

export const useDefaultSetting = async (): Promise<Setting> => {
  const localMusicPath = escapePath(await window.api.getLocalMusicPath())
  const localDownloadPath = escapePath(await window.api.getLocalDownloadPath())
  return {
    localMusicDirectory: [localMusicPath, localDownloadPath, 'F:/CloudMusic'],
    localMusicDirectorySelected: [localMusicPath, localDownloadPath, 'F:/CloudMusic'],
    exitType: 0,
    systemUserInfo: {} as UserInfo<string>
  }
}
