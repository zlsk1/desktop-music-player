import { useState } from 'react'
import {
  RiFullscreenFill as Fullscreen,
  RiFullscreenExitFill as FullscreenExit
} from '@remixicon/react'

type Props = {
  size?: number
}

function Scale({ size = 18 }: Props): JSX.Element {
  const [isMaximized, setMaximize] = useState(false)

  const handleMaximize = async (status: boolean) => {
    window.api.setMaximizeStatus(status)
    const res = await window.windowStatus.isMaximized()
    setMaximize(res)
  }
  return isMaximized
    ? <i className="icon"><FullscreenExit size={size} onClick={() => handleMaximize(false)} /></i>
    : <i className="icon"><Fullscreen size={size} onClick={() => handleMaximize(true)} /></i>
}

export default Scale
