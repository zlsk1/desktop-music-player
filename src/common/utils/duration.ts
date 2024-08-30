export const formatDuration = (duration?: number, split: string = ':'): string => {
  if (!duration) return '00:00'
  const arr = [60, 60 * 60]
  if (duration < arr[0]) return `00:${duration.toFixed(0).padStart(2, '0')}`
  const s = String(Math.floor(duration % arr[0]))
  const m = String(Math.floor(duration / arr[0]))
  return `${m.length === 1 ? m.padStart(2, '0') : s}${split}${s.length === 1 ? s.padStart(2, '0') : s}`
}
