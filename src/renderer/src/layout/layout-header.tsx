import {
  RiNeteaseCloudMusicFill as NeteaseCloudMusic,
  RiCloseFill as Close,
  RiFullscreenFill as Fullscreen,
  RiFullscreenExitFill as FullscreenExit,
  RiSubtractFill as Subtract,
  RiSettings4Line as Setting
} from '@remixicon/react'
import { Divider, Modal, Checkbox } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function LayoutHeader(): JSX.Element {
  const [isMaximized, setMaximize] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [isTray, setIsTray] = useState(true)

  const iconSize: number = 18
  const textAlign: React.CSSProperties = { textAlign: 'center' }

  const closeWindow = () => {
    setOpen(true)
    // window.api.hideWindow()
  }

  const blurWindow = () => {
    window.api.hideWindow()
  }

  const handleMaximize = async (status: boolean) => {
    window.api.setMaximizeStatus(status)
    const res = await window.windowStatus.isMaximized()
    setMaximize(res)
  }

  const handleOk = () => {
    setOpen(false)
    setTimeout(() => window.api.hideWindow(), 200)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <>
      <header className="layout-header sticky top-0 right-0 px-4 bg-white z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <NeteaseCloudMusic className="mr-2" color="#fc3b5b" size={32} />
            <span className="select-none">my-netease-cloud-music</span>
          </div>
          <div className="layout-header-icons flex items-center">
            <Link to="/setting">
              <i className="icon"><Setting size={iconSize} /></i>
            </Link>
            <Divider type="vertical" style={{ borderInlineStart: '1px solid #ccc' }} />
            <i className="icon"><Subtract size={iconSize} onClick={blurWindow} /></i>
            {
              isMaximized
                ? <i className="icon"><FullscreenExit size={iconSize} onClick={() => handleMaximize(false)} /></i>
                : <i className="icon"><Fullscreen size={iconSize} onClick={() => handleMaximize(true)} /></i>
            }
            <i className="icon"><Close size={iconSize} onClick={closeWindow} /></i>
          </div>
        </div>
      </header>
      <Modal
        // title="最小化到系统托盘"
        width="34%"
        styles={{ wrapper: { ...textAlign, userSelect: 'none' }, footer: textAlign }}
        okText="确定"
        cancelText="取消"
        destroyOnClose
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="mb-2">
          <Checkbox checked={isTray} onChange={() => setIsTray(!isTray)}>最小化到系统托盘</Checkbox>
        </div>
        <Checkbox>下次不再出现</Checkbox>
      </Modal>
    </>
  )
}

export default LayoutHeader
