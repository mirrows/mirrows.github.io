import ImgUpload from "@/components/ImgUpload"
import SVGIcon from "@/components/SVGIcon"
import { queryPicList } from "@/req/demos"
import { Pic, RefType } from "@/types/demos"
import { stone } from "@/utils/global"
import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import UploadPicList from "./components/PicList"
import { Swiper as MySwiper, SwiperSlide } from 'swiper/react';
import Swiper from "swiper"
import LazyImage from "@/components/LazyImage"
import 'swiper/css';
import { useLazyImgs } from "@/utils/imgTool"
import { isMobile } from "@/utils/common"


const DIV = styled.div`
    padding: 80px 0;
    margin: 0 auto;
    background-image: url('https://empty.t-n.top/pub_lic/2023_07_08/pic1688805979076243.jpg');
    text-align: center;
    .uploader_wrap{
        width: 60%;
        min-width: 200px;
        max-width: 900px;
        padding: 10px;
        margin: auto;
        border: 2px dashed gray;
        border-radius: 6px;
        background-image: url(https://empty.t-n.top/pub_lic/2023_07_08/pic1688805979076243.jpg);
        box-shadow: 0 0 5px #999;
        cursor: pointer;
    }
    .tips{
        font-size: 0.8em;
        color: gray;
    }
    @media (max-width: 769px) {
        .uploader_wrap{
            width: 90%;
        }
    }
    .switch_wrap{
        margin: 10px;
    }
    .switch_btn{
        padding: 4px 20px;
        background-color: #fff;
        border: 1px solid #000;
        font-size: 1rem;
        color: #000;
    }
    .switch_btn.active{
        background-color: #000;
        color: #fff;
    }
    .switch_btn:hover{
        box-shadow: none;
    }

    .imgs_wrap{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #666;
        z-index: 60;
    }
    .pic_wrap{
        /* position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: fit-content; */
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px;
        margin: auto;
        box-sizing: border-box;
    }
    .pic_item{
        width: unset;
        height: unset;
        max-width: 100%;
        max-height: 100%;
    }
    .swiper_header{
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: fit-content;
        padding: 10px;
        background-image: linear-gradient(black 0%, black 30%, transparent 100%);
        box-sizing: border-box;
        color: #fff;
        z-index: 80;
        .name{
            line-height: 1;
        }
    }
    .modal_wrap{

    }
    .img_swiper_wrap{
        width: 100%;
        height: 100%;
    }
    .img_swiper_wrap .tmp_status_btn{
        position: absolute;
        width: 64px;
        z-index: -1;
    }
`

type Folder = {
    path: string,
    name: string,
}

type Props = {
    list: Folder[]
}


export default function ImgSource() {
    const [personal, setPersonal] = useState(false)
    const [isOwner, setOwner] = useState(false)
    const commonRef = useRef<RefType>(null)
    const privateRef = useRef<RefType>(null)
    const curPersonal = useRef(false)
    const swiperRef = useRef<Swiper | null>(null);
    const [pics, setPics] = useState<Pic[]>([])
    const [swiperOpen, setOpenSwiper] = useState<boolean>(false)
    const [ind, setInd] = useState(0)
    const [mobile, setMobile] = useState(false)
    const { emit } = useLazyImgs('.img_swiper_wrap .lazy');
    const curScrollTop = useRef<{ val: number, obj: 'body' | 'documentElement' }>({ obj: 'body', val: 0 })
    const afterUpload = async () => {
        // await queryFolder();
        // queryPics(0);
        if (curPersonal.current) {
            privateRef.current?.afterUpload()
        } else {
            commonRef.current?.afterUpload()
        }
    }
    const onStartUpload = () => {
        curPersonal.current = personal
    }
    const openSwiper = (items: Pic[], ind: number) => {
        setPics(items)
        setInd(ind)
        setTimeout(() => {
            setOpenSwiper(true)
            swiperRef.current?.slideTo(ind)
        }, 0)
    }
    const slideChange = (swiper: Swiper) => {
        setInd(swiper.realIndex)
        emit()
    }
    useEffect(() => {
        stone.isGithubOwner((isowner) => setOwner(isowner))
        setMobile(isMobile())
    }, [])
    useEffect(() => {
        if (swiperOpen) {
            if (document.body.scrollTop) {
                curScrollTop.current = { obj: 'body', val: document.body.scrollTop }
            } else if (document.documentElement.scrollTop) {
                curScrollTop.current = { obj: 'documentElement', val: document.documentElement.scrollTop }
            }
            document.body.classList.add('disabled_scroll')
            emit()
            setTimeout(() => {
                emit()
            }, 500)
        } else {
            document.body.classList.remove('disabled_scroll')
            if (!curScrollTop.current.val) return
            document[curScrollTop.current.obj].scrollTop = curScrollTop.current.val
            curScrollTop.current.val = 0
        }
    }, [swiperOpen, emit])
    return (<>
        <Head>
            <title>延迟图床</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <DIV className="bg_wrap">
                <ImgUpload
                    className="uploader_wrap"
                    personal={personal}
                    onFinish={afterUpload}
                    onStartUpload={onStartUpload}
                >
                    <div>
                        <SVGIcon width="32" style={{ fill: 'gray' }} type="plus_no_outline" />
                    </div>
                </ImgUpload>
                {isOwner && <div className="switch_wrap">
                    <button className={`switch_btn${personal ? '' : ' active'}`} onClick={() => setPersonal(false)}>COMMON</button>
                    <button className={`switch_btn${personal ? ' active' : ''}`} onClick={() => setPersonal(true)}>PRIVATE</button>
                </div>}
                <UploadPicList ref={commonRef} list={[]} path="mini/" show={!personal} className={personal ? 'hide' : ''} onPreview={openSwiper} />
                {isOwner && <UploadPicList ref={privateRef} list={[]} path="personal/mini/" show={!!personal} className={personal ? '' : 'hide'} onPreview={openSwiper} />}

                <div
                    className={`imgs_wrap${swiperOpen ? '' : ' hide'}`}
                    onScroll={(e) => { e.stopPropagation() }}
                    onWheel={(e) => { e.stopPropagation() }}
                >
                    <div className="swiper_header">
                        <span className="name">{pics[ind]?.name || ''}</span>
                        <SVGIcon type="close" width="30" height="30" fill="#fff" className="close_swiper" onClick={() => setOpenSwiper(false)} />
                    </div>
                    <MySwiper
                        loop={true}
                        // autoplay={{ delay: 2000, disableOnInteraction: false }}
                        className={`img_swiper_wrap`}
                        onSwiper={swiper => swiperRef.current = swiper}
                        onSlideChangeTransitionEnd={slideChange}
                    >
                        {pics.map((pic, ind) => (<SwiperSlide key={ind} className="pic_wrap">
                            <LazyImage loadingPic={pic.cdn_url} src={mobile ? pic.cdn_url : pic?.normal_url || pic.cdn_url} className={"pic_item"} width="1920" height="1080" alt="bing">
                                <SVGIcon className="tmp_status_btn rotate" type="loading" fill="#fff" />
                            </LazyImage>
                        </SwiperSlide>))}
                    </MySwiper>
                </div>
            </DIV>

        </main>
    </>)
}

export const getStaticProps = async (context: any) => {
    return {
      props: {}
    }
  }

