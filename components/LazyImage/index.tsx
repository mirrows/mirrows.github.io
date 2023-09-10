import RImage from "next/image"
import { ReactElement, useEffect, useRef, useState } from "react"


type TProps = {
    src: string,
    loadingPic?: string,
    className?: string,
    children?: Element | ReactElement<any, any>,
    beforeLoad?: (src: string) => Promise<string>,
    isShow?: boolean,
    [key: string]: any,
}

function LazyImage({ loadingPic, src, className, beforeLoad = (src) => Promise.resolve(src), children, isShow = true, ...props }: TProps) {
    const loadingGif = useRef(loadingPic || process.env.NEXT_PUBLIC_LOADING_GIF || 'https://empty.t-n.top/pub_lic/2023_06_09/pic1686281264582557.gif')
    const failImg = useRef('https://empty.t-n.top/pub_lic/2023_06_26/pic1687748007844003.png')
    const [imgSrc, setSrc] = useState(loadingGif.current)
    const [loaded, setLoaded] = useState(false)
    const imgRef = useRef<HTMLImageElement | null>(null)
    const handleError = () => {
        setSrc(failImg.current)
        setLoaded(true)
    }
    useEffect(() => {
        const clientHeight = document.documentElement.clientHeight
        const clientWidth = document.documentElement.clientWidth
        imgRef.current?.classList.add('lazy')
        setLoaded(false)
        if (
            imgRef.current
            && !(imgRef.current.getBoundingClientRect().top < -imgRef.current.clientHeight
                || imgRef.current.getBoundingClientRect().top > 1.5 * clientHeight)
            && !(imgRef.current.getBoundingClientRect().left < -clientWidth
                || imgRef.current.getBoundingClientRect().left > 1.5 * clientWidth)
            && imgRef.current.getBoundingClientRect().width
            && imgRef.current.getBoundingClientRect().height
            && isShow
        ) {
            setSrc(src)
        }
    }, [src, isShow])
    return (<>
        <img
            className={`${className ? `lazy ${className}` : 'lazy'}`}
            ref={imgRef}
            src={imgSrc}
            data-src={src}
            alt=""
            onLoad={() => setLoaded(true)}
            onError={handleError}
            {...props}
        />
        {loaded || children}
    </>

        // <Image
        //     // className={className ? `lazy ${className}` : 'lazy'}
        //     className={className}
        //     ref={imgRef}
        //     src={imgSrc}
        //     // src={imgSrc}
        //     // data-src={src}
        //     alt=""
        //     lazyBoundary=""
        //     placeholder="blur"
        //     blurDataURL={loadingGif.current}
        //     loading="lazy"
        //     onError={handleError}
        //     {...props}
        // />
    )
}


export default LazyImage