import { useState, useEffect } from 'react'
import {
  Table, Button, Modal, Checkbox, Dropdown, Input, Col
} from 'antd'
import {
  RiPlayFill as Play,
  RiArrowRightWideLine as ArrowRight,
  RiMoreLine as More,
  RiLoaderLine as Load,
  RiDeleteBin4Line as Detele,
  RiAddBoxFill as AddBox,
  RiFile3Fill as File,
  RiSearchLine as Search
} from '@remixicon/react'
import { useSettingStore } from '@renderer/store'
import dayjs from 'dayjs'
import './index.scss'
import { produce } from 'immer'
import type { TableColumnProps, MenuProps } from 'antd'
import type { LosicMusic } from '@/common/types/window'

const { Column } = Table
const CheckboxGroup = Checkbox.Group

const menuItems: MenuProps['items'] = [
  {
    key: '0',
    label: '播放',
    icon: <Play size={20} color="#686f7e" />
  },
  {
    key: '1',
    label: '添加到播放列表',
    icon: <AddBox size={20} color="#686f7e" />
  },
  {
    key: '2',
    type: 'divider'
  },
  {
    key: '3',
    label: '打开文件所在目录',
    icon: <File size={20} color="#686f7e" />
  },
  {
    key: '4',
    label: '从列表中删除',
    icon: <Detele size={20} color="#686f7e" />
  },
  {
    key: '5',
    label: '从磁盘中删除',
    icon: <Detele size={20} color="#686f7e" />
  }
]
const columnData: TableColumnProps[] = [
  {
    title: '#',
    width: '10%',
    key: 'key',
    dataIndex: 'key',
    align: 'center',
    className: 'text-zinc-400',
    render: (val, record, index) => {
      return (
        <div className="flex">
          <span className="font-mono">{ index < 9 ? `0${index + 1}` : index + 1}</span>
          <i className="icon"><Play /></i>
        </div>
      )
    }
  },
  {
    title: '歌名',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
    className: 'text-zinc-600',
    sorter: (a, b) => a.name.toLowerCase() - b.name.toLowerCase()
  },
  {
    title: '创建时间',
    dataIndex: 'ctime',
    key: 'ctime',
    ellipsis: true,
    width: '24%',
    className: 'text-zinc-400',
    sorter: (a, b) => dayjs(a.ctime).toDate().getTime() - dayjs(b.ctime).toDate().getTime()
  },
  {
    title: '大小',
    dataIndex: 'size',
    key: 'size',
    ellipsis: true,
    width: '12%',
    className: 'text-zinc-400',
    sorter: (a, b) => a.size.slice(0, -2) - b.size.slice(0, -2)
  },
  {
    width: '14%',
    className: 'text-zinc-400',
    render: () => {
      return (
        <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="topLeft">
          <i className="icon"><More size={18} /></i>
        </Dropdown>
      )
    }
  }
]

function LocalMusic(): JSX.Element {
  const settingStore = useSettingStore()
  const { localMusicDirectory, localMusicDirectorySelected } = settingStore && settingStore.setting
  const [localMusic, setLocalMusic] = useState<LosicMusic[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [list, setlist] = useState(localMusicDirectorySelected)

  useEffect(
    () => {
      async function getLocalMusic() {
        const initialLocalMusic = await window.api.getLocalMusic(['F:/CloudMusic'])
        setLocalMusic(initialLocalMusic)
        setIsLoading(false)
      }
      getLocalMusic()
    },
    []
  )

  const setDirectory = () => {
    setIsOpen(false)
    settingStore.updateSetting(produce(settingStore.setting, (draftState) => {
      draftState.localMusicDirectorySelected = list
    }))
  }

  const onChange = (val: string[]) => {
    setlist(val)
  }

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div className="flex">
            <h2 className="mr-2 text-xl font-bold">本地音乐</h2>
            <span className="mt-2 text-xs text-slate-400">
              共
              <span className="mx-1">{localMusic.length}</span>
              首
            </span>
          </div>
          <Button
            type="primary"
            icon={<ArrowRight size={18} />}
            iconPosition="end"
            onClick={() => setIsOpen(true)}
          >
            选择目录
          </Button>
        </div>
        <div className="flex justify-between mb-2">
          <div>
            <Button type="primary" icon={<Play size={18} />} className="mr-2">播放全部</Button>
            <Button icon={<Load size={18} />} className="mr-2" />
            <Button icon={<More size={18} />} />
          </div>
          <div>
            <Input width={80} prefix={<Search color="#ccc" size={20} />} placeholder="搜索" />
          </div>
        </div>
        <Table
          dataSource={localMusic}
          showSorterTooltip={false}
          rowHoverable={false}
          pagination={false}
          loading={isLoading}
        >
          {
            columnData.map((column) => {
              return (
                <Column
                  title={column.title}
                  key={column.key}
                  dataIndex={column.dataIndex}
                  width={column?.width}
                  align={column?.align}
                  ellipsis={column.ellipsis}
                  className={column.className}
                  render={column?.render}
                  sorter={column?.sorter}
                />
              )
            })
          }
        </Table>
      </div>
      <Modal
        title="已选择的目录"
        okText="确定"
        cancelText="新增目录"
        destroyOnClose
        onCancel={() => setIsOpen(false)}
        onOk={setDirectory}
        open={isOpen}
      >
        <CheckboxGroup defaultValue={localMusicDirectorySelected} onChange={onChange}>
          {
            localMusicDirectory.map((item) => {
              return (
                <Col span={24} className="my-1" key={item}>
                  <Checkbox value={item}>{item}</Checkbox>
                </Col>
              )
            })
          }
        </CheckboxGroup>
      </Modal>
    </>
  )
}

export default LocalMusic
