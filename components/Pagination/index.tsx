import SVGIcon from "../SVGIcon"
import { useEffect, useState } from "react"
import style from './index.module.scss'

type Props = {
    page?: number,
    size?: number,
    total: number,
    onChange: ({page,size, total, type}: Omit<Props, 'onChange'> & {type: 'before' | 'after'}) => void
}

export default function Pagination({page, size=30, total, onChange}: Props) {
    const [pPage, setPage] = useState(1)
    const [pSize] = useState(size)
    const lastPage = () => {
        setPage((val: number) => {
            const newVal = val - 1
            onChange({ page: newVal, size: pSize, total, type: 'before' })
            return newVal
        })
    }
    const nextPage = () => {
        setPage((val: number) => {
            const newVal = val + 1
            onChange({ page: newVal, size: pSize, total, type: 'after' })
            return newVal
        })
    }
    useEffect(() => {
        setPage(page || 1)
    }, [page])
    return total < size ? <></> : (
        <div className={style['pagination_wrap']}>
            <button className={`${style['arrow']} ${style['arrow_left']}`} disabled={pPage === 1} onClick={lastPage}>
                <SVGIcon type='arrow_left' fill="gray" width="20" />
            </button>
            <span className={style['vals']}>
                <span className={style['page_val']}>{pPage}/{Math.ceil(total/pSize)}</span>
                <span className={style['total_val']}>{total}</span>
            </span>
            <button className={`${style['arrow']} ${style['arrow_right']}`} disabled={pPage === Math.ceil(total/pSize)} onClick={nextPage}>
                <SVGIcon type='arrow_right' fill="gray" width="20" />
            </button>
        </div>
    )
    
  }
  