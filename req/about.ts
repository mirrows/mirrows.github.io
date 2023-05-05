import { query } from "@/utils/api"

export const about = () => {
  return query({
    path: '/about'
  })
}