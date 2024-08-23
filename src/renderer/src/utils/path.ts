export const excludeExtention = (path: string) => {
  return path.slice(0, path.lastIndexOf('.'))
}
