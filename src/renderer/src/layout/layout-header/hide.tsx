import {
  RiSubtractFill as Subtract
} from '@remixicon/react'

type Props = {
  size?: number
}

function Hide({ size = 18 }: Props): JSX.Element {
  const blurWindow = () => {
    window.api.hideWindow()
  }

  return (
    <i className="icon"><Subtract size={size} onClick={blurWindow} /></i>
  )
}

export default Hide
