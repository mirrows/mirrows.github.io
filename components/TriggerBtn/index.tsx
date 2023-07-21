import { cloneElement, useEffect, useState } from "react"


type Props = {
    initialShow?: boolean,
    children?: JSX.Element | JSX.Element[]
    type?: 'modal' | 'select'
}

export default function TriggerBtn({ children, initialShow = false, type = 'modal' }: Props) {
    const [show, isShow] = useState(initialShow)
    const handleClick = (e: any) => {
        e.stopPropagation()
        isShow(show => !show)
    }
    useEffect(() => {
        document.addEventListener("click", (e) => isShow(false));
    }, [])
    return (<>
        {Array.isArray(children) ? cloneElement(children[0], {
            ...children[0].props,
            className: `${children[0].props.className} modal-${show ? 'active' : 'hide'}`,
            onClick: handleClick
        }) : children}
        {Array.isArray(children) ? cloneElement(children[1], {
            ...children[1].props,
            className: `${children[1].props.className} modal-${show ? 'active' : 'hide'}`,
            onClick: (e: any) => type === 'modal' && e.stopPropagation()
        }) : ''}
    </>)
}