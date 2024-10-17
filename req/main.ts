import { ArticalParams } from "@/types/blogs";
import { NormalObj } from "@/types/common";
import { IPDetail } from "@/types/global";
import { githubApi, githubQuery, query } from "@/utils/api";
import { stone } from "@/utils/global";
import JsonP from 'jsonp'

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

// export const ipQuery = () => {
//   return query({
//     path: '/ip',
//   })
// }

export const ipQuery = () => {
  return new Promise<{ data: IPDetail }>(res => {
    const detail = stone.get('ipDetail')
    const timer = setTimeout(() => {
      clearTimeout(timer)
      if (detail?.ip) return { data: JSON.parse(sessionStorage.detail) };
      return JsonP('https://ip.useragentinfo.com/jsonp', {
        param: 'callback',
        name: 'callback'
      }, (err, data: IPDetail) => {
        console.log(err, data);
        res({
          data,
        })
      })
    })
  })
}

// export const ipQuery = () => {
//   return req({
//     path: 'https://ip.useragentinfo.com/json',
//   })
// }

// export const ipQuery = () => {
//   return req({
//     path: 'http://ip.taobao.com/service/getIpInfo2.php',
//     method: 'post',
//   })
// }

export type ListArticalParams = {
  number?: number,
  per_page?: number,
  page?: number,
}

export const listArtical = (params?: ListArticalParams) => {
  return githubQuery({
    path: '/github/listArticals',
    method: 'get',
    ...(params ? { query: params } : {})
  })
}


export const addArtical = (params: ArticalParams) => {
  return githubQuery({
    path: '/github/addArtical',
    method: 'post',
    params,
  })
}

export const editArtical = (params: ArticalParams) => {
  return githubQuery({
    path: '/github/editArtical',
    method: 'post',
    params,
  })
}

export const bingQuery = (n = 7) => {
  return query({
    path: '/bing',
    query: { n }
  })
}

export const randomUser = () => {
  return query({
    baseUrl: 'https://randomuser.me/api/',
  })
}

export const bingQueryNew = (n = 7) => {
  return githubQuery({
    path: '/github/queryComments',
    method: 'get',
    query: {
      number: 1,
      per_page: 7,
      page: 1,
      since: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  })
  // export const queryComments = (params?: ListArticalParams) => {
  //   return githubQuery({
  //     path: '/github/queryComments',
  //     method: 'get',
  //     query: params,
  //   })
  // }
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
