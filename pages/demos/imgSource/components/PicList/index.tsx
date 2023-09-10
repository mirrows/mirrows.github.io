import LazyImage from "@/components/LazyImage"
import SVGIcon from "@/components/SVGIcon"
import { ModeMap, deletePic, queryPicList } from "@/req/demos"
import { Mode, Pic } from "@/types/demos"
import { isMobile } from "@/utils/common"
import { stone } from "@/utils/global"
import { forwardRef, Ref, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import styled from "styled-components"
import { Node } from "typescript"


const DIV = styled.div`
    .list_wrap{
        max-width: 1200px;
        padding: 0 10px 10px;
        margin: 10px auto;
    }
    .timestone{
        width: fit-content;
        padding: 10px 20px;
        background-color: #000;
        font-size: 1.2rem;
        color: #fff;
    }
    .time_fold_wrap{
        margin-bottom: 10px;
    }
    .pics_item_wrap{
        display: grid;
        justify-content: center;
        grid-template-columns: repeat(auto-fill, 130px);
        grid-template-rows: repeat(auto-fill, 320px);
        gap: 10px;
        min-width: 200px;
        max-width: 1200px;
        width: 100%;
        margin: 10px 0;
    }
    @media (max-width: 769px) {
        .pics_item_wrap{
            grid-template-columns: repeat(auto-fill, 80px);
            grid-template-rows: repeat(auto-fill, 180px);
            gap: 5px;
            margin: 5px 0;
        }
        .img_item{
            width: 80px;
            height: 180px;
        }
    }
    .pic_item_wrap{
      position: relative;
    }
    .img_del_btn{
      position: absolute;
      right: 0;
      top: 0;
      width: 24px;
      padding: 5px 5px 12px 12px;
      border-radius: 0 0 0 36px;
      fill: #fff;
      background-color: #000;
    }
    .no_more_tips{
        font-size: 2rem;
        font-weight: 700;
        font-family: youyuan;
        letter-spacing: 0.1rem;
        color: gray;
    }
    .if_del_btn{
      width: 1rem;
      height: 1rem;
    }
`

type Folder = {
  path: string,
  name: string,
}

type Props = {
  list: Folder[],
  path?: string,
  show?: boolean | string,
  mode?: Mode,
  onPreview?: (items: Pic[], ind: number) => void,
  [key: string]: any,
}



type PicsMap = {
  [key in Folder['path']]: Pic[]
}

export type RefType = {
  afterUpload: () => Promise<void>
}


function UploadPicList({ list = [], mode = ModeMap.PHOTO, path = 'normal/', show = true, onPreview, ...props }: Props, ref: Ref<RefType>) {
  const [isOwner, setOwner] = useState(false)
  const [folders, setFolders] = useState(list || [])
  const [pics, setPics] = useState<PicsMap>({})
  const page = useRef(0)
  const size = useRef(1)
  const [mobile, setMobile] = useState(false)
  const random = useRef(Math.random())
  const once = useRef(false)
  const [end, setEnd] = useState(false)
  const [curPath, setPath] = useState<number | string>('')
  const io = useRef<IntersectionObserver>()
  const footer = useRef<HTMLDivElement | null>(null)
  const [startDel, setStartDel] = useState('')
  const timer = useRef<NodeJS.Timer>()
  const queryPics = useCallback(async (numOpath: number | string) => {
    let path = ''
    if (typeof numOpath === 'number') {
      path = folders[numOpath as number]?.path
    } else if (typeof numOpath === 'string') {
      path = numOpath
    }
    if (!path) return
    const res = await queryPicList(path, mode).catch(() => { });
    setPath('')
    setPics(val => ({
      ...val,
      [path]: res?.data || val?.[path] || []
    }))
    return res?.data || []
  }, [folders, mode])
  const queryFolder = useCallback(async () => {
    const { data } = await queryPicList(path, mode);
    await new Promise(res => {
      setTimeout(async () => {
        setFolders(data)
        res(data)
      })
    })

  }, [path, mode])
  const firstTime = useCallback(async () => {
    page.current += 1
    for (let i = 0; i < size.current; i++) {
      await queryPics(i + size.current * (page.current - 1));
    }
    if (folders.length <= page.current * size.current) {
      setEnd(true)
    }
  }, [folders?.length, queryPics])

  const delPic = (path: string, item: Pic) => {
    deletePic({ path: item.path, sha: item.sha, mode }).then(res => {
      queryPics(path)
    })
  }
  useImperativeHandle(ref, () => ({
    afterUpload: async () => {
      await queryFolder();
      setPath(0);
      // queryPics(0);
    },
  }))
  const previewPic = (items: Pic[], ind: number) => {
    onPreview?.(items, ind)
  }
  // const queryPreviewUrl = useCallback(() => {
  //     setPics((val) => {
  //       const pathArr = Object.keys(val)
  //       const map: typeof val = {}
  //       // for (let i = 0; i < pathArr.length; i++) {
  //       pathArr.forEach(async (path) => {
  //         // const path = pathArr[i]
  //         const res = await queryPicList(path, mode)
  //         map[path] = [...val[path].map(pic => ({ ...pic, ...(res?.data.find((p: Pic) => p.name === pic.name) || {}) }))]
  //       })
  //       return map
  //   })
  // }, [mode])
  const queryPreviewUrl = useCallback(async () => {
    const pathArr = Object.keys(pics)
    for (let i = 0; i < pathArr.length; i++) {
      const path = pathArr[i]
      const res = await queryPicList(path, mode)
      setPics((val) => ({
        ...val,
        [path]: [...val[path].map(pic => ({ ...pic, ...(res?.data.find((p: Pic) => p.name === pic.name) || {}) }))]
      }))
    }
  }, [mode, pics])
  useEffect(() => {
    if (curPath === '') return
    queryPics(curPath)
  }, [curPath, queryPics])
  useEffect(() => {
    if (!once.current) {
      once.current = true
      queryFolder();
    }
  }, [queryFolder])
  useEffect(() => {
    if (!folders?.length) return
    io.current = new IntersectionObserver(async (entries: IntersectionObserverEntry[]) => {
      if (entries[0].intersectionRatio <= 0) return;
      footer.current && io.current?.unobserve(footer.current);
      await firstTime()
      footer.current && io.current?.observe(footer.current)
    }, {
      rootMargin: '500px 0px'
    });
    footer.current && io.current?.observe(footer.current)
    const picFooter = footer.current
    return () => {
      picFooter && io.current?.unobserve(picFooter);
      io.current?.disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folders?.length])
  useEffect(() => {
    if (show) {
      footer.current && io.current?.observe(footer.current)
    } else {
      footer.current && io.current?.unobserve(footer.current);
      return
    }
    const picFooter = footer.current
    return () => {
      picFooter && io.current?.unobserve(picFooter);
      io.current?.disconnect();
    }
  }, [show])
  const randomColor = useCallback((num: number) => {
    return `#${String(random.current * (num + 4)).slice(4, 7)}`
  }, [])
  useEffect(() => {
    stone.isGithubOwner((isowner) => setOwner(isowner))
  }, [])
  useEffect(() => {
    if (!show || mode !== 'private') return
    clearInterval(timer.current)
    timer.current = setInterval(() => {
      queryPreviewUrl()
    }, 1000 * 180)
    return () => {
      clearInterval(timer.current)
    }
  }, [mode, queryPreviewUrl, show])
  useEffect(() => {
    setMobile(isMobile())
}, [])
  return (<>
    <DIV {...props}>
      <div className="list_wrap">
        {folders?.map((fold, i) => (pics[fold.path]?.length ? (
          <div key={fold.path} className={`time_fold_wrap${page.current * size.current > i ? '' : ' hide'}`}>
            <div className="timestone">
              {isOwner && <input type="checkbox" className="if_del_btn" onChange={(e) => {
                setStartDel(e.target.checked ? fold.name : '')
              }} />}
              {fold.name}
            </div>
            <div className="pics_item_wrap">
              {pics[fold.path]?.map((pic, i) => (
                <div key={pic.name} className="pic_item_wrap" style={{ backgroundColor: randomColor(i) }}>
                  {startDel === fold.name && <SVGIcon className="img_del_btn" type="close" onClick={() => delPic(fold.path, pic)} />}
                  {/* <LazyImage className="img_item" src={`https://wsrv.nl/?url=${(pic.download_url || '').replace('https://', '')}&w=80&h=180&fit=cover&n=-1&q=80`} width="130" height="320" onClick={() => previewPic(pics[fold.path], i)} /> */}
                  <img
                    className="img_item"
                    src={`https://wsrv.nl/?url=${(pic.download_url || '').replace('https://', '')}${mobile ? '&w=80&h=180' : '&w=130'}&fit=cover&n=-1&q=80`}
                    width="130"
                    height="320"
                    alt=""
                    onClick={() => previewPic(pics[fold.path], i)}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : ''
        ))}
      </div>
      <div ref={footer}>
        {end || !folders ? (
          <div className="no_more_tips">真的一点都没有了。。。。。。</div>
        ) : (
          <SVGIcon className="load_more_sign rotate" width="48" type="loading" fill="gray" />
        )}
      </div>
    </DIV>
  </>)
}


export default forwardRef(UploadPicList)