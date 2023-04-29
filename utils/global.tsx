import { GblData } from "@/types/global";
import { useRef } from "react";
import { deepClone } from "./common";

const gbData: GblData = {
  number: 0,
  str: '666',
  token: '',
  userInfo: {},
  preview: {},
  stayTime: 0,
}

export const stone = {
  data: { ...gbData },
  get(key: keyof typeof gbData) {
    return deepClone(this.data[key]);
  },
  set(newData: Partial<typeof gbData>) {
    this.data = { ...this.data, ...newData };
  }
}

if (typeof window !== "undefined") {
  if (sessionStorage.tmpData) {
    stone.set(JSON.parse(sessionStorage.tmpData))
    sessionStorage.removeItem('tmpData')
  }

  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('tmpData', JSON.stringify(stone.data))
  })
}

