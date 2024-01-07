import { ReactElement, useEffect, useRef, useState } from "react"


type TProps = {
    src: string,
    loadingPic?: string,
    className?: string,
    children?: Element | ReactElement<any, any>,
    beforeLoad?: (src: string) => Promise<string>,
    onLoad?: (src: string) => void,
    isShow?: boolean,
    noReload?: boolean,
    [key: string]: any,
}

function LazyImage({
    loadingPic,
    src,
    className,
    beforeLoad = (src) => Promise.resolve(src),
    onLoad = (src) => Promise.resolve(src),
    noReload = false,
    children,
    isShow = true,
    ...props
}: TProps) {
    const loadingGif = useRef(loadingPic || process.env.NEXT_PUBLIC_LOADING_GIF)
    const failImg = useRef(process.env.NEXT_PUBLIC_FAIL_IMG)
    const [imgSrc, setSrc] = useState(loadingGif.current)
    const [loaded, setLoaded] = useState(false)
    const imgRef = useRef<HTMLImageElement | null>(null)
    const oneTime = useRef(0)
    const handleError = () => {
        imgRef.current?.classList.add('lazy')
        setSrc(failImg.current)
        setLoaded(true)
    }
    const handleLoad = () => {
        setLoaded(true)
        if(src !== imgRef.current?.src) return
        onLoad(src)
    }
    useEffect(() => {
        if (oneTime.current) return
        const clientHeight = document.documentElement.clientHeight
        const clientWidth = document.documentElement.clientWidth
        if (!noReload) {
            imgRef.current?.classList.add('lazy')
        }
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
            if (noReload) {
                oneTime.current = 1
            }
            imgRef.current?.classList.remove('lazy')
            setSrc(src)
        }
    }, [src, isShow, noReload])
    return (<>
        <img
            className={`${className ? `lazy ${className}` : 'lazy'}`}
            ref={imgRef}
            src={imgSrc}
            data-src={src}
            alt=""
            onLoad={handleLoad}
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