import { useMemo } from 'react'
import {
  RiPlayFill as Play,
  RiPauseFill as Pause,
  RiSkipForwardFill as Next,
  RiSkipBackFill as Previous,
  RiRepeatOneLine as RepeatOne,
  RiOrderPlayLine as OrderPlay,
  RiShuffleLine as Shuffle,
  RiHeartLine as Heart
} from '@remixicon/react'
import { useMusicPlayStore } from '@renderer/store/music-play'

function Control(): JSX.Element {
  const { paused, play, pause } = useMusicPlayStore()
  const currentPause = useMemo(() => paused, [pause])

  return (
    <div className="flex items-center justify-center">
      <i className="control-icon" title="喜欢"><Heart /></i>
      <i className="control-icon prev" title="上一首"><Previous /></i>
      {
        paused
          ? (
            <i className="control-icon flex items-center justify-center w-9 h-9 bg-sky-500 rounded-full" title="播放">
              <Play className="text-white" onClick={play} />
            </i>
          )
          : (
            <i className="control-icon flex items-center justify-center w-9 h-9 bg-sky-500 rounded-full" title="播放">
              <Pause className="text-white" onClick={pause} />
            </i>
          )
      }
      <i className="control-icon next" title="下一首"><Next /></i>
      <i className="control-icon" title="顺序播放"><OrderPlay /></i>
    </div>
  )
}

export default Control
