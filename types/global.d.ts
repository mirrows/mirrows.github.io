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
  updated_at: string,
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

export type Prefix<T, P extends string> = T extends string ? `${P}${T}` : never;
export type RemovePrefix<T extends string, P extends string> = 
  T extends `${P}${infer Rest}` ? Rest : never;

export type PrefixedEventEventEmits<T> = `event_${T}`;

type ParametersToArray<T> = {
  [K in keyof T]: T[k] extends (...args: infer P) => any ? P : never
}

export type EventEmitsProps<T> = {
  [K in keyof T as `event_${string & K}`]: ParametersToArray<T>[K]
};

export type EventEmits = {
  'ip': (props: { data: { data: Preview['data'] }, detail: IPDetail }) => void,
  'github': (info: UserInfo) => void,
  'jsonpIp': (props: IPDetail) => void
  'addSong': (song: PlayerSong) => void
  'playSong': (song: PlayerSong) => void
}

export type styled = any