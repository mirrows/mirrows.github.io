import { about, addComment, queryComments } from '@/req/about'
import { stone } from '@/utils/global'
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import Head from 'next/head'
import Link from 'next/link'
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { particlesCursor } from 'threejs-toys'

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
    padding: 10px 20px;
    /* background-color: rgba(200,200,200,.5); */
    box-sizing: border-box;
    border-radius: 8px;
    pointer-events: none;
    blockquote{
      padding: 4px 0 4px 1em;
      margin: 0;
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
      margin: 0;
      white-space: pre-wrap;
      line-height: 1.5;
    }
    a{
      pointer-events: all;
    }                              
  }
  .preview_detail_wrap{
    max-height: 160px;
    overflow: auto;
  }
  .preview_detail{
    pointer-events: none;
    padding: 10px;
  }
  .preview_detail_wrap,.text_area,.comment_content_wrap{
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
    min-width: 300px;
    pointer-events: none;
    .blog_wrap{
      border-radius: 0 5px 5px 5px;
      margin: 5px 10px;
    }
  }
  .avator{
    width: 36px;
    height: 36px;
    margin-right: 10px;
  }
  .author_msg{
    display: flex;
    width: fit-content;
    padding: 5px 10px;
    background-color: rgba(200,200,200,.5);
    margin-bottom: -5px;
    border-radius: 5px 5px 0 5px;
    margin-top: 10px;
    .blog_wrap{
      border-radius: 0 5px 5px 5px;
    }
  }
  .comment_content_wrap{
    overflow: auto;
    max-height: 400px;
  }
  .text_small{
    font-size: 12px;
    color: #c1c1c1;
  }

  @media (max-width: 680px) {
    display: block;
  }
`

type Comment = {
  body: string,
  id: string,
  updatedAt: string,
  author: {
    avatarUrl: string,
    login: string,
    url: string,
  }
}


export default function About() {
  const pic = useRef<HTMLElement | null>()
  const dom = useRef<any>()
  const personal = useRef<HTMLDivElement | null>(null)
  const content = useRef<HTMLDivElement | null>(null)
  const input = useRef<HTMLTextAreaElement | null>(null)
  const [isPreview, setIsPreview] = useState(false)
  const page = useRef(1)
  const total = useRef(0)
  const [comments, setComments] = useState<Comment[]>([])
  const mdify = () => {
    if (!input.current?.value) return;
    const body = DOMPurify.sanitize(marked.parse(input.current.value))
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
      listComments()
      input.current && (input.current.value = '')
    })
  }

  const listComments = () => {
    queryComments(page.current).then(res => {
      console.log(res.data, res.total)
      total.current = res.total
      setComments(res.data)
    })
  }

  useEffect(() => {
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
    about().then(res => {
      if (res.code) return
      const { body } = res.data
      // const content = DOMPurify.sanitize(marked.parse(`${body}<img alt="666" onclick="alert(666)" /><script>alert(888)</script>`))
      const content = DOMPurify.sanitize(marked.parse(body))
      personal?.current && (personal.current.innerHTML = content)
    })
    listComments()
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
        <DIV id="test">
          {/* 关于我页面 */}
          {/* <Link href="/">回到首页</Link> */}
        </DIV>
        <BlogContent>
          <div className='blog_left'>
            <div ref={personal} className="blog_content blog_wrap" />
            <div className='blog_wrap add_comment'>
              <div className='operate_wrap'>
                <img src="/code.svg" className='preview' alt='preview' onClick={handlePreview} />
                <button className='submit' onClick={submit}>add comment</button>
              </div>
              <div className='preview_detail_wrap' style={{ display: isPreview ? 'block' : 'none' }}>
                <div ref={content} className='blog_content preview_detail'></div>
              </div>
              <textarea ref={input} className='text_area' rows={8} style={{ display: isPreview ? 'none' : 'block' }}></textarea>
            </div>
          </div>
          <div className='comments_wrap'>
            {comments.map(comment => (
              <div key={comment.id} className=''>
                <div className='author_msg'>
                  <img className='avator' src={comment.author.avatarUrl} alt="" />
                  <div>
                    <div>{comment.author.login}</div>
                    <div className='text_small'>{new Date(comment.updatedAt).toLocaleString()}</div>
                  </div>
                </div>
                <div className='comment_content_wrap blog_wrap'>
                  <div className='blog_content' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(comment.body)) }}></div>
                </div>
              </div>
            ))}
          </div>
        </BlogContent>
      </main>
    </>
  )
}
