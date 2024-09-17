import { useMemo } from 'react'
import { useMusicPlayStore } from '@renderer/store'
import { formatDuration } from '@/common/utils'

type Props = {
  type: 'start' | 'end'
}

function ProgressTime({ type = 'start' }: Props): JSX.Element {
  const {
    audio, currentPercent
  } = useMusicPlayStore()

  const currentTime = useMemo(
    () => {
      if (!audio) return
      return (currentPercent / 100) * audio.duration
    },
    [currentPercent, audio?.duration]
  )

  return (
    type === 'start'
      ? <span className="text-xs text-gray-400">{formatDuration(currentTime)}</span>
      : <span className="text-xs text-gray-400">{formatDuration(audio?.duration)}</span>
  )
}

export default ProgressTime
