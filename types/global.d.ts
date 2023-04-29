import { UserInfo } from "./github";

export type Preview = {
  ip: string,
  data: {
    total: number,
    today: number,
    visitorTime: number,
  }
}


export type GblData = {
  number: number,
  str: string,
  token: string,
  userInfo?: Partial<UserInfo>,
  preview?: Partial<Preview>,
  stayTime: number,
}