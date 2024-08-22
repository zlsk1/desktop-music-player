import { Outlet } from 'react-router-dom'

function LayoutMain(): JSX.Element {
  return (
    <div className="w-4/5">
      <Outlet />
    </div>
  )
}

export default LayoutMain
