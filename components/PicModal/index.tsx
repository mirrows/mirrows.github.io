import { Swiper as MySwiper, SwiperSlide } from 'swiper/react';
import LazyImage from "../LazyImage"
import styled from 'styled-components';
import { Pic } from '@/types/demos';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Swiper from 'swiper';
import { useLazyImgs } from '@/utils/imgTool';
import { isMobile } from '@/utils/common';
import SVGIcon from '../SVGIcon';
import 'swiper/css';

const PIC = styled.div`
    &.imgs_wrap{
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
        background-image: linear-gradient(black 0%, transparent 80%);
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

type PicModalProps = {
    pics?: Partial<Pic>[]
}

export type ModalRefType = {
    open: (items: Partial<Pic>[], ind: number) => void,
    close: () => void
}

const PicModal = forwardRef<ModalRefType, PicModalProps>(({ pics }, ref) => {
    const [visible, setVisible] = useState<boolean>(false)
    const swiperRef = useRef<Swiper | null>(null);
    const [ind, setInd] = useState(0)
    const [mobile, setMobile] = useState(false)
    const { emit } = useLazyImgs('.img_swiper_wrap .lazy');
    const [list, setPics] = useState<Partial<Pic>[]>(pics || [])
    const [init, setInit] = useState(false)
    const curScrollTop = useRef<{ val: number, obj: 'body' | 'documentElement' }>({ obj: 'body', val: 0 })
    const slideChange = (swiper: Swiper) => {
        setInd(swiper.realIndex)
        emit()
    }
    const open = (items: Partial<Pic>[], ind = 0) => {
        setPics(items)
        setInd(ind)
        setInit(true)
        if(swiperRef.current) {
            swiperRef.current.slideTo(ind)
            setVisible(true)
        } else {
            // 首次打开等待dom创建完成后打开弹窗
            setTimeout(() => {
                swiperRef.current?.slideTo(ind)
                setVisible(true)
            })
        }
    }
    const close = () => {
        setPics([]) 
        setVisible(false)
    }
    useImperativeHandle(ref, () => ({ open, close }))
    useEffect(() => {
        pics && setPics(pics)
    }, [pics])
    useEffect(() => {
        setMobile(isMobile())
    }, [])
    useEffect(() => {
        if (visible) {
            if (document.body.scrollTop) {
                curScrollTop.current = { obj: 'body', val: document.body.scrollTop }
            } else if (document.documentElement.scrollTop) {
                curScrollTop.current = { obj: 'documentElement', val: document.documentElement.scrollTop }
            }
            document.body.classList.add('disabled_scroll')
            emit()
        } else {
            setPics([])
            document.body.classList.remove('disabled_scroll')
            if (!curScrollTop.current.val) return
            document[curScrollTop.current.obj].scrollTop = curScrollTop.current.val
            curScrollTop.current.val = 0
        }
    }, [visible, emit])
    return init || visible ? <PIC
            className={`imgs_wrap${visible ? '' : ' hide'}`}
            onScroll={(e) => { e.stopPropagation() }}
            onWheel={(e) => { e.stopPropagation() }}
        >
            <div className="swiper_header">
                <span className="name">{list[ind]?.name || ''}</span>
                <SVGIcon type="close" width="30" height="30" fill="#fff" className="close_swiper" onClick={() => setVisible(false)} />
            </div>
            <MySwiper
                loop={true}
                // autoplay={{ delay: 2000, disableOnInteraction: false }}
                className={`img_swiper_wrap`}
                onSwiper={swiper => swiperRef.current = swiper}
                onSlideChangeTransitionEnd={slideChange}
            >
                {list.map((pic, ind) => (<SwiperSlide key={ind} className="pic_wrap">
                    <LazyImage loadingPic={pic.cdn_url} src={mobile ? pic?.cdn_url || '' : pic?.normal_url || pic?.cdn_url || ''} className={"pic_item"} width="1920" height="1080" alt="bing">
                        <SVGIcon className="tmp_status_btn rotate" type="loading" fill="#fff" />
                    </LazyImage>
                </SwiperSlide>))}
            </MySwiper>
        </PIC> : <></>
})

PicModal.displayName = 'PicModal'

export default PicModal