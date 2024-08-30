import { useMemo } from 'react'
import {
  RiDownloadLine as DownLoad
} from '@remixicon/react'
import { useMusicPlay } from '@renderer/hooks'

function Info(): JSX.Element {
  const { currentSong } = useMusicPlay()

  const artist = useMemo(
    () => {
      return currentSong?.artists
        ? currentSong?.artists.map((v) => v).join('/')
        : currentSong?.artist
          ? currentSong?.artist
          : '未知'
    },
    [currentSong?.artists, currentSong?.artist]
  )

  return (
    <div className="flex items-center flex-1 h-full px-6">
      {
        currentSong?.img
          ? (
            <img src={`data:image/png;base64,${currentSong.img}`} alt="" className="w-12 h-12 mr-2 rounded-full" />
          )
          : (
            <div className="w-12 h-12 mr-2 bg-slate-500 rounded-full" />
          )
      }
      <div>
        <div className="flex items-center">
          <span
            title={currentSong?.name || '暂无'}
            className="
          inline-block max-w-24 text-ellipsis text-nowrap text-sm text-zinc-800 overflow-hidden cursor-pointer select-none"
          >
            {currentSong?.name || '暂无'}
          </span>
          <span className="mx-1 select-none">-</span>
          <span
            title={artist}
            className="
          inline-block max-w-28 text-xs text-ellipsis text-nowrap text-gray-400 overflow-hidden cursor-pointer select-none"
          >
            {artist}
          </span>
        </div>
        <div>
          <i className="icon"><DownLoad size={18} /></i>
        </div>
      </div>
    </div>
  )
}

export default Info
