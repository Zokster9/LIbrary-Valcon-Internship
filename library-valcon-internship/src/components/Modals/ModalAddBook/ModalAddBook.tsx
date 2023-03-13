import { FormEvent, SyntheticEvent, useEffect, useRef, useState } from 'react'

import ReactDOM from 'react-dom'
import Select, { MultiValue } from 'react-select'

import placeholderBook from '../../../assets/icons/placeholder-book.png'
import Author from '../../../models/Author'
import { addNewAuthor, getAllAuthors } from '../../../services/AuthorService'
import { addNewBook } from '../../../services/BookService'
import '../Modals.css'
import './ModalAddBook.css'

interface AddBookProps {
  show: boolean
  closeModal: () => void
}

const ModalAddBook = ({ show, closeModal }: AddBookProps) => {
  const [ requestCover, setRequestCover ] = useState<Blob>(new Blob())
  const [ cover, setCover ] = useState('')
  const [ authors, setAuthors ] = useState<Author[]>([])
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ isbn, setIsbn ] = useState('')
  const [ quantity, setQuantity ] = useState('1')
  const [ releaseDate, setReleaseDate ] = useState<Date | null>(null)
  const [ selectedAuthors, setSelectedAuthors ] = useState<Author[]>([])

  const [ isTitleValid, setIsTitleValid ] = useState(true)
  const [ isDescriptionValid, setIsDescriptionValid ] = useState(true)
  const [ isIsbnValid, setIsIsbnValid ] = useState(true)
  const [ isQuantityValid, setIsQuantityValid ] = useState(true)
  const [ isReleaseDateValid, setIsReleaseDateValid ] = useState(true)
  const [ isSelectedAuthorsValid, setIsSelectedAuthorsValid ] = useState(true)
  const [ isDataValid, setIsDataValid ] = useState(true)
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const [ showAccordion, setShowAccordion ] = useState(false)
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ isFirstNameValid, setIsFirstNameValid ] = useState(true)
  const [ isLastNameValid, setIsLastNameValid ] = useState(true)
  const [ isAuthorDataValid, setIsAuthorDataValid ] = useState(true)

  useEffect(() => {
    getAllAuthors()
      .then(response => {
        setAuthors(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  if (!show) return null

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
  const handleOnBookSubmit = (e: SyntheticEvent) => {
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
        closeModal()
      })
      .catch(() => {
        setIsDataValid(false)
      })
  }

  const handleOnChangeFirstName = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setFirstName(currentTarget.value)
  }
  const handleOnBlurFirstName = () => {
    if (firstName.trim() === '')
      setIsFirstNameValid(false)
  }
  const handleOnChangeLastName = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setLastName(currentTarget.value)
  }
  const handleOnBlurLastName = () => {
    if (lastName.trim() === '')
      setIsLastNameValid(false)
  }
  const handleOnAuthorSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (firstName.trim() === '') {
      setIsFirstNameValid(false)
      return
    }
    if (lastName.trim() === '') {
      setIsLastNameValid(false)
      return
    }
    addNewAuthor(firstName.trim(), lastName.trim())
      .then(() => {
        getAllAuthors()
          .then(response => {
            setAuthors(response.data)
          })
          .catch(error => {
            console.error(error)
          })
        setFirstName('')
        setLastName('')
      })
      .catch(() => {
        setIsAuthorDataValid(false)
      })
  }

  return ReactDOM.createPortal(
    <div className='modal'>
      <div className='overlay' onClick={closeModal} />
      <div className='content'>
        <div className='add-book-modal'>
          <h1>Create a book</h1>
          <form id='authorForm' onSubmit={handleOnAuthorSubmit} />
          <form className='add-book-form' onSubmit={handleOnBookSubmit}>
            <div className="add-book-form-field">
              <h3>Add a cover</h3>
              <button className='add-book-placeholder' type='button' onClick={handleCoverClick}>
                <img className='book-cover' src={cover ? cover : placeholderBook} alt='placeholder-book' />
              </button>
              <input
                className='add-book-text-area'
                type='file'
                id='file'
                name='file'
                ref={hiddenFileInput}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>
            <div className='add-book-form-fields'>
              <div className='add-book-form-field'>
                <label className={!isTitleValid ? 'add-book-error-label' : ''}>
                  {!isTitleValid ? 'Please enter title' : 'Title'}
                </label>
                <input
                  className={
                    !isTitleValid ? 'add-book-input add-book-error-input' : 'add-book-input'
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
              <div className='add-book-form-field'>
                <label className={!isIsbnValid ? 'add-book-error-label' : ''}>
                  {!isIsbnValid ? 'Please enter ISBN' : 'ISBN'}
                </label>
                <input
                  className={
                    !isIsbnValid ? 'add-book-input add-book-error-input' : 'add-book-input'
                  }
                  type='text'
                  placeholder='Enter ISBN...'
                  value={isbn}
                  onChange={handleOnChangeIsbn}
                  onBlur={handleOnBlurIsbn}
                  onFocus={() => setIsIsbnValid(true)}
                />
              </div>
            </div>
            <div className='add-book-form-field'>
              <label className={!isDescriptionValid ? 'add-book-error-label' : ''}>
                {!isDescriptionValid ? 'Please enter description' : 'Description'}
              </label>
              <textarea
                className={
                  !isDescriptionValid ? 'add-book-text-area add-book-error-input' :
                    'add-book-text-area'
                }
                id='description'
                name='description'
                rows={5}
                draggable={false}
                placeholder='Enter description...'
                value={description}
                onChange={handleOnChangeDescription}
                onBlur={handleOnBlurDescription}
                onFocus={() => setIsDescriptionValid(true)}
              />
            </div>
            <div className="add-book-form-fields">
              <div className="add-book-form-field">
                <label className={!isQuantityValid ? 'add-book-error-label' : ''}>
                  {!isQuantityValid ? 'Please enter quantity' : 'Quantity'}
                </label>
                <input
                  className={
                    !isQuantityValid ? 'add-book-input add-book-error-input' : 'add-book-input'
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
              <div className="add-book-form-field">
                <label className={!isReleaseDateValid ? 'add-book-error-label' : ''}>
                  {!isReleaseDateValid ? 'Please enter release date' : 'Release date'}
                </label>
                <input
                  className={
                    !isReleaseDateValid ? 'add-book-input add-book-error-input' : 'add-book-input'
                  }
                  type='date'
                  onChange={handleOnChangeReleaseDate}
                  onBlur={handleOnBlurReleaseDate}
                  onFocus={() => setIsReleaseDateValid(true)}
                />
              </div>
            </div>
            <div className="add-book-form-fields">
              <div className="add-book-form-field">
                <label className={!isSelectedAuthorsValid ? 'add-book-error-label' : ''}>
                  {!isSelectedAuthorsValid ? 'Please enter an author' : 'Authors'}
                </label>
                <Select
                  className={
                    !isSelectedAuthorsValid ? 'add-book-author-select add-book-error-input' :
                      'add-book-author-select'
                  }
                  options={authors}
                  getOptionLabel={(option: Author) => `${option.FirstName} ${option.LastName}`}
                  getOptionValue={(option: Author) => option.Id.toString()}
                  value={selectedAuthors}
                  onChange={handleOnSelectedAuthorsChange}
                  onFocus={() => setIsSelectedAuthorsValid(true)}
                  isSearchable={true}
                  maxMenuHeight={120}
                  isMulti={true}
                />
              </div>
              <div className="add-book-accordion" onClick={() => setShowAccordion(!showAccordion)}>
                <div className="add-book-accordion-item">
                  <div className="add-book-accordion-title">
                    <h4>Add an author</h4>
                    <span>+</span>
                  </div>
                  <div
                    className=
                      {
                        showAccordion ? 'add-book-accordion-content show' :
                          'add-book-accordion-content'
                      }
                  >
                    <div className='add-author-form'>
                      <div className='add-author-form-field'>
                        <label className={!isFirstNameValid ? 'add-author-error-label' : ''}>
                          {!isFirstNameValid ? 'Please enter first name' : 'First name'}
                        </label>
                        <input
                          className={!isFirstNameValid ? 'add-author-error-input' : ''}
                          id='firstName'
                          name='firstName'
                          type='text'
                          value={firstName}
                          form='authorForm'
                          placeholder='Enter first name...'
                          onChange={handleOnChangeFirstName}
                          onBlur={handleOnBlurFirstName}
                          onFocus={() => setIsFirstNameValid(true)}
                          onClick={(e: FormEvent<HTMLInputElement>) => e.stopPropagation()}
                        />
                      </div>
                      <div className='add-author-form-field'>
                        <label className={!isLastNameValid ? 'add-author-error-label' : ''}>
                          {!isLastNameValid ? 'Please enter last name' : 'Last name'}
                        </label>
                        <input
                          className={!isLastNameValid ? 'add-author-error-input' : ''}
                          id='lastName'
                          name='lastName'
                          type='text'
                          value={lastName}
                          form='authorForm'
                          placeholder='Enter last name...'
                          onChange={handleOnChangeLastName}
                          onBlur={handleOnBlurLastName}
                          onFocus={() => setIsLastNameValid(true)}
                          onClick={(e: FormEvent<HTMLInputElement>) => e.stopPropagation()}
                        />
                      </div>
                      <div className='add-author-button-field'>
                        <div className=
                          {
                            !isAuthorDataValid ? 'error-author-model' :
                              'author-modal-message'
                          }
                        >
                          Something went wrong!
                        </div>
                        <div className='modal-btns'>
                          <button
                            form='authorForm'
                            className='add-author-button modal-btn'
                            onClick={(e: FormEvent<HTMLButtonElement>) => { e.stopPropagation() }}
                          >
                            Create
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='add-book-submit-area'>
              <h4 className=
                { !isDataValid ? 'add-book-error-message' :
                  'add-book-error-message hidden'
                }
              >
                Wrong book data!
              </h4>
              <div className='add-book-btns'>
                <div className='submit-book-btn'>
                  <button className='add-book-btn new-book-btn'>Create a book</button>
                </div>
                <button
                  type='button'
                  className='close-modal-btn add-book-btn'
                  onClick={() => closeModal()}
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement
  )
}

export default ModalAddBook
