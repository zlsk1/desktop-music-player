import { useMemo } from 'react'
import { Slider } from 'antd'
import { useMusicPlayStore } from '@renderer/store'
import Control from './control'
import { formatDuration } from '@/common/utils'

function Bar(): JSX.Element {
  const {
    audio, currentPercent, setCurrentPercent, setChanging
  } = useMusicPlayStore()

  const currentTime = useMemo(
    () => {
      if (!audio) return
      return (currentPercent / 100) * audio.duration
    },
    [currentPercent, audio?.duration]
  )

  const onChange = (val: number) => {
    if (!audio) return
    setChanging(true)
    setCurrentPercent(val)
  }

  const onChangeComplete = (val: number) => {
    if (!audio) return
    setChanging(false)
    audio.currentTime = (val / 100) * audio.duration
  }

  return (
    <div className="flex-1 h-full py-3">
      <Control />
      <div className="flex items-center justify-center">
        <span className="text-xs text-gray-400">{formatDuration(currentTime)}</span>
        <Slider
          tooltip={{ open: false }}
          value={currentPercent}
          className="w-72 my-2 mx-4"
          onChange={onChange}
          onChangeComplete={onChangeComplete}
        />
        <span className="text-xs text-gray-400">{formatDuration(audio?.duration)}</span>
      </div>
    </div>
  )
}

export default Bar
