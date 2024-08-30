import { useMemo } from 'react'
import { useMusicPlayStore } from '@renderer/store/music-play'
import { usePlaySetting } from './use-play-setting'

export const useMusicPlay = () => {
  const {
    audio, songQueue, currentIndex, changing,
    setIndex, setCurrentPercent
  } = useMusicPlayStore()
  const { setPlaySetting, getPlaySetting } = usePlaySetting()

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
    setPlaySetting({ index: idx })
  }

  const next = () => {
    getPlaySetting()
      .then(({ mode }) => {
        if (mode === 1) {
          const idx = Math.round(Math.random() * (songQueue.length - 1))
          console.log(idx)

          updateIndex(idx)
          return
        }
        updateIndex(currentIndex)
        play()
      })
  }

  const prev = () => {
    getPlaySetting()
      .then(({ mode }) => {
        if (mode === 1) {
          const idx = Math.round(Math.random() * (songQueue.length - 1))
          updateIndex(idx)
          return
        }
        updateIndex(currentIndex, 'prev')
        play()
      })
  }

  const ended = () => {
    if (!audio) return
    audio.onended = () => {
      getPlaySetting()
        .then(({ mode }) => {
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

  return {
    currentSong,
    play,
    pause,
    next,
    prev,
    ended,
    timeupdate
  }
}
