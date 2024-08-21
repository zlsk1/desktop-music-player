import {
  RiNeteaseCloudMusicFill as NeteaseCloudMusic,
  RiCloseFill as Close,
  RiFullscreenFill as Fullscreen,
  RiFullscreenExitFill as FullscreenExit,
  RiSubtractFill as Subtract,
  RiSettings4Line as Setting
} from '@remixicon/react'
import { Divider } from 'antd'

function LayoutHeader(): JSX.Element {
  const iconSize: number = 18

  return (
    <header className="layout-header px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <NeteaseCloudMusic className="mr-2" color="#fc3b5b" size={32} />
          <span className="select-none">my-netease-cloud-music</span>
        </div>
        <div className="layout-header-icons flex items-center">
          <i><Setting size={iconSize} /></i>
          <Divider type="vertical" style={{ borderInlineStart: '1px solid #ccc' }} />
          <i><Fullscreen size={iconSize} /></i>
          <i><FullscreenExit size={iconSize} /></i>
          <i><Subtract size={iconSize} /></i>
          <i><Close size={iconSize} /></i>
        </div>
      </div>
    </header>
  )
}

export default LayoutHeader
