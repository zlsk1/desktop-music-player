import type { IAudioMetadata } from 'music-metadata'
import { formatDuration, bytesToBase64 } from '.'

interface MusicInfo {
  title?: string,
  img?: string,
  artist?: string;
  artists?: string[];
  album?: string;
  formatDuration?: string;
  duration?: number
}

export const getMusicMetadata = async (path: string): Promise<IAudioMetadata | undefined> => {
  return import('music-metadata').then(({ parseFile }) => {
    return new Promise<IAudioMetadata | undefined>((reslove, reject) => {
      try {
        parseFile(path).then((res) => reslove(res))
      }
      catch (err) {
        console.warn('cannot resolve metadata for the path')
        reject(err)
      }
    })
  })
}

export const getMusicInfo = (metadata?: IAudioMetadata): MusicInfo => {
  if (!metadata) return {}

  return {
    title: metadata.common.title,
    img: metadata.common.picture && bytesToBase64(metadata.common.picture[0].data),
    artist: metadata.common.artist,
    artists: metadata.common.artists,
    album: metadata.common.album,
    formatDuration: formatDuration(metadata.format.duration),
    duration: metadata.format.duration
  }
}
