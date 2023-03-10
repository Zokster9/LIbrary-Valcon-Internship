import { FormEvent, SyntheticEvent, useEffect, useRef, useState } from 'react'

import Select, { MultiValue } from 'react-select'

import placeholderBook from '../../assets/icons/placeholder-book.png'
import ModalAddAuthor from '../../components/ModalAddAuthor/ModalAddAuthor'
import Author from '../../models/Author'
import { getAllAuthors } from '../../services/AuthorService'
import './CreateBookPage.css'

const CreateBookPage = () => {
  const [ authors, setAuthors ] = useState<Author[]>([])
  const [ show, setShow ] = useState(false)
  const [ retrieveAuthors, setRetrieveAuthors ] = useState(false)
  const [ selectedAuthors, setSelectedAuthors ] = useState<Author[]>([])
  const hiddenFileInput = useRef<HTMLInputElement>(null)
  useEffect(() => {
    getAllAuthors()
      .then(response => {
        setAuthors(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [ retrieveAuthors ])
  const handleCoverClick = () => {
    if (hiddenFileInput.current)
      hiddenFileInput.current.click()
  }
  const handleFileChange = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    if (currentTarget.files) {
      console.log(currentTarget.files[0])
    }
  }
  const handleOnSelectedAuthorsChange = (authorsData: MultiValue<Author>) => {
    console.log({ authorsData })
    setSelectedAuthors(authorsData as Author[])
  }
  const handleOnSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
  }
  return (
    <div className='create-book-page'>
      <h1 className='form-header'>Create a book</h1>
      <form className='create-book-form' onSubmit={handleOnSubmit}>
        <div className="create-book-form-field">
          <h3>Add a cover</h3>
          <button className='create-book-placeholder' type='button' onClick={handleCoverClick}>
            <img src={placeholderBook} alt='placeholder-book' />
          </button>
          <input
            className='create-book-text-area'
            type='file'
            id='file'
            name='file'
            ref={hiddenFileInput}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        <div className='create-book-form-field'>
          <label>Title</label>
          <input className='create-book-input' type='text' placeholder='Enter title...' />
        </div>
        <div className='create-book-form-field'>
          <label>Description</label>
          <textarea
            className='create-book-text-area'
            id='description'
            name='description'
            rows={3}
            draggable={false}
            placeholder='Enter title...'
          />
        </div>
        <div className='create-book-form-field'>
          <label>ISBN</label>
          <input className='create-book-input' type='text' placeholder='Enter ISBN...' />
        </div>
        <div className='create-book-form-field'>
          <label>Quantity</label>
          <input
            className='create-book-input'
            type='number'
            placeholder='Enter quantity...'
            min={1}
            defaultValue={1}
          />
        </div>
        <div className='create-book-form-field'>
          <label>Release date</label>
          <input className='create-book-input' type='date' />
        </div>
        <div className='create-book-form-field'>
          <label>Authors</label>
          <Select
            className='author-select'
            options={authors}
            getOptionLabel={(option: Author) => `${option.firstName} ${option.lastName}`}
            value={selectedAuthors}
            onChange={handleOnSelectedAuthorsChange}
            isSearchable={true}
            isMulti
          />
          <button
            className='author-add-btn'
            type='button'
            onClick={() => { setShow(true) }}
          >
            + Add a new Author
          </button>
        </div>
        <div className='create-book-field-button'>
          <button className='create-book-button'>Create a book</button>
        </div>
      </form>
      <ModalAddAuthor retrieveAuthors={retrieveAuthors} setRetrieveAuthors={setRetrieveAuthors} show={show} closeModal={() => { setShow(false) }} />
    </div>
  )
}

export default CreateBookPage
