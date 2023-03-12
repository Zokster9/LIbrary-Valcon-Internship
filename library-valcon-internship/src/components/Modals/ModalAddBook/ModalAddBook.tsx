import ReactDOM from 'react-dom'

import '../Modals.css'
import './ModalAddBook.css'

interface AddBookProps {
  show: boolean
  closeModal: () => void
}

const ModalAddBook = ({ show, closeModal }: AddBookProps) => {
  if (!show) return null
  return ReactDOM.createPortal(
    <div className='modal'>
      <div className='overlay' onClick={closeModal} />
      <div className='content'>
        <h1 className='form-header'>Create a book</h1>
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement
  )
}

export default ModalAddBook
