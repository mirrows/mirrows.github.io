import { randomColor } from '@/utils/common';
import style from './index.module.scss'
import SVGIcon from "@/components/SVGIcon"
import { useEffect, useRef, useState } from 'react';
import { kugouSearch, kugouSong, miguSearch, neteaseSearch, qqSearch, qqSong } from '@/req/music';
import { parseDuration } from '@/utils/time';
import { stone } from '@/utils/global';
import { PlayerSong, SongTypeMap } from '@/types/player';

const Gplayer = () => {
  const [cur, setCur] = useState<PlayerSong & { ind: number }>();
  const [list, setList] = useState<PlayerSong[]>([]);
  const playerRef = useRef<HTMLAudioElement>(null);
  const addSong = (song: PlayerSong) => {
    setList(list => [...list, song])
  }
  const playSong = (song: PlayerSong) => {
    setList(list => [...list, song])
    setCur({
      ...song,
      ind: list.length + 1,
    });
    setTimeout(() => {
      playerRef.current?.play();
    }, 500);
  }
  useEffect(() => {
    stone.on('addSong', addSong)
    stone.on('playSong', playSong)
    return () => {
      stone.clearEmit('addSong')
      stone.clearEmit('playSong')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>
    <div className={style.player_warp}>
      <audio ref={playerRef} src={cur?.src || ''} controls></audio>
    </div>
  </>
}

const QQMusicCard = ({ source = [] }: { source: MusicProps['source'] }) => {
  const getSong = async (song: any) => {
    const data = await qqSong({
      id: song.songmid,
      mediaId: song.media_mid,
    })
    return data?.code === 0 ? data.data : '';
  }
  const operateSong = async (type: 'playSong' | 'addSong', song: any) => {
    const src = await getSong(song);
    stone.emit(type, {
      id: `qqmusic_${song.songmid}`,
      from: 'qqmusic',
      name: song.songname,
      avatar: '',
      singers: song.singer.map((ser: any) => ser.name).join('、'),
      src,
      duration: song.interval,
      time: 0,
    });
  }
  return <div className={style.card_wrap} style={{ backgroundImage: 'radial-gradient(circle at 107% 7%, #d97220 0, #d97220 10%, #efe888 20%, transparent 30%, transparent 100%),radial-gradient(circle at 7% 107% , #d97220 0, #d97220 10%, #efe888 20%, transparent 30%, transparent 100%)' }}>
    {/* linear-gradient(120deg, #efe888 0, #d97220 100%) */}
    {source.map((song, i) => (
      <div key={i} className={style.song_wrap}>
        <div className={style.song_msg}>
          <div>[{parseDuration(song.interval)}] {song.songname}</div>
          <div className={style.singer}>
            {/* <img src="" alt={song.singername} /> */}
            {song.singer.map((ser: any) => ser.name).join('、')}
          </div>
        </div>
        <div className={style.song_operate}>
          <SVGIcon className={style.operate_icon} type="plus" onClick={() => operateSong('addSong', song)} />
          <SVGIcon className={style.operate_icon} type="play" onClick={() => operateSong('playSong', song)} />
        </div>
      </div>
    ))}
  </div>
}

const NetEaseCard = ({ source = [] }: { source: MusicProps['source'] }) => {
  const getSong = (song: any) => {
    return song.url;
  }
  const operateSong = async (type: 'playSong' | 'addSong', song: any) => {
    const src = await getSong(song);
    stone.emit(type, {
      id: `netease_${song.id}`,
      from: 'netease',
      name: song.name,
      avatar: song.artists[0].img1v1Url,
      singers: song.artists.map((ser: any) => ser.name).join('、'),
      src,
      duration: Math.ceil(song.duration / 1000),
      time: 0,
    });
  }
  return <div className={style.card_wrap} style={{ backgroundImage: 'radial-gradient(circle at 107% 7%, #a12226 0, #a12226 10%, #f05d6a 20%, transparent 30%, transparent 100%),radial-gradient(circle at 7% 107% , #a12226 0, #a12226 10%, #f05d6a 20%, transparent 30%, transparent 100%)' }}>
    {/* linear-gradient(120deg, #f05d6a 0, #a12226 100%) */}
    {source.map((song, i) => (
      <div key={i} className={style.song_wrap}>
        <div className={style.song_msg}>
          <div>[{parseDuration(Math.ceil(song.duration / 1000))}] {song.name}{song.alias[0] || ''}</div>
          <div className={style.singer}>
            {/* <img src="" alt={song.singername} /> */}
            {song.artists.map((ser: any) => ser.name).join('、')}
          </div>
        </div>
        <div className={style.song_operate}>
          <SVGIcon className={style.operate_icon} type="plus" onClick={() => operateSong('addSong', song)} />
          <SVGIcon className={style.operate_icon} type="play" onClick={() => operateSong('playSong', song)} />
        </div>
      </div>
    ))}
  </div>
}

const MiguCard = ({ source = [] }: { source: MusicProps['source'] }) => {
  const getSong = (song: any) => {
    return song.mp3;
  }
  const operateSong = async (type: 'playSong' | 'addSong', song: any) => {
    const src = await getSong(song);
    stone.emit(type, {
      id: `migu_${song.copyrightId}`,
      from: 'migu',
      name: song.songName,
      avatar: '',
      singers: song.singerName,
      src,
      duration: 0,
      time: 0,
    });
  }
  return <div className={style.card_wrap} style={{ backgroundImage: 'radial-gradient(circle at 107% 7%, #bd1978 0, #bd1978 10%, #e6629a 20%, transparent 30%, transparent 100%),radial-gradient(circle at 7% 107% , #bd1978 0, #bd1978 10%, #e6629a 20%, transparent 30%, transparent 100%)' }}>
    {/* linear-gradient(120deg, #e6629a 0, #bd1978 100%) */}
    {source.map((song, i) => (
      <div key={i} className={style.song_wrap}>
        <div className={style.song_msg}>
          <div>{song.songName}</div>
          <div className={style.singer}>
            {/* <img src="" alt={song.singername} /> */}
            {song.singerName}
          </div>
        </div>
        <div className={style.song_operate}>
          <SVGIcon className={style.operate_icon} type="plus" onClick={() => operateSong('addSong', song)} />
          <SVGIcon className={style.operate_icon} type="play" onClick={() => operateSong('playSong', song)} />
        </div>
      </div>
    ))}
  </div>
}

const KugouCard = ({ source = [] }: { source: MusicProps['source'] }) => {
  const getSong = async (song: any) => {
    const data = await kugouSong(song.hash)
    return data?.code === 0 ? {
      src: data?.data?.url || '',
      avatar: data?.data?.imgUrl || '',
    } : { src: '', avatar: '' };
  }
  const operateSong = async (type: 'playSong' | 'addSong', song: any) => {
    const { src, avatar } = await getSong(song);
    stone.emit(type, {
      id: `kugou_${song.hash}`,
      from: 'kugou',
      name: song.songname,
      avatar,
      singers: song.singername,
      src,
      duration: song.duration,
      time: 0,
    });
  }
  return <div className={style.card_wrap} style={{ backgroundImage: 'radial-gradient(circle at 107% 7%, #1e82ff 0, #1e82ff 10%, #b0ebfb 20%, transparent 30%, transparent 100%),radial-gradient(circle at 7% 107% , #1e82ff 0, #1e82ff 10%, #b0ebfb 20%, transparent 30%, transparent 100%)' }}>
    {source.map((song, i) => (
      <div key={i} className={style.song_wrap}>
        <div className={style.song_msg}>
          <div>[{parseDuration(song.duration)}] {song.songname}</div>
          <div className={style.singer}>
            {/* <img src="" alt={song.singername} /> */}
            {song.singername}
          </div>
        </div>
        <div className={style.song_operate}>
          <SVGIcon className={style.operate_icon} type="plus" onClick={() => operateSong('addSong', song)} />
          <SVGIcon className={style.operate_icon} type="play" onClick={() => operateSong('playSong', song)} />
        </div>
      </div>
    ))}
  </div>
}


type Song<T> = any;

type MusicProps = {
  type: SongTypeMap,
  source: Song<SongTypeMap>[]
}

const MusicCard = ({ type, source }: MusicProps) => {
  return {
    qqmusic: <QQMusicCard source={source} />,
    netease: <NetEaseCard source={source} />,
    migu: <MiguCard source={source} />,
    kugou: <KugouCard source={source} />,
  }[type]
}


const MusicPlayer = () => {
  const [color, setState] = useState('');
  const [keyword, setKeyword] = useState('');
  const [source, setData] = useState<{[key in SongTypeMap]: Song<key>[]}>({
    kugou: [],
    migu: [],
    netease: [],
    qqmusic: [],
  });

  const searchSongs = () => {
    if (!keyword) {
      return;
    }
    Promise.allSettled([
      qqSearch(keyword),
      kugouSearch(keyword),
      neteaseSearch(keyword),
      miguSearch(keyword),
    ]).then(res => {
      const lists = {
        kugou: [],
        migu: [],
        netease: [],
        qqmusic: [],
      };
      [
        lists.qqmusic,
        lists.kugou,
        lists.netease,
        lists.migu,
      ] = res.map(songs => songs.status === 'fulfilled' && songs.value?.code === 0 ? songs.value.data : []);
      console.log(lists);
      setData(lists);
    })
  };

  useEffect(() => {
    setState(randomColor());
    // searchSongs();
  }, [])

  return <div className={style.wrap}>
    <div className={style.content}>
      <div className={style.input_wrap}>
        <input
          type="text"
          className={style.search_input}
          style={{ boxShadow: `0 0 1px 1px ${color}` }}
          value={keyword}
          onInput={(e) => setKeyword((e.target as HTMLInputElement).value)}
        />
        <SVGIcon className={style.search_icon} width="25" type='search' onClick={searchSongs} />
      </div>
      <div className={style.card_lines}>
        <div className={style.card_line}>
          <MusicCard type="kugou" source={source.kugou} />
          <MusicCard type="migu" source={source.migu} />
        </div>
        <div className={style.card_line}>
          <MusicCard type="netease" source={source.netease} />
          <MusicCard type="qqmusic" source={source.qqmusic} />
        </div>
      </div>
    </div>
    <Gplayer />
  </div>
}

export default MusicPlayer;

export const getStaticProps = async (context: any) => {
  return {
    props: {}
  }
}