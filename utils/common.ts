import { useEffect, useRef, useState } from "react"

export const isBrowser = typeof window !== 'undefined'

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

export const Format = function (time: Date, fmt = "YYYY-MM-DD") {
  var o = {
    "M+": time.getMonth() + 1, //月份
    "D+": time.getDate(), //日
    "H+": time.getHours(), //小时
    "m+": time.getMinutes(), //分
    "s+": time.getSeconds(), //秒
    "q+": Math.floor((time.getMonth() + 3) / 3), //季度
    "S": time.getMilliseconds() //毫秒
  } as any
  if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

export const useDebos = (cb: Function, timeout = 300) => {
  let timer = useRef<NodeJS.Timeout | null>(null);
  return (...props: any) => {
    timer.current && clearTimeout(timer.current)
    timer.current = setTimeout(cb.bind(this, ...props), timeout)
  }
}

export const isMobile = isBrowser ? /Android|webOS|iPhone|iPad|iPod|IOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) : false

export const useMobile = () => {
  const [isMobile, setMobile] = useState(false);
  useEffect(() => {
    addEventListener('resize', () => {
      setMobile(/Android|webOS|iPhone|iPad|iPod|IOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    })
  }, []);
  return isMobile
}

export const randomString = (length = 4, chars = 'abcdefghijklmnopqrstuvwxyz'): string => {
  return [...Array(length)].map(_ => chars.charAt(Math.floor(Math.random() * chars.length))).join('')
}

export const toCDN = (url: string, params: string | {pc: string, mobile: string}) => {
  const mobile = isMobile;
  return `https://wsrv.nl/?url=${url.replace('https://', '')}${
    typeof params !== 'string'
      ? mobile 
        ? (params.mobile ? `&${params.mobile}` : '') 
        : (params.pc ? `&${params.pc}` : '')
      : params ? `&${params}` : ''
    }&n=-1&q=80`
}

export const randomColor = (num = Math.random()) => {
  return `#${(+String(num).slice(4, 12)).toString(16).padStart(6, '0').slice(-6)}`
}

export const copy = (str: string) => {
  const input = document.createElement('input');
  input.value = str;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}
