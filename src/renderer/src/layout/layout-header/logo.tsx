import {
  RiNeteaseCloudMusicFill as NeteaseCloudMusic
} from '@remixicon/react'

type Props = {
  size?: number
}

function Logo({ size = 32 }: Props): JSX.Element {
  return (
    <div className="flex items-center">
      <NeteaseCloudMusic className="mr-2" color="#fc3b5b" size={size} />
      <span className="select-none">desktop-music-player</span>
    </div>
  )
}

export default Logo
