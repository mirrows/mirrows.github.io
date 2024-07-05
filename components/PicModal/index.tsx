import { Swiper as MySwiper, SwiperSlide } from 'swiper/react';
import LazyImage from "../LazyImage"
import { Pic } from '@/types/demos';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Swiper from 'swiper';
import { useLazyImgs } from '@/utils/imgTool';
import { useMobile } from '@/utils/common';
import SVGIcon from '../SVGIcon';
import 'swiper/css';

import style from './index.module.scss'

type PicModalProps = {
    pics?: Partial<Pic>[],
    slice?: boolean,
    beforeLoad?: (src: string) => Promise<string>,
    onChange?: () => {},
}

export type ModalRefType = {
    open: (items: Partial<Pic>[], ind: number) => void,
    close: () => void,
}

const PicModal = forwardRef<ModalRefType, PicModalProps>(({ pics, slice = true, onChange = () => { }, beforeLoad = (src) => Promise.resolve(src) }, ref) => {
    const [visible, setVisible] = useState<boolean>(false)
    const swiperRef = useRef<Swiper | null>(null);
    const [ind, setInd] = useState(0)
    const mobile = useMobile();
    const { emit } = useLazyImgs('.img_swiper_wrap .lazy');
    const [list, setPics] = useState<Partial<Pic>[]>(pics || [])
    const curScrollTop = useRef<{ val: number, obj: 'body' | 'documentElement' }>({ obj: 'body', val: 0 })
    const slideChange = (swiper: Swiper) => {
        setInd(swiper.realIndex)
        onChange()
        emit()
    }
    const open = (items: Partial<Pic>[], ind = 0) => {
        setPics(items)
        setInd(ind)
        if (swiperRef.current) {
            swiperRef.current?.slideTo(ind)
            setTimeout(() => {
                setVisible(true)
            }, 300);
        } else {
            // 首次打开等待dom创建完成后打开弹窗
            setTimeout(() => {
                swiperRef.current?.slideTo(ind)
                setTimeout(() => {
                    setVisible(true)
                }, 2000)
            }, 500)
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
    return <div
        className={`${style['pic_modal_wrap']} ${style['imgs_wrap']}${visible ? ' flow_up' : ''}`}
        onScroll={(e: any) => { e.stopPropagation() }}
        onWheel={(e: any) => { e.stopPropagation() }}
    >
        <div className={style['swiper_header']}>
            <span className={style['name']}>{list[ind]?.name || ''}</span>
            <SVGIcon type="close" width="30" height="30" fill="#fff" className={style['close_swiper']} onClick={() => setVisible(false)} />
        </div>
        <MySwiper
            loop={true}
            // autoplay={{ delay: 2000, disableOnInteraction: false }}
            className={style['img_swiper_wrap']}
            onSwiper={swiper => swiperRef.current = swiper}
            onSlideChangeTransitionEnd={slideChange}
        >
            {list.map((pic, ind) => (<SwiperSlide key={ind} className={style['pic_wrap']}>
                <LazyImage
                    src={slice ? `https://wsrv.nl/?url=${(pic.preview_url || pic.download_url || '').replace('https://', '')}${mobile ? '&w=480' : ''}&n=-1&q=80` : pic.preview_url || pic.download_url || ''}
                    className={style['pic_item']}
                    width="1920"
                    height="1080"
                    alt="bing"
                    beforeLoad={beforeLoad}
                />
            </SwiperSlide>))}
        </MySwiper>
    </div>
})

PicModal.displayName = 'PicModal'

export default PicModal