import { parseObj2queryStr } from "./common"
import { env, stone } from "./global"

type Options = {
  path: string,
  query?: { [key: string]: any },
  params?: { [key: string]: any },
  [key: string]: any
}

const baseUrl = process.env.NEXT_PUBLIC_MESS_URL;

const githubApi = ({ path, ...options }: Options) => {
  return fetch('https://api.github.com' + path, {
    method: options.method || 'GET',
    body: JSON.stringify(options.data),
    ...(options || {}),
    headers: {
      Accept: 'application/vnd.github+json',
      ...(stone.data.token ? { Authorization: `token ${stone.data.userInfo?.login === env.user ? env.userToken : stone.data.token}` } : {}),
      ...(options?.headers || {}),
    }
  }).then(res => res.json())
    .catch(err => {
      console.log(err)
    })
}

const query = (options: Options) => {
  const { method, path, query, headers, params, ...others } = options
  return fetch(`${baseUrl}${path}${parseObj2queryStr(query)}`, {
    method: method || 'GET',
    headers: { "content-type": "application/json", ...headers},
    body: params && JSON.stringify(params),
    ...others,
  }).then(res => res.json())
    .catch(err => {
      console.log(err)
    })
}

const githubQuery = (options: Options) => {
  const { method, path, query, headers, params, ...others } = options
  return fetch(`${baseUrl}${path}${parseObj2queryStr(query)}`, {
    method: method || 'GET',
    headers: {
      "content-type": "application/json",
      Authorization: `token ${stone.data.userInfo?.login === env.user ? env.userToken : stone.data.token}`
    },
    body: params && JSON.stringify(params),
    ...others,
  }).then(res => res.json())
    .catch(err => {
      console.log(err)
    })
}

const req = (options: Options) => {
  const { method, path, query, headers, params, ...others } = options
  return fetch(`${path}${parseObj2queryStr(query)}`, {
    method: method || 'GET',
    headers: { "Content-Type": "application/json;charset=UTF-8", ...headers},
    body: params && JSON.stringify(params),
    ...others,
  }).then(res => res.json())
    .catch(err => {
      console.log(err)
    })
}



export {
  githubApi,
  query,
  githubQuery,
  req,
}