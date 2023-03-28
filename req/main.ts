import { NormalObj, Prettify } from "@/types/common";
import { crosApi, githubApi } from "@/utils/api";

export const queryToken = (data: NormalObj) => {
  return crosApi({
    path: 'https://github.com/login/oauth/access_token',
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
    },
    data,
  })
}

export const queryToken2 = (data: NormalObj) => {
  return fetch('https://api.t-n.top/github/token', {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(res => res.json())
}

export const queryUser = () => {
  return githubApi({ path: '/user' })
}

// export const dictQuery = () => {
//   return crosApi({
//     path: 'http://dict-co.iciba.com/api/dictionary.php',
//     params: {
//       w: 'go',
//       key: '1F9CA812CB18FFDFC95FC17E9C57A5E1',
//       type: 'json',
//     }
//   })
// }

export const dictQuery = () => {
  return fetch('https://api.t-n.top/ciba/translation?w=go').then(res => res.json())
}

// export const bingQuery = () => {
//   return crosApi({
//     path: 'https://cn.bing.com/HPImageArchive.aspx',
//     params: {
//       format: 'js',
//       n: '7',
//       mkt: 'zh-CN',
//     }
//   })
// }


export const bingQuery = () => {
  return fetch('https://api.t-n.top/bing?n=7').then(res => res.json())
}
// get请求
// export const queryOther = (params: NormalObj) => {
//   return githubApi({ path: '/user', params })
// }

// post请求
// export const queryOther = (body: NormalObj) => {
//   return githubApi({ path: '/user', body })
// }
