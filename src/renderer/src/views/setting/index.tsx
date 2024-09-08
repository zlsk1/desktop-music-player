import {
  Col, Row, Input, Button, Radio, ColorPicker, Tabs, ConfigProvider,
  theme
} from 'antd'
import {
  generate, green, presetPalettes, red
} from '@ant-design/colors'
import type { ColorPickerProps } from 'antd'

type Presets = Required<ColorPickerProps>['presets'][number]

const inputClassNames = {
  input: 'w-44 rounded-full'
}

const genPresets = (presets = presetPalettes) => Object.entries(presets)
  .map<Presets>(([label, colors]) => ({ label, colors }))

const defaultSysyemColor = '#1677ff'

function Common(): JSX.Element {
  const { token } = theme.useToken()
  const presets = genPresets({ primary: generate(token.colorPrimary), red, green })

  return (
    <div>
      <Row align="middle" className="py-2 font-bold">
        <Col span={4}><h1 className="text-base" id="common">常规</h1></Col>
        <Col span={3}>应用主题色</Col>
        <Col span={2}>
          <ColorPicker
            value={defaultSysyemColor}
            presets={presets}
            showText
          />
        </Col>
      </Row>
    </div>
  )
}

function Shortcut(): JSX.Element {
  return (
    <div>
      <Row align="middle" className="py-2 font-bold">
        <Col span={4}><h1 className="text-base" id="shortcut">快捷键</h1></Col>
        <Col span={4}>功能说明</Col>
        <Col span={8}>快捷键</Col>
        <Col span={8}>全局快捷键</Col>
      </Row>
      <Row align="middle" className="py-2">
        <Col span={4} offset={4}>播放/暂停</Col>
        <Col span={8}><Input value="Ctrl + Space" variant="filled" classNames={inputClassNames} /></Col>
        <Col span={8}><Input value="Ctrl + Alt + Space" variant="filled" classNames={inputClassNames} /></Col>
      </Row>
      <Row align="middle" className="py-2">
        <Col span={4} offset={4}>上一首</Col>
        <Col span={8}><Input value="Ctrl + ←" variant="filled" classNames={inputClassNames} /></Col>
        <Col span={8}><Input value="Ctrl + Alt + ←" variant="filled" classNames={inputClassNames} /></Col>
      </Row>
      <Row align="middle" className="py-2">
        <Col span={4} offset={4}>下一首</Col>
        <Col span={8}><Input value="Ctrl + →" variant="filled" classNames={inputClassNames} /></Col>
        <Col span={8}><Input value="Ctrl + Alt + →" variant="filled" classNames={inputClassNames} /></Col>
      </Row>
    </div>
  )
}

function Download(): JSX.Element {
  const openDownloadDirectory = () => {
    window.api.openDialog()
  }

  return (
    <div className="py-2">
      <Row>
        <Col span={4}><h1 className="text-base font-bold" id="download">下载</h1></Col>
        <Col span={16}>
          <div className="mb-2 text-sm font-bold">下载目录</div>
          <div>
            <span className="mr-4">F:</span>
            <Button shape="round" size="small" onClick={openDownloadDirectory}>更改目录</Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

function System(): JSX.Element {
  const onChange = () => {

  }

  return (
    <div className="py-2">
      <Row>
        <Col span={4}><h1 className="text-base font-bold" id="system">系统</h1></Col>
        <Col>
          <span className="mr-4 font-bold">关闭主面板</span>
          <Radio.Group
            defaultValue="0"
            options={[
              {
                label: '关闭到系统托盘',
                value: '0'
              },
              {
                label: '直接退出',
                value: '1'
              }
            ]}
            onChange={onChange}
          />
        </Col>
      </Row>
    </div>
  )
}

function Setting(): JSX.Element {
  return (
    <div className="px-8 text-slate-600">
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              verticalItemPadding: '8px 16px'
            }
          }
        }}
      >
        <Tabs
          items={[
            {
              key: 'common',
              label: '常规',
              children: <Common />
            },
            {
              key: 'shortcut',
              label: '快捷键',
              children: <Shortcut />
            },
            {
              key: 'download',
              label: '下载',
              children: <Download />
            },
            {
              key: 'system',
              label: '系统',
              children: <System />
            }
          ]}
          tabPosition="right"
          className="font-bold"
        />
      </ConfigProvider>
    </div>
  )
}

export default Setting
