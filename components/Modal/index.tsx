
import { MouseEvent, forwardRef, useImperativeHandle, useState } from 'react'
import style from './index.module.scss'

type Props = {
  children: JSX.Element | JSX.Element[],
  onClose?: () => void,
}

export type ModalRef = {
  close: () => void,
  open: () => void,
}


const Modal = forwardRef<ModalRef, Props>(({ onClose, children }, ref) => {
  const [show, isShow] = useState(false);
  const open = () => {
    isShow(true);
  }
  const close = () => {
    isShow(false);
    onClose?.();
  }
  const cancelClose = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }
  useImperativeHandle(ref, () => ({
    close,
    open,
  }))
  return <>{
    show && <div className={style['mask']} onClick={close}>
      <div onClick={cancelClose}>
        {children}
      </div>
    </div>
  }</>
})

Modal.displayName = 'Modal';

export default Modal;
