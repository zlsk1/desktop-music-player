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

function Control(): JSX.Element {
  return (
    <div className="flex items-center justify-center">
      <i className="control-icon" title="喜欢"><Heart /></i>
      <i className="control-icon prev" title="上一首"><Previous /></i>
      <i className="control-icon flex items-center justify-center w-9 h-9 bg-sky-500 rounded-full" title="播放"><Play className="text-white" /></i>
      <i className="control-icon next" title="下一首"><Next /></i>
      <i className="control-icon" title="顺序播放"><OrderPlay /></i>
    </div>
  )
}

export default Control
