import { SyntheticEvent, useState } from 'react'
import './ModalSort.css'

interface ModalSortProps {
  show: boolean,
  closeModal: () => void
}

interface RadioButton {
  asc: boolean
  desc: boolean
}

const ModalSort = ({ show, closeModal }: ModalSortProps) => {
  const [ titleSort, setTitleSort ] = useState<RadioButton>({ asc: false, desc: false })
  const [ isbnSort, setIsbnSort ] = useState<RadioButton>({ asc: false, desc: false })
  const [ publishDateSort, setPublishDateSort ] = useState<RadioButton>({ asc: false, desc: false })
  const [ descriptionSort, setDescriptionSort ] = useState<RadioButton>({ asc: false, desc: false })
  const handleOnSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
  }
  return (
    <div style={!show ? { visibility: 'hidden' } : {}} className="modal">
      <div className="overlay" onClick={closeModal} />
      <div className="content">
        <h1>Sort</h1>
        <form className='sort-form' onSubmit={handleOnSubmit}>
          <div className="sort-radio-group">
            <label>Title</label>
            <input
              type='radio'
              value='ASC'
            />
            <input
              type='radio'
              value='DESC'
            />
          </div>
          <div className="sort-radio-group">
            <label>ISBN</label>
            <input
              type='radio'
              value='ASC'
            />
            <input
              type='radio'
              value='DESC'
            />
          </div>
          <div className="sort-radio-group">
            <label>Publish Date</label>
            <input
              type='radio'
              value='ASC'
            />
            <input
              type='radio'
              value='DESC'
            />
          </div>
          <div className="sort-radio-group">
            <label>Description</label>
            <input
              type='radio'
              value='ASC'
            />
            <input
              type='radio'
              value='DESC'
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalSort
