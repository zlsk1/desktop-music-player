import { useMemo, useState, useEffect } from 'react'
import {
  RiDownloadLine as DownLoad
} from '@remixicon/react'
import { useMusicPlay } from '@renderer/hooks'
import ColorThief from 'colorthief'
import { getLuminance } from '@renderer/utils'
import Detail from '../detail'

function Info(): JSX.Element {
  const { currentSong } = useMusicPlay()
  const [open, setOpen] = useState(false)
  const [linearBg, setLinearBg] = useState<string[]>([])

  function getColors(url: string | undefined) {
    if (!url) return
    const imgElement: HTMLImageElement | null = new Image()
    const colorThief = new ColorThief()

    if (url.startsWith('data:image/png;base64,')) imgElement.src = url
    else imgElement.src = `data:image/png;base64,${url}`

    imgElement.addEventListener('load', () => {
      if (!imgElement) return
      const colors = colorThief.getPalette(imgElement, 3)
      const bg = colors.sort((a, b) => getLuminance(b) - getLuminance(a)).map((color) => color.join(', '))
      setLinearBg(bg)
      console.log(bg)
    })
  }

  useEffect(() => getColors(currentSong?.img), [currentSong?.url])

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
    <>
      <div className="flex items-center flex-1 h-full px-6">
        {
          currentSong?.img
            ? (
              <img
                src={`data:image/png;base64,${currentSong.img}`}
                alt=""
                className="w-12 h-12 mr-2 rounded-full cursor-pointer"
                onClick={() => setOpen(true)}
              />
            )
            : (
              <div
                className="w-12 h-12 mr-2 bg-slate-500 rounded-full cursor-pointer"
                onClick={() => setOpen(true)}
              />
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
      <Detail visible={open} linearBg={linearBg} setVisible={setOpen} />
    </>
  )
}

export default Info
