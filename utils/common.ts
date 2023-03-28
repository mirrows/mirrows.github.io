export const deepClone = <T>(data: T): T => {
  return JSON.parse(JSON.stringify(data))
}

export const parseObj2queryStr = (obj: { [key: string]: any }) => {
  const data = Object.keys(obj).map(key => `${key}=${String(obj[key])}`).join('&')
  return data ? `?${data}` : ''
}
export const parsequeryStr2Obj = (str: string) => {
  const obj: { [key: string]: string } = {}
  const data = str.split('?')[1]?.split('&').forEach((item) => {
    const [key, value] = item.split('=')
    obj[key] = value
  })
  return obj
}