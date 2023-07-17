import SVGIcon from '@/components/SVGIcon'
import { about, addComment, queryComments } from '@/req/about'
import { Artical, Comment } from '@/types/global'
import { stone } from '@/utils/global'
import { parseBody } from '@/utils/md'
import { marked } from 'marked'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { particlesCursor } from 'threejs-toys'
import xss from 'xss'

const DIV = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
`

const BlogContent = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  /* width: fit-content; */
  margin: 60px auto;
  color: #fff;
  line-height: 1.2;
  pointer-events: none;
  vertical-align: bottom;
  .blog_wrap{
    padding: 10px;
    margin: 5px;
    background-color: rgba(200,200,200,.5);
    box-sizing: border-box;
    border-radius: 8px;
  }
  .blog_left{
    display: flex;
    flex-direction: column;
    flex: 1 1 680px;
    max-width: 680px;
    overflow: hidden;
  }
  .add_comment{
    pointer-events: all;
  }
  
  .text_area{
    width: 100%;
    padding: 10px;
    background-color: rgba(255,255,255,.8);
    border: none;
    box-sizing: border-box;
    border-radius: 6px;
    vertical-align: bottom;
    resize: none;
    outline: none;
    font-size: 16px;
  }
  .operate_wrap{
    display: flex;
    justify-content: space-between;
    .preview{
      width: 24px;
      height: 24px;
      padding: 0 2px;
      margin: 0 4px;
      vertical-align: middle;
      cursor: pointer;
      &:hover{
        background-color: rgba(200,200,200,.5);
        border-radius: 4px;
      }
    }
    
    .submit{
      padding: 4px 16px;
      font-weight: bold;
      margin-bottom: 10px;
      background-color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      color: #000;
      cursor: pointer;
    }
  }
  .blog_content{
    padding: 10px;
    /* background-color: rgba(200,200,200,.5); */
    box-sizing: border-box;
    border-radius: 8px;
    pointer-events: all;
                                
  }
  .blog_content,.comment_detail{
    blockquote{
      padding: 4px 0 4px 1em;
      margin: 0;
      margin-bottom: 8px;
      border-left: 4px solid gray;
      white-space: normal;
      background-color: #5c5c5c;
      border-radius: 0 6px 6px 0;
      opacity: 0.8;
      font-size: 14px;
      p{
        margin: 0;
        line-height: 1.2;
      }
    }
    p{
      margin: 0 0 10px;;
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
  .preview_detail_wrap{
    max-height: 160px;
    overflow: auto;
  }
  .preview_detail{
    pointer-events: none;
  }
  .preview_detail_wrap,.text_area,.comment_detail{
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
  
  .comments_wrap{
    display: flex;
    flex-direction: column;
    min-width: 240px;
    margin: 5px;
    position: sticky;
    top: 40px;
    max-height: calc(100vh - 80px);
    overflow: auto;
    &::-webkit-scrollbar{
      display: none;
    }
  }
  .avator{
    width: 36px;
    height: 36px;
    margin-right: 10px;
    border-radius: 4px;
  }
  .author_msg{
    display: flex;
    padding: 5px;
    box-shadow: 0px 5px 10px -5px #999;
  }
  .comment_content_wrap{
    background-color: rgba(200,200,200,.5);
    border-radius: 5px;
    margin-bottom: 10px;
    pointer-events: all;
    .comment_detail_wrap{
      padding: 10px;
    }
    .comment_detail{
      max-height: 400px;
      overflow: auto;
    }
  }
  @media (min-width: 680px) {
    .comment_detail{
      max-width: 400px;
    }
  }
  .text_small{
    font-size: 12px;
    color: #c1c1c1;
  }

  @media (max-width: 680px) {
    display: block;
    .comments_wrap{
      max-height: unset;
    }
  }
`


type Props = {
  artical: Artical,
  comments: Comment[]
}

export default function About({ artical: atl, comments: cmts }: Props) {
  const pic = useRef<HTMLElement | null>()
  const dom = useRef<any>()
  const [artical, setArtical] = useState(atl)
  const content = useRef<HTMLDivElement | null>(null)
  const input = useRef<HTMLTextAreaElement | null>(null)
  const [isPreview, setIsPreview] = useState(false)
  const page = useRef(1)
  const total = useRef(0)
  const [comments, setComments] = useState<Comment[]>([...(cmts || [])])
  const mdify = () => {
    if (!input.current?.value) return;
    const body = xss(marked.parse(input.current.value))
    content?.current && (content.current.innerHTML = body)
  }
  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPreview((val) => {
      !val && mdify()
      return !val
    })
  }
  const submit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!input.current?.value) return
    addComment(input.current.value).then(res => {
      if (res.code) return
      listComments(1)
      input.current && (input.current.value = '')
      content.current && (content.current.innerHTML = '')
      setIsPreview(false)
    })
  }

  const listComments = (page: number) => {
    queryComments(page).then(res => {
      total.current = res.total
      setComments(res.data)
    })
  }
  const queryMe = () => {
    about().then(res => {
      setArtical(res.data)
    })
  }

  useEffect(() => {
    stone.data.emit()
    // md解析的图片会添加懒加载机制，此时必须手动检查一次是否在可视区内
    if (dom.current) return
    pic.current = document.getElementById('test')
    dom.current = particlesCursor({
      el: pic.current,
      gpgpuSize: 512,
      colors: [0x00ff00, 0x0000ff],
      color: 0xff0000,
      coordScale: 0.5,
      noiseIntensity: 0.001,
      noiseTimeCoef: 0.0001,
      pointSize: 5,
      pointDecay: 0.0025,
      sleepRadiusX: 250,
      sleepRadiusY: 250,
      sleepTimeCoefX: 0.001,
      sleepTimeCoefY: 0.002
    })
    document.body.addEventListener('click', () => {
      if (!dom.current) return
      dom.current.uniforms.uColor.value.set(Math.random() * 0xffffff)
      dom.current.uniforms.uCoordScale.value = 0.001 + Math.random() * 2
      dom.current.uniforms.uNoiseIntensity.value = 0.0001 + Math.random() * 0.001
      dom.current.uniforms.uPointSize.value = 1 + Math.random() * 10
    })
    queryMe();
    listComments(page.current);
  }, [])
  return (
    <>
      <Head>
        <title>about</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <DIV id="test"></DIV>
        <BlogContent>
          <div className='blog_left'>
            <div className="blog_content blog_wrap" dangerouslySetInnerHTML={{ __html: parseBody(xss(marked.parse(artical?.body || ''))) }} />
            <div className='blog_wrap add_comment'>
              <label htmlFor="comments_input">添加评论</label>
              <div className='operate_wrap'>
              <SVGIcon type="code" className='preview' alt='preview' onClick={handlePreview} />
                <button className='submit' aria-label='submit comment' onClick={submit}>add comment</button>
              </div>
              <div className='preview_detail_wrap' style={{ display: isPreview ? 'block' : 'none' }}>
                <div ref={content} className='blog_content preview_detail'></div>
              </div>
              <textarea id="comments_input" ref={input} className='text_area' rows={8} style={{ display: isPreview ? 'none' : 'block' }} placeholder='此处添加评论' aria-label='edit some comments'></textarea>
            </div>
          </div>
          <div className='comments_wrap'>
            {comments.length ? comments.map(comment => (
              <div key={comment.id} className='comment_content_wrap'>
                <div className='author_msg'>
                  <img className='avator' src={comment.author.avatarUrl} alt="" />
                  <div>
                    <div>{comment.author.login}</div>
                    <div className='text_small'>{comment.updatedAt}</div>
                  </div>
                </div>
                <div className='comment_detail_wrap'>
                  <div className='blog_content comment_detail' dangerouslySetInnerHTML={{ __html: parseBody(xss(marked.parse(comment.body))) }}></div>
                </div>
              </div>
            )) : (
            <div className='comment_content_wrap'>
              <div className='blog_content comment_detail text_center'>一个评论都没有呢。。。。。。</div>
            </div>
            )}
          </div>
        </BlogContent>
      </main>
    </>
  )
}
export const getStaticProps = async (context: any) => {
  const props: Partial<Props> = {}
  // const reqs = [about(), queryComments(1)]
  // const [artical, comments] = await Promise.allSettled(reqs);
  // if (artical.status === 'fulfilled' && artical.value?.data) {
  //   const data = artical.value.data
  //   props.artical = data
  // }
  // if (comments.status === 'fulfilled' && comments.value?.data) {
  //   const data = comments.value.data
  //   props.comments = data
  // }
  return { props }
}
