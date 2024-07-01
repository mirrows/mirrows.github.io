import LazyImage from '@/components/LazyImage'
import SVGIcon from '@/components/SVGIcon'
import { addComment, queryComments } from '@/req/about'
import { ListArticalParams, listArtical } from '@/req/main'
import { Artical, Comment } from '@/types/global'
import { stone } from '@/utils/global'
import { parseBody } from '@/utils/md'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ClipboardEvent, useCallback, useEffect, useRef, useState } from 'react'
import xss from 'xss'
import MarkdownIt from 'markdown-it';
import DateText from '@/components/SsrRender/Timer'
import Pagination from '@/components/Pagination'
import ImgUpload, { UploadRefType } from '@/components/ImgUpload'
import { Pic } from '@/types/demos'
import { randomString } from '@/utils/common'
// marked在安卓默认浏览器兼容性不佳

import style from './index.module.scss'

type Props = {
  artical: Artical,
  comments: Comment[],
}

export default function Blog({ artical: atl, comments: cmts }: Props) {
  const md = new MarkdownIt()
  const { query, replace } = useRouter()
  const [artical, setArtical] = useState(atl)
  const content = useRef<HTMLDivElement | null>(null)
  const input = useRef<HTMLTextAreaElement | null>(null)
  const username = useRef<HTMLInputElement | null>(null)
  const email = useRef<HTMLInputElement | null>(null)
  const [isPreview, setIsPreview] = useState(false)
  const [comments, setComments] = useState<Comment[]>(cmts || [])
  const [isOwner, setOwner] = useState(false)
  const [page, setPage] = useState(1)
  const [canCommit, setCanCommit] = useState(false)
  const uploadRef = useRef<UploadRefType>(null)
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
  const afterUpload = (pics: { normal: Pic }[]) => {
    console.log(pics)
    setTimeout(() => {
      if (input.current) {
        input.current.value = input.current.value + pics.map(({ normal }) => `\n![${normal.name}](https://wsrv.nl/?url=${normal.download_url.replace('https://', '')})`).join('\n')
        input.current.focus()
      }
    })
  }
  const submit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!username.current?.value || !email.current?.value || !input.current?.value || !query.number) return
    const body = {
      body: input.current.value,
      login: username.current.value,
      email: email.current.value,
      avatarUrl: !!email.current.value.match('@qq.com')
        ? `https://q.qlogo.cn/g?b=qq&nk=${email.current.value.trim().replace('@qq.com', '')}&s=100`
        : (stone.data.userInfo?.login && !isOwner)
          ? stone.data.userInfo.avatar_url
          : `https://ui-avatars.com/api/?name=${randomString()}`
    }
    if (!email.current.value.match(/^[A-Za-z0-9-_\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+$/)) {
      alert('邮箱格式错误')
      return
    }
    addComment(JSON.stringify(body), +query.number).then(res => {
      if (res.code) return
      listComments()
      localStorage.setItem('userMsg', JSON.stringify({
        username: username.current?.value,
        email: email.current?.value,
      }))
      if (input.current) {
        input.current.value = ''
        content.current && (content.current.innerHTML = '')
        setIsPreview(false)
      }
    })
  }
  const handlePagination = ({ page = 1 }: { type: 'before' | 'after', page?: number }) => {
    setPage(page || 1)
    listComments({
      number: +(query.number || ''),
      per_page: 30,
      page,
    });
  }
  const listComments = useCallback((params?: ListArticalParams) => {
    if (!query.number) return

    queryComments(params || { number: +query.number }).then(({ data }) => {
      setComments(data)
      setArtical(atl => ({ ...atl }))
      if (!params) {
        setPage(1)
      }
    })
  }, [query])

  const isCanCommit = () => {
    setCanCommit(!(!username.current?.value || !email.current?.value || !input.current?.value || !query.number));
  }
  useEffect(() => {
    if (query.number) {
      listArtical({ number: +query.number }).then(res => {
        if (!res.data?.labels?.some((e: any) => e.name === 'blog')) {
          replace('/404')
          return
        }
        res?.data && setArtical(res.data)
        listComments()
      })
    }
    try {
      // 自动填充用户名和邮箱
      const data = JSON.parse(localStorage.userMsg)
      username.current && (username.current.value = data.username)
      email.current && (email.current.value = data.email)
    } catch {
      console.log('暂无默认值', localStorage.userMsg)
    }
    // md解析的图片会添加懒加载机制，此时必须手动检查一次是否在可视区内
    stone.isGithubOwner((isowner) => {
      try {
        // 自动填充用户名和邮箱
        const data = JSON.parse(localStorage.userMsg)
        username.current && (username.current.value = data.username)
        email.current && (email.current.value = data.email)
      } catch {
        if (stone.data.userInfo?.login && !isowner) {
          username.current && (username.current.value = stone.data.userInfo.login)
          email.current && stone.data.userInfo?.email && (email.current.value = stone.data.userInfo.email)
        }
      }
      setOwner(isowner)
    })

  }, [query, listComments, replace])

  return (
    <>
      <Head>
        <title>{artical?.title}|David&apos;s world</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={style['bg']} />
        <div className={style['blog_detail_wrap']}>
          <div className={style['blog_left']}>
            <div className={style['blog_wrap']}>
              <h1>{artical?.title || ''}</h1>
              <div className={style['text_small']}>
                <span className={style['atl_base_msg']}>创建时间：
                  <DateText
                    render={(formattedDate) => <span>{formattedDate}</span>}
                    value={artical?.created_at}
                  />
                  {/* <span>{new Date(artical?.created_at).toLocaleDateString() || ''}</span> */}
                </span>
                <span className={style['atl_base_msg']}>评论数：{artical?.comments || 0}</span>
              </div>
              <LazyImage className={style['atl_bg']} width="700" height="200" src={artical?.img || ''} alt={artical?.title || ''} />
              <div className={style['blog_content']} dangerouslySetInnerHTML={{ __html: parseBody(xss(md.render(artical?.body || ''))) }}></div>
            </div>

            <div className={`${style['blog_wrap']} ${style['add_comment']}`}>
              <div className={style['other_words']}>
                <input ref={username} type="text" className={style['input_item']} placeholder='用户名(必填)' name="" id="" onInput={isCanCommit} />
                <input ref={email} type="text" className={style['input_item']} placeholder='邮箱(必填)' name="" id="" onInput={isCanCommit} />
              </div>
              <ImgUpload
                ref={uploadRef}
                clickable={false}
                autoUpload
                onFinish={afterUpload}
              >
                <div>
                  <label htmlFor="commentInput"></label>
                  <textarea
                    id='commentInput'
                    ref={input}
                    className={style['text_area']}
                    rows={8}
                    style={{ display: isPreview ? 'none' : 'block' }}
                    placeholder='这里添加评论......'
                    suppressContentEditableWarning
                    contentEditable
                    onPaste={handlePaste}
                    onInput={isCanCommit}
                  />
                </div>
                <div className={style['operate_wrap']}>
                  {/* <img src="/code.svg" className={style['preview']} alt='preview' onClick={handlePreview} /> */}
                  <SVGIcon type="code" className={style['preview']} alt='preview' onClick={handlePreview} />
                  <button className={style['submit']} disabled={!canCommit} aria-label='submit comment' onClick={submit}>add comment</button>
                </div>
              </ImgUpload>
              {/* <div className={style['operate_wrap']}>
                    <SVGIcon type="code" className={style['preview']} alt='preview' onClick={handlePreview} />
                    <button className={style['submit']} aria-label='submit comment' onClick={submit}>add comment</button>
                  </div> */}
              <div className={style['preview_detail_wrap']} style={{ display: isPreview ? 'block' : 'none' }}>
                <div ref={content} className={`${style['blog_content']} ${style['preview_detail']}`}></div>
              </div>
            </div>
          </div>
          <div className={style['comments_wrap']}>
            <Pagination page={page} total={artical?.comments || 0} onChange={handlePagination} />
            {
              comments.length ? comments.map(comment => (
                <div key={comment.id} className={style['comment_content_wrap']}>
                  <div className={style['author_msg']}>
                    <LazyImage className={style['avator']} width="36" height="36" src={comment.author.avatar_url} alt="" />
                    <div>
                      <div>{comment.author.login}</div>
                      <DateText
                        render={(formattedDate) => <div className={style['text_small']}>{formattedDate}</div>}
                        value={comment.updated_at}
                      />
                      {/* <div className={style['text_small']}>{new Date(comment.updatedAt).toLocaleDateString()}</div> */}
                    </div>
                  </div>
                  <div className={style['comment_detail_wrap']}>
                    <div className={`${style['blog_content']} ${style['comment_detail']}`} dangerouslySetInnerHTML={{ __html: parseBody(xss(md.render(comment.body))) }}></div>
                  </div>
                </div>
              )) : (
                <div className={style['comment_content_wrap']}>
                  <div className={`${style['blog_content']} ${style['comment_detail']} ${style['text_center']}`}>一个评论都没有呢。。。。。。</div>
                </div>
              )}
          </div>
          <div className={style['fixed_operate_wrap']}>
            {isOwner && (
              <Link className={style['artical_btn']} aria-label='create a new artical' href={`/blogs/edit?number=${artical.number}`}>
                <SVGIcon type='edit' className={style['atl_icon']} />
              </Link>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export async function getStaticPaths() {
  let atls = []
  const artical = await listArtical()
  atls.push(...(artical?.data || []))
  if (artical?.total > 30) {
    for (let i = 1; i < Math.ceil(artical?.total / 30); i++) {
      const artical = await listArtical({ per_page: 30, page: i + 1 })
      atls.push(...(artical?.data || []))
    }
  }
  const paths = atls.map((atl: Artical) => ({
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
    const reqs = [listArtical({ number: +number }), queryComments({ number })]
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