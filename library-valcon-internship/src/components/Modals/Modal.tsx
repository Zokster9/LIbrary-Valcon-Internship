import { PropsWithChildren } from 'react'

import ReactDOM from 'react-dom'

interface ModalProps {
  show: boolean,
  closeModal: () => void
}

const Modal = ({ children, show, closeModal }: PropsWithChildren<ModalProps>) => {
  return ReactDOM.createPortal(
    <div style={!show ? { visibility: 'hidden' } : {}} className='modal'>
      <div className='overlay' onClick={closeModal} />
      <div className='content'>
        { children }
        <button
          type='button'
          className='close-modal-btn'
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement
  )
}

export default Modal
