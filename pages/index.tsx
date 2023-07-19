import { bingQuery, listArtical } from '@/req/main';
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
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
import { useLazyImgs } from '@/utils/imgTool';
import { env, stone } from '@/utils/global';
import { useRouter } from 'next/router';
import Pagination from '@/components/Pagination';

const Div = styled.div`
  min-height: 100vh;
  .imgs_wrap{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .bing_card{
    max-width: 300px;
    width: 100%;
    padding: 10px 20px 20px;
    line-height: 1.2;
    background-color: rgba(0,0,0,.65);
    box-sizing: border-box;
    border-radius: 12px;
    color: #fff;
  }
  .copyright{
    color:#fff;
    text-decoration: underline;
    zoom: 0.8;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    vertical-align: bottom;
    width: 100%;
  }
  .pic_item{
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    vertical-align: bottom;
    min-width: 100%;
    min-height: 100%;
  }
  @media (max-width: 769px) {
    .bing_card{
      max-width: 100%;
      padding: 5px 10px;
      border-radius: 0;
      text-align: center;
      font-size: 14px;
      .copyright{
        font-size: 12px;
      }
    }
  }
  .main_content{
    display: flex;
    position: relative;
    max-width: 1080px;
    min-height: 100vh;
    padding-top: 60px;
    padding-bottom: 10px;
    margin: 0 auto;
    box-sizing: border-box;
    z-index: 2;
    pointer-events: none;
  }
  .bing_msg_wrap{
    pointer-events: all;
  }
  .bing_msg_title{
    overflow: hidden;
    text-align: left;
  }
  .time{
    float: right;
    margin-top: 0.3em;
    white-space: nowrap;
    font-weight: 400;
    font-size: 0.9rem;
  }
  .bing_msg_content{
    height: 3.6rem;
    line-height: 1.2rem;
    font-size: 1rem;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .content_left,.content_right{
    margin: 10px;
    box-sizing: border-box;
    pointer-events: none;
  }
  .content_left{
    flex: 1;
  }
  .content_right{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 0 0 300px;
    min-width: 200px;
    max-height: 90vh;
  }
  @media (min-width: 769px) {
    .content_right{
      position: sticky;
      top: 70px;
    }
  }
  @media (max-width: 769px) {
    .main_content{
      flex-direction: column;
    }
    .content_right{
      flex: 1 1 calc(100vh - 80px);
      order: -1;
    }
  }
  .imgs_card_wrap{
    width: 400px;
    height: 200px;
  }
  .bing_handler{
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
    margin: 20px 0 10px;
  }
  .bing_handle_item{
    padding: 10px 20px;
    background-color: rgba(0,0,0,.65);
    box-sizing: border-box;
    border-radius: 6px;
    border: none;
    line-height: 1.2;
    font-weight: bold;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
  }
  .content_left{
  }
  .artical_wrap{
    display: flex;
    justify-content: space-between;
    position: relative;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 12px;
    background-color: rgba(200,200,200,.3);
    color: #fff;
    pointer-events: all;
  }
  .artical_wrap:last-child{
    margin-bottom: 0;
  }
  .artical_img{
    min-width: 200px;
    width: 40%;
    margin-left: 10px;
    margin-right: 0;
    border-radius: 8px;
    object-fit: cover;
    max-height: 180px;
  }
  .artical_wrap:nth-child(2n) .artical_img{
    order: -1;
    margin-left: 0;
    margin-right: 10px;
  }
  .artical_content{
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
    .artical_title{
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
      line-height: 1.5;
    }
    .artical_btn{
      margin-right: 10px;
      box-shadow: unset;
    }
  }
  .artical_update_time{
    margin-top: auto;
    margin-bottom: 0;
    text-align: right;
    zoom: 0.8;
  }
  .artical_detail{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    color: rgba(255, 255, 255,.5);
    word-break: break-all;
  }
  @media (max-width: 769px){
    .artical_wrap .artical_img{
      order: -1;
      margin-left: 0;
      margin-right: 10px;
    }
  }
  @media (max-width: 450px){
    .artical_wrap{
      height: 160px;
      overflow: hidden;
      background-color: rgba(0,0,0,.3);
      min-width: 240px;
    }
    .artical_wrap .artical_img{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      z-index: -1;
    }
  }
  .fixed_operate_wrap{
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 28px 10px;
    z-index: 6;
  }
  .artical_btn{
    display: inline-block;
    padding: 0;
    background-color: transparent;
    background-image: radial-gradient(white 0%, white 10%, transparent 75%);;
    border: none;
    border-radius: 6px;
    text-align: center;
    box-shadow: 0px 0px 20px 2px #fff;
  }
  .atl_icon{
    width: 25px;
    height: 25px;
    fill: #fff;
  }
  .uploading{
    padding: 0 10px;
    margin-right: 10px;
    border-radius: 6px;
    border: 2px solid red;
    line-height: 1.5;
    font-size: 0.8em;
    color: red;
    opacity: 0.5;
  }
  .pagination_wrap{
    margin: 10px 0;
    text-align: right;
  }
`

export default function Home({ artical }: Props) {
  const [pics, setPics] = useState<BingPic[]>([]);
  const [ind, setInd] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(30);
  const [total, setTotal] = useState(0);
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
  const queryArticalList = () => {
    listArtical().then(({ data, total }) => {
      console.log(total)
      setArtical(data);
      setTotal(total)
    })
  }
  const handlePagination = () => {

  }
  useEffect(() => {
    stone.isGithubOwner((isowner) => setOwner(isowner))
    queryBing();
    queryArticalList();
  }, [])
  return (
    <>
      <Head>
        <title>welcome to my world!!!</title>
        <meta name="description" content="用于自我学习的博客站点,欢迎大家参观。本站基于vercel+nextjs+githubAPI搭建,比较少写blog,更多的是在自己的网上小窝开发有趣内容。" />
        <meta name="keywords" content="前端,个人博客,david,reed leaves,reedls,博客,知识展示" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <link rel="dns-prefetch" href="https://cn.bing.com/" />
        <link rel="dns-prefetch" href="https://empty.t-n.top/" />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_MESS_URL} />
      </Head>
      <main>
        <Div>
          <MySwiper
            loop={true}
            // autoplay={{ delay: 2000, disableOnInteraction: false }}
            className='imgs_wrap'
            onSwiper={swiper => swiperRef.current = swiper}
            onSlideChangeTransitionEnd={slideChange}
          >
            {pics.map((pic, ind) => (<SwiperSlide key={ind} className="pic_wrap">
              {
                // ind ? 
                <LazyImage src={pic?.url || env.loadingGif || ''} className={"pic_item"} width="1920" height="1080" alt="bing" />
                // : <img src={pic?.url || ''} className={"pic_item"} width="1920" height="1080" alt="bing" />
              }
            </SwiperSlide>))}
          </MySwiper>
          <div className='main_content'>
            <div className='content_left'>
              <div className='pagination_wrap'>
                <Pagination total={total} onChange={handlePagination} />
              </div>
              {articals.map((artical) => (
                <Link key={artical.id} aria-label={`artical detail about ${artical.title}`} className="artical_wrap" href={`/blogs/${artical.number}`}>
                  <div className='artical_content'>
                    <h3 className='artical_title'>
                      {isOwner && (
                        <span
                          className='artical_btn'
                          onClick={(e) => {
                            e.preventDefault();
                            router.push(`/blogs/edit/${artical.number}`)
                          }}
                        >
                          <SVGIcon type='edit' className="atl_icon" />
                        </span>
                      )}
                      {Date.now() - new Date(artical.updated_at).getTime() < 1000*60*5 && <span className='uploading'>审核中</span>}
                      <span>{artical.title}</span>
                    </h3>
                    <div className='artical_detail hide_450'>{artical.body}</div>
                    <span className='artical_update_time'>
                      <span>—— updated at </span>
                      {/* <DateText
                        render={(formattedDate) => <span>{formattedDate}</span>}
                        value={artical.updated_at}
                      /> */}
                      <span>{new Date(artical.updated_at).toLocaleDateString()}</span>
                    </span>
                  </div>
                  <LazyImage className='artical_img' width="400" height="200" src={artical.img} alt={artical.title} />
                </Link>
              ))}
            </div>
            <div className='content_right'>
              <PreviewPannel />
              <div className='bing_msg_wrap'>
                <div className='bing_handler'>
                  <button className='bing_handle_item handle_before' aria-label='previous backgroundImage' onClick={() => swiperRef.current?.slidePrev()}>
                    <SVGIcon type='arrow_left' fill="#fff" width="20" />
                  </button>
                  <button className='bing_handle_item handle_after' aria-label='next backgroundImage' onClick={() => swiperRef.current?.slideNext()}>
                    <SVGIcon type='arrow_right' fill="#fff" width="20" />
                  </button>
                </div>
                <div className="bing_card">
                  <h3 className='bing_msg_title'>{pics[ind]?.title}<div className='time'>——{pics[ind]?.date}</div></h3>
                  <div className='bing_msg_content'>{pics[ind]?.content}</div>
                  <a className="copyright" href={pics[ind]?.copyrightlink} aria-label='more message about this bing image' target="_blank">{pics[ind]?.copyright}</a>
                </div>
              </div>
            </div>
          </div>
          <div className='fixed_operate_wrap'>
            {isOwner && (
              <Link className='artical_btn' aria-label='create a new artical' href="/blogs/create">
                <SVGIcon type='plus' className="atl_icon" />
              </Link>
            )}
          </div>
        </Div>
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
