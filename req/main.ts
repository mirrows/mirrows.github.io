import { ArticalParams } from "@/types/blogs";
import { NormalObj } from "@/types/common";
import { githubApi, query, req } from "@/utils/api";
import { stone } from "@/utils/global";

export const queryGithubToken = (data: NormalObj<any>) => {
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

export const ipQuery = () => {
  return req({
    path: 'https://ip.useragentinfo.com/json',
  })
}

// export const ipQuery = () => {
//   return req({
//     path: 'http://ip.taobao.com/service/getIpInfo2.php',
//     method: 'post',
//   })
// }


export const listArtical = (number?: number) => {
  return query({
    path: '/github/listArticals',
    method: 'get',
    headers: stone.data.token ? { Authorization: `token ${stone.data.token}` } : {},
    ...(+String(number) + 1 ? { query: {number} } : {})
  })
}


export const addArtical = (params: ArticalParams) => {
  return query({
    path: '/github/addArtical',
    method: 'post',
    headers: stone.data.token ? { Authorization: `token ${stone.data.token}` } : {},
    params,
  })
}

export const editArtical = (params: ArticalParams) => {
  return query({
    path: '/github/editArtical',
    method: 'post',
    headers: stone.data.token ? { Authorization: `token ${stone.data.token}` } : {},
    params,
  })
}

export const bingQuery = (n = 7) => {
  return query({
    path: '/bing',
    query: { n }
  })
}

export const statisticVisitor = (ip: string, time = 0) => {
  return query({
    path: '/visitor',
    method: 'post',
    params: { time, ip },
    keepalive: true,
  })
}

export const visitorsData = (ip: string) => {
  return query({
    path: '/visitor',
    query: { ip },
  })
}
