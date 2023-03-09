import { useEffect, useState } from 'react'

import Select from 'react-select'

import Author from '../../models/Author'
import { getAllAuthors } from '../../services/AuthorService'
import './CreateBookPage.css'

const CreateBookPage = () => {
  const [ authors, setAuthors ] = useState<Author[]>([])
  useEffect(() => {
    getAllAuthors()
      .then(response => {
        setAuthors(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])
  return (
    <div className='create-book-page'>
      <h1 className='form-header'>Create a book</h1>
      <form className='create-book-form'>
        <div className='create-book-form-field'>
          <label>Title</label>
          <input type='text' />
        </div>
        <div className='create-book-form-field'>
          <label>Description</label>
          <textarea
            id='description'
            name='description'
            rows={3}
            cols={23}
            draggable={false}
          />
        </div>
        <div className='create-book-form-field'>
          <label>ISBN</label>
          <input type='text' />
        </div>
        <div className='create-book-form-field'>
          <label>Quantity</label>
          <input type='number' />
        </div>
        <div className='create-book-form-field'>
          <label>Cover</label>
          <input type='text' />
        </div>
        <div className='create-book-form-field'>
          <label>Release date</label>
          <input type='date' />
        </div>
        <div className='create-book-form-field'>
          <label>Authors</label>
          <Select
            className='author-select'
            options={authors}
            getOptionLabel={(option: Author) => `${option.firstName} ${option.lastName}`}
            isMulti
          />
        </div>
        <button className='create-book-button'>Create a book</button>
      </form>
    </div>
  )
}

export default CreateBookPage
