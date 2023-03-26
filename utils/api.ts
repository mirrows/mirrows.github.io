import { stone } from "./global"

type Options = {
  path: string,
  [key: string]: any
}

const githubApi = ({ path, ...options }: Options) => {
  const par = {
    url: 'https://api.github.com' + path,
    method: 'GET',
    ...(options || {}),
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `token ${stone.data.token}`,
      ...(options?.headers || {})
    },
  }
  return fetch(process.env.NEXT_PUBLIC_MESS_URL || '', {
    method: 'POST',
    body: JSON.stringify(par),
  }).then(res => res.json())
    .catch(err => {
      console.log(err)
    })
}

const crosApi = ({ path, ...options }: Options) => {
  const par = {
    url: path,
    method: 'GET',
    ...(options || {}),
  }
  return fetch(process.env.NEXT_PUBLIC_MESS_URL || '', {
    // fetch('/github/login/oauth/access_token', {
    method: 'POST',
    body: JSON.stringify(par),
  }).then(res => res.json())
    .catch(err => {
      console.log(err)
    })
}

export {
  githubApi,
  crosApi,
}