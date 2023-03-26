import { useRef } from "react";
import { deepClone } from "./common";


const gbData = {
  number: 0,
  str: '666',
  token: '',
  userInfo: {},
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

  window.onbeforeunload = () => {
    console.log(localStorage, sessionStorage, stone.data)
    sessionStorage.setItem('tmpData', JSON.stringify(stone.data))
  }
}

