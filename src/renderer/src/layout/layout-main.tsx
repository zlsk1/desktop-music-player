import { Outlet } from 'react-router-dom'

function LayoutMain(): JSX.Element {
  return (
    <div className="layout-main w-4/5">
      <Outlet />
    </div>
  )
}

export default LayoutMain
