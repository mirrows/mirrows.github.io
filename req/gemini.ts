import { NormalObj } from "@/types/common"
import { query } from "@/utils/api"
import { stone } from "@/utils/global"

export const initGemini = (data: NormalObj<any>) => {
  return query({
    baseUrl: 'http://use.t-n.top',
    path: '/gemini/init_global',
    method: 'POST',
    params: data,
    headers: {
      token: btoa(stone.get('ipDetail').ip)
    },
  })
}

export const chatQuestion = (data: NormalObj<any>) => {
  return query({
    baseUrl: 'http://use.t-n.top',
    path: '/gemini/question',
    method: 'POST',
    params: data,
    headers: {
      token: btoa(stone.get('ipDetail').ip)
    },
  })
}

export const chatAnswer = (data: NormalObj<any>) => {
  return query({
    baseUrl: 'http://use.t-n.top',
    path: '/gemini/answer',
    method: 'POST',
    params: data,
    headers: {
      token: btoa(stone.get('ipDetail').ip)
    },
  })
}