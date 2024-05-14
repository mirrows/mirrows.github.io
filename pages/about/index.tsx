import SVGIcon from '@/components/SVGIcon'
import DateText from '@/components/SsrRender/Timer'
import { about, addComment, queryComments } from '@/req/about'
import { Artical, Comment } from '@/types/global'
import { stone } from '@/utils/global'
import { parseBody } from '@/utils/md'
import Head from 'next/head'
import React, { ClipboardEvent, useEffect, useRef, useState } from 'react'
import { particlesCursor } from 'threejs-toys'
import xss from 'xss'
import MarkdownIt from 'markdown-it';
import Pagination from '@/components/Pagination'
import { ListArticalParams } from '@/req/main'
import { PageInfo } from '@/types/github'
import ImgUpload, { UploadRefType } from '@/components/ImgUpload'
import { Pic } from '@/types/demos'
import { randomString } from '@/utils/common'
// marked在安卓默认浏览器兼容性不佳

import style from './index.module.scss'

type Props = {
  artical: Artical,
  comments: Comment[],
  // pageInfo: Partial<PageInfo>
}

export default function About({
  artical: atl,
  comments: cmts,
  // pageInfo
}: Props) {
  const md = new MarkdownIt()
  const pic = useRef<HTMLElement | null>()
  const dom = useRef<any>()
  const [artical, setArtical] = useState(atl)
  const content = useRef<HTMLDivElement | null>(null)
  const input = useRef<HTMLTextAreaElement | null>(null)
  const username = useRef<HTMLInputElement | null>(null)
  const email = useRef<HTMLInputElement | null>(null)
  const [isPreview, setIsPreview] = useState(false)
  const [comments, setComments] = useState<Comment[]>([...(cmts || [])])
  const [page, setPage] = useState(1)
  // const [curCommentsInfo, setInfo] = useState<Partial<PageInfo>>(pageInfo || {})
  const uploadRef = useRef<UploadRefType>(null)
  const [isOwner, setOwner] = useState(false)
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
    if (!username.current?.value || !email.current?.value || !input.current?.value) return
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
    addComment(JSON.stringify(body)).then(res => {
      if (res.code) return
      listComments()
      localStorage.setItem('userMsg', JSON.stringify({
        username: username.current?.value,
        email: email.current?.value,
      }))
      input.current && (input.current.value = '')
      content.current && (content.current.innerHTML = '')
      setIsPreview(false)
    })
  }
  const handlePagination = ({ page }: { page?: number }) => {
    setPage(page || 1)
    listComments({
      number: 33,
      per_page: 30,
      page,
    });
  }
  const listComments = (params?: ListArticalParams) => {
    queryComments(params || { number: 2 }).then(({
      data,
      total,
      // pageInfo
    }) => {
      setComments(data)
      setArtical(atl => ({ ...atl, comments: total }))
      // setInfo(pageInfo);
      if (!params) {
        setPage(1)
      }
    })
  }
  const queryMe = () => {
    about().then(res => {
      setArtical(res.data)
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
  const afterUpload = (pics: { mini: Pic, normal: Pic }[]) => {
    setTimeout(() => {
      if (input.current) {
        input.current.value = input.current.value + pics.map(({ mini, normal }) => `![${mini.name}](${mini.cdn_url})\n![${normal.name}](${normal.cdn_url})`).join('\n')
        input.current.focus()
      }
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
    listComments();
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
        <div id="test" className={style['about_bg']} />
        <div className={style['aboout_me_wrap']}>
          <div className={style['blog_left']}>
            <div className={`${style['blog_content']} ${style['blog_wrap']}`} dangerouslySetInnerHTML={{ __html: parseBody(xss(md.render(artical?.body || ''))) }} />
            <div className={`${style['blog_wrap']} ${style['add_comment']}`}>
              <div className={style['other_words']}>
                <input ref={username} type="text" className={style['input_item']} placeholder='用户名(必填)' name="" id="" />
                <input ref={email} type="text" className={style['input_item']} placeholder='邮箱(必填)' name="" id="" />
              </div>
              <label htmlFor="comments_input"></label>
              <ImgUpload
                ref={uploadRef}
                clickable={false}
                autoUpload
                onFinish={afterUpload}
              >
                <div>
                  <textarea
                    id="comments_input"
                    ref={input}
                    className={style['text_area']}
                    rows={8}
                    style={{ display: isPreview ? 'none' : 'block' }}
                    placeholder='此处添加评论'
                    aria-label='edit some comments'
                    suppressContentEditableWarning
                    contentEditable
                    onPaste={handlePaste}
                  ></textarea>
                </div>
                <div className={style['operate_wrap']}>
                  <SVGIcon type="code" className={style['preview']} alt='preview' onClick={handlePreview} />
                  <button className={style['submit']} aria-label='submit comment' onClick={submit}>add comment</button>
                </div>
              </ImgUpload>
              <div className={style['preview_detail_wrap']} style={{ display: isPreview ? 'block' : 'none' }}>
                <div ref={content} className={`${style['blog_content']} ${style['preview_detail']}`}></div>
              </div>
            </div>
          </div>
          <div className={style['comments_wrap']}>
            <Pagination page={page} total={artical?.comments || 0} onChange={handlePagination} />
            {comments.length ? comments.map(comment => (
              <div key={comment.id} className={style['comment_content_wrap']}>
                <div className={style['author_msg']}>
                  <img className={style['avator']} src={comment.author.avatar_url} alt="" />
                  <div>
                    <div>{comment.author.login}</div>
                    <DateText
                      render={(formattedDate) => <div className={style['text_small']}>{formattedDate}</div>}
                      value={comment.updatedAt}
                    />
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
        </div>
      </main>
    </>
  )
}
export const getStaticProps = async (context: any) => {
  const props: Partial<Props> = {}
  const reqs = [about(), queryComments({ number: 2 })]
  const [artical, comments] = await Promise.allSettled(reqs);
  if (artical.status === 'fulfilled' && artical.value?.data) {
    const data = artical.value.data
    props.artical = data
  }
  if (comments.status === 'fulfilled' && comments.value?.data) {
    const data = comments.value.data
    props.comments = data
    // props.pageInfo = comments.value.pageInfo
  }
  return { props }
}
