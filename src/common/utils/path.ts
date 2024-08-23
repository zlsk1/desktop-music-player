export const excludeExtention = (filepath: string) => {
  return filepath.slice(0, filepath.lastIndexOf('.'))
}

export const getSongNameFromPath = (filepath: string) => {
  const excludePath = excludeExtention(filepath)
  const index = excludePath.lastIndexOf('/')
  return excludePath.slice(index + 1, filepath.length - 1)
}
