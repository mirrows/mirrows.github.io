import { useEffect, useState } from "react"

export function useTriggerBtn (initialShow?: boolean) {
    const [ show, isShow ] = useState(initialShow || false)
    const handleClick = (e: any) => {
        e.stopPropagation()
        isShow(show => !show)
    }
    const setShow = (show: boolean) => {
        isShow(show)
    }
    useEffect(() => {
        document.addEventListener("click", (e) => isShow(false));
    }, [])
    return [show, handleClick, setShow]
}