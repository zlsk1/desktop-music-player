import { Divider } from 'antd'
import Save from './save'
import Setting from './setting'
import Scale from './scale'
import Hide from './hide'
import Logo from './logo'
import Dragger from './dragger'

function LayoutHeader(): JSX.Element {
  return (
    <header className="layout-header sticky top-0 right-0 px-4 bg-white z-20">
      <div className="flex items-center justify-between">
        <Logo />
        <Dragger />
        <div className="layout-header-icons flex items-center">
          <Setting />
          <Divider type="vertical" style={{ borderInlineStart: '1px solid #ccc' }} />
          <Hide />
          <Scale />
          <Save />
        </div>
      </div>
    </header>
  )
}

export default LayoutHeader
