import LayoutHeader from './layout-header'
import LayoutSidebar from './layout-sidebar'
import LayoutMain from './layout-main'
import Player from '../components/player'
import '../styles/layout.scss'

function Layout(): JSX.Element {
  return (
    <>
      <LayoutHeader />
      <main className="flex">
        <LayoutSidebar />
        <LayoutMain />
      </main>
      <Player />
    </>
  )
}

export default Layout
