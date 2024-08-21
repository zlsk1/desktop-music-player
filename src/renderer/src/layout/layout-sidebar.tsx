import { Menu } from 'antd'
import {
  RiHeartFill as Heart,
  RiHistoryFill as History,
  RiMusicFill as Music
} from '@remixicon/react'
import type { MenuProps } from 'antd'

function LayoutSidebar(): JSX.Element {
  type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
    {
      key: 'sub1',
      label: '我喜欢',
      icon: <Heart size={22} />
    },
    {
      key: 'sub2',
      label: '播放历史',
      icon: <History size={22} />
    },
    {
      key: 'sub3',
      label: '乐库',
      icon: <Music size={22} />
    }
  ]

  return (
    <div className="layout-sidebar w-1/5 p-4 bg-gray-100">
      <Menu
        defaultSelectedKeys={['sub1']}
        items={items}
        expandIcon={null}
        mode="inline"
      />
    </div>
  )
}

export default LayoutSidebar
