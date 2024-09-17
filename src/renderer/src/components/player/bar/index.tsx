import Control from './control'
import Progress from './progress'
import ProgressTime from './progress-time'

function Bar({ className = '' }: {className?: string}): JSX.Element {
  return (
    <div className={`${className} h-full py-3`}>
      <Control />
      <div className="flex items-center justify-center">
        <ProgressTime type="start" />
        <Progress className="w-72 my-2 mx-4" />
        <ProgressTime type="end" />
      </div>
    </div>
  )
}

export default Bar
