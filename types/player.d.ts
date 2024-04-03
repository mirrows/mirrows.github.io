export type SongTypeMap = 'kugou' | 'migu' | 'netease' | 'qqmusic';


export type PlayerSong = {
  id: string,
  from: SongTypeMap,
  name: string,
  avatar: string,
  singers: string,
  src: string
  duration: number,
  time: number,
}