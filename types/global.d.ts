import { UserInfo } from "./github";
import { PlayerSong } from "./player";

export type Preview = {
  ip: string,
  data: {
    total: number,
    today: number,
    visitorTime: number,
  },
}

export type IPDetail = {
  area: string,
  city: string,
  country: string,
  ip: string,
  isp: string,
  net: string,
  province: string,
  short_name: string,
}

export type BingPic = {
  url: string,
  title: string,
  content: string,
  copyright: string,
  copyrightlink: string,
  date: string,
  [key: string]: any
}

export type Artical = {
  id: number,
  body: string,
  title: string,
  labels: [{ id: number, color: string, name: string }],
  created_at: string,
  updated_at: string,
  state: string,
  locked: boolean,
  number: number,
  img: string,
  comments: number,
}

export type Comment = {
  body: string,
  id: string,
  updatedAt: string,
  author: {
    avatar_url: string,
    login: string,
    url: string,
  }
}

export type GblData = {
  number: number,
  str: string,
  token: string,
  userInfo?: Partial<UserInfo>,
  preview?: Partial<Preview>,
  stayTime: number,
  bing: BingPic[],
  emit: Function,
  [key: string]: any
}

export type EventEmits = {
  'ip': (props: { data: {data: Preview['data']}, detail: IPDetail }) => void,
  'github': (info: UserInfo) => void,
  'jsonpIp': (props: IPDetail) => void
  'addSong': (song: PlayerSong) => void
  'playSong': (song: PlayerSong) => void
}

export type styled = any