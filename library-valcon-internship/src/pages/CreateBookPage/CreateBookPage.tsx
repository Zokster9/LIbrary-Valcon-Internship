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

  const [ isTitleValid, setIsTitleValid ] = useState(true)
  const [ isDescriptionValid, setIsDescriptionValid ] = useState(true)
  const [ isIsbnValid, setIsIsbnValid ] = useState(true)
  const [ isQuantityValid, setIsQuantityValid ] = useState(true)
  const [ isReleaseDateValid, setIsReleaseDateValid ] = useState(true)
  const [ isSelectedAuthorsValid, setIsSelectedAuthorsValid ] = useState(true)
  const [ isDataValid, setIsDataValid ] = useState(true)

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
      setIsTitleValid(false)
  }

  const handleOnChangeDescription = ({ currentTarget }: FormEvent<HTMLTextAreaElement>) => {
    setDescription(currentTarget.value)
  }
  const handleOnBlurDescription = () => {
    if (description.trim() === '')
      setIsDescriptionValid(false)
  }

  const handleOnChangeIsbn = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setIsbn(currentTarget.value)
  }
  const handleOnBlurIsbn = () => {
    if (isbn.trim() === '')
      setIsIsbnValid(false)
  }

  const handleOnChangeQuantity = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setQuantity(currentTarget.value)
  }
  const handleOnBlurQuantity = () => {
    if (quantity.trim() === '')
      setIsQuantityValid(false)
  }

  const handleOnChangeReleaseDate = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setReleaseDate(new Date(currentTarget.value))
  }
  const handleOnBlurReleaseDate = () => {
    if (!releaseDate)
      setIsReleaseDateValid(false)
  }

  const handleOnSelectedAuthorsChange = (authorsData: MultiValue<Author>) => {
    setSelectedAuthors(authorsData as Author[])
  }
  const handleOnSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (title.trim() === '') {
      setIsTitleValid(false)
      return
    }
    if (description.trim() === '') {
      setIsDescriptionValid(false)
      return
    }
    if (Number.parseInt(quantity.trim()) < 1) {
      setIsQuantityValid(false)
      return
    }
    const isbnRegex = new RegExp('^(?=(?:\\D*\\d){10}(?:(?:\\D*\\d){3})?$)[\\d-]+$')
    if (isbn.trim() === '' || !isbnRegex.test(isbn)) {
      setIsIsbnValid(false)
      return
    }
    if (!releaseDate) {
      setIsReleaseDateValid(false)
      return
    }
    if (selectedAuthors.length === 0) {
      setIsSelectedAuthorsValid(false)
      return
    }

    const formData = new FormData()
    formData.append('title', title.trim())
    formData.append('description', description.trim())
    formData.append('isbn', isbn.trim())
    formData.append('quantity', quantity.trim())
    formData.append('cover', requestCover)
    formData.append('publishDate', releaseDate.toISOString())
    selectedAuthors.forEach(author => formData.append('authorIds', author.Id.toString()))
    addNewBook(formData)
      .then(() => {
        navigate('/')
      })
      .catch(() => {
        setIsDataValid(false)
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
          <label className={!isTitleValid ? 'create-book-error-label' : ''}>
            {!isTitleValid ? 'Please enter title' : 'Title'}
          </label>
          <input
            className={
              !isTitleValid ? 'create-book-input create-book-error-input' : 'create-book-input'
            }
            type='text'
            id='title'
            name='title'
            placeholder='Enter title...'
            value={title}
            onChange={handleOnChangeTitle}
            onBlur={handleOnBlurTitle}
            onFocus={() => setIsTitleValid(true)}
          />
        </div>
        <div className='create-book-form-field'>
          <label className={!isDescriptionValid ? 'create-book-error-label' : ''}>
            {!isDescriptionValid ? 'Please enter description' : 'Description'}
          </label>
          <textarea
            className={
              !isDescriptionValid ? 'create-book-text-area create-book-error-input' : 'create-book-text-area'
            }
            id='description'
            name='description'
            rows={3}
            draggable={false}
            placeholder='Enter description...'
            value={description}
            onChange={handleOnChangeDescription}
            onBlur={handleOnBlurDescription}
            onFocus={() => setIsDescriptionValid(true)}
          />
        </div>
        <div className='create-book-form-field'>
          <label className={!isIsbnValid ? 'create-book-error-label' : ''}>
            {!isIsbnValid ? 'Please enter ISBN' : 'ISBN'}
          </label>
          <input
            className={
              !isIsbnValid ? 'create-book-input create-book-error-input' : 'create-book-input'
            }
            type='text'
            placeholder='Enter ISBN...'
            value={isbn}
            onChange={handleOnChangeIsbn}
            onBlur={handleOnBlurIsbn}
            onFocus={() => setIsIsbnValid(true)}
          />
        </div>
        <div className='create-book-form-field'>
          <label className={!isQuantityValid ? 'create-book-error-label' : ''}>
            {!isQuantityValid ? 'Please enter quantity' : 'Quantity'}
          </label>
          <input
            className={
              !isQuantityValid ? 'create-book-input create-book-error-input' : 'create-book-input'
            }
            type='number'
            placeholder='Enter quantity...'
            min={1}
            value={quantity}
            onChange={handleOnChangeQuantity}
            onBlur={handleOnBlurQuantity}
            onFocus={() => setIsQuantityValid(true)}
          />
        </div>
        <div className='create-book-form-field'>
          <label className={!isReleaseDateValid ? 'create-book-error-label' : ''}>
            {!isReleaseDateValid ? 'Please enter release date' : 'Release date'}
          </label>
          <input
            className={
              !isReleaseDateValid ? 'create-book-input create-book-error-input' : 'create-book-input'
            }
            type='date'
            onChange={handleOnChangeReleaseDate}
            onBlur={handleOnBlurReleaseDate}
            onFocus={() => setIsReleaseDateValid(true)}
          />
        </div>
        <div className='create-book-form-field'>
          <label className={!isSelectedAuthorsValid ? 'create-book-error-label' : ''}>
            {!isSelectedAuthorsValid ? 'Please enter an author' : 'Authors'}
          </label>
          <Select
            className={
              !isSelectedAuthorsValid ? 'author-select create-book-error-input' : 'author-select'
            }
            options={authors}
            getOptionLabel={(option: Author) => `${option.FirstName} ${option.LastName}`}
            getOptionValue={(option: Author) => option.Id.toString()}
            value={selectedAuthors}
            onChange={handleOnSelectedAuthorsChange}
            onFocus={() => setIsSelectedAuthorsValid(false)}
            isSearchable={true}
            maxMenuHeight={100}
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
          <div className={!isDataValid ? 'data-error' : 'data'}>
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
