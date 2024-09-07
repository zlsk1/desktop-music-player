import { useState, useEffect } from 'react'
import { Drawer, Popconfirm } from 'antd'
import {
  RiHeartLine as Heart,
  RiCloseLine as Close,
  RiPlayFill as Play,
  RiPauseFill as Pause
} from '@remixicon/react'
import { useMusicPlay } from '@renderer/hooks'
import { useMusicPlayStore } from '@renderer/store'
import type { SongInfo } from '@renderer/store'

type props = {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
}

interface Queue extends SongInfo {
  hovering: boolean
}

function AsideQueue({ visible, setVisible }: props): JSX.Element {
  const {
    songQueue, audio, setIndex, setSongQueue
  } = useMusicPlayStore()
  const queue = [...songQueue].map((v) => {
    return {
      ...v,
      hovering: false
    }
  })
  const [queueState, setQueueState] = useState<Queue[]>([])
  const { play, pause, currentSong } = useMusicPlay()

  useEffect(
    () => {
      setQueueState(queue)
    },
    [songQueue]
  )

  const onMouseEnter = (idx: number) => {
    queue[idx].hovering = true
    setQueueState(queue)
  }

  const onMouseLeave = (idx: number) => {
    queue[idx].hovering = false
    setQueueState(queue)
  }

  const handlePlay = (idx: number) => {
    setIndex(idx)
    play()
  }

  const handleDel = (idx: number) => {
    queue.splice(idx, 1)
    setQueueState(queue)
    setSongQueue(queue)
  }

  return (
    <Drawer
      open={visible}
      title="播放列表"
      width="30%"
      destroyOnClose
      onClose={() => setVisible(false)}
    >
      <ul>
        {
          queueState.map((v, i) => {
            return (
              <li
                key={v.url}
                className={
                  `flex items-center my-2 p-2 transition-all duration-300 hover:rounded hover:shadow-md hover:bg-slate-100 ${v.url === currentSong.url ? 'bg-slate-100 rounded shadow-md' : ''}`
                }
                onMouseEnter={() => onMouseEnter(i)}
                onMouseLeave={() => onMouseLeave(i)}
              >
                {
                  v.img
                    ? (
                      <div
                        style={{ background: `url(data:image/png;base64,${v.img}) center/100% no-repeat` }}
                        className="flex items-center justify-center shrink-0 w-10 h-10 mr-2 rounded"
                      >
                        {
                          v.url === currentSong.url && !audio?.paused
                            ? (
                              <Pause
                                style={{ display: v.hovering ? 'block' : 'none' }}
                                size={18}
                                className="cursor-pointer text-gray-300 transition-colors duration-300 hover:text-gray-100 shadow"
                                onClick={pause}
                              />
                            )
                            : (
                              <Play
                                style={{ display: v.hovering ? 'block' : 'none' }}
                                size={18}
                                className="cursor-pointer text-gray-300 transition-colors duration-300 hover:text-gray-100 shadow"
                                onClick={() => handlePlay(i)}
                              />
                            )
                        }
                      </div>
                    )
                    : (
                      <div className="flex items-center justify-center shrink-0 w-10 h-10 mr-2 bg-slate-500 rounded">
                        {
                          v.url === currentSong.url && !audio?.paused
                            ? (
                              <Pause
                                style={{ display: v.hovering ? 'block' : 'none' }}
                                size={18}
                                className="cursor-pointer text-gray-300 transition-colors duration-300 hover:text-gray-100 shadow"
                                onClick={pause}
                              />
                            )
                            : (
                              <Play
                                style={{ display: v.hovering ? 'block' : 'none' }}
                                size={18}
                                className="cursor-pointer text-gray-300 transition-colors duration-300 hover:text-gray-100 shadow"
                                onClick={() => handlePlay(i)}
                              />
                            )
                        }
                      </div>
                    )
                }
                <div className="flex-1 w-10 text-xs">
                  <div>{v.name}</div>
                  <div className="text-gray-400 ellipsis-1">
                    {v?.artists
                      ? v?.artists.map((v1) => v1).join('/')
                      : v?.artist
                        ? v?.artist
                        : '未知'}
                  </div>
                </div>
                <div className="flex">
                  <i
                    className="px-1 text-slate-500 cursor-pointer transition-colors duration-300 hover:text-slate-700"
                  >
                    <Heart size={18} />
                  </i>
                  <i
                    className="px-1 text-slate-500 cursor-pointer transition-colors duration-300 hover:text-slate-700"
                  >

                    <Popconfirm
                      title="将此首歌曲从歌曲列表中删除"
                      trigger={['click']}
                      align={{
                        offset: [-25, -15]
                      }}
                      onConfirm={() => handleDel(i)}
                    >
                      <Close size={18} />
                    </Popconfirm>
                  </i>
                </div>
              </li>
            )
          })
        }
      </ul>
    </Drawer>
  )
}

export default AsideQueue
