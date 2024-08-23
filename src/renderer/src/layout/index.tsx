import LayoutHeader from './layout-header'
import LayoutSidebar from './layout-sidebar'
import LayoutMain from './layout-main'
import Player from '../components/player'
import '../styles/layout.scss'

function Layout(): JSX.Element {
  return (
    <div className="layout-container">
      <LayoutHeader />
      <div className="layout-content">
        <LayoutSidebar />
        <LayoutMain />
      </div>
      <Player />
    </div>
  )
}

export default Layout
