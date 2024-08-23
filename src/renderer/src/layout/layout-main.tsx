import { Outlet } from 'react-router-dom'

function LayoutMain(): JSX.Element {
  return (
    <main className="layout-main w-4/5">
      <Outlet />
    </main>
  )
}

export default LayoutMain
