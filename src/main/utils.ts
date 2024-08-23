import { nativeImage } from 'electron'
import path from 'path'

export const getNativeImagePath = (name: string) => {
  return nativeImage.createFromPath(path.join(__dirname, '../../public', name))
}

export const excludeExtention = (filepath: string) => {
  return filepath.slice(0, filepath.lastIndexOf('.'))
}

export const getSongNameFromPath = (filepath: string) => {
  const excludePath = excludeExtention(filepath)
  const index = excludePath.lastIndexOf('/')
  return excludePath.slice(index + 1, filepath.length - 1)
}

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}
