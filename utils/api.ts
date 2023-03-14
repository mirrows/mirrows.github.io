import { NormalObj } from "@/types/common"

type Options = {
  path: string,
  [key: string]: any
}

const githubApi = ({ path, options }: Options) => {
  const par = {
    url: 'https://api.github.com' + path,
    method: 'GET',
    ...(options || {}),
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `token ${sessionStorage.token}`,
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

export {
  githubApi
}