import { RiMusicFill as Music } from '@remixicon/react'

type Props = {
  size?: number,
  className?: string,
  content?: React.ReactNode,
  onClick?: React.MouseEventHandler | undefined
}

function DefaultSongImg({
  size = 48, className = '', content = null, onClick = undefined
}: Props): JSX.Element {
  return (
    <div style={{ width: `${size}px`, height: `${size}px` }} className={`relative mr-2 bg-slate-500 ${className}`} onClick={onClick}>
      <Music className="absolute top-1/2 left-1/2 text-gray-300 -translate-x-1/2 -translate-y-1/2" size={size / 2.5} />
      {content}
    </div>
  )
}

export default DefaultSongImg
