import LazyImage from "@/components/LazyImage"
import SVGIcon from "@/components/SVGIcon"
import TriggerBtn from "@/components/TriggerBtn"
import Head from "next/head"
import {FocusEvent, useCallback, useEffect, useMemo, useRef, useState } from "react"
import style from './index.module.scss'

export default function Lottery () {
    const [rotate, setRotate] = useState(false)
    const [modal, setModal] = useState(false)
    const [result, setResult] = useState(-1)
    const [deg, setDeg] = useState(0)
    const [power, setPower] = useState(true)
    // const [table, handle] = useTriggerBtn(true)
    const demo = useRef(7)
    const [areas, setArea] = useState([
        { name: 't1', checked: true, img: 'https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2023_07_20/pic1689815874534864.png&w=60&q=80', target: '', percent: 0.1 },
        { name: 't2', checked: true, img: 'https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2023_07_20/pic1689815877667843.png&w=60&q=80', target: '', percent: 0.05 },
        { name: 't3', checked: true, img: 'https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2023_07_20/pic1689815880200733.png&w=60&q=80', target: '', percent: 0.4 },
        { name: 't4', checked: true, img: 'https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2023_07_20/pic1689815882497991.png&w=60&q=80', target: '', percent: 0.1 },
        { name: 't5', checked: true, img: 'https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2023_07_20/pic1689815884157426.png&w=60&q=80', target: '', percent: 0.2 },
        { name: 't6', checked: true, img: 'https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2023_07_19/pic1689773986803838.png&w=60&q=80', target: '', percent: 0.15 },
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
        <div className={style['lottery_wrap']}>
            <img className={style['lottery_bg']} width="460" height="460" src="https://empty.t-n.top/pub_lic/2023_06_19/pic1687141057059729.png" alt="background" />
            <div className={`${style['line_wrap']} ${style['lottery_bg']} ${style['sector_wrap']}`}>
                {viewTotal.map((_, ind, total) => (
                    total.length > 1 && <div key={ind} className={style['sector_item']} style={{transform: `scale(1.5) rotate(${total.length > 2 ? 360 / total.length * (ind - 0.5) + 90 : 180 * ind}deg)${total.length > 2 ? ` skew(${90 - 360 / total.length}deg)`: 'translateX(50%)'}`}}></div>
                ))}
            </div>
            <div className={`${style['line_wrap']} ${style['lottery_bg']} ${style['no-pointer']}`}>
                {viewTotal.map((item, ind, total) => (
                    <img
                        key={ind}
                        className={style['area_item']}
                        width="100"
                        height="100"
                        src={item.img}
                        alt={`选项${ind}`}
                        style={{ width: `${18 - total.length}vw`, transform: `rotate(${360 / total.length * ind}deg)` }}
                    />
                ))}
            </div>
            <div className={`${style['line_wrap']} ${style['lottery_bg']} ${style['no-pointer']}`}>
                {viewTotal.map((_, ind, total) => (
                    total.length > 1 && <div key={ind} className={style['line']} style={{ transform: `translateY(-50%) rotate(${360 / total.length * (ind + 0.5)}deg)` }}></div>
                ))}
            </div>
            <div
                className={style['pointer_wrap']}
                style={{
                    transform: `rotate(${deg}deg)`,
                    transitionDuration: rotate? '3s' : '0s'
                }}
                onTransitionEnd={stopRotate}
            >
                <img
                    className={style['pointer']}
                    width="96"
                    height="144"
                    alt="pointer"
                    src="https://empty.t-n.top/pub_lic/2023_06_21/pic1687328567823851.png"
                />
            </div>
            <img className={`${style['lottery_bg']} ${style['start_btn']}`} width="80" height="80" src="https://empty.t-n.top/pub_lic/2023_06_21/pic1687328322726591.webp" alt="start" onClick={startRotate} />
            <div className={style['rate_table']}>
                <TriggerBtn>
                    <SVGIcon className={style['table_switch']} type="list" width="32" />
                    <div className={style['table_wrap']}>
                        <ul className={`${style['scroll_wrap']} no_scroll_bar`}>
                            {[...areas, ...(power ? empty : [])].map((item, ind, total) => (<li className={style['item_wrap']} key={ind}>
                                <div className={style['input_wrap']}>
                                    <div className={style['item_checked']}>{
                                        'checked' in item && typeof item.checked === "boolean" ? 
                                        (<input className={style['checked_btn']} aria-label="if it can be used in the following lottery" type="checkbox" name="" checked={item.checked} id="" onChange={(e) => handleCheck(ind, 'checked', e.target.checked)} />) : 
                                        ( total.length < 10 ? <SVGIcon type="plus" style={{ fill: '#fff' }} onClick={addArea} /> : '')
                                    }</div>
                                    <div className={style['item_del']}>{'checked' in item && total.length > 2 ? <SVGIcon type="trash" style={{ fill: '#fff' }} width="16" onClick={() => delArea(ind)} /> : ''}</div>
                                </div>
                                <div className={style['input_wrap']}>
                                    <input className={style['n_input']} type="text" aria-label="lottery item name" placeholder="名称" value={item.name} onChange={(e) => handleTable(ind, 'name', e.target.value)} />
                                    <input
                                        className={style['n_input']}
                                        type="number"
                                        aria-label="the posibility it win"
                                        placeholder="权重"
                                        {...('checked' in item ? {disabled: !power} : {readOnly: true, disabled: true})}
                                        value={String(power ? item.percent : +(1 / areas.filter(e => e.checked).length).toFixed(4))}
                                        onChange={(e) => handleTable(ind, 'percent', e.target.value)}
                                        onBlur={(e) => changePower(e, ind)}
                                    />
                                </div>
                                <div className={style['item_opera']}>
                                    <img src={item.img} width="50" height="50" alt="" />
                                </div>
                            </li>))}
                        </ul>
                        <div className={style['power_wrap']}>
                            <label><input className={style['checked_btn']} type="checkbox" aria-label="if show each item the same Weights" checked={power} onChange={(e) => isUsePower(e.target.checked)} />权重</label>
                            { !power && [...areas, ...empty].length < 10 ? <SVGIcon type="plus" width="20" style={{ fill: '#fff', marginLeft: '5px' }} onClick={addArea} /> : ''}
                        </div>
                    </div>
                </TriggerBtn>
            </div>
            {<div className='modal_mask' style={{ zIndex: result !== -1 && modal ? '99' : '-1', opacity: result !== -1 && modal ? '1' : '0' }} onClick={() => {setModal(false)}}>
                <div className={style['modal_wrap']}>
                    <img className={style['con_img']} width="342" height="286" alt="hahaha" src="https://empty.t-n.top/pub_lic/2023_07_17/pic1689565249790850.gif" />
                    <div className={style['modal_content']}>{viewTotal[result]?.name}</div>
                </div>
            </div>}
            <img className='hide' width="342" height="286" alt="hahaha" src="https://empty.t-n.top/pub_lic/2023_06_26/pic1687747158480258.gif" />
        </div>
    </>)
}

export const getStaticProps = async (context: any) => {
    return {
      props: {}
    }
  }