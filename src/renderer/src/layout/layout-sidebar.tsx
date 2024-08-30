import { Menu } from 'antd'
import {
  RiHeartFill as Heart,
  RiHistoryFill as History,
  RiMusicFill as Music
} from '@remixicon/react'
import { useNavigate } from 'react-router-dom'
import type { MenuProps } from 'antd'

function LayoutSidebar(): JSX.Element {
  type MenuItem = Required<MenuProps>['items'][number];
  type OnSelect = Required<MenuProps>['onSelect']

  const navigate = useNavigate()

  const items: MenuItem[] = [
    {
      key: 'grp',
      label: '我的',
      type: 'group',
      children: [
        {
          key: 'user-like',
          label: '我喜欢',
          icon: <Heart size={22} />
        },
        {
          key: 'play-history',
          label: '播放历史',
          icon: <History size={22} />
        },
        {
          key: 'local-music',
          label: '本地音乐',
          icon: <Music size={22} />
        }
      ]
    }
  ]

  const onSelect: OnSelect = ({ key }) => {
    navigate(`/${key}`)
  }

  return (
    <div className="layout-sidebar w-1/5 p-4 bg-gray-100">
      <Menu
        defaultSelectedKeys={['user-like']}
        items={items}
        expandIcon={null}
        mode="inline"
        onSelect={onSelect}
      />
    </div>
  )
}

export default LayoutSidebar
