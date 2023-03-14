import { NormalObj, Prettify } from "@/types/common";
import { githubApi } from "@/utils/api";

export const queryUser = () => {
  return githubApi({ path: '/user' })
}

// get请求
// export const queryOther = (params: NormalObj) => {
//   return githubApi({ path: '/user', params })
// }

// post请求
// export const queryOther = (body: NormalObj) => {
//   return githubApi({ path: '/user', body })
// }
