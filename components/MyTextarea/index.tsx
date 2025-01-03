import { ClipboardEvent, forwardRef, Ref, useImperativeHandle, useRef, useState } from "react";
import ImgUpload, { UploadRefType } from "../ImgUpload";
import SVGIcon from "../SVGIcon";
import style from './index.module.scss';
import { Pic } from "@/types/demos";
import xss from "xss";
import MarkdownIt from "markdown-it";

type Props = {
  onSubmit: (props: {
    content: string | undefined,
  }) => void
  isCanSubmit?: boolean
  placeholder?: string
  // [key: string]: any
}
& Partial<Omit<HTMLTextAreaElement, 'style'>>
& {
  style?: Partial<CSSStyleDeclaration> | undefined
}

type Methods = {
  insertContent: (content: string) => void
}

const MyTextarea = ({
  isCanSubmit = true,
  onSubmit,
  placeholder = '请输入, 支持markdown语法......',
  ...props
}: Props, ref: Ref<Methods>) => {
  const md = new MarkdownIt()
  const uploadRef = useRef<UploadRefType>(null)
  const input = useRef<HTMLTextAreaElement | null>(null)
  const [isPreview, setIsPreview] = useState(false)
  const content = useRef<HTMLDivElement | null>(null)
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
  const isCanCommit = () => {
    setCanCommit(!(!isCanSubmit || !input.current?.value));
  }
  const [canCommit, setCanCommit] = useState(false)
  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPreview((val) => {
      !val && mdify()
      return !val
    })
  }
  const mdify = () => {
    if (!input.current?.value) return;
    const body = xss(md.render(input.current.value))
    content?.current && (content.current.innerHTML = body)
  }
  const submit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSubmit({
      content: input.current?.value,
    })
    if (input.current) {
      input.current.value = ''
    }
  }

  useImperativeHandle(ref, () => ({
    insertContent: (content) => {
      if (!input.current) return;
      input.current.value += content
    }
  }))
  return (<>
    <ImgUpload
      ref={uploadRef}
      clickable={false}
      className={style['my_textarea_wrap']}
      {...props}
      autoUpload
      operateLineStyle={isPreview ? { marginTop: '0' } : {}}
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
          placeholder={placeholder}
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
  </>)
}


export default forwardRef(MyTextarea);
