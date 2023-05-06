import { query } from "@/utils/api"
import { stone } from "@/utils/global"

export const about = () => {
  return query({
    path: '/about'
  })
}

export const addComment = (body: string) => {
  return query({
    path: '/github/addComment',
    method: 'post',
    params: { number: 2, body, },
    headers: stone.data.token ? { Authorization: `token ${stone.data.token}` } : {}
  })
}

export const queryComments = (page: number) => {
  return query({
    path: '/github/queryComments',
    method: 'get',
    query: { number: 2, page },
    headers: stone.data.token ? { Authorization: `token ${stone.data.token}` } : {}
  })
}