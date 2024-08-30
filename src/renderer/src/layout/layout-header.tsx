import { useState } from 'react'
import {
  RiNeteaseCloudMusicFill as NeteaseCloudMusic,
  RiCloseFill as Close,
  RiFullscreenFill as Fullscreen,
  RiFullscreenExitFill as FullscreenExit,
  RiSubtractFill as Subtract,
  RiSettings4Line as Setting
} from '@remixicon/react'
import { Divider, Modal, Checkbox } from 'antd'
import { Link } from 'react-router-dom'
import { useSettingStore } from '@renderer/store'
import { produce } from 'immer'

function LayoutHeader(): JSX.Element {
  const { setting, updateSetting } = useSettingStore()
  const [isMaximized, setMaximize] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [isTray, setIsTray] = useState(!setting.exitType)
  const [appearingTip, setAppearingTip] = useState(setting.appearingExitTip)

  const iconSize: number = 18
  const textAlign: React.CSSProperties = { textAlign: 'center' }

  const handleClose = () => {
    if (isTray) {
      window.api.hideWindow()
    }
    else window.api.quitApp()
  }

  const onClose = () => {
    if (!setting.appearingExitTip) {
      handleClose()
      return
    }

    setOpen(true)
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
    updateSetting(produce(setting, (draftState) => {
      draftState.exitType = isTray ? 0 : 1
      draftState.appearingExitTip = appearingTip
    }))
    setTimeout(() => handleClose(), 200)
  }

  const handleCancel = () => {
    setOpen(false)
    // 未点确定时重置初始值
    setIsTray(!setting.exitType)
    setAppearingTip(setting.appearingExitTip)
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
            <i className="icon"><Close size={iconSize} onClick={onClose} /></i>
          </div>
        </div>
      </header>
      <Modal
        width="34%"
        styles={{ wrapper: { ...textAlign, userSelect: 'none' }, footer: textAlign }}
        destroyOnClose
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="mb-2">
          <Checkbox
            defaultChecked={setting.exitType === 0}
            checked={isTray}
            onChange={() => setIsTray(!isTray)}
          >
            最小化到系统托盘
          </Checkbox>
        </div>
        <Checkbox
          checked={!appearingTip}
          onChange={() => setAppearingTip(!appearingTip)}
        >
          下次不再出现
        </Checkbox>
      </Modal>
    </>
  )
}

export default LayoutHeader
