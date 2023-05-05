import { UserInfo } from "./github";

export type Preview = {
  ip: string,
  data: {
    total: number,
    today: number,
    visitorTime: number,
  }
}

export type BingPic = {
  url: string,
  title: string,
  copyright: string,
  copyrightlink: string,
}

export type GblData = {
  number: number,
  str: string,
  token: string,
  userInfo?: Partial<UserInfo>,
  preview?: Partial<Preview>,
  stayTime: number,
  bing: BingPic[]
}