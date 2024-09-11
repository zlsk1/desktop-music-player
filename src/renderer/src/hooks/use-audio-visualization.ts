export const useAudioVisualization = (audio: HTMLAudioElement, fftSize: number) => {
  const audioCtx = new window.AudioContext()
  const analyser = audioCtx.createAnalyser()
  const source = audioCtx.createMediaElementSource(audio)

  source?.connect(analyser)
  analyser.connect(audioCtx.destination)

  analyser.fftSize = fftSize
  const bufferLength = analyser.frequencyBinCount

  const draw = () => {
    requestAnimationFrame(draw)
    const data: Uint8Array = new Uint8Array(bufferLength)
    analyser?.getByteFrequencyData(data)

    const canvas = document.getElementById('canvas')! as HTMLCanvasElement
    const ctx = canvas.getContext('2d')!
    const width = bufferLength
    const height = 200
    canvas.width = width
    canvas.height = height

    ctx.fillStyle = 'rgb(0, 0, 0)'
    ctx.fillRect(0, 0, width, height)
    const barWidth = 1
    let barHeight
    let x = 0
    for (let i = 0; i < bufferLength; i += 1) {
      barHeight = (data[i] / 255) * 200

      ctx.fillStyle = `rgb(${barHeight + 100},50,50)`
      ctx.fillRect(x, height, barWidth, -barHeight)

      x += barWidth + 1
    }
  }

  return {
    draw
  }
}
