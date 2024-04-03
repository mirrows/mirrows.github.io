import { query } from "@/utils/api"

export const kugouSearch = (keyword: string) => {
  return query({
    path: '/kugou/search',
    query: { keyword },
  })
}

export const kugouSong = (id: string) => {
  return query({
    path: '/kugou/song',
    query: { id },
  })
}

export const miguSearch = (keyword: string) => {
  return query({
    path: '/migu/search',
    query: { keyword },
  })
}

export const qqSearch = (keyword: string) => {
  return query({
    path: '/qq/search',
    query: { keyword },
  })
}

type QQSongQuery = {
  id: string,
  mediaId?: string,
  type?: string,
}

export const qqSong = (params: QQSongQuery) => {
  return query({
    path: '/qq/song',
    query: params,
  })
}

export const neteaseSearch = (keyword: string) => {
  return query({
    path: '/netease/search',
    query: { keyword },
  })
}
