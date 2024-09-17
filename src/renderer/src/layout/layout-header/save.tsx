import { useState } from 'react'
import { Modal, Checkbox } from 'antd'
import { useSettingStore } from '@renderer/store'
import { produce } from 'immer'
import {
  RiCloseFill as Close
} from '@remixicon/react'

type Props = {
  size?: number
}

function Save({ size = 18 }: Props): JSX.Element {
  const { setting, updateSetting } = useSettingStore()
  const [isOpen, setOpen] = useState(false)
  const [isTray, setIsTray] = useState(!setting.exitType)
  const [appearingTip, setAppearingTip] = useState(setting.appearingExitTip)

  const textAlign: React.CSSProperties = { textAlign: 'center' }

  const handleClose = () => {
    if (isTray) {
      window.api.hideWindow()
    }
    else window.api.quitApp()
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

  const onClose = () => {
    if (!setting.appearingExitTip) {
      handleClose()
      return
    }

    setOpen(true)
  }

  return (
    <>
      <i className="icon"><Close size={size} onClick={onClose} /></i>
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

export default Save
