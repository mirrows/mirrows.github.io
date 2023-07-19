import styled from "styled-components"
import SVGIcon from "../SVGIcon"
import { useState } from "react"

const DIV = styled.div`
    .arrow{
        padding: 4px 16px;
        border: none;
        background-color: #fff;
        border-radius: 6px;
        pointer-events: all;
    }
    .arrow[disabled]{
        opacity: 0.4;
        cursor: default;
    }
    .arrow[disabled] *{
        cursor: default;
    }
    .arrow_left{
        border-radius: 6px 0 0 6px;
    }
    .arrow_right{
        border-radius: 0 6px 6px 0;
    }
    .vals{
        display: inline-block;
        background-color: #c3c3c3;
        line-height: 28px;
        vertical-align: bottom;
        color: #fff;
        opacity: 0.8;
    }
    .page_val,.total_val{
        display: inline-block;
        padding: 0 8px;
    }
    .total_val{
        background-color: #000;
    }
`

type Props = {
    page?: number,
    size?: number,
    total: number,
    onChange: ({page,size, total}: Omit<Props, 'onChange'>) => void
}

export default function Pagination({page=1, size=30, total, onChange}: Props) {
    const [pPage, setPage] = useState(page)
    const [pSize] = useState(size)
    const lastPage = () => {
        setPage((val: number) => {
            const newVal = val - 1
            onChange({ page: newVal, size: pSize, total })
            return newVal
        })
    }
    const nextPage = () => {
        setPage((val: number) => {
            const newVal = val + 1
            onChange({ page: newVal, size: pSize, total })
            return newVal
        })
    }
    return total < size ? <></> : (
        <DIV>
            <button className="arrow arrow_left" disabled={pPage === 1} onClick={lastPage}>
                <SVGIcon type='arrow_left' fill="gray" width="20" />
            </button>
            <span className="vals">
                <span className="page_val">{pPage}/{Math.ceil(total/pSize)}</span>
                <span className="total_val">{total}</span>
            </span>
            <button className="arrow arrow_right" disabled={pPage === Math.ceil(total/pSize)} onClick={nextPage}>
                <SVGIcon type='arrow_right' fill="gray" width="20" />
            </button>
        </DIV>
    )
    
  }
  