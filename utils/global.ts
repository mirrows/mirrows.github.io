import { EventEmits, GblData } from "@/types/global";
import { deepClone } from "./common";
import { NormalObj } from "@/types/common";
import { UserInfo } from "@/types/github";
import md5 from "md5";

const gbData: GblData = {
  number: 0,
  str: '',
  token: '',
  userInfo: {},
  preview: {},
  stayTime: 0,
  bing: [],
  ipDetail: {},
  emit: () => { }
}

class Unique {
  private current = 0
  get(solt?: string) {
    const id = md5(`${solt || (gbData.ipDetail.ip + String(Math.random()).slice(3, 7))}${this.current}`)
    this.current += 1
    return id
  }
  show() {
    return this.current
  }
}

export const unique = new Unique()

export const env = {
  messUrl: process.env.NEXT_PUBLIC_MESS_URL,
  extraUrl: process.env.NEXT_PUBLIC_EXTRA_URL,
  user: process.env.NEXT_PUBLIC_GITHUB_USER,
  clientID: process.env.NEXT_PUBLIC_CLIENT_ID,
  loadingGif: process.env.NEXT_PUBLIC_LOADING_GIF,
  userToken: process.env.NEXT_PUBLIC_FIXED_GITHUB_TOKEN,
  id: process.env.NEXT_PUBLIC_GITHUB_ID,
  env: process.env.NEXT_PUBLIC_ENV,
}



export const stone = {
  data: { ...gbData },
  events: {} as NormalObj<Function[]>,
  get(key: keyof typeof gbData) {
    return deepClone(this.data[key]);
  },
  set(newData: Partial<typeof gbData>) {
    this.data = { ...this.data, ...newData };
    // localStorage.setItem('tmpData', JSON.stringify(stone.data))
  },
  on<T extends keyof EventEmits>(name: T, cb: EventEmits[T]) {
    this.events[`event_${name}`] || (this.events[`event_${name}`] = [])
    this.events[`event_${name}`].push(cb)
  },
  async emit<T extends keyof EventEmits>(name: T, ...props: Parameters<EventEmits[T]>) {
    const events = this.events[`event_${name}`]?.filter((e: Function) => !!e) || []
    if (!events?.length) return
    for (let i = 0; i < events.length; i++) {
      await events[i](...props)
    }
  },
  clearEmit<T extends keyof EventEmits>(name: T) {
    delete this.events[`event_${name}`];
  },
  isGithubOwner(cb: (isOwner: boolean) => void) {
    console.log(this.data);
    return new Promise(res => {
      if (stone.data.userInfo?.login) {
        console.log(stone.data.userInfo.id, env.id);
        cb(stone.data.userInfo.login === env.user && (!!env.id || String(stone.data.userInfo.id) === env.id))
        res(stone.data.userInfo.login === env.user && (!!env.id || String(stone.data.userInfo.id) === env.id))
      } else {
        stone.on('github', (data: UserInfo) => {
          cb(stone.data.login === env.user && (!!env.id || String(data.id) === env.id))
          res(stone.data.login === env.user && (!!env.id || String(data.id) === env.id))
        })
        cb(false);
        res(false);
      }
    })
  }
}

export const logout = () => {
  stone.set({
    token: '',
    userInfo: {},
  })
  // localStorage.setItem('tmpData', JSON.stringify(stone.data))
}

if (typeof window !== "undefined") {
  if (localStorage.tmpData) {
    const data = JSON.parse(localStorage.tmpData)
    if (Date.now() - (data.lastTime || 0) > 3 * 24 * 60 * 60 * 1000) {
      data.token = ''
      data.userInfo = {}
      data.stayTime = 0
      data.ipDetail = {}
    }
    if (data?.ipDetail && data.ipDetail.ip) {
      sessionStorage.setItem('detail', JSON.stringify(data.ipDetail))
    }
    stone.set(data)
    localStorage.removeItem('tmpData')
  }

  window.addEventListener('beforeunload', (e) => {
    setTimeout(() => {
      localStorage.setItem('tmpData', JSON.stringify(stone.data))
    })
  })
}

