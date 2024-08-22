import Info from './info'
import Bar from './bar'
import Other from './other'
import '@renderer/styles/player.scss'

function Player(): JSX.Element {
  return (
    <div className="player flex items-center justify-between w-full shadow shadow-gray-300">
      <Info />
      <Bar />
      <Other />
    </div>
  )
}

export default Player
