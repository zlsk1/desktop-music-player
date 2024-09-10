import { Drawer } from 'antd'
import { RiArrowDownWideLine as ArrowDown } from '@remixicon/react'

type Props = {
  visible: boolean,
  linearBg: string[],
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
}

function Detail({
  visible, linearBg, setVisible
}: Props): JSX.Element {
  return (
    <Drawer
      open={visible}
      destroyOnClose
      placement="bottom"
      height="100%"
      closeIcon={<ArrowDown />}
      footer={<div>1</div>}
      styles={{
        content: {
          background: `linear-gradient(to bottom, rgb(${linearBg[0]}), rgb(${linearBg[2]}))`
        },
        footer: {
          height: '60px',
          background: `linear-gradient(to bottom, rgb(${linearBg[0]}, .2), rgb(${linearBg[2]}, .2))`
        }
      }}
      onClose={() => setVisible(false)}
    />
  )
}

export default Detail
