import { parseObj2queryStr } from "./common"
import { stone } from "./global"

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
      Authorization: `token ${stone.data.token}`,
      ...(options?.headers || {})
    }
  }).then(res => res.json())
    .catch(err => {
      console.log(err)
    })
}

const query = (options: Options) => {
  return fetch(`${baseUrl}${options.path}${parseObj2queryStr(options.query)}`, {
    method: options.method || 'GET',
    headers: options.headers,
    body: JSON.stringify(options.params),
  }).then(res => res.json())
    .catch(err => {
      console.log(err)
    })
}


export {
  githubApi,
  query
}