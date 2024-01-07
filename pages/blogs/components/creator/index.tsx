import ImgUpload, { UploadRefType } from '@/components/ImgUpload'
import LazyImage from '@/components/LazyImage'
import DateText from '@/components/SsrRender/Timer'
import { ArticalParams } from '@/types/blogs'
import { Pic } from '@/types/demos'
import { Artical } from '@/types/global'
import { parseBody } from '@/utils/md'
import MarkdownIt from 'markdown-it'
import { useRouter } from 'next/router'
import { ChangeEvent, ClipboardEvent, useEffect, useRef, useState } from 'react'
import xss from 'xss'
import style from './index.module.scss'

type Props = {
  artical: Partial<Artical>
  onSubmit: (params: ArticalParams) => Promise<any>,
}

export default function BlogCreator({ artical, onSubmit: fn }: Props) {
  const md = new MarkdownIt()
  const [title, setTitle] = useState(artical?.title || '')
  const [content, setContent] = useState(artical?.body || '')
  const [img, setImg] = useState<string>(artical?.img || '')
  const parseMd = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }
  const uploadRef = useRef<UploadRefType>(null)
  const router = useRouter()
  const handlePaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    let file = [];
    const items = e.clipboardData.items;
    if (items && items.length) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const cpFile = items[i].getAsFile()
          cpFile && file.push(cpFile);
        }
      }
    }
    if (file) {
      // 此时获取到file文件对象，即可处理上传相关处理
      uploadRef.current?.addFile(file)
    }
  }
  const afterUpload = (pics: {normal: Pic}[]) => {
    setTimeout(() => {
      setContent(c => c + pics.map(({normal}) => `\n![${normal.name}](${normal.cdn_url})`).join('\n'))
    })
  }
  const onSubmit = () => {
    const { number } = router.query;
    if (!confirm('确认提交？')) return
    fn({
      ...(number ? { number: +number }: {}),
      title: JSON.stringify({ title, img: img }),
      body: content || '',
      labels: ["blog"]
    }).then(res => {
      if (res.code) return;
      setTitle('');
      setContent('');
      if(!number) {
        alert('文章已送入审核，稍后发布')
      }
      router.replace(number ? `/blogs/${res.data.number}` : '/')
    })
  }
  useEffect(() => {
    setImg(artical?.img || '')
  }, [artical])
  return (<div className={style['creator_wrap']}>
    <div className={style['mobile_top_mask']}></div>
    <div className={style['wrap']}>
      <div className={style['real_content_area']}>
        <h1>{title}</h1>
        <div className={style['text_small']}>
        <DateText
          render={(formattedDate) => <span className={style['atl_base_msg']}>创建时间：{formattedDate}</span>}
          value={artical?.created_at}
        />
          {/* <span className={style['atl_base_msg']}>创建时间：{artical?.created_at || new Date().toLocaleDateString()}</span> */}
        </div>
        <LazyImage className={style['atl_bg']} width="700" height="200" src={img} alt={title} />
        <div className={style['blog_content']} dangerouslySetInnerHTML={{ __html: parseBody(xss(md.render(content || '')), ['lazyImg']) }}></div>
      </div>
      <div className={style['input_area']}>
        <div className={style['title_area']}>
          <input
            className={style['title_input']}
            type="text"
            aria-label='blog title'
            placeholder='标题'
            defaultValue={title}
            onChange={e => setTitle(e.target.value)}
          />
          {title && content && <button className={style['create_blog_btn']} onClick={onSubmit}>{router.query.number ? 'edit' : 'create'}</button>}
        </div>
        <div className={style['content_area']}>
        <ImgUpload
          ref={uploadRef}
          align="top"
          clickable={false}
          onFinish={afterUpload}
        >
          <div>
            <textarea
              className={style['text_input']}
              name="blog content"
              placeholder='博客正文'
              value={content}
              autoFocus
              suppressContentEditableWarning
              contentEditable
              onPaste={handlePaste}
              onChange={parseMd}
            ></textarea>
          </div>
        </ImgUpload>
        </div>
      </div>
    </div>
  </div>)
}
