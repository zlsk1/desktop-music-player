import { create } from 'zustand'
import { createSelector } from '../utils'

interface MusicQueue {
  currentSong: {
    name: string,
    url: string,
    img: string,
    artist: string,
    artists: string[]
  } | null
}

const useMusicQueueStoreBase = create<MusicQueue>((set) => ({
  currentSong: null
}))

export const useMusicQueueStore = createSelector(useMusicQueueStoreBase)
