import { Slider, SliderSingleProps } from 'antd'
import { useMusicPlayStore } from '@renderer/store'

type Props = {
  /**
   * @description antd.slider的classname
   */
  className?: string,
  /**
   * @description 最外层容器的style
   */
  style?: React.CSSProperties | undefined,
  /**
   * @description antd.slider的styles
   */
  styles?: SliderSingleProps['styles']
}

function Progress({
  className = '', style = undefined, styles = undefined
}: Props): JSX.Element {
  const {
    audio, currentPercent, setCurrentPercent, setChanging
  } = useMusicPlayStore()

  const onChange = (val: number) => {
    if (!audio) return
    setChanging(true)
    setCurrentPercent(val)
  }

  const onChangeComplete = (val: number) => {
    if (!audio) return
    setChanging(false)
    audio.currentTime = (val / 100) * audio.duration
  }

  return (
    <div className="flex items-center justify-center" style={style}>
      <Slider
        className={className}
        styles={styles}
        tooltip={{ open: false }}
        value={currentPercent}
        onChange={onChange}
        onChangeComplete={onChangeComplete}
      />
    </div>
  )
}

export default Progress
