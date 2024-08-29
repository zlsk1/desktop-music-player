import { useEffect } from 'react'
import Info from './info'
import Bar from './bar'
import Other from './other'
import { useMusicPlayStore } from '../../store'
import '@renderer/styles/player.scss'

function Player(): JSX.Element {
  const musicPlayStore = useMusicPlayStore()
  useEffect(
    () => {
      const audio = new window.Audio() as HTMLAudioElement
      audio.controls = false
      audio.autoplay = true
      audio.preload = 'auto'
      audio.crossOrigin = 'anonymous'
      musicPlayStore.createAudio(audio)
    },
    []
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
