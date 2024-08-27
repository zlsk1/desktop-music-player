export const formatDuration = (duration?: number, split: string = ':'): string => {
  if (!duration) return '00:00'
  const ms = [60, 60 * 60]
  if (duration < ms[0]) return `00:${duration}`
  const s = String(Math.floor((duration / ms[0]) % ms[0]))
  const m = String(Math.floor(duration / ms[0]))
  return `${m.length === 1 ? m.padStart(2, '0') : s}${split}${s.length === 1 ? s.padStart(2, '0') : s}`
}
