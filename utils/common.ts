export const deepClone = <T>(data: T): T => {
  return JSON.parse(JSON.stringify(data))
}