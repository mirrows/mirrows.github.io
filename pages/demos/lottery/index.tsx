import LazyImage from "@/components/LazyImage"
import SVGIcon from "@/components/SVGIcon"
import TriggerBtn from "@/components/TriggerBtn"
import Head from "next/head"
import { ChangeEvent, FocusEvent, useCallback, useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"

const DIV = styled.div`
    .lottery_bg{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        max-width: 80%;
        height: unset;
        max-height: 80%;
        margin: auto;
        text-align: center;
    }
    .pointer_wrap{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 6rem;
        height: 9rem;
        margin: auto;
        text-align: center;
        transition: 3s ease;
        transform: rotate(0deg);
        .pointer{
            position: relative;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            transform: translate(-50%, -70%);
        }
    }
    .start_btn{
        width: 5rem;
        height: 5rem;
        cursor: pointer;
        border-radius: 50%;
    }
    .line_wrap{
        max-width: 400px;
        max-height: 400px;
        width: 70vw;
        height: 70vw;
        border-radius: 50%;
    }
    .line{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        height: 45%;
        width: 1px;
        transform-origin: 50% 100%;
        background-color: rgb(154 200 255 / 55%);
    }
    .area_item{
        position: absolute;
        top: 10px;
        left: 0;
        right: 0;
        max-width: 100px;
        height: unset;
        margin: auto;
        border-radius: 30%;
        overflow: hidden;
        perspective: 1000;
        transform-origin: 50% 32vw;
        cursor: pointer;
        &:hover{
            background-image: linear-gradient(45deg, black, transparent);
        }
    }
    @media (min-width: 600px) {
        .area_item{
            transform-origin: 50% 190px;
        }
    }
    .rate_table{
        position: fixed;
        right: 0;
        bottom: 0;
        margin: 10px;
    }
    .table_wrap{
        position: absolute;
        right: 0;
        bottom: 0;
        max-width: 100vw;
        padding: 10px 5px 32px;
        background-color: rgba(0,0,0,.5);
        border-radius: 4px; 
        color: #fff;
        transform-origin: 100% 100%;
        transition: .3s;
        &.modal-active{
            transform: scale(1);
        }
        &.modal-hide{
            transform: scale(0);
        }
        .n_input{
            width: 100px;
            padding: 2px 5px;
            border-radius: 4px;
            border: none;
            outline: none;
        }
    }
    .table_switch{
        position: relative;
        z-index: 6;
        &.modal-active{
            fill: #fff;
        }
    }
    input[readonly] {
        background-color: inherit;
        border: none;
        color: #fff;
    }
    .modal_wrap{
        position: fixed;
        top: 50%;
        left: 0;
        right: 0;
        max-width: 40%;
        min-width: 240px;
        margin: auto;
        transform: translateY(-50%);
        text-align: center;
    }
    .con_img{
        position: relative;
        bottom: -16px;
        width: 160px;
        height: unset;
        z-index: 1;
    }
    .modal_content{
        position: relative;
        width: fit-content;
        min-widtH: 160px;
        max-widtH: 240px;
        padding: 10px 32px;
        background-color: #ff3030;
        border-radius: 12px;
        border: 4px solid;
        margin: auto;
        word-break: break-all;
        font-size: 2.5rem;
        font-weight: bold;
        font-family: youyuan;
        color: #ffc788;
    }
    .modal_content:after{
        content: '';
        position: absolute;
        top: 2px;
        bottom: 2px;
        left: 2px;
        right: 2px;
        border: 2px dashed;
        border-radius: 6px;
    }
    
    .sector_wrap{
        overflow: hidden;
        .sector_item{
            position: absolute;
            top: -50%;
            left: -50%;
            width: 100%;
            height: 100%;
            padding: 0;
            transform-origin: bottom right;
            cursor: pointer;
            transition: .3s;
            box-sizing: border-box;
        }
        .sector_item:before{
            content: '';
            display: block;
            width: 100%;
            height: 100%;
        }
        .sector_item:hover{
            padding: 10px;
        }
        .sector_item:hover:before{
            background-color: rgba(225,225,225, .5);
            box-shadow: 0 0 20px #cccccc;
        }
    }
    .item_wrap{
        display: flex;
        margin: 5px;
        .input_wrap{
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            margin-right: 8px;
            .item_checked{
                width: 20px;
                height: 20px;
            }
        }
        .item_opera{
            position: relative;
        }
    }
    
    .checked_btn{
        width: 20px;
        height: 20px;
        margin: 0;
    }
    .scroll_wrap{
        max-height: 60vh;
        overflow-y: auto;
    }
    .power_wrap{
        position: absolute;
        margin: 5px;
        .checked_btn{
            margin-right: 4px;
        }
    }
`

export default function Lottery () {
    const [rotate, setRotate] = useState(false)
    const [modal, setModal] = useState(false)
    const [result, setResult] = useState(-1)
    const [deg, setDeg] = useState(0)
    const [power, setPower] = useState(true)
    // const [table, handle] = useTriggerBtn(true)
    const demo = useRef(7)
    const [areas, setArea] = useState([
        { name: 't1', checked: true, img: 'https://empty.t-n.top/pub_lic/2023_06_19/pic1687162882486612.png', target: '', percent: 0.1 },
        { name: 't2', checked: true, img: 'https://empty.t-n.top/pub_lic/2023_05_31/pic1685527384699939.png', target: '', percent: 0.05 },
        { name: 't3', checked: true, img: 'https://empty.t-n.top/pub_lic/2023_05_31/pic1685527386794892.png', target: '', percent: 0.4 },
        { name: 't4', checked: true, img: 'https://empty.t-n.top/pub_lic/2023_06_19/pic1687162735145513.png', target: '', percent: 0.1 },
        { name: 't5', checked: true, img: 'https://empty.t-n.top/pub_lic/2023_06_19/pic1687162737072848.png', target: '', percent: 0.2 },
        { name: 't6', checked: true, img: 'https://empty.t-n.top/pub_lic/2023_05_31/pic1685527382597218.png', target: '', percent: 0.15 },
    ])
    const [emptyName, setEmptyName] = useState('empty')
    const empty = useMemo(() => {
        const percent = areas.filter(e => e.checked && e.percent > 0).map(e => e.percent).reduce((pre, cur) => +(pre - cur).toFixed(4), 1)
        return percent > 0 ? [{
            name: emptyName,
            img: 'https://empty.t-n.top/pub_lic/2023_06_21/pic1687315603128458.png',
            target: '',
            percent,
        }] : []
    }, [areas, emptyName])
    const viewTotal = useMemo(() => {
        return power ? [...areas.filter(e => e.checked && e.percent > 0), ...empty] : areas.filter(e => e.checked)
    }, [empty, areas, power])
    const startRotate = () => {
        if(rotate) return;
        setDeg(deg => deg % 360)
        setTimeout(() => {
            setRotate(true)
        })
    }
    const stopRotate = () => {
        setRotate(false)
        setDeg(deg => deg % 360)
        setModal(true)
    }
    const handleTable = (ind: number, attr: string, val: string | boolean | number) => {
        const data = JSON.parse(JSON.stringify(areas))
        if(ind === data.length) {
            setEmptyName(val as string)
        } else {
            data[ind][attr] = val
            const percents = data.filter((e: typeof areas[number]) => e.checked).reduce((pre: number, cur: typeof areas[number]) => pre + +cur.percent, 0)
            if(data[ind].checked && percents > 1 && attr !== 'percent') {
                const rest = data[ind].percent - (percents - 1)
                data[ind].percent = +(rest > 0 ? rest : 0).toFixed(4)
            }
            setArea(data);
        }
    }
    const handleCheck = (ind: number, attr: string, val: boolean) => {
        handleTable(ind, attr, val)
    }
    const belongArea = useCallback(() => {
        let belong = Math.random();
        const are = [...areas.filter(e => e.checked && (!power || e.percent > 0)), ...(power ? empty : [])]
        const percent = +(1 / areas.filter(e => e.checked).length).toFixed(4)
        const result = are.findIndex(area => {
            belong = belong - (power ? area.percent : percent)
            return belong <= 0
        })
        return result
    }, [areas, empty, power])
    const addArea = () => {
        setArea((areas) => {
            const res = JSON.parse(JSON.stringify(areas))
            res.push({
                name: emptyName !== 'empty' ? emptyName : `t${demo.current}`,
                checked: true,
                img: 'https://empty.t-n.top/pub_lic/2023_06_19/pic1687162882486612.png',
                target: '', 
                percent: empty[0]?.percent || 0
            })
            return res
        })
        setEmptyName('empty')
        demo.current++
    }
    const delArea = (i: number) => {
        setArea((areas) => {
            const res = JSON.parse(JSON.stringify(areas))
            res.splice(i,1)
            return res
        })
    }
    const changePower = (e: FocusEvent<HTMLInputElement, Element>, ind: number) => {
        const percent = areas.filter(e => e.checked && e.percent > 0).map(e => e.percent).reduce((pre, cur, i) => +(pre + (i === ind ? +e.target.value : cur)).toFixed(4), 0)
        handleTable(ind, 'percent', percent > 1 && areas[ind].checked ? +(+e.target.value - percent + 1).toFixed(4) : +(+e.target.value).toFixed(4))
    }
    const isUsePower = (val: boolean) => {
        setPower(val)
    }
    useEffect(() => {
        if(rotate) {
            const ares = power ? [...areas.filter(e => e.checked && e.percent > 0), ...empty] : areas.filter(e => e.checked)
            const ind = belongArea()
            const are = 360 / ares.length
            const swingRate = Math.random() * 0.8 + 0.1
            setResult(ind)
            setDeg(_ => 1440 + ind * are + Math.floor((swingRate - 0.5) * are))
        }
    }, [rotate, belongArea, areas, empty, power])
    return(<>
        <Head>
            <title>抽奖</title>
        </Head>
        <DIV>
            <LazyImage className="lottery_bg" width="460" height="460" src="https://empty.t-n.top/pub_lic/2023_06_19/pic1687141057059729.png" />
            <div className="line_wrap lottery_bg sector_wrap">
                {viewTotal.map((_, ind, total) => (
                    total.length > 1 && <div key={ind} className="sector_item" style={{transform: `scale(1.5) rotate(${total.length > 2 ? 360 / total.length * (ind - 0.5) + 90 : 180 * ind}deg)${total.length > 2 ? ` skew(${90 - 360 / total.length}deg)`: 'translateX(50%)'}`}}></div>
                ))}
            </div>
            <div className="line_wrap lottery_bg no-pointer">
                {viewTotal.map((item, ind, total) => (
                    <LazyImage
                        key={ind}
                        className="area_item"
                        width="100"
                        height="100"
                        src={item.img}
                        style={{ width: `${18 - total.length}vw`, transform: `rotate(${360 / total.length * ind}deg)` }}
                    />
                ))}
            </div>
            <div className="line_wrap lottery_bg no-pointer">
                {viewTotal.map((_, ind, total) => (
                    total.length > 1 && <div key={ind} className="line" style={{ transform: `translateY(-50%) rotate(${360 / total.length * (ind + 0.5)}deg)` }}></div>
                ))}
            </div>
            <div
                className={`pointer_wrap`}
                style={{
                    transform: `rotate(${deg}deg)`,
                    transitionDuration: rotate? '3s' : '0s'
                }}
                onTransitionEnd={stopRotate}
            >
                <LazyImage
                    className="pointer"
                    width="96"
                    height="144"
                    src="https://empty.t-n.top/pub_lic/2023_06_21/pic1687328567823851.png"
                />
            </div>
            <LazyImage className="lottery_bg start_btn" width="80" height="80" src="https://empty.t-n.top/pub_lic/2023_06_21/pic1687328322726591.webp" onClick={startRotate} />
            <div className="rate_table">
                <TriggerBtn>
                    <SVGIcon className="table_switch" type="list" width="32" />
                    <div className="table_wrap">
                        <ul className="scroll_wrap no_scroll_bar">
                            {[...areas, ...(power ? empty : [])].map((item, ind, total) => (<li className="item_wrap" key={ind}>
                                <div className="input_wrap">
                                    <div className="item_checked">{
                                        'checked' in item && typeof item.checked === "boolean" ? 
                                        (<input className="checked_btn" aria-label="if it can be used in the following lottery" type="checkbox" name="" checked={item.checked} id="" onChange={(e) => handleCheck(ind, 'checked', e.target.checked)} />) : 
                                        ( total.length < 10 ? <SVGIcon type="plus" style={{ fill: '#fff' }} onClick={addArea} /> : '')
                                    }</div>
                                    <div className="item_del">{'checked' in item && total.length > 2 ? <SVGIcon type="trash" style={{ fill: '#fff' }} width="16" onClick={() => delArea(ind)} /> : ''}</div>
                                </div>
                                <div className="input_wrap">
                                    <input className="n_input" type="text" aria-label="lottery item name" placeholder="名称" value={item.name} onChange={(e) => handleTable(ind, 'name', e.target.value)} />
                                    <input
                                        className="n_input"
                                        type="number"
                                        aria-label="the posibility it win"
                                        placeholder="权重"
                                        {...('checked' in item ? {disabled: !power} : {readOnly: true, disabled: true})}
                                        value={String(power ? item.percent : +(1 / areas.filter(e => e.checked).length).toFixed(4))}
                                        onChange={(e) => handleTable(ind, 'percent', e.target.value)}
                                        onBlur={(e) => changePower(e, ind)}
                                    />
                                </div>
                                <div className="item_opera">
                                    <img src={item.img} width="50" height="50" alt="" />
                                </div>
                            </li>))}
                        </ul>
                        <div className="power_wrap">
                            <label><input className="checked_btn" type="checkbox" aria-label="if show each item the same Weights" checked={power} onChange={(e) => isUsePower(e.target.checked)} />权重</label>
                            { !power && [...areas, ...empty].length < 10 ? <SVGIcon type="plus" width="20" style={{ fill: '#fff', marginLeft: '5px' }} onClick={addArea} /> : ''}
                        </div>
                    </div>
                </TriggerBtn>
            </div>
            {result !== -1 && modal && <div className="modal_mask" onClick={() => {setModal(false)}}>
                <div className="modal_wrap">
                    <img className="con_img" width="342" height="286" alt="hahaha" src="https://empty.t-n.top/pub_lic/2023_07_17/pic1689565249790850.gif" />
                    <div className="modal_content">{viewTotal[result]?.name}</div>
                </div>
            </div>}
            <img className="hide" width="342" height="286" alt="hahaha" src="https://empty.t-n.top/pub_lic/2023_06_26/pic1687747158480258.gif" />
        </DIV>
    </>)
}

export const getStaticProps = async (context: any) => {
    return {
      props: {}
    }
  }