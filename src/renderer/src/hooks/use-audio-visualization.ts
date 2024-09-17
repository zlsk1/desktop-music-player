const defaultOptions = {
  fftSize: 512,
  lineHeight: 64,
  width: document.body.getBoundingClientRect().width! * 0.9,
  bg: '#1677ff'
}

const audioCtx = new window.AudioContext()
const analyser = audioCtx.createAnalyser()
let source: MediaElementAudioSourceNode
let isInit = false

export const useAudioVisualization = (
  audio: HTMLAudioElement | null,
  canvas: HTMLCanvasElement | null,
  options: Partial<typeof defaultOptions> = defaultOptions
) => {
  const normalizedOptions = {
    ...defaultOptions,
    ...options
  }

  const create = () => {
    if (!audio || isInit) return
    source = audioCtx.createMediaElementSource(audio)

    source?.connect(analyser)
    analyser.connect(audioCtx.destination)

    analyser.fftSize = normalizedOptions.fftSize

    isInit = true
  }

  const draw = () => {
    requestAnimationFrame(draw)

    const bufferLength = analyser.frequencyBinCount
    const buffer: Uint8Array = new Uint8Array(bufferLength)
    analyser?.getByteFrequencyData(buffer)

    const datas = new Array(bufferLength * 2)

    for (let i = bufferLength; i > 0; i -= 1) {
      datas[bufferLength - i] = buffer[i]
      datas[datas.length - i] = buffer[bufferLength - i]
    }

    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const height = normalizedOptions.lineHeight
    canvas.width = normalizedOptions.width
    canvas.height = height

    ctx.fillStyle = 'transparent'
    ctx.fillRect(0, 0, normalizedOptions.width, height)
    const barWidth = normalizedOptions.width / datas.length
    let barHeight
    let x = 0
    for (let i = 0; i < datas.length; i += 1) {
      barHeight = (datas[i] / 255) * normalizedOptions.lineHeight

      ctx.fillStyle = normalizedOptions.bg
      ctx.fillRect(x, height, barWidth, -barHeight)

      x += barWidth
    }
    console.log(1)
  }

  return {
    draw,
    create
  }
}
