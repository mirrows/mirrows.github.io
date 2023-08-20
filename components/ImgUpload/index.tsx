import { ModeMap, uploadBase64, uploadUrl } from "@/req/demos"
import { Format } from "@/utils/common"
import { file2Base64, fileCompressor } from "@/utils/imgTool"
import { ChangeEvent, DragEvent, KeyboardEvent, MouseEvent, ReactNode, cloneElement, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import SVGIcon from "../SVGIcon"
import PicModal, { ModalRefType } from "../PicModal"
import { Mode, Pic } from "@/types/demos"

type Props = {
    clickable?: boolean,
    children: JSX.Element | JSX.Element[],
    operateLine?: JSX.Element | JSX.Element[],
    personal?: boolean,
    onStartUpload?: () => void,
    onFinish?: (items: { mini: Pic, normal: Pic }[]) => void,
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

const DIV = styled.div`
    &.con_input_wrap{
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .up_operate_bottom,.up_operate_top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: fit-content;
        min-height: 26px;
        margin-top: 10px;
        text-align: left;
    }
    .up_operate_top{
        order: -1;
        margin-top: 0;
        margin-bottom: 10px;
    }
    .url_input_wrap{
        display: inline-block;
        position: relative;
        vertical-align: middle;
        .url_input_wrap{
            margin-right: 10px;
        }
        .url_input{
            flex: 1 1 0;
            width: 100%;
            height: 100%;
            padding-right: 36px;
            box-sizing: border-box;
            font-size: 12px;
        }
        .enter_icon{
            position: absolute;
            right: 3px;
            top: 0;
            bottom: 0;
            height: 12px;
            width: 12px;
            padding: 4px;
            background-color: #000;
            border-radius: 4px;
            margin: auto;
            fill: #fff;
        }
    }
    .file_wrap{
        display: inline-block;
        /* display: flex;
        align-items: flex-end;
        justify-content: center;
        flex: 1; */
        padding: 0 8px;
        margin: 0 10px;
        white-space: nowrap;
        font-size: 1rem;
        color: gray;
    }
    .tmp_wrap{
        display: flex;
        flex-wrap: wrap;
        max-height: 215px;
    }
    .tmp_item_wrap{
        position: relative;
    }
    .tmp_item{
        width: 40px;
        height: 96px;
        object-fit: cover;
        margin: 5px;
    }
    .tmp_del_btn{
        position: absolute;
        right: 0;
        top: 0;
        width: 15px;
        padding: 0 0 5px 5px;
        border-radius: 0 0 0 20px;
        fill: #fff;
        background-color: #000;
    }
    .tmp_status_btn{
        position: absolute;
        left: 5px;
        bottom: 5px;
        width: 20px;
    }
    .submit_btn{
        float: right;
    }
    .upload_children_wrap{
        height: 100%;
    }
`

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
        inputRef.current?.click();
    }
    const handlefile = (e: ChangeEvent<HTMLInputElement>) => {
        // win.current?
        e.target.files?.length && setFiles([...Array.from(e.target.files)])
    }
    const dropFile = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.files?.length && setFiles((pics) => [...pics, ...Array.from(e.dataTransfer.files)])
    }
    const uploadFile = async (file: File, options: any, path: string, mode: Mode) => {
        const blob = file.type.match('gif') && !path.match('mini') ? file : await fileCompressor(file, options)
        const base64 = await file2Base64(blob);
        const result = await uploadBase64({ content: base64.split(',')[1], path, mode })
        return result
    }
    const handleSubmit = async (e?: MouseEvent<HTMLButtonElement>) => {
        e?.stopPropagation();
        setLoading(true)
        onStartUpload()
        tmpPersonal.current = personal
        const mode = tmpPersonal.current ? ModeMap.PRIVATE : ModeMap.PHOTO
        const newMap = { ...uploadStatusMap };
        const result = []
        for (let i = 0; i < files.length; i++) {
            const name = 'pic' + Date.now() + String(Math.random()).slice(4, 7) + '.' + files[i].name.split('.').reverse()[0]
            const path = `${Format(new Date(), 'YYYY_MM_DD')}/${name}`
            let status: UploadType['uploadStatus'] = 'LOADING';
            newMap[total[i].id] = status
            setUploadStatusMap({ ...newMap })
            const mini = await uploadFile(files[i], { quality: 0.1, mimeType: 'image/jpeg' }, `mini/${path}`, mode)
            const normal = await uploadFile(files[i], { quality: 1024 * 1024 * 2 > files[i].size ? 1024 * 1024 * 2 / files[i].size : 0.8 }, `normal/${path}`, mode)
            if (!mini?.data || !normal.data || normal?.code || mini?.code) {
                status = 'ERROR'
            } else {
                result.push({ mini: mini.data, normal: normal.data })
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
            const mini = await uploadUrl({ url: urls[i], path: `mini/${path}`, mode })
            const normal = await uploadUrl({ url: urls[i], path: `normal/${path}`, mode })
            result.push({ mini: mini.data, normal: normal.data })
            if (normal.code || mini.code) {
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
        if (!urlInput) return
        setUrls(urls => Array.from(new Set([...urls, ...urlInput.split(',')])))
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
        <DIV
            ref={wrapRef}
            className={`con_input_wrap${className ? ` ${className}` : ''}`}
            {...props}
            onClick={() => allowClick && clickable && clickHandle()}
            onDrop={dropFile}
            onDragOver={(e) => e.preventDefault()}
        >
            {Array.isArray(children) ? cloneElement(children[0], {
                ...children[0].props,
                className: `upload_children_wrap ${children[0].props.className || ''}${!!total.length ? ' hide' : ''}`,
            }) : cloneElement(children, {
                ...children.props,
                className: `upload_children_wrap ${children.props.className || ''}${!!total.length ? ' hide' : ''}`,
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
            <div className="scroll_er tmp_wrap">
                {total.map((e, i) => (
                    <div key={e.id} className={`tmp_item_wrap upload_${uploadStatusMap[e.id]}`} onClick={e => e.stopPropagation()}>
                        <img className="tmp_item" width="40" height="96" src={e.src} alt="" onClick={() => handlePreview(i)} />
                        {loading || <SVGIcon className="tmp_del_btn" type="close" onClick={() => deleteTmpPic(e, i)} />}
                        {{
                            SUCCESS: <SVGIcon className="tmp_status_btn" type="yes" fill="green" />,
                            ERROR: <SVGIcon className="tmp_status_btn" type="no" fill="red" />,
                            WAIT: '',
                            LOADING: <SVGIcon className="tmp_status_btn rotate" type="loading" fill="gray" />,
                        }[uploadStatusMap[e.id]]}
                    </div>
                ))}
            </div>
            <div className={`up_operate_${align}`}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {allowClick && clickable || <SVGIcon width={26} type="image" style={{ marginRight: '10px' }} onClick={clickHandle} />}
                    {allowUrl && <div className="url_input_wrap" onClick={e => e.stopPropagation()}>
                        <input
                            className="normal_input url_input"
                            type="text"
                            placeholder={`${total.length || 0} pics will be uploaded`}
                            value={urlInput}
                            onInput={e => setUrlInput(e.currentTarget.value)}
                            onKeyUp={handlekeyUp}
                        />
                        <SVGIcon className="enter_icon" type="enter" onClick={inputUrl} />
                    </div>}
                </div>
                {autoUpload || !!total.length && <button className="normal_btn submit_btn" onClick={handleSubmit}>upload</button>}
                {Array.isArray(children) ? cloneElement(children[1], {
                    ...children[1].props,
                }) : ''}
            </div>
        </DIV>
        <PicModal ref={picRef} />
    </>)
})

ImgUpload.displayName = "ImgUpload"

export default ImgUpload