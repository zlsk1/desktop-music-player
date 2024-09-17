import { useEffect, useState, useRef } from 'react'
import {
  RiVolumeDownLine as Volume,
  RiVolumeMuteLine as VolumeMute,
  RiMenuUnfold4Line as Menu,
  RiRhythmFill as Rhythm
} from '@remixicon/react'
import { Popover, Slider } from 'antd'
import type { GetRef } from 'antd'
import { usePlaySetting } from '@renderer/hooks'
import { useMusicPlayStore } from '@renderer/store'
import AsideQueue from '../aside-queue'

type SliderRef = GetRef<typeof Slider>

type Props = {
  className?: string
}

function Other({ className = '' }: Props): JSX.Element {
  const [audioVolume, setVolume] = useState(0)
  const [volumeMute, setVolumeMute] = useState(false)
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const { setPlaySetting, getPlaySetting } = usePlaySetting()
  const { audio } = useMusicPlayStore()
  const sliderRef = useRef<SliderRef>(null)
  const iconSize: number = 24

  useEffect(
    () => {
      getPlaySetting().then(({ volume }) => {
        setVolume(volume)
        if (volume === 0) setVolumeMute(true)
      })
    },
    []
  )

  const handleVolume = (val: number) => {
    if (!audio) return
    const formatVal = Number((val / 100).toFixed(2))
    setVolume(formatVal)
    if (val === 0) setVolumeMute(true)
    else if (volumeMute) {
      setVolumeMute(false)
    }
    audio.volume = formatVal
  }

  const onChangeComplete = (val: number) => {
    setPlaySetting({ volume: Number((val / 100).toFixed(2)) })
    sliderRef.current?.blur()
  }

  const handleVolumeMute = () => {
    if (volumeMute) {
      setVolume(0.5)
      setVolumeMute(false)
      setPlaySetting({ volume: 0.5 })
      if (audio) audio.volume = 0.5
    }
    else {
      setVolume(0)
      setVolumeMute(true)
      setPlaySetting({ volume: 0 })
      if (audio) audio.volume = 0
    }
  }

  const volumeBar = (
    <div className="text-center">
      <Slider
        ref={sliderRef}
        className="h-24"
        vertical
        tooltip={{ open: false }}
        value={audioVolume * 100}
        onChange={handleVolume}
        onChangeComplete={onChangeComplete}
      />
      <span className="text-xs">{`${Math.ceil(audioVolume * 100)}%`}</span>
    </div>
  )

  return (
    <div className={`${className} flex justify-end`}>
      <i className="icon"><Rhythm size={iconSize} /></i>
      <Popover content={volumeBar} overlayInnerStyle={{ padding: '10px 5px' }}>
        <i className="icon">
          {
            volumeMute
              ? <VolumeMute size={iconSize} onClick={handleVolumeMute} />
              : <Volume size={iconSize} onClick={handleVolumeMute} />
          }
        </i>
      </Popover>
      <i className="icon"><Menu size={iconSize} onClick={() => setIsOpenDrawer(true)} /></i>
      <AsideQueue visible={isOpenDrawer} setVisible={setIsOpenDrawer} />
    </div>
  )
}

export default Other
