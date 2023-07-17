import { query } from "@/utils/api"
import { stone } from "@/utils/global"

type UploadMiniParams = {
  content: string,
  path: string
}

export const uploadBase64 = (params: UploadMiniParams) => {
  return query({
    path: '/demos/uploadBase64',
    method: 'put',
    headers: {
      timestamp: Date.now(),
      'content-type': 'application/json',
      ...(stone.data.token ? { Authorization: `token ${stone.data.token}` } : {})
    },
    params,
  })
}

type UploadUrlParams = {
  url: string,
  path: string
}

export const uploadUrl = (params: UploadUrlParams) => {
  return query({
    path: '/demos/uploadUrl',
    method: 'put',
    headers: {
      timestamp: Date.now(),
      'content-type': 'application/json',
      ...(stone.data.token ? { Authorization: `token ${stone.data.token}` } : {})
    },
    params,
  })
}

export const queryPicList = (path: string) => {
  return query({
    path: '/demos/queryPicList',
    method: 'post',
    headers: {
      'content-type': 'application/json',
      ...(stone.data.token ? { Authorization: `token ${stone.data.token}` } : {})
    },
    params: {
      path,
    }
  })
}

type DeletePicParams = {
  sha: string,
  path: string
}

export const deletePic = (params: DeletePicParams) => {
  return query({
    path: '/demos/deletePic',
    method: 'post',
    headers: {
      timestamp: Date.now(),
      'content-type': 'application/json',
      ...(stone.data.token ? { Authorization: `token ${stone.data.token}` } : {})
    },
    params,
  })
}