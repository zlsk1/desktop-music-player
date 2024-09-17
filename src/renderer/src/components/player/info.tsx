import { useMemo, useState, useEffect } from 'react'
import {
  RiDownloadLine as DownLoad,
  RiArrowUpDoubleLine as ArrowUpDouble
} from '@remixicon/react'
import { useMusicPlay } from '@renderer/hooks'
import ColorThief from 'colorthief'
import { getLuminance } from '@renderer/utils'
import FullPlayer from '../full-player'
import DefaultSongImg from '../default-song-img'

function Info({ className }: {className: string | undefined}): JSX.Element {
  const { currentSong } = useMusicPlay()
  const [open, setOpen] = useState(false)
  const [linearBg, setLinearBg] = useState<string[]>([])
  const [isHover, setIsHover] = useState(false)

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

  const onMouseEnter = () => {
    setIsHover(true)
  }

  const onMouseLeave = () => {
    setIsHover(false)
  }

  return (
    <>
      <div className={`${className} flex items-center`}>
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {
            currentSong?.img
              ? (
                <div
                  style={{ background: `url(data:image/png;base64,${currentSong?.img}) center/100% no-repeat` }}
                  className="relative w-12 h-12 mr-2 rounded-full cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  <div className={`${isHover ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                    <div className="absolute inset-0 bg-gray-800 opacity-30 rounded-full" />
                    <ArrowUpDouble className="absolute top-1/2 left-1/2 text-white -translate-x-1/2 -translate-y-1/2" size={28} />
                  </div>
                </div>
              )
              : (
                <DefaultSongImg
                  className="rounded-full cursor-pointer"
                  content={(
                    <div className={`${isHover ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                      <div className="absolute inset-0 bg-gray-800 opacity-30 rounded-full" />
                      <ArrowUpDouble className="absolute top-1/2 left-1/2 text-white -translate-x-1/2 -translate-y-1/2" size={28} />
                    </div>
                  )}
                  onClick={() => setOpen(true)}
                />
              )
          }
        </div>
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
          inline-block max-w-24 text-xs text-ellipsis text-nowrap text-gray-400 overflow-hidden cursor-pointer select-none"
            >
              {artist}
            </span>
          </div>
          <div>
            <i className="icon"><DownLoad size={18} /></i>
          </div>
        </div>
      </div>
      <FullPlayer visible={open} linearBg={linearBg} img={currentSong?.img} setVisible={setOpen} />
    </>
  )
}

export default Info
