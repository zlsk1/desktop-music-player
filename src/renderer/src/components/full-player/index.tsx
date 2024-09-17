import { useEffect, useMemo, useRef } from 'react'
import { Drawer, Col, Row } from 'antd'
import { RiArrowDownWideLine as ArrowDown } from '@remixicon/react'
import { useAudioVisualization } from '@renderer/hooks/use-audio-visualization'
import { useMusicPlayStore } from '@renderer/store'
import Other from '../player/other'
import Control from '../player/bar/control'
import Progress from '../player/bar/progress'
import DefaultSongImg from '../default-song-img'
import ProgressTime from '../player/bar/progress-time'
import Save from '../../layout/layout-header/save'
import Scale from '../../layout/layout-header/scale'
import Hide from '../../layout/layout-header/hide'
import '@renderer/styles/common.scss'

type Props = {
  visible: boolean,
  linearBg: string[],
  img: string | undefined,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
}

const footerHeight = 64

function Footer({ bg, visible }: { bg: string, visible: boolean }): JSX.Element {
  const { audio } = useMusicPlayStore()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { draw, create } = useAudioVisualization(audio, canvasRef.current, { bg })

  useEffect(() => create(), [])

  useEffect(
    () => {
      if (audio && !audio.paused && canvasRef.current) {
        console.log(audio, !audio?.paused, canvasRef.current)
        draw()
      }
    },
    [audio, audio?.paused, canvasRef.current]
  )

  return (
    <>
      <canvas
        ref={canvasRef}
        id="canvas"
        width={0}
        height={0}
        className="absolute top-[-64px] left-1/2 -translate-x-1/2 blur-[0.8px]"
      />
      <Progress
        className="w-full m-0"
        style={{
          position: 'absolute', top: '-12px', left: '50%', width: '90%', transform: 'translate(-50%, 50%)'
        }}
        styles={{
          track: {
            backgroundColor: bg
          }
        }}
      />
      <Row className="h-full dark" align="middle">
        <Col span={8}>
          <div>
            <ProgressTime type="start" />
            <span className="mx-1 text-xs text-gray-300">/</span>
            <ProgressTime type="end" />
          </div>
        </Col>
        <Col span={8}>
          <Control />
        </Col>
        <Col span={8}>
          <Other />
        </Col>
      </Row>
    </>
  )
}

function Header(): JSX.Element {
  return (
    <div className="layout-header-icons flex items-center dark">
      <Hide />
      <Scale />
      <Save />
    </div>
  )
}

function FullPlayer({
  visible, linearBg, img, setVisible
}: Props): JSX.Element {
  const contentBg = useMemo(
    () => {
      if (!linearBg.length) {
        return 'linear-gradient(rgb(140, 140, 142), rgb(25, 21, 23))'
      }
      return `linear-gradient(to bottom, rgb(${linearBg[0]}), rgb(${linearBg[2]}))`
    },
    [linearBg]
  )

  const footerBg = useMemo(
    () => {
      if (!linearBg.length) {
        return 'linear-gradient(rgba(140, 140, 142, 0.2), rgba(25, 21, 23, 0.2))'
      }
      return `linear-gradient(to bottom, rgb(${linearBg[0]}, .2), rgb(${linearBg[2]}, .2))`
    },
    [linearBg]
  )

  const progressBg = useMemo(
    () => {
      if (!linearBg.length) {
        return 'rgb(140, 140, 142)'
      }
      return `rgb(${linearBg[0]})`
    },
    [linearBg]
  )

  return (
    <Drawer
      open={visible}
      destroyOnClose
      placement="bottom"
      height="100%"
      closeIcon={<ArrowDown />}
      extra={<Header />}
      footer={<Footer bg={progressBg} visible={visible} />}
      styles={{
        content: {
          background: contentBg
        },
        body: {
          padding: '100px'
        },
        header: {
          height: '60px',
          padding: '1rem'
        },
        footer: {
          position: 'relative',
          height: `${footerHeight}px`,
          background: footerBg
        }
      }}
      onClose={() => setVisible(false)}
    >
      {
        img
          ? <img src={`data:image/png;base64,${img}`} alt="" className="w-[260px] h-[260px] rounded-full animate-infinite-rotate" />
          : <DefaultSongImg size={260} className="rounded-full animate-infinite-rotate" />
      }
    </Drawer>
  )
}

export default FullPlayer
