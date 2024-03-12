
export type UserInfo = {
  id: number,
  avatar_url?: string,
  avatarUrl?: string,
  html_url: string,
  login: string,
  email?: string,
}

export type PageInfo = {
  endCursor: string,
  startCursor: string,
  hasNextPage: boolean,
  hasPreviousPage: boolean,
}