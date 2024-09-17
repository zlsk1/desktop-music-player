import { useEffect, useState, useMemo } from 'react'
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
import { Button } from 'antd'
import { useMusicPlayStore } from '@renderer/store/music-play'
import { useMusicPlay, usePlaySetting } from '@renderer/hooks'
import '../index.scss'

function Control(): JSX.Element {
  const { audio } = useMusicPlayStore()
  const {
    play, pause, prev, next
  } = useMusicPlay()
  const { getPlaySetting, setPlaySetting } = usePlaySetting()
  const [playmode, setPlaymode] = useState(0)

  useEffect(
    () => {
      getPlaySetting().then(({ mode }) => setPlaymode(mode))
    },
    []
  )

  const switchPlayMode = () => {
    if (playmode < 2) {
      setPlaymode(playmode + 1)
      setPlaySetting({ mode: playmode + 1 as 0 | 2 | 1 | undefined })
    }
    else {
      setPlaymode(0)
      setPlaySetting({ mode: 0 })
    }
  }

  const currentPlayModeIcon = useMemo(
    () => {
      switch (playmode) {
        case 0:
          return <i className="icon" title="顺序播放"><OrderPlay onClick={switchPlayMode} /></i>
        case 1:
          return (
            <i className="icon" title="随机播放">
              <Shuffle onClick={switchPlayMode} />
              {' '}
            </i>
          )
        case 2:
          return (
            <i className="icon" title="单曲循环">
              <RepeatOne onClick={switchPlayMode} />
              {' '}
            </i>
          )
        default: <i className="icon" title="顺序播放"><OrderPlay onClick={switchPlayMode} /></i>
      }
    },
    [playmode]
  )

  return (
    <div className="flex items-center justify-center">
      <i className="icon" title="喜欢"><Heart /></i>
      <i className="icon prev" title="上一首"><Previous onClick={prev} /></i>
      {
        !audio || audio?.paused
          ? (
            <Button title="播放" className="mx-1" type="primary" shape="circle" icon={<Play className="text-white" />} onClick={play} />
          )
          : (
            <Button title="暂停" className="mx-1" type="primary" shape="circle" icon={<Pause className="text-white" />} onClick={pause} />
          )
      }
      <i className="icon next" title="下一首"><Next onClick={next} /></i>
      {currentPlayModeIcon}
    </div>
  )
}

export default Control
