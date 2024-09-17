import { useEffect } from 'react'
import { useMusicPlay, usePlaySetting } from '@renderer/hooks'
import { useMusicPlayStore } from '@renderer/store'
import Info from './info'
import Bar from './bar'
import Other from './other'
import './index.scss'

function Player(): JSX.Element {
  const {
    audio, changing, createAudio, init
  } = useMusicPlayStore()
  const {
    currentSong, ended, timeupdate, loadedmetadata
  } = useMusicPlay()
  const { getPlaySetting, setPlaySetting } = usePlaySetting()

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
    <div className="player flex items-center w-full px-6 shadow shadow-gray-300">
      <Info className="flex-1" />
      <Bar />
      <Other className="flex-1" />
    </div>
  )
}

export default Player
