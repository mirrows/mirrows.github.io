import LazyImage from '@/components/LazyImage'
import DateText from '@/components/SsrRender/Timer'
import { ArticalParams } from '@/types/blogs'
import { Artical } from '@/types/global'
import { parseBody } from '@/utils/md'
import MarkdownIt from 'markdown-it'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import xss from 'xss'

const DIV = styled.div`
  min-height: 100vh;
  padding: 60px 0;
  background-color: #e2e2e2;
  box-sizing: border-box;
  .wrap{
    display: flex;
    align-items: flex-start;
    width: 80%;
    max-width: 1360px;
    margin: 0 auto;
  }
  .input_area,.real_content_area{
    width: 100%;
    margin: 5px;
  }
  .input_area,.real_content_area,.content_area, .title_area{
    flex: 1;
    min-width: 240px;
    box-sizing: border-box;
    pointer-events: all;
  }
  .real_content_area,.content_area, .title_area{
    padding: 10px;
    border-radius: 8px;
    background-color: #fff;
  }
  .input_area{
    position: sticky;
    top: 65px;
  }
  .title_area{
    display: flex;
    align-items: stretch;
    margin-bottom: 10px;
  }
  .real_content_area{
    min-height: calc(100vh - 130px);
    blockquote{
        padding: 4px 0 4px 1em;
        margin: 0;
        margin-bottom: 8px;
        border-left: 4px solid gray;
        white-space: normal;
        background-color: #f5f5f5;
        border-radius: 0 6px 6px 0;
        opacity: 0.8;
        font-size: 14px;
        p{
          margin: 0;
          line-height: 1.2;
        }
      }
      p{
        margin: 0 0 10px;
        white-space: pre-wrap;
        line-height: 1.5;
        word-break: break-all;
      }
      a{
        pointer-events: all;
      }
      img{
        max-width: 100%;
      }
      table{
        border-collapse:collapse;
      }
      table th, table td{
        min-width: 80px;
        padding: 4px;
        border: 1px solid #000;
      }
      ul{
        margin: 10px 0;
      }
      ul li:before{
        content: "⚪";
        float: left;
        margin-right: 10px;
        font-weight: 900;
      }
      code {
        background-color: #f5f5f5;
        overflow: auto;
        color: #000;
      }
      pre {
        padding: 10px;
        background-color: #f5f5f5;
        overflow: auto;
        border-radius: 8px;
        color: #000;
      }
      pre {
        &::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        /* 滚动条滑块 */
        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: #a5a5a5;
        }
      }
  }
  .title_input{
    width: 100%;
    padding: 10px;
    background-color: #f5f5f5;
    border: none;
    outline: none;
    box-sizing: border-box;
    border-radius: 6px;
    font-size: 16px;
    pointer-events: all;
  }
  .text_input{
    width: 100%;
    height: calc(100vh - 218px);
    padding: 10px;
    background-color: #f5f5f5;
    border: none;
    box-sizing: border-box;
    border-radius: 6px;
    vertical-align: bottom;
    resize: none;
    outline: none;
    font-size: 16px;
    pointer-events: all;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: #a5a5a5;
    }
  }
  .create_blog_btn{
    padding: 4px 16px;
    margin-left: 10px;
    font-weight: bold;
    background-color: #666;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
  }
  
  .text_small{
    font-size: 12px;
    color: #423f3f;
  }
  .atl_base_msg{
    margin-right: 20px;
  }
  
  .atl_bg{
    height: 200px;
    width: 100%;
    object-fit: cover;
    margin: 10px 0;
  }
  .blog_content{
    padding: 10px;
    /* background-color: rgba(200,200,200,.5); */
    box-sizing: border-box;
    border-radius: 8px;
    pointer-events: all;
  }
  @media(max-width: 769px){
    .wrap{
      flex-direction: column;
    }
    .input_area{
      order: -1;
    }
    .input_area{
      padding-bottom: 5px;
      margin-bottom: 0;
      background-color: #e2e2e2;
    }
    .text_input{
      height: 30vh;
    }
  }
`

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
  const router = useRouter()
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
    console.log(artical)
    setImg(artical?.img || '')
  }, [artical])
  return (<DIV>
    <div className='wrap'>
      <div className='real_content_area'>
        <h1>{title}</h1>
        <div className='text_small'>
        <DateText
          render={(formattedDate) => <span className='atl_base_msg'>创建时间：{formattedDate}</span>}
          value={artical?.created_at}
        />
          {/* <span className='atl_base_msg'>创建时间：{artical?.created_at || new Date().toLocaleDateString()}</span> */}
        </div>
        <LazyImage className='atl_bg' width="700" height="200" src={img} alt={title} />
        <div className="blog_content" dangerouslySetInnerHTML={{ __html: parseBody(xss(md.render(content || '')), ['lazyImg']) }}></div>
      </div>
      <div className='input_area'>
        <div className='title_area'>
          <input
            className='title_input'
            type="text"
            aria-label='blog title'
            placeholder='标题'
            defaultValue={title}
            onChange={e => setTitle(e.target.value)}
          />
          {title && content && <button className='create_blog_btn' onClick={onSubmit}>{router.query.number ? 'edit' : 'create'}</button>}
        </div>
        <div className='content_area'>
          <textarea
            className='text_input'
            name="blog content"
            placeholder='博客正文'
            defaultValue={content}
            onChange={parseMd}
          ></textarea>
        </div>
      </div>
    </div>
  </DIV>)
}
