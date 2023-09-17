
export type Pic = {
  download_url: string,
  preview_url?: string,
  normal_url?: string,
  cdn_url: string,
  sha: string,
  path: string,
  name: string,
  loaded: boolean
}

export type Mode = "private" | "photo"
