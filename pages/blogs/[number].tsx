import LazyImage from '@/components/LazyImage'
import SVGIcon from '@/components/SVGIcon'
import { addComment, queryComments } from '@/req/about'
import { listArtical } from '@/req/main'
import { UserInfo } from '@/types/github'
import { Artical, Comment } from '@/types/global'
import { env, stone } from '@/utils/global'
import { parseBody } from '@/utils/md'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import xss from 'xss'
import MarkdownIt from 'markdown-it';
// marked在安卓默认浏览器兼容性不佳

const DIV = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background-color: #e2e2e2;
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
  color: #000;
  line-height: 1.2;
  pointer-events: none;
  vertical-align: bottom;
  .blog_wrap{
    min-width: 200px;
    padding: 10px;
    margin: 5px;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 8px;
    pointer-events: all;
  }
  .blog_left{
    display: flex;
    flex-direction: column;
    flex: 1 1 769px;
    max-width: 769px;
    overflow: hidden;
  }
  .add_comment{
    pointer-events: all;
  }
  
  .text_area{
    width: 100%;
    padding: 10px;
    background-color: #f5f5f5;
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
      fill: #a2a2a2;
      &:hover{
        background-color: #a2a2a2;
        border-radius: 4px;
        fill: #fff;
      }
    }
    
    .submit{
      padding: 4px 16px;
      font-weight: bold;
      margin-bottom: 10px;
      background-color: #666;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      color: #fff;
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
  
  .blog_content,.preview_detail{
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
    top: 65px;
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
    box-shadow: 0px 0px 10px -5px #999;
  }
  .comment_content_wrap{
    background-color: #fff;
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
  @media (min-width: 769px) {
    .comment_detail{
      max-width: 400px;
    }
  }
  .text_small{
    font-size: 12px;
    color: #423f3f;
  }

  @media (max-width: 769px) {
    display: block;
    .comments_wrap{
      max-height: unset;
    }
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
  .fixed_operate_wrap{
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 28px 10px;
    z-index: 6;
    pointer-events: all;
  }
  .artical_btn{
    display: inline-block;
    padding: 0;
    background-color: transparent;
    background-image: radial-gradient(#000 0%, #888 10%, #fff 60%, transparent 75%);;
    border: none;
    border-radius: 6px;
    text-align: center;
  }
  .atl_icon{
    width: 25px;
    height: 25px;
    fill: #888;
  }
`

type Props = {
  artical: Artical,
  comments: Comment[]
}

export default function Blog({ artical: atl, comments: cmts }: Props) {
  const md = new MarkdownIt()
  const { query } = useRouter()
  const [artical, setArtical] = useState(atl)
  const content = useRef<HTMLDivElement | null>(null)
  const input = useRef<HTMLTextAreaElement | null>(null)
  const [isPreview, setIsPreview] = useState(false)
  const page = useRef(1)
  const [comments, setComments] = useState<Comment[]>(cmts || [])
  const [isOwner, setOwner] = useState(false)
  const router = useRouter();
  const mdify = () => {
    if (!input.current?.value) return;
    const body = xss(md.render(input.current.value))
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
    if (!input.current?.value || !query.number) return
    addComment(input.current.value, +query.number).then(res => {
      if (res.code) return
      listComments()
      if (input.current) {
        input.current.value = ''
        content.current && (content.current.innerHTML = '')
        setIsPreview(false)
      }
    })
  }
  const listComments = useCallback(() => {
    if(!query.number) return
    queryComments(page.current, +query.number).then(res => {
      setArtical((atl) => ({ ...atl, comments: res.total }))
      setComments(res.data)
    })
  }, [query])
  useEffect(() => {
    if(!artical && query.number) {
      listArtical(+query.number).then(res => {
        if(!res.data?.labels?.some((e: any) => e.name === 'blog')) {
          router.replace('/404')
          return
        }
        setArtical(res.data)
        listComments()
      })
    }else if(!artical?.labels?.some(e => e.name === 'blog')) {
      router.replace('/404')
    }
    stone.data.emit()
    // md解析的图片会添加懒加载机制，此时必须手动检查一次是否在可视区内
    stone.isGithubOwner((isowner) => setOwner(isowner))
  }, [router, artical, query, listComments])

  if(router.isFallback){
    console.log('fallback来了')
    return (
      <div style={{
        fontSize: '32px',
        color: 'gray',
        textAlign: 'center',
        margin: '80px auto'
      }}>loading...</div>
    )
  }
  return (
    <>
      <Head>
        <title>{artical?.title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <DIV id="test"></DIV>
        {router.isFallback ? (
          <div style={{
            fontSize: '32px',
            color: 'gray',
            textAlign: 'center',
            margin: '80px auto'
          }}>loading...</div>
        ) : (
          <BlogContent>
            <div className='blog_left'>
              <div className='blog_wrap'>
                <h1>{artical?.title || ''}</h1>
                <div className='text_small'>
                  <span className='atl_base_msg'>创建时间：
                    <span>{artical?.created_at || ''}</span>
                  </span>
                  <span className='atl_base_msg'>评论数：{artical?.comments || 0}</span>
                </div>
                <LazyImage className='atl_bg' width="700" height="200" src={artical?.img || ''} alt={artical?.title || ''} />
                <div className="blog_content" dangerouslySetInnerHTML={{ __html: parseBody(xss(md.render(artical?.body || '')))}}></div>
              </div>
              <div className='blog_wrap add_comment'>
                <div className='operate_wrap'>
                  {/* <img src="/code.svg" className='preview' alt='preview' onClick={handlePreview} /> */}
                  <SVGIcon type="code" className='preview' alt='preview' onClick={handlePreview} />
                  <button className='submit' aria-label='submit comment' onClick={submit}>add comment</button>
                </div>
                <div className='preview_detail_wrap' style={{ display: isPreview ? 'block' : 'none' }}>
                  <div ref={content} className='blog_content preview_detail'></div>
                </div>
                <label htmlFor="commentInput"></label>
                <textarea id='commentInput' ref={input} className='text_area' rows={8} style={{ display: isPreview ? 'none' : 'block' }} placeholder='这里添加评论......'></textarea>
              </div>
            </div>
            <div className='comments_wrap'>
              {
                comments.length ? comments.map(comment => (
                  <div key={comment.id} className='comment_content_wrap'>
                    <div className='author_msg'>
                      <LazyImage className='avator' width="36" height="36" src={comment.author.avatarUrl} alt="" />
                      <div>
                        <div>{comment.author.login}</div>
                        <div className='text_small'>{comment.updatedAt}</div>
                      </div>
                    </div>
                    <div className='comment_detail_wrap'>
                      <div className='blog_content comment_detail' dangerouslySetInnerHTML={{ __html: parseBody(xss(md.render(comment.body))) }}></div>
                    </div>
                  </div>
                )) : (
                <div className='comment_content_wrap'>
                  <div className='blog_content comment_detail text_center'>一个评论都没有呢。。。。。。</div>
                </div>
              )}
            </div>
            <div className='fixed_operate_wrap'>
              {isOwner && (
                <Link className='artical_btn' aria-label='create a new artical' href={`/blogs/edit/${artical.number}`}>
                  <SVGIcon type='edit' className="atl_icon" />
                </Link>
              )}
            </div>
          </BlogContent>
        )}
      </main>
    </>
  )
}

export async function getStaticPaths() {
  const artical = await listArtical()
  const paths = artical?.data?.map((atl: Artical) => ({
    params: { number: String(atl.number) }
  })) || []
  return {
    paths,
    fallback: true, // See the "fallback" section below
  };
}

export const getStaticProps = async (context: any) => {
  const { number } = context.params
  const props: Partial<Props> = {}
  if (+String(number) + 1) {
    const reqs = [listArtical(+number), queryComments(1, number)]
    const [artical, comments] = await Promise.allSettled(reqs);
    if (artical.status === 'fulfilled' && artical.value?.data) {

      const data = artical.value.data
      props.artical = data
    }
    if (comments.status === 'fulfilled' && comments.value?.data) {
      const data = comments.value.data
      props.comments = data
    }
  }
  return { props }
}