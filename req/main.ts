import { NormalObj, Prettify } from "@/types/common";
import { githubApi, query } from "@/utils/api";

export const queryGithubToken = (data: NormalObj) => {
  return query({
    path: '/github/token',
    method: 'POST',
    params: data
  })
}

export const queryUser = () => {
  return githubApi({ path: '/user' })
}

export const dictQuery = (w: string) => {
  return query({
    path: '/ciba/translation',
    query: { w }
  })
}

export const bingQuery = (n = 7) => {
  return query({
    path: '/bing',
    query: { n }
  })
}

export const statisticVisitor = (time = 0) => {
  return query({
    path: '/visitor',
    method: 'post',
    params: { time },
    keepalive: true,
  })
}

export const visitorsData = () => {
  return query({
    path: '/visitor',
  })
}
