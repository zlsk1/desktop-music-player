declare module 'colorthief' {
  import { IntRange } from '@renderer/utils'

  class Colorthief {
    getColor: (img: HTMLImageElement, quality?: number) =>
      [IntRange<1, 255>, IntRange<1, 255>, IntRange<1, 255>]
    getPalette: (img: HTMLImageElement, colorCount?: IntRange<2, 20>, quality?: number) =>
      [IntRange<1, 255>, IntRange<1, 255>, IntRange<1, 255>][]
  }

  export default Colorthief
}
