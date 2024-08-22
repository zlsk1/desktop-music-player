import { Slider } from 'antd'
import Control from './control'

function Bar(): JSX.Element {
  return (
    <div className="flex-1 h-full py-3">
      <Control />
      <div className="flex items-center justify-center">
        <span className="text-xs text-gray-400">00:00</span>
        <Slider tooltip={{ open: false }} className="w-72 my-2 mx-4" />
        <span className="text-xs text-gray-400">00:00</span>
      </div>
    </div>
  )
}

export default Bar
