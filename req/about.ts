import { query } from "@/utils/api"
import { stone } from "@/utils/global"

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

export const queryComments = (page: number, number = 2) => {
  return query({
    path: '/github/queryComments',
    method: 'get',
    query: { number, page },
    headers: stone.data.token ? { Authorization: `token ${stone.data.token}` } : {}
  })
}