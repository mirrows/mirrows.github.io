export const deepClone = <T>(data: T): T => {
  return JSON.parse(JSON.stringify(data))
}

export const parseObj2queryStr = (obj: { [key: string]: any } | undefined) => {
  const data = obj ? Object.keys(obj).map(key => `${key}=${String(obj[key])}`).join('&') : ''
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

export const hashCode = (s: string) => {
  if (s.length == 0) return 0;
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};