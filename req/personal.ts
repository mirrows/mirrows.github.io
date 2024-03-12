import { query } from "@/utils/api"

type ssParams = {
  config: {
    host: string,
    port: number,
    username: string,
    password: string
  },
  port: number,
  method: string
}
export const setShadowsockConfig = (data: ssParams) => {
  return query({
    path: '/ssh/shadowsock',
    method: 'POST',
    params: data
  })
}