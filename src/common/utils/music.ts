import type { IAudioMetadata } from 'music-metadata'
import { formatDuration } from '.'

interface MusicInfo {
  title?: string,
  artist?: string;
  artists?: string[];
  album?: string;
  formatDuration?: string;
  duration?: number
}

export const getMusicMetadata = async (path: string): Promise<IAudioMetadata | undefined> => {
  const { parseFile } = await import('music-metadata')
  let metadata
  try {
    metadata = await parseFile(path)
  }
  catch {
    console.warn('cannot resolve metadata for the path')
  }
  return metadata
}

export const getMusicInfo = (metadata?: IAudioMetadata): MusicInfo => {
  if (!metadata) return {}
  return {
    title: metadata.common.title,
    artist: metadata.common.artist,
    artists: metadata.common.artists,
    album: metadata.common.album,
    formatDuration: formatDuration(metadata.format.duration),
    duration: metadata.format.duration
  }
}
