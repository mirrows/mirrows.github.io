import { NormalObj } from "@/types/common"
import { query } from "@/utils/api"
import { stone } from "@/utils/global"

const baseUrl = process.env.NEXT_PUBLIC_EXTRA_URL;

export const initGemini = (data: NormalObj<any>) => {
  return query({
    baseUrl,
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
    baseUrl,
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
    baseUrl,
    path: '/gemini/answer',
    method: 'POST',
    params: data,
    headers: {
      token: btoa(stone.get('ipDetail').ip)
    },
  })
}