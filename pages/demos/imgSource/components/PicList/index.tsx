import LazyImage from "@/components/LazyImage"
import SVGIcon from "@/components/SVGIcon"
import { deletePic, queryPicList } from "@/req/demos"
import { Pic, RefType } from "@/types/demos"
import { stone } from "@/utils/global"
import { forwardRef, Ref, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import styled from "styled-components"


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
`

type Folder = {
  path: string,
  name: string,
}

type Props = {
  list: Folder[],
  path?: string,
  show?: boolean | string,
  onPreview?: (items: Pic[], ind: number) => void,
  [key: string]: any,
}



type PicsMap = {
  [key in Folder['path']]: Pic[]
}


function UploadPicList({ list = [], path = 'mini/', show = true, onPreview, ...props }: Props, ref: Ref<RefType>) {
  const [isOwner, setOwner] = useState(false)
  const [folders, setFolders] = useState(list)
  const [pics, setPics] = useState<PicsMap>({})
  const page = useRef(0)
  const size = useRef(1)
  const once = useRef(false)
  const [end, setEnd] = useState(false)
  const [curPath, setPath] = useState<number | string>('')
  const io = useRef<IntersectionObserver>()
  const footer = useRef<HTMLDivElement | null>(null)
  const queryPics = useCallback(async (numOpath: number | string) => {
    let path = ''
    if (typeof numOpath === 'number') {
      path = folders[numOpath as number]?.path
    } else if (typeof numOpath === 'string') {
      path = numOpath
    }
    if (!path) return
    const res = await queryPicList(path).catch(() => { });
    setPath('')
    setPics(val => ({
      ...val,
      [path]: res?.data || val?.[path] || []
    }))
    return res?.data || []
  }, [folders])
  const queryFolder = useCallback(async () => {
    const { data } = await queryPicList(path);
    await new Promise(res => {
      setTimeout(async () => {
        setFolders(data)
        res(data)
      })
    })

  }, [path])
  const firstTime = useCallback(async () => {
    page.current += 1
    for (let i = 0; i < size.current; i++) {
      await queryPics(i + size.current * (page.current - 1));
    }
    if (folders.length <= page.current * size.current) {
      setEnd(true)
    }
  }, [folders.length, queryPics])

  const delPic = (path: string, item: Pic) => {
    deletePic({ path: item.path, sha: item.sha }).then(res => {
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
  useEffect(() => {
    if (curPath === '') return
    queryPics(curPath)
  }, [curPath, queryPics])
  useEffect(() => {
    if(!once.current) {
      once.current = true
      queryFolder();
    }
  }, [queryFolder])
  useEffect(() => {
    if(!folders.length) return
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
  }, [folders.length])
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
  useEffect(() => {
    stone.isGithubOwner((isowner) => setOwner(isowner))
  }, [])
  return (<>
    <DIV {...props}>
      <div className="list_wrap">
        {folders?.map((fold, i) => (pics[fold.path]?.length ? (
          <div key={fold.path} className={`time_fold_wrap${page.current * size.current > i ? '' : ' hide'}`}>
            <div className="timestone">{fold.name}</div>
            <div className="pics_item_wrap">
              {pics[fold.path]?.map((pic, i) => (
                <div key={pic.name} className="pic_item_wrap" style={{ backgroundColor: `#${String(Math.random()).slice(4,7)}` }}>
                  {isOwner && <SVGIcon className="img_del_btn" type="close" onClick={() => delPic(fold.path, pic)} />}
                  <LazyImage className="img_item" src={pic.cdn_url} width="130" height="320" onClick={() => previewPic(pics[fold.path], i)} />
                </div>
              ))}
            </div>
          </div>
        ) : ''
        ))}
      </div>
      <div ref={footer}>
        {end ? (
          <div className="no_more_tips">真的一点都没有了。。。。。。</div>
        ) : (
          <SVGIcon className="load_more_sign rotate" width="48" type="loading" fill="gray" />
        )}
      </div>
    </DIV>
  </>)
}


export default forwardRef(UploadPicList)