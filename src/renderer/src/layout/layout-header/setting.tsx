import { Link } from 'react-router-dom'
import { RiSettings2Line as SettingLine } from '@remixicon/react'

type Props = {
  size?: number
}

function Setting({ size = 18 }: Props): JSX.Element {
  return (
    <Link to="/setting">
      <i className="icon"><SettingLine size={size} /></i>
    </Link>
  )
}

export default Setting
