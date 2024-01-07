import { Mode } from "@/types/demos"
import { githubQuery } from "@/utils/api"

type UploadMiniParams = {
  content: string,
  path: string,
  mode: Mode
}


export enum ModeMap {
  PHOTO = "photo",
  PRIVATE = "private"
}

export const uploadBase64 = (params: UploadMiniParams) => {
  return githubQuery({
    path: '/demos/uploadBase64',
    method: 'put',
    headers: {
      timestamp: Date.now(),
    },
    params,
  })
}

type UploadUrlParams = {
  url: string,
  path: string,
  mode: Mode
}

export const uploadUrl = (params: UploadUrlParams) => {
  return githubQuery({
    path: '/demos/uploadUrl',
    method: 'put',
    headers: {
      timestamp: Date.now(),
    },
    params,
  })
}

export const queryPicList = (path: string, mode: Mode) => {
  return githubQuery({
    path: '/demos/queryPicList',
    method: 'post',
    params: {
      path,
      mode,
    }
  })
}

export const queryPic = (path: string, mode: Mode) => {
  return githubQuery({
    path: '/demos/queryPic',
    method: 'post',
    params: {
      path,
      mode,
    }
  })
}

type DeletePicParams = {
  sha: string,
  path: string
  mode: Mode
}

export const deletePic = (params: DeletePicParams) => {
  return githubQuery({
    path: '/demos/deletePic',
    method: 'post',
    headers: {
      timestamp: Date.now(),
    },
    params,
  })
}