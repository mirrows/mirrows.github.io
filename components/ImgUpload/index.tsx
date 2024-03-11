import { ModeMap, uploadBase64, uploadUrl } from "@/req/demos"
import { Format, toCDN } from "@/utils/common"
import { file2Base64, fileCompressor, src2webp } from "@/utils/imgTool"
import { ChangeEvent, DragEvent, KeyboardEvent, MouseEvent, cloneElement, forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import SVGIcon from "../SVGIcon"
import PicModal, { ModalRefType } from "../PicModal"
import { Mode, Pic } from "@/types/demos"

type Props = {
    clickable?: boolean,
    children: JSX.Element | JSX.Element[],
    operateLine?: JSX.Element | JSX.Element[],
    personal?: boolean,
    onStartUpload?: () => void,
    onFinish?: (items: { normal: Pic }[]) => void,
    // onFinish?: (items: { mini: Pic, normal: Pic }[]) => void,
    autoUpload?: boolean,
    className?: string,
    align?: 'bottom' | 'top',
    allowUrl?: boolean,
    allowClick?: boolean,
    [key: string]: any,
}

type UploadType = {
    uploadStatus: 'WAIT' | 'SUCCESS' | 'ERROR' | 'LOADING',
}

export type UploadRefType = {
    addFile: (items: File[]) => void,
}

import style from './index.module.scss'

const ImgUpload = forwardRef<UploadRefType, Props>(({
    clickable = true,
    children,
    operateLine,
    autoUpload = false,
    onStartUpload = () => { },
    personal = false,
    onFinish = () => { },
    className = '',
    allowUrl = true,
    allowClick = true,
    align = 'bottom',
    ...props
}, ref) => {
    const wrapRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [files, setFiles] = useState<File[]>([])
    const [urls, setUrls] = useState<string[]>([])
    const [urlInput, setUrlInput] = useState('')
    const [loading, setLoading] = useState(false)
    const tmpPersonal = useRef(personal)
    const picRef = useRef<ModalRefType | null>(null)
    const win = useRef(typeof window !== "undefined" ? window?.URL || window?.webkitURL : undefined)
    const total = useMemo(() => {
        return [
            ...files.map(e => {
                const src = win.current?.createObjectURL(e) || ''
                return {
                    id: btoa(encodeURI(e.name + e.type + e.size)),
                    type: 'file',
                    src,
                }
            }),
            ...urls.map(e => ({
                id: e.slice(30, 50),
                type: 'url',
                src: e,
            }))]
    }, [urls, files])
    const [uploadStatusMap, setUploadStatusMap] = useState<{ [key: string]: UploadType['uploadStatus'] }>({})
    const clickHandle = () => {
        if(loading) return;
        inputRef.current?.click();
    }
    const handlefile = (e: ChangeEvent<HTMLInputElement>) => {
        // win.current?
        e.target.files?.length && setFiles([...Array.from(e.target.files)])
    }
    const dropFile = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if(loading) return;
        e.dataTransfer.files?.length && setFiles((pics) => [...pics, ...Array.from(e.dataTransfer.files)])
    }
    const uploadFile = async (file: File, options: any, path: string, mode: Mode, again?: boolean) => {
        const isCanCompress = !(file.type.match('gif') && !path.match('mini'))
        const blob = isCanCompress ? await fileCompressor(file, options) : file
        let base64 = await file2Base64(blob);
        if (again && isCanCompress) {
            const webpBlob = await src2webp(base64);
            base64 = await file2Base64(webpBlob);
        }
        const result = await uploadBase64({ content: base64.split(',')[1], path, mode })
        return result
    }
    const handleSubmit = async (e?: MouseEvent<HTMLButtonElement>) => {
        e?.stopPropagation();
        setLoading(true)
        onStartUpload()
        tmpPersonal.current = personal
        const mode = tmpPersonal.current ? ModeMap.PRIVATE : ModeMap.PHOTO
        const newMap: typeof uploadStatusMap = {};
        for (let key in uploadStatusMap) {
            newMap[key] = 'WAIT'
        }
        setUploadStatusMap({ ...newMap })
        const result = []
        for (let i = 0; i < files.length; i++) {
            const name = 'pic' + Date.now() + String(Math.random()).slice(4, 7) + '.' + files[i].name.split('.').reverse()[0]
            let again = false
            const path = `${Format(new Date(), 'YYYY_MM_DD')}/${name}`
            let status: UploadType['uploadStatus'] = 'LOADING';
            if (newMap[total[i].id] === 'ERROR') {
                again = true
            }
            newMap[total[i].id] = status
            setUploadStatusMap({ ...newMap })
            // const mini = await uploadFile(files[i], { quality: 0.1, mimeType: 'image/jpeg' }, `mini/${path}`, mode)
            const normal = await uploadFile(files[i], { quality: 1024 * 1024 * 2 > files[i].size ? 1024 * 1024 * 2 / files[i].size : 0.8 }, `normal/${path}`, mode, again)
            if (!normal?.data || normal?.code) {
                status = 'ERROR'
            } else {
                result.push({ normal: normal.data })
            }
            // if (normal.code || mini.code) {
            //     status = 'ERROR'
            // }
            newMap[total[i].id] = status === 'LOADING' ? 'SUCCESS' : status
            setUploadStatusMap({ ...newMap })
        }
        for (let i = 0; i < urls.length; i++) {
            let status: UploadType['uploadStatus'] = 'LOADING';
            newMap[total[i + files.length].id] = status
            setUploadStatusMap({ ...newMap })
            const name = 'pic' + Date.now() + String(Math.random()).slice(4, 7)
            const path = `${Format(new Date(), 'YYYY_MM_DD')}/${name}`
            // await new Promise(resolve => {
            //     setTimeout(() => {
            //         resolve(0)
            //     }, 5000)
            // })
            // const mini = await uploadUrl({ url: urls[i], path: `mini/${path}`, mode })
            const normal = await uploadUrl({ url: urls[i], path: `normal/${path}`, mode })
            result.push({normal: normal.data })
            if (normal.code) {
                status = 'ERROR'
            }
            newMap[total[i + files.length].id] = status === 'LOADING' ? 'SUCCESS' : status
            setUploadStatusMap({ ...newMap })
        }
        onFinish(result);
        setUrls((urls) => urls.filter((_, i) => newMap[total[i + files.length].id] === 'ERROR'))
        setFiles((files) => files.filter((_, i) => newMap[total[i].id] === 'ERROR'))
        inputRef.current && (inputRef.current.value = '')
        setLoading(false)
    }
    const inputUrl = () => {
        if (!urlInput || loading) return
        setUrls(urls => Array.from(new Set([...urls, ...urlInput.split(',').map(url => toCDN(url, ''))])))
        setUrlInput('')
    }
    const handlekeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return
        inputUrl()
    }
    const deleteTmpPic = (pic: typeof total[number], i: number) => {
        if (pic.type === 'file') {
            setFiles((files) => {
                const res = [...files]
                res.splice(i, 1)
                return res
            })
        } else if (pic.type === 'url') {
            setUrls((urls) => {
                const res = [...urls]
                res.splice(i - files.length, 1)
                return res
            })
        }
    }
    const handlePreview = (ind: number) => {

        picRef.current?.open(total.map(p => ({
            cdn_url: p.src,
            sha: Date.now().toString() + ind,
        })), ind)
    }
    const addFile = (items: File[]) => {
        setFiles((pics) => [...pics, ...items])
    }
    useImperativeHandle(ref, () => ({ addFile }))
    useEffect(() => {
        // 释放缓存
        const url = win.current
        return () => {
            total.forEach(p => {
                if (p.type === 'file' && p.src) {
                    url?.revokeObjectURL(p.src)
                }
            })
        }
    }, [total])
    useEffect(() => {
        if (files.length) return
        inputRef.current && (inputRef.current.value = '')

    }, [files])
    useEffect(() => {
        if (autoUpload && total.length) {
            // 自动上传
            handleSubmit()
        }
        setUploadStatusMap(obj => {
            const map: { [key: string]: UploadType['uploadStatus'] } = {}
            total.forEach(e => {
                map[e.id] = obj[e.id] || 'WAIT'
            })
            return map
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [total, autoUpload])
    return (<>
        <div
            ref={wrapRef}
            className={`${style['imgupload_wrap']} ${style['con_input_wrap']}${loading ? ' invalid' : ''}${className ? ` ${className}` : ''}`}
            {...props}
            onClick={() => allowClick && clickable && clickHandle()}
            onDrop={dropFile}
            onDragOver={(e: any) => e.preventDefault()}
        >
            {Array.isArray(children) ? cloneElement(children[0], {
                ...children[0].props,
                className: `${style['upload_children_wrap']} ${children[0].props.className || ''}${!!total.length ? ' hide' : ''}`,
            }) : cloneElement(children, {
                ...children.props,
                className: `${style['upload_children_wrap']} ${children.props.className || ''}${!!total.length ? ' hide' : ''}`,
            })}
            <input
                ref={inputRef}
                type="file"
                name=""
                id=""
                multiple
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handlefile}
            />
            <div className={`scroll_er ${style['tmp_wrap']}`}>
                {total.map((e, i) => (
                    <div key={e.id} className={`${style['tmp_item_wrap']} upload_${uploadStatusMap[e.id]}`} onClick={e => e.stopPropagation()}>
                        <img className={style['tmp_item']} width="40" height="96" src={e.src} alt="" onClick={() => handlePreview(i)} />
                        {loading || <SVGIcon className={style['tmp_del_btn']} type="close" onClick={() => deleteTmpPic(e, i)} />}
                        {{
                            SUCCESS: <SVGIcon className={style['tmp_status_btn']} type="yes" fill="green" />,
                            ERROR: <SVGIcon className={style['tmp_status_btn']} type="no" fill="red" />,
                            WAIT: '',
                            LOADING: <SVGIcon className={`${style['tmp_status_btn']} rotate`} type="loading" fill="gray" />,
                        }[uploadStatusMap[e.id]]}
                    </div>
                ))}
            </div>
            <div className={`up_operate_${align}`}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {allowClick && clickable || <SVGIcon width={26} type="image" style={{ marginRight: '10px' }} onClick={clickHandle} />}
                    {allowUrl && <div className={style['url_input_wrap']} onClick={e => e.stopPropagation()}>
                        <input
                            className={`normal_input ${style['url_input']}`}
                            type="text"
                            placeholder={`${total.length || 0} pics will be uploaded`}
                            value={urlInput}
                            disabled={loading}
                            onInput={e => setUrlInput(e.currentTarget.value)}
                            onKeyUp={handlekeyUp}
                        />
                        <SVGIcon className={style['enter_icon']} type="enter" style={loading ? { opacity: 0.5, cursor: 'default' } : {}} onClick={inputUrl} />
                    </div>}
                </div>
                {autoUpload || !!total.length && <button className={`normal_btn ${style['submit_btn']}`} disabled={loading} onClick={handleSubmit}>upload</button>}
                {Array.isArray(children) ? cloneElement(children[1], {
                    ...children[1].props,
                }) : ''}
            </div>
        </div>
        <PicModal ref={picRef} slice={false} />
    </>)
})

ImgUpload.displayName = "ImgUpload"

export default ImgUpload