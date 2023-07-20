import { query } from "@/utils/api"
import { stone } from "@/utils/global"
import { ListArticalParams } from "./main"

export const about = () => {
  return query({
    path: '/about'
  })
}

export const addComment = (body: string, number = 2) => {
  return query({
    path: '/github/addComment',
    method: 'post',
    params: { number, body, },
    headers: stone.data.token ? { Authorization: `token ${stone.data.token}` } : {}
  })
}

export const queryComments = (params?: ListArticalParams) => {
  return query({
    path: '/github/queryComments',
    method: 'get',
    query: params,
    headers: stone.data.token ? { Authorization: `token ${stone.data.token}` } : {}
  })
}