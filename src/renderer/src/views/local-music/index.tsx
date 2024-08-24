import { useState, useEffect } from 'react'
import {
  Table, Button, Modal, Checkbox, Popover
} from 'antd'
import {
  RiPlayFill as Play,
  RiArrowRightWideLine as ArrowRight,
  RiMoreLine as More
} from '@remixicon/react'
import type { LosicMusic } from '@/common/types/window'

const { Column } = Table

const moreContent = (
  <ul className="text-center">
    <li><Button size="small" type="text">添加到播放列表</Button></li>
    <li><Button size="small" type="text">从磁盘中删除</Button></li>
  </ul>
)

function LocalMusic(): JSX.Element {
  const [localMusic, setLocalMusic] = useState<LosicMusic[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const getLocalMusic = async () => {
    const res = await window.api.getLocalMusic(['F:/CloudMusic'])
    setLocalMusic(res)
  }

  useEffect(() => {
    getLocalMusic()
  })

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between mb-2">
          <h3>
            本地音乐
            <span className="text-xs text-slate-400">
              共
              {localMusic.length}
              首
            </span>
          </h3>
          <Button
            type="primary"
            icon={<ArrowRight size={18} />}
            iconPosition="end"
            onClick={() => setIsOpen(true)}
          >
            选择目录
          </Button>
        </div>
        <Table
          dataSource={localMusic}
          showSorterTooltip={false}
          rowHoverable={false}
          pagination={false}
        >
          <Column width="10%" render={() => <i className="icon"><Play /></i>} />
          <Column
            title="歌名"
            dataIndex="name"
            key="name"
            ellipsis
            render={(val) => {
              return (
                <div className="flex items-center">
                  <span className="mr-1">{val}</span>
                  <Popover content={moreContent}>
                    <More size={18} />
                  </Popover>
                </div>
              )
            }}
          />
          {/* <Column title="时长 " dataIndex="duration" key="duration" ellipsis width="20%" /> */}
          <Column
            title="创建时间"
            dataIndex="ctime"
            key="ctime"
            ellipsis
            width="18%"
          />
          <Column
            title="大小"
            dataIndex="size"
            key="size"
            ellipsis
            width="12%"
            sorter={(a, b) => Number.parseInt(a.size, 10) - Number.parseInt(b.size, 10)}
          />
        </Table>
      </div>
      <Modal
        title="已选择的目录"
        open={isOpen}
        okText="确定"
        cancelText="取消"
        onCancel={() => setIsOpen(false)}
        onOk={() => setIsOpen(false)}
      >
        <Checkbox>
          <p>F:/CloudMusic</p>
        </Checkbox>
      </Modal>
    </>
  )
}

export default LocalMusic
