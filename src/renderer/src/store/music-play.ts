/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import { createSelector } from '../utils'

export interface MusicPlay {
  audio: HTMLAudioElement | null,
  paused: boolean,
  createAudio: (audio: MusicPlay['audio']) => void,
  setSource: (url: string) => void,
  play: () => void,
  pause: () => void
}

const useMusicPlayStoreBase = create<MusicPlay>((set, get) => ({
  audio: null,
  paused: true,
  createAudio: (audio) => { set({ audio }) },
  setSource: (url) => {
    const { audio } = get()
    if (!audio) return
    audio.src = url
  },
  play: () => {
    const { audio } = get()
    if (!audio) return
    audio.play()
    set({ paused: false })
  },
  pause: () => {
    const { audio } = get()
    if (!audio) return
    audio.pause()
    set({ paused: true })
  }
}))

export const useMusicPlayStore = createSelector(useMusicPlayStoreBase)
