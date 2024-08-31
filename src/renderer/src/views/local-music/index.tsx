import {
  useState, useEffect, useMemo
} from 'react'
import {
  Table, Button, Modal, Checkbox, Dropdown, Input, Col, Tooltip, message
} from 'antd'
import dayjs from 'dayjs'
import { produce } from 'immer'
import {
  RiPlayFill as Play,
  RiArrowRightWideLine as ArrowRight,
  RiMoreLine as More,
  RiLoaderLine as Load,
  RiDeleteBin4Line as Detele,
  RiPlayListAddFill as PlayListAdd,
  RiCornerDownLeftLine as Insert,
  RiFile3Fill as File,
  RiSearchLine as Search,
  RiPlayListAddLine as PlayList,
  RiCheckDoubleLine as CheckDouble
} from '@remixicon/react'
import { useSettingStore, useMusicPlayStore } from '@renderer/store'
import { useMusicPlay } from '@renderer/hooks'
import type { SongInfo } from '@renderer/store'
import { escapePath } from '@renderer/utils'
import './index.scss'
import type {
  TableColumnProps, MenuProps, TableProps
} from 'antd'
import type { LocalMusic as LocalMusicType } from '@/common/types/global'

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

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
    label: '插入到下一首',
    icon: <Insert size={20} color="#686f7e" />
  },
  {
    key: '2',
    label: '添加到播放列表',
    icon: <PlayListAdd size={20} color="#686f7e" />
  },
  {
    type: 'divider'
  },
  {
    key: '3',
    label: '打开文件所在目录',
    icon: (
      <File size={20} color="#686f7e" />
    )
  },
  {
    key: '4',
    label: '从磁盘中删除',
    icon: <Detele size={20} color="#686f7e" />
  }
]

const arrayIsEqual = (a: unknown[], b: unknown[]): boolean => {
  if (!Array.isArray(a) || !Array.isArray(b)) return false
  if (a.length !== b.length) return false
  return a.join() === b.join()
}

function LocalMusic(): JSX.Element {
  const { play } = useMusicPlay()
  const settingStore = useSettingStore()
  const {
    setSource, setSongQueue, setMultipleSources, insertAtNext
  } = useMusicPlayStore()
  const {
    localMusicDirectory,
    localMusicDirectorySelected,
    systemUserInfo
  } = settingStore && settingStore.setting
  const [localMusic, setLocalMusic] = useState<LocalMusicType[]>([])
  const [copyLocalMusic, setCopyLocalMusic] = useState<LocalMusicType[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [copyDirectory, setCopyDirectory] = useState<string[]>([])
  const [copyDirectorySelected, setCopyDirectorySelected] = useState<string[]>([])
  const [isBatch, setIsBatch] = useState(false)
  const [tableSelection, setTableSelection] = useState<string[]>([])

  const directoryHasChanged = useMemo(
    () => !arrayIsEqual(copyDirectory, localMusicDirectory),
    [copyDirectory, localMusicDirectory]
  )
  const directorySelectedHasChanged = useMemo(
    () => !arrayIsEqual(copyDirectorySelected, localMusicDirectorySelected),
    [copyDirectorySelected, localMusicDirectorySelected]
  )

  const setPlay = (data: SongInfo) => {
    setSource(data)
    play()
  }

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
            <i className="icon">
              <Play onClick={() => setPlay({
                name: record.title,
                url: record.path,
                artist: record.artist,
                artists: record.artists,
                img: record.img
              })}
              />
            </i>
          </div>
        )
      }
    },
    {
      title: '歌名',
      dataIndex: 'title',
      key: 'key',
      ellipsis: true,
      className: 'text-zinc-600',
      sorter: (a, b) => {
        const reg = /[a-zA-Z]/
        if (reg.test(a.title) || reg.test(b.title)) {
          if (a.title > b.title) return 1
          if (a.title < b.title) return -1
          return 0
        }
        return a.title.localeCompare(b.title)
      },
      render: (val, record) => {
        return (
          <div>
            <div className="text-ellipsis text-nowrap overflow-hidden" title={val}>{val}</div>
            {
              record.artists
                ? (
                  <div
                    className="text-xs text-zinc-400 text-ellipsis text-nowrap overflow-hidden"
                    title={record.artists ? record.artists.map((artist: string) => artist).join(',') : ''}
                  >
                    {record.artists ? record.artists.map((artist: string) => artist).join(',') : ''}
                  </div>
                )
                : ''
            }
          </div>
        )
      }
    },
    {
      title: '专辑',
      dataIndex: 'album',
      key: 'key',
      ellipsis: true,
      className: 'text-zinc-400',
      width: '16%',
      sorter: (a, b) => {
        const reg = /[a-zA-Z]/
        if (reg.test(a.album) || reg.test(b.album)) {
          if (a.album > b.album) return 1
          if (a.album < b.album) return -1
          return 0
        }
        return a.album.localeCompare(b.album)
      }
    },
    {
      title: '时长',
      dataIndex: 'formatDuration',
      key: 'key',
      ellipsis: true,
      width: '10%',
      className: 'text-zinc-400',
      sorter: (a, b) => a.duration - b.duration
    },
    {
      title: '创建时间',
      dataIndex: 'ctime',
      key: 'key',
      ellipsis: true,
      width: '16%',
      className: 'text-zinc-400',
      sorter: (a, b) => dayjs(a.ctime).toDate().getTime() - dayjs(b.ctime).toDate().getTime()
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'key',
      ellipsis: true,
      width: '12%',
      className: 'text-zinc-400',
      sorter: (a, b) => a.size.slice(0, -2) - b.size.slice(0, -2)
    },
    {
      width: '10%',
      key: 'key',
      className: 'text-zinc-400',
      render: (val, record) => {
        return (
          <Dropdown
            menu={{
              items: menuItems,
              onClick: ({ key }) => {
                if (key === '0') {
                  setPlay({
                    name: record.title,
                    url: record.path,
                    artist: record.artist,
                    artists: record.artists,
                    img: record.img
                  })
                }
                else if (key === '1') {
                  insertAtNext({
                    name: record.title,
                    url: record.path,
                    artist: record.artist,
                    artists: record.artists,
                    img: record.img
                  })
                }
                else if (key === '2') {
                  setSongQueue({
                    name: record.title,
                    url: record.path,
                    artist: record.artist,
                    artists: record.artists,
                    img: record.img
                  })
                }
                else if (key === '3') window.api.showItemInFolder(record.path)
                else if (key === '4') {
                  Modal.confirm({
                    title: '确定删除？',
                    onOk: async () => {
                      try {
                        await window.api.trashItem(record.path)
                        message.success({ content: '删除成功' })
                      }
                      catch (err) {
                        message.error({ content: '删除失败' })
                        console.error(err)
                      }
                    }
                  })
                }
              }
            }}
            trigger={['click']}
            placement="topLeft"
          >
            <i className="icon"><More size={18} /></i>
          </Dropdown>
        )
      }
    }
  ]

  const rowSelection: TableRowSelection<LocalMusicType> = {
    type: 'checkbox',
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE
    ],
    onSelect: (record, selected, selectedRows) => {
      setTableSelection(selectedRows.map((row) => row.path))
    },
    onSelectAll: (record, selectedRows) => {
      setTableSelection(selectedRows.map((row) => row.path))
    },
    onSelectNone: () => {
      setTableSelection([])
    },
    onChange: (selectedRowKeys) => {
      setTableSelection(selectedRowKeys as string[])
    }
  }

  async function getLocalMusic() {
    const initialLocalMusic = await window.api.getLocalMusic(localMusicDirectorySelected)
    setLocalMusic(initialLocalMusic)
    setCopyLocalMusic(initialLocalMusic)
    setIsLoading(false)
  }

  useEffect(
    () => {
      getLocalMusic()
      setCopyDirectory([...localMusicDirectory])
      setCopyDirectorySelected([...localMusicDirectorySelected])
      if (systemUserInfo && !systemUserInfo.username) {
        window.api.getUserInfo().then((userinfo) => {
          settingStore.updateSetting(produce(settingStore.setting, (draftState) => {
            draftState.systemUserInfo = userinfo
          }))
        })
      }
    },
    []
  )

  const updateDirectory = () => {
    setIsOpen(false)

    if (directoryHasChanged || directorySelectedHasChanged) {
      setIsLoading(true)
      getLocalMusic()
    }
  }

  const onChange = (val: string[]) => {
    settingStore.updateSetting(produce(settingStore.setting, (draftState) => {
      draftState.localMusicDirectorySelected = val
    }))
  }

  const setDirectory = async () => {
    const { filePaths } = await window.api.openDialog({ properties: ['openDirectory'] })
    const escapedPath = escapePath(filePaths[0])

    settingStore.updateSetting(produce(settingStore.setting, (draftState) => {
      draftState.localMusicDirectory.push(escapedPath)
      draftState.localMusicDirectorySelected.push(escapedPath)
    }))
  }

  const closeModal = () => {
    setIsOpen(false)

    if (!directoryHasChanged && !directorySelectedHasChanged) return

    settingStore.updateSetting(produce(settingStore.setting, (draftState) => {
      draftState.localMusicDirectory = copyDirectory
      draftState.localMusicDirectorySelected = copyDirectorySelected
    }))
  }

  let isCompositioned = false
  let searchVal = ''
  const filterLocalMusic = (query: string) => {
    let qeuryMusic
    if (query === undefined) qeuryMusic = copyLocalMusic
    else qeuryMusic = copyLocalMusic.filter((music) => music.title.match(query))

    setLocalMusic(qeuryMusic)
  }
  const onSearch = (e: React.FormEvent) => {
    if (isCompositioned) return
    searchVal = (e.target as HTMLInputElement)?.value
    filterLocalMusic(searchVal)
  }
  const onCompositionStart = () => {
    isCompositioned = true
  }
  const onCompositionEnd = (e: React.CompositionEvent) => {
    isCompositioned = false
    searchVal = e.data
    filterLocalMusic(searchVal)
  }

  const reload = () => {
    if (isLoading) return
    setIsLoading(true)
    getLocalMusic()
  }

  const handleTableSelection = () => {
    Modal.confirm({
      title: `确定要删除这${tableSelection.length}个文件？`,
      maskClosable: true,
      onOk: async () => {
        const deletetasks = tableSelection.map((item) => window.api.trashItem(item))
        try {
          await Promise.all(deletetasks)
          message.success('删除成功')
          getLocalMusic()
        }
        catch (err) {
          message.error('删除失败')
          console.log(err)
        }
      }
    })
  }

  const playAll = () => {
    const list = localMusic.map((music) => {
      return {
        name: music.title,
        url: music.path,
        artist: music.artist,
        artists: music.artists,
        img: music.img
      } as SongInfo
    })
    setMultipleSources(list)
  }

  return (
    <>
      <div className="p-4">
        {
          isBatch
            ? (
              <div>
                <Button type="primary" className="mr-2" onClick={handleTableSelection}>删除</Button>
                <Button type="primary" onClick={() => setIsBatch(false)}>完成</Button>
              </div>
            )
            : (
              <>
                <div className="flex justify-between mb-4">
                  <div className="flex">
                    <h2 className="mr-2 text-xl font-bold">本地音乐</h2>
                    <span className="mt-2 text-xs text-slate-400">
                      共
                      <span className="mx-1">{localMusic?.length}</span>
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
                    <Button type="primary" icon={<Play size={18} />} className="mr-2" onClick={playAll}>播放全部</Button>
                    <Tooltip title="刷新">
                      <Button icon={<Load size={18} />} className="mr-2" onClick={reload} />
                    </Tooltip>
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: 0,
                            label: '全部添加至播放列表',
                            icon: <PlayList size={18} />
                          },
                          {
                            key: 1,
                            label: '批量操作',
                            icon: <CheckDouble size={18} />
                          }
                        ],
                        onClick: ({ key }) => {
                          if (key === '1') {
                            setIsBatch(true)
                          }
                        }
                      }}
                      trigger={['click']}
                    >
                      <Button icon={<More size={18} />} />
                    </Dropdown>
                  </div>
                  <div>
                    <Input
                      width={80}
                      prefix={<Search color="#ccc" size={20} />}
                      placeholder="搜索音乐"
                      onInput={onSearch}
                      onCompositionStart={onCompositionStart}
                      onCompositionEnd={onCompositionEnd}
                    />
                  </div>
                </div>
              </>
            )
        }
        <Table
          dataSource={localMusic}
          rowSelection={isBatch ? rowSelection : undefined}
          showSorterTooltip={false}
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
        title="已选择的本地目录"
        okText="确定"
        cancelText="新增目录"
        destroyOnClose
        open={isOpen}
        onCancel={closeModal}
        footer={(
          <>
            <Button onClick={setDirectory}>新增目录</Button>
            <Button type="primary" onClick={updateDirectory}>确定</Button>
          </>
        )}
      >
        <span>将自动扫描每个目录下的可用文件</span>
        <CheckboxGroup value={localMusicDirectorySelected} onChange={onChange}>
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
