// fork https://github.com/bgrins/TinyColor/blob/master/npm/esm/tinycolor.js
/**
 * @description 判断颜色深浅度 遵循https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
 * @example getLuminance([0, 0, 0]) => 0
 * getLuminance([255, 255, 255]) => 1
 */
export const getLuminance = (rgbarr: [number, number, number]) => {
  const rgb = { r: rgbarr[0], g: rgbarr[1], b: rgbarr[2] }
  let R; let G; let B
  const RsRGB = rgb.r / 255
  const GsRGB = rgb.g / 255
  const BsRGB = rgb.b / 255
  if (RsRGB <= 0.03928) R = RsRGB / 12.92; else R = ((RsRGB + 0.055) / 1.055) ** 2.4
  if (GsRGB <= 0.03928) G = GsRGB / 12.92; else G = ((GsRGB + 0.055) / 1.055) ** 2.4
  if (BsRGB <= 0.03928) B = BsRGB / 12.92; else B = ((BsRGB + 0.055) / 1.055) ** 2.4
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}
