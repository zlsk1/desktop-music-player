import {
  RiVolumeDownLine as Volume,
  RiMenuUnfold4Line as Menu,
  RiRhythmFill as Rhythm
} from '@remixicon/react'
import { Popover, Slider } from 'antd'
import { useState } from 'react'

function Other(): JSX.Element {
  const [volumeVal, setVolumeVal] = useState(0)
  const iconSize: number = 24

  const handleVolume = (val: number) => {
    setVolumeVal(val)
  }
  const volumeBar = (
    <div className="text-center">
      <Slider className="h-24" vertical tooltip={{ open: false }} value={volumeVal} onChange={handleVolume} />
      <span className="text-xs">{`${volumeVal}%`}</span>
    </div>
  )

  return (
    <div className="flex justify-end flex-1 px-4">
      <i className="icon"><Rhythm size={iconSize} /></i>
      <Popover content={volumeBar} overlayInnerStyle={{ padding: '10px 5px' }}>
        <i className="icon"><Volume size={iconSize} /></i>
      </Popover>
      <i className="icon"><Menu size={iconSize} /></i>
    </div>
  )
}

export default Other
