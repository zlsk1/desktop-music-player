import { nativeImage } from 'electron'
import path from 'path'

export const getNativeImagePath = (name: string) => {
  return nativeImage.createFromPath(path.join(__dirname, '../../public', name))
}
