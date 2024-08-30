import { useEffect } from 'react'
import { useMusicPlay, usePlaySetting } from '@renderer/hooks'
import { useMusicPlayStore } from '@renderer/store'
import Info from './info'
import Bar from './bar'
import Other from './other'
import '@renderer/styles/player.scss'

function Player(): JSX.Element {
  const {
    audio, changing, createAudio, init
  } = useMusicPlayStore()
  const { currentSong, ended, timeupdate } = useMusicPlay()
  const { getPlaySetting } = usePlaySetting()

  useEffect(
    () => {
      if (audio) return
      const Audio = new window.Audio()
      Audio.controls = false
      Audio.preload = 'auto'
      Audio.crossOrigin = 'anonymous'

      getPlaySetting().then(({ volume, autoplay, index }) => {
        Audio.volume = volume
        Audio.autoplay = autoplay
        createAudio(Audio)
        init(index)
      })
    },
    []
  )

  useEffect(
    () => {
      ended()
    },
    [audio]
  )

  useEffect(
    () => {
      timeupdate()
    },
    [audio, changing]
  )

  useEffect(
    () => {
      if (!audio) return
      audio.src = currentSong.url
    },
    [currentSong]
  )

  return (
    <div className="player flex items-center justify-between w-full shadow shadow-gray-300">
      <Info />
      <Bar />
      <Other />
    </div>
  )
}

export default Player
