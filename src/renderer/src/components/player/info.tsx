import {
  RiDownloadLine as DownLoad
} from '@remixicon/react'

function Info(): JSX.Element {
  return (
    <div className="flex flex-1 px-6">
      <div className="w-10 h10 mr-2 bg-slate-500 rounded-full">
        <img src="" alt="" />
      </div>
      <div>
        <div className="flex items-center">
          <span className="inline-block max-w-20 text-ellipsis text-nowrap text-sm text-zinc-800 overflow-hidden cursor-pointer select-none">History</span>
          <span className="mx-1 select-none">-</span>
          <span title="88rising/Rich Brian" className="inline-block max-w-32 text-xs text-ellipsis text-nowrap text-gray-400 overflow-hidden cursor-pointer select-none">88rising/Rich Brian</span>
        </div>
        <div>
          <i className="icon"><DownLoad /></i>
        </div>
      </div>
    </div>
  )
}

export default Info
