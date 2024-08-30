/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import localforage from 'localforage'
import { usePlaySetting } from '@renderer/hooks/use-play-setting'
import { createSelector } from '../utils'

export type SongInfo = {
  name: string,
  url: string,
  img: string | undefined,
  artist: string,
  artists: string[]
}

export type MusicPlay = {
  audio: HTMLAudioElement | null,
  songQueue: SongInfo[],
  currentIndex: number,
  currentPercent: number,
  changing: boolean,
  createAudio: (audio: MusicPlay['audio']) => void,
  setSource: (source: SongInfo) => void,
  setMultipleSources: (sources: SongInfo[]) => void,
  insertAtNext: (source: SongInfo) => void,
  init: (index: number) => Promise<void>,
  setIndex: (index: number) => void,
  setCurrentPercent: (currentTime: number) => void,
  setChanging: (changing: boolean) => void,
  setSongQueue: (source: SongInfo | SongInfo[]) => void,
}

export const useMusicPlayStoreBase = create<MusicPlay>((set, get) => {
  const { setPlaySetting } = usePlaySetting()

  const setSongQueue: MusicPlay['setSongQueue'] = (source: SongInfo | SongInfo[]) => {
    if (Array.isArray(source)) {
      set({ songQueue: source })
      localforage.setItem('songQueue', source)
    }
    else {
      const queue = get().songQueue
      queue.push(source)
      set({ songQueue: queue })
      localforage.setItem('songQueue', queue)
    }
  }

  const removeDuplicates = (sources: SongInfo[], songQueue: SongInfo[]) => {
    return sources.filter((source) => {
      return !songQueue.some((v) => v.url === source.url)
    })
  }

  return {
    audio: null,
    songQueue: [],
    currentIndex: 0,
    currentPercent: 0,
    changing: false,
    createAudio: (audio) => { set({ audio }) },
    setSource: (source: SongInfo) => {
      const { audio, songQueue } = get()
      if (!audio) return

      audio.src = source.url
      const idx = songQueue.findIndex((v) => v.url === source.url)

      if (idx > -1) {
        set({ currentIndex: idx })
        setPlaySetting({ index: idx })
      }
      else {
        setSongQueue(source)
        set({ currentIndex: songQueue.length - 1 })
        setPlaySetting({ index: songQueue.length - 1 })
      }
    },
    setMultipleSources: (sources: SongInfo[]) => {
      const { songQueue, audio } = get()
      const start = songQueue.length // 新资源插入的位置
      const newSources = removeDuplicates(sources, songQueue)

      if (audio) audio.src = sources[0].url
      set({ currentIndex: start })
      setPlaySetting({ index: start })
      setSongQueue([...songQueue, ...newSources])
    },
    insertAtNext: (source: SongInfo) => {
      const { songQueue, currentIndex } = get()
      songQueue.splice(currentIndex + 1, 0, source)
      set({ songQueue })
      setSongQueue(songQueue)
    },
    init: async (currentIndex: number) => {
      set({
        songQueue: await localforage.getItem('songQueue') || [],
        currentIndex
      })
    },
    setIndex: (currentIndex: number) => set({ currentIndex }),
    setCurrentPercent: (currentPercent: number) => set({ currentPercent }),
    setChanging: (changing: boolean) => set({ changing }),
    setSongQueue
  }
})

export const useMusicPlayStore = createSelector(useMusicPlayStoreBase)
