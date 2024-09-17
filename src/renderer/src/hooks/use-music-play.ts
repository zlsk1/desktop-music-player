import { useMemo } from 'react'
import { useMusicPlayStore } from '@renderer/store/music-play'
import { usePlaySetting } from './use-play-setting'

export const useMusicPlay = () => {
  const {
    audio, songQueue, currentIndex, changing,
    setIndex, setCurrentPercent
  } = useMusicPlayStore()
  const { getPlaySetting } = usePlaySetting()

  const currentSong = useMemo(() => songQueue[currentIndex], [songQueue, currentIndex])

  const play = () => {
    if (!audio) return
    audio.play()
  }

  const pause = () => {
    if (!audio) return
    audio.pause()
  }

  const updateIndex = (idx: number, type: 'next' | 'prev' = 'next') => {
    if (type === 'prev') {
      if (currentIndex < 1) idx = songQueue.length - 1
      else idx -= 1
    }
    else if (type === 'next') {
      if (currentIndex < songQueue.length - 1) idx += 1
      else idx = 0
    }

    setIndex(idx)
  }

  const next = () => {
    getPlaySetting()
      .then(({ mode }) => {
        audio!.autoplay = true // 切换时自动播放 结束后重置
        if (mode === 1) {
          const idx = Math.round(Math.random() * (songQueue.length - 1))
          updateIndex(idx)
          return
        }
        updateIndex(currentIndex)
      })
  }

  const prev = () => {
    getPlaySetting()
      .then(({ mode }) => {
        audio!.autoplay = true
        if (mode === 1) {
          const idx = Math.round(Math.random() * (songQueue.length - 1))
          updateIndex(idx)
          return
        }
        updateIndex(currentIndex, 'prev')
      })
  }

  const ended = () => {
    if (!audio) return
    audio.onended = () => {
      getPlaySetting()
        .then(({ mode, autoplay }) => {
          audio!.autoplay = autoplay

          if (mode === 2) {
            audio.loop = true
            return
          }
          audio.loop = false
          updateIndex(currentIndex)
        })
    }
  }

  const timeupdate = () => {
    if (!audio) return
    audio.ontimeupdate = () => {
      if (changing) return

      setCurrentPercent((audio.currentTime / audio.duration) * 100)
    }
  }

  const onPlay = (fn: Function) => {
    if (!audio) return
    audio.onplay = () => {
      fn()
    }
  }

  const onPause = (fn: Function) => {
    if (!audio) return
    audio.onpause = () => {
      fn()
    }
  }

  const loadedmetadata = (fn: Function) => {
    if (!audio) return
    audio.onloadeddata = () => {
      fn()
    }
  }

  return {
    currentSong,
    play,
    pause,
    next,
    prev,
    ended,
    timeupdate,
    onPlay,
    onPause,
    loadedmetadata
  }
}
