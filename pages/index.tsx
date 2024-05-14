import { ListArticalParams, bingQuery, listArtical } from '@/req/main';
import Head from 'next/head'
import { useCallback, useEffect, useRef, useState } from 'react';
// import Swiper core and required modules
import { Swiper as MySwiper, SwiperSlide } from 'swiper/react';
import PreviewPannel from '@/components/PreviewPannel';
import { Artical, BingPic } from '@/types/global';
// Import Swiper styles
import 'swiper/css';
import Swiper from 'swiper';
import SVGIcon from '@/components/SVGIcon';
import LazyImage from '@/components/LazyImage';
import Link from 'next/link';
import { getBingPic, useLazyImgs } from '@/utils/imgTool';
import { env, stone } from '@/utils/global';
import { useRouter } from 'next/router';
import Pagination from '@/components/Pagination';
import DateText from '@/components/SsrRender/Timer';

import style from './index/index.module.scss';
import { toCDN } from '@/utils/common';

export default function Home({ artical, total: initTotal }: Props) {
  const [pics, setPics] = useState<BingPic[]>([]);
  const [ind, setInd] = useState(0);
  const [title, setTitle] = useState('RDL');
  const [total, setTotal] = useState(initTotal || 0);
  const swiperRef = useRef<Swiper | null>(null);
  const [articals, setArtical] = useState<Artical[]>(artical || []);
  const { emit } = useLazyImgs('.imgs_wrap .lazy');
  const [isOwner, setOwner] = useState(false)
  const slideChange = ({ realIndex }: { realIndex: number }) => {
    setInd(realIndex)
    emit()
  }
  const router = useRouter();
  const queryBing = () => {
    bingQuery().then(({ data }) => {
      const pics = data.map((pic: BingPic) => {
        const { url, title, copyright, copyrightlink, enddate } = pic;
        let [content, cpright] = ['', '']
        copyright.replace(/^(.+)\((.+)\)$/, (oldval, a, b) => {
          content = a.trim();
          cpright = b.trim();
          return oldval;
        })
        return {
          url,
          title,
          content,
          copyright: cpright,
          copyrightlink,
          date: `${enddate.slice(0, 4)}/${enddate.slice(4, 6)}/${enddate.slice(6, 8)}`,
        }
      })
      setPics(pics);
    })
  }
  const queryArticalList = (params?: ListArticalParams) => {
    listArtical(params).then(({ data, total }) => {
      setArtical(data);
      setTotal(total);
    })
  }
  const handlePagination = ({ per_page = 30, page }: ListArticalParams) => {
    queryArticalList({ per_page, page });
  }
  const ifJudge = useCallback((timeStr: string) => {
    return Date.now() - new Date(timeStr).getTime() < 1000*60*5
  }, [])
  useEffect(() => {
    stone.isGithubOwner((isowner) => setOwner(isowner))
    queryBing();
    queryArticalList();
    setTitle('Welcome to my world!!!')
  }, [])
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="用于自我学习的博客站点,欢迎大家参观。本站基于vercel+nextjs+githubAPI搭建,比较少写blog,更多的是在自己的网上小窝开发有趣内容。" />
        <meta name="keywords" content="前端,个人博客,david,reed leaves,reedls,博客,知识展示" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        {/* 这个meta会导致本地使用ip请求协议变成https */}
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <link rel="dns-prefetch" href="https://cn.bing.com/" />
        <link rel="dns-prefetch" href="https://empty.t-n.top/" />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_MESS_URL} />
      </Head>
      <main>
        <div className={style['index_wrap']}>
          {!!pics?.length && <MySwiper
            loop={true}
            // autoplay={{ delay: 2000, disableOnInteraction: false }}
            className={style['imgs_wrap']}
            onSwiper={swiper => swiperRef.current = swiper}
            onSlideChangeTransitionEnd={slideChange}
          >
            {pics.map((pic, ind) => (<SwiperSlide key={ind} className={style['pic_wrap']}>
              {/* {
                ind ? 
                <LazyImage src={pic?.url ? toCDN(getBingPic(Date.now() - ind * 24 * 60 * 60 * 1000), '&w=1920&h=1080') : env.loadingGif || ''} className={style['pic_item']} width="1920" height="1080" alt="bing" />
                : <img src={pic?.url ? toCDN(getBingPic(Date.now()), '&w=1920&h=1080') : ''} className={style["pic_item"]} width="1920" height="1080" alt="bing" />
              } */}
              <img src={pic?.url ? toCDN(getBingPic(Date.now() - ind * 24 * 60 * 60 * 1000), '&w=1920&h=1080') : ''} className={style["pic_item"]} width="1920" height="1080" alt="bing" />
            </SwiperSlide>))}
          </MySwiper>}
          <div className={style['main_content']}>
            <div className={style['content_left']}>
              <Pagination total={total} onChange={handlePagination} />
              {articals.filter(artical => isOwner || !ifJudge(artical.created_at)).map((artical) => (
                <Link
                  key={artical.id}
                  aria-label={`artical detail about ${artical.title}`}
                  className={style['artical_wrap']}
                  href={ifJudge(artical.created_at) ? `/blogs/edit?number=${artical.number}` : `/blogs/${artical.number}`}
                >
                  <div className={style['artical_content']}>
                    <h3 className={style['artical_title']}>
                      {isOwner && (
                        <span
                          className={style['artical_btn']}
                          onClick={(e) => {
                            e.preventDefault();
                            router.push(`/blogs/edit?number=${artical.number}`)
                          }}
                        >
                          <SVGIcon type='edit' className={style['atl_icon']} />
                        </span>
                      )}
                      {ifJudge(artical.created_at) && <span className={style['uploading']}>审核中</span>}
                      <span>{artical.title}</span>
                    </h3>
                    <div className={`${style['artical_detail']} ${style['hide_450']}`}>{artical.body}</div>
                    <span className={style['artical_update_time']}>
                      <span>—— updated at </span>
                      <DateText
                        render={(formattedDate) => <span>{formattedDate}</span>}
                        value={artical.updated_at}
                      />
                      {/* <span>{new Date(artical.updated_at).toLocaleDateString()}</span> */}
                    </span>
                  </div>
                  <LazyImage className={style['artical_img']} width="400" height="200" src={toCDN(getBingPic(artical.created_at), 'w=400&h=200')} alt={artical.title} />
                </Link>)
              )}
            </div>
            <div className={style['content_right']}>
              <PreviewPannel />
              <div className={style['bing_msg_wrap']}>
                <div className={style['bing_handler']}>
                  <button className={`${style['bing_handle_item']} ${style['handle_before']}`} aria-label='previous backgroundImage' onClick={() => swiperRef.current?.slidePrev()}>
                    <SVGIcon type='arrow_left' fill="#fff" width="20" />
                  </button>
                  <button className={`${style['bing_handle_item']} ${style['handle_after']}`} aria-label='next backgroundImage' onClick={() => swiperRef.current?.slideNext()}>
                    <SVGIcon type='arrow_right' fill="#fff" width="20" />
                  </button>
                </div>
                <div className={style['bing_card']}>
                  <h3 className={style['bing_msg_title']}>{pics[ind]?.title}<div className={style['time']}>——{pics[ind]?.date}</div></h3>
                  <div className={style['bing_msg_content']}>{pics[ind]?.content}</div>
                  <a className={style['copyright']} href={pics[ind]?.copyrightlink} aria-label='more message about this bing image' target="_blank">{pics[ind]?.copyright}</a>
                </div>
              </div>
            </div>
          </div>
          <div className={style['fixed_operate_wrap']}>
            {isOwner && (
              <Link className={style['artical_btn']} aria-label='create a new artical' href="/blogs/create">
                <SVGIcon type='plus' className={style['atl_icon']} />
              </Link>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

type Props = {
  artical?: Artical[],
  total?: number
}

export const getStaticProps = async (context: any) => {
  const props: Props = {}
  const reqs = [listArtical()];
  const [articals] = await Promise.allSettled(reqs);
  if (articals.status === 'fulfilled' && articals.value?.data) {
    const data = articals.value.data
    const curAtl = data.filter((e: Artical) => Date.now() - new Date(e.created_at).getTime() > 1000*60*10)
    props.artical = curAtl
    props.total = articals.value.total
  }
  return {
    props
  }
}
