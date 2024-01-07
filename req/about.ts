import { githubQuery, query } from "@/utils/api"
import { ListArticalParams } from "./main"

export const about = () => {
  return query({
    path: '/about'
  })
}

export const addComment = (body: string, number = 2) => {
  return githubQuery({
    path: '/github/addComment',
    method: 'post',
    params: { number, body, },
  })
}

export const queryComments = (params?: ListArticalParams) => {
  return githubQuery({
    path: '/github/queryComments',
    method: 'get',
    query: params,
  })
}