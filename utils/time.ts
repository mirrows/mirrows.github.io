export const parseDuration = (timestamp: number) => {
  return `${Math.ceil(timestamp / 60)}:${String(timestamp % 60).padStart(2, '0')}`
}