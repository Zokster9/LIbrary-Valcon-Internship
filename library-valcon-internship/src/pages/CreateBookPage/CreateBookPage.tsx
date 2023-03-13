import { FormEvent, SyntheticEvent, useEffect, useRef, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import Select, { MultiValue } from 'react-select'

import placeholderBook from '../../assets/icons/placeholder-book.png'
import ModalAddAuthor from '../../components/Modals/ModalAddAuthor/ModalAddAuthor'
import Author from '../../models/Author'
import { getAllAuthors } from '../../services/AuthorService'
import { addNewBook } from '../../services/BookService'
import './CreateBookPage.css'

const CreateBookPage = () => {
  const [ authors, setAuthors ] = useState<Author[]>([])
  const [ show, setShow ] = useState(false)
  const [ retrieveAuthors, setRetrieveAuthors ] = useState(false)
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ isbn, setIsbn ] = useState('')
  const [ quantity, setQuantity ] = useState('1')
  const [ releaseDate, setReleaseDate ] = useState<Date | null>(null)
  const [ selectedAuthors, setSelectedAuthors ] = useState<Author[]>([])
  const [ requestCover, setRequestCover ] = useState(new Blob())
  const [ cover, setCover ] = useState('')

  const [ invalidTitle, setInvalidTitle ] = useState(false)
  const [ invalidDescription, setInvalidDescription ] = useState(false)
  const [ invalidIsbn, setInvalidIsbn ] = useState(false)
  const [ invalidQuantity, setInvalidQuantity ] = useState(false)
  const [ invalidReleaseDate, setInvalidReleaseDate ] = useState(false)
  const [ invalidSelectedAuthors, setInvalidSelectedAuthors ] = useState(false)
  const [ invalidData, setInvalidData ] = useState(false)

  const navigate = useNavigate()
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    getAllAuthors()
      .then(response => {
        setAuthors(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [ retrieveAuthors ])

  const handleCoverClick = () => {
    if (hiddenFileInput.current)
      hiddenFileInput.current.click()
  }
  const handleFileChange = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    if (currentTarget.files) {
      const files = currentTarget.files
      const reader = new FileReader()
      if (files) {
        reader.readAsDataURL(files[0])
        setRequestCover(files[0])
        reader.onloadend = function () {
          const base64data = reader.result
          if(base64data)
            setCover(base64data as string)
        }
      }
    }
  }
  const handleOnChangeTitle = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setTitle(currentTarget.value)
  }
  const handleOnBlurTitle = () => {
    if (title.trim() === '')
      setInvalidTitle(true)
  }

  const handleOnChangeDescription = ({ currentTarget }: FormEvent<HTMLTextAreaElement>) => {
    setDescription(currentTarget.value)
  }
  const handleOnBlurDescription = () => {
    if (description.trim() === '')
      setInvalidDescription(true)
  }

  const handleOnChangeIsbn = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setIsbn(currentTarget.value)
  }
  const handleOnBlurIsbn = () => {
    if (isbn.trim() === '')
      setInvalidIsbn(true)
  }

  const handleOnChangeQuantity = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setQuantity(currentTarget.value)
  }
  const handleOnBlurQuantity = () => {
    if (title.trim() === '')
      setInvalidQuantity(true)
  }

  const handleOnChangeReleaseDate = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setReleaseDate(new Date(currentTarget.value))
  }
  const handleOnBlurReleaseDate = () => {
    if (!releaseDate)
      setInvalidReleaseDate(true)
  }

  const handleOnSelectedAuthorsChange = (authorsData: MultiValue<Author>) => {
    setSelectedAuthors(authorsData as Author[])
  }
  const handleOnSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (title.trim() === '') {
      setInvalidTitle(true)
      return
    }
    if (description.trim() === '') {
      setInvalidDescription(true)
      return
    }
    if (Number.parseInt(quantity) < 1) {
      setInvalidQuantity(true)
      return
    }
    const isbnRegex = new RegExp('^(?=(?:\\D*\\d){10}(?:(?:\\D*\\d){3})?$)[\\d-]+$')
    if (isbn.trim() === '' || !isbnRegex.test(isbn)) {
      setInvalidIsbn(true)
      return
    }
    if (!releaseDate) {
      setInvalidReleaseDate(true)
      return
    }
    if (selectedAuthors.length === 0) {
      setInvalidSelectedAuthors(true)
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('isbn', isbn)
    formData.append('quantity', quantity)
    formData.append('cover', requestCover)
    formData.append('publishDate', releaseDate.toISOString())
    selectedAuthors.forEach(author => formData.append('authorIds', author.Id.toString()))
    addNewBook(formData)
      .then(() => {
        navigate('/')
      })
      .catch(() => {
        setInvalidData(true)
      })
  }
  return (
    <div className='create-book-page'>
      <h1 className='form-header'>Create a book</h1>
      <form className='create-book-form' onSubmit={handleOnSubmit}>
        <div className="create-book-form-field">
          <h3>Add a cover</h3>
          <button className='create-book-placeholder' type='button' onClick={handleCoverClick}>
            <img className='cover' src={cover ? cover : placeholderBook} alt='placeholder-book' />
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
          <label className={invalidTitle ? 'create-book-error-label' : ''}>
            {invalidTitle ? 'Please enter title' : 'Title'}
          </label>
          <input
            className={
              invalidTitle ? 'create-book-input create-book-error-input' : 'create-book-input'
            }
            type='text'
            id='title'
            name='title'
            placeholder='Enter title...'
            value={title}
            onChange={handleOnChangeTitle}
            onBlur={handleOnBlurTitle}
            onFocus={() => setInvalidTitle(false)}
          />
        </div>
        <div className='create-book-form-field'>
          <label className={invalidDescription ? 'create-book-error-label' : ''}>
            {invalidDescription ? 'Please enter description' : 'Description'}
          </label>
          <textarea
            className={
              invalidDescription ? 'create-book-text-area create-book-error-input' : 'create-book-text-area'
            }
            id='description'
            name='description'
            rows={3}
            draggable={false}
            placeholder='Enter description...'
            value={description}
            onChange={handleOnChangeDescription}
            onBlur={handleOnBlurDescription}
            onFocus={() => setInvalidDescription(false)}
          />
        </div>
        <div className='create-book-form-field'>
          <label className={invalidIsbn ? 'create-book-error-label' : ''}>
            {invalidIsbn ? 'Please enter ISBN' : 'ISBN'}
          </label>
          <input
            className={
              invalidIsbn ? 'create-book-input create-book-error-input' : 'create-book-input'
            }
            type='text'
            placeholder='Enter ISBN...'
            value={isbn}
            onChange={handleOnChangeIsbn}
            onBlur={handleOnBlurIsbn}
            onFocus={() => setInvalidIsbn(false)}
          />
        </div>
        <div className='create-book-form-field'>
          <label className={invalidQuantity ? 'create-book-error-label' : ''}>
            {invalidQuantity ? 'Please enter quantity' : 'Quantity'}
          </label>
          <input
            className={
              invalidQuantity ? 'create-book-input create-book-error-input' : 'create-book-input'
            }
            type='number'
            placeholder='Enter quantity...'
            min={1}
            value={quantity}
            onChange={handleOnChangeQuantity}
            onBlur={handleOnBlurQuantity}
            onFocus={() => setInvalidQuantity(false)}
          />
        </div>
        <div className='create-book-form-field'>
          <label className={invalidReleaseDate ? 'create-book-error-label' : ''}>
            {invalidReleaseDate ? 'Please enter release date' : 'Release date'}
          </label>
          <input
            className={
              invalidReleaseDate ? 'create-book-input create-book-error-input' : 'create-book-input'
            }
            type='date'
            onChange={handleOnChangeReleaseDate}
            onBlur={handleOnBlurReleaseDate}
            onFocus={() => setInvalidReleaseDate(false)}
          />
        </div>
        <div className='create-book-form-field'>
          <label className={invalidSelectedAuthors ? 'create-book-error-label' : ''}>
            {invalidSelectedAuthors ? 'Please enter an author' : 'Authors'}
          </label>
          <Select
            className={
              invalidSelectedAuthors ? 'author-select create-book-error-input' : 'author-select'
            }
            options={authors}
            getOptionLabel={(option: Author) => `${option.FirstName} ${option.LastName}`}
            getOptionValue={(option: Author) => option.Id.toString()}
            value={selectedAuthors}
            onChange={handleOnSelectedAuthorsChange}
            onFocus={() => setInvalidSelectedAuthors(false)}
            isSearchable={true}
            maxMenuHeight={30}
            isMulti={true}
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
          <div className={invalidData ? 'data-error' : 'data'}>
            Wrong input data!
          </div>
          <button className='create-book-button'>Create a book</button>
        </div>
      </form>
      <ModalAddAuthor
        retrieveAuthors={retrieveAuthors}
        setRetrieveAuthors={setRetrieveAuthors}
        show={show} closeModal={() => { setShow(false) }}
      />
    </div>
  )
}

export default CreateBookPage
