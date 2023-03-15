import { PropsWithChildren } from 'react'

import ReactDOM from 'react-dom'

interface ModalProps {
  show: boolean,
  confirm: () => void
  closeModal: () => void
}

const Modal = ({ children, show, closeModal, confirm }: PropsWithChildren<ModalProps>) => {
  return ReactDOM.createPortal(
    <div style={!show ? { visibility: 'hidden' } : {}} className='modal'>
      <div className='overlay' onClick={closeModal} />
      <div className='content'>
        { children }
        <div className='modal-btns'>
          <button
            type='button'
            className='modal-btn confirm'
            onClick={confirm}
          >
            Confirm
          </button>
          <button
            type='button'
            className='modal-btn close'
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement
  )
}

export default Modal
