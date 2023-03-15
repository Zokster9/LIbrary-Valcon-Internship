import { createRef, FormEvent, RefObject, SyntheticEvent, useState } from 'react'

import { BsSortAlphaDown, BsSortAlphaUp } from 'react-icons/bs'
import './ModalSort.css'

interface ModalSortProps {
  closeModal: () => void
  applySort: (sort: string[]) => void
}

interface RadioButtonsClicked {
  isTitleAscClicked: boolean
  isTitleDescClicked: boolean
  isIsbnAscClicked: boolean
  isIsbnDescClicked: boolean
  isPublishDateAscClicked: boolean
  isPublishDateDescClicked: boolean
  isDescriptionAscClicked: boolean
  isDescriptionDescClicked: boolean
}

interface RadioButtons {
  titleAsc: RefObject<HTMLInputElement>
  titleDesc: RefObject<HTMLInputElement>
  isbnAsc: RefObject<HTMLInputElement>
  isbnDesc: RefObject<HTMLInputElement>
  publishDateAsc: RefObject<HTMLInputElement>
  publishDateDesc: RefObject<HTMLInputElement>
  descriptionAsc: RefObject<HTMLInputElement>
  descriptionDesc: RefObject<HTMLInputElement>
}

const ModalSort = ({ closeModal, applySort }: ModalSortProps) => {
  const [ titleSort, setTitleSort ] = useState('')
  const [ isbnSort, setIsbnSort ] = useState('')
  const [ publishDateSort, setPublishDateSort ] = useState('')
  const [ descriptionSort, setDescriptionSort ] = useState('')

  const [ whichRadioButtonsClicked, setWhichRadioButtonsClicked ] = useState<RadioButtonsClicked>({
    isTitleAscClicked: false,
    isTitleDescClicked: false,
    isIsbnAscClicked: false,
    isIsbnDescClicked: false,
    isPublishDateAscClicked: false,
    isPublishDateDescClicked: false,
    isDescriptionAscClicked: false,
    isDescriptionDescClicked: false
  })

  const radioButtons: RadioButtons = {
    titleAsc: createRef<HTMLInputElement>(),
    titleDesc: createRef<HTMLInputElement>(),
    isbnAsc: createRef<HTMLInputElement>(),
    isbnDesc: createRef<HTMLInputElement>(),
    publishDateAsc: createRef<HTMLInputElement>(),
    publishDateDesc: createRef<HTMLInputElement>(),
    descriptionAsc: createRef<HTMLInputElement>(),
    descriptionDesc: createRef<HTMLInputElement>()
  }

  const handleOnClickTitleAscending = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    if (titleSort === 'Title ASC') {
      setTitleSort('')
      setWhichRadioButtonsClicked(whichRadioButtonsClicked => {
        return {
          ...whichRadioButtonsClicked,
          isTitleAscClicked: false
        }
      })
    } else {
      setTitleSort(currentTarget.value)
      setWhichRadioButtonsClicked(whichRadioButtonsClicked => {
        return {
          ...whichRadioButtonsClicked,
          isTitleAscClicked: true,
          isTitleDescClicked: false
        }
      })
    }
  }
  const handleOnClickTitleDescending = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    if (titleSort === 'Title DESC') {
      setTitleSort('')
      setWhichRadioButtonsClicked(whichRadioButtonsClicked => {
        return {
          ...whichRadioButtonsClicked,
          isTitleDescClicked: false
        }
      })
    } else {
      setTitleSort(currentTarget.value)
      setWhichRadioButtonsClicked(whichRadioButtonsClicked => {
        return {
          ...whichRadioButtonsClicked,
          isTitleDescClicked: true,
          isTitleAscClicked: false
        }
      })
    }
  }

  const handleOnClickIsbnAscending = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    if (isbnSort === 'Isbn ASC') {
      setIsbnSort('')
      setWhichRadioButtonsClicked(whichRadioButtonsClicked => {
        return {
          ...whichRadioButtonsClicked,
          isIsbnAscClicked: false
        }
      })
    } else {
      setIsbnSort(currentTarget.value)
      setWhichRadioButtonsClicked(whichRadioButtonsClicked => {
        return {
          ...whichRadioButtonsClicked,
          isIsbnAscClicked: true,
          isIsbnDescClicked: false
        }
      })
    }
  }
  const handleOnClickIsbnDescending = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    if (isbnSort === 'Isbn DESC') {
      setIsbnSort('')
      setWhichRadioButtonsClicked(whichRadioButtonsClicked => {
        return {
          ...whichRadioButtonsClicked,
          isIsbnDescClicked: false
        }
      })
    } else {
      setIsbnSort(currentTarget.value)
      setWhichRadioButtonsClicked(whichRadioButtonsClicked => {
        return {
          ...whichRadioButtonsClicked,
          isIsbnDescClicked: true,
          isIsbnAscClicked: false
        }
      })
    }
  }

  const handleOnClickPublishDateAscending = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    if (publishDateSort === 'PublishDate ASC') {
      setPublishDateSort('')
      setWhichRadioButtonsClicked(whichRadioButtonsClicked => {
        return {
          ...whichRadioButtonsClicked,
          isPublishDateAscClicked: false
        }
      })
    } else {
      setPublishDateSort(currentTarget.value)
      setWhichRadioButtonsClicked(whichRadioButtonsClicked => {
        return {
          ...whichRadioButtonsClicked,
          isPublishDateAscClicked: true,
          isPublishDateDescClicked: false
        }
      })
    }
  }
  const handleOnClickPublishDateDescending = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    if (publishDateSort === 'PublishDate DESC') {
      setPublishDateSort('')
      setWhichRadioButtonsClicked(whichRadioButtonsClicked => {
        return {
          ...whichRadioButtonsClicked,
          isPublishDateDescClicked: false
        }
      })
    } else {
      setPublishDateSort(currentTarget.value)
      setWhichRadioButtonsClicked(whichRadioButtonsClicked => {
        return {
          ...whichRadioButtonsClicked,
          isPublishDateDescClicked: true,
          isPublishDateAscClicked: false
        }
      })
    }
  }

  const handleOnClickDescriptionAscending = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    if (descriptionSort === 'Description ASC') {
      setDescriptionSort('')
      setWhichRadioButtonsClicked(whichRadioButtonsClicked => {
        return {
          ...whichRadioButtonsClicked,
          isDescriptionAscClicked: false
        }
      })
    } else {
      setDescriptionSort(currentTarget.value)
      setWhichRadioButtonsClicked(whichRadioButtonsClicked => {
        return {
          ...whichRadioButtonsClicked,
          isDescriptionAscClicked: true,
          isDescriptionDescClicked: false
        }
      })
    }
  }
  const handleOnClickDescriptionDescending = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    if (descriptionSort === 'Description DESC') {
      setDescriptionSort('')
      setWhichRadioButtonsClicked(whichRadioButtonsClicked => {
        return {
          ...whichRadioButtonsClicked,
          isDescriptionDescClicked: false
        }
      })
    } else {
      setDescriptionSort(currentTarget.value)
      setWhichRadioButtonsClicked(whichRadioButtonsClicked => {
        return {
          ...whichRadioButtonsClicked,
          isDescriptionDescClicked: true,
          isDescriptionAscClicked: false
        }
      })
    }
  }

  const handleOnSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const sort: string[] = [
      titleSort,
      isbnSort,
      publishDateSort,
      descriptionSort
    ]
    applySort(sort)
    closeModal()
  }
  return (
    <>
      <h1>Sort</h1>
      <form className='sort-form' onSubmit={handleOnSubmit}>
        <fieldset className="sort-radio-group">
          <legend>Title</legend>
          <div className='sort-radio-options'>
            <button
              className={whichRadioButtonsClicked.isTitleAscClicked ? 'sort-radio clicked' : 'sort-radio'}
              type='button'
              onClick={() => { radioButtons.titleAsc.current?.click() }}
            >
              <BsSortAlphaUp size='2rem' />
            </button>
            <button
              className={whichRadioButtonsClicked.isTitleDescClicked ? 'sort-radio clicked' : 'sort-radio'}
              type='button'
              onClick={() => { radioButtons.titleDesc.current?.click() }}
            >
              <BsSortAlphaDown size='2rem' />
            </button>
          </div>
          <input
            style={{ display: 'none' }}
            type='radio'
            value='Title ASC'
            ref={radioButtons.titleAsc}
            onClick={handleOnClickTitleAscending}
          />
          <input
            style={{ display: 'none' }}
            type='radio'
            value='Title DESC'
            ref={radioButtons.titleDesc}
            onClick={handleOnClickTitleDescending}
          />
        </fieldset>
        <fieldset className="sort-radio-group">
          <legend>ISBN</legend>
          <div className='sort-radio-options'>
            <button
              className={whichRadioButtonsClicked.isIsbnAscClicked ? 'sort-radio clicked' : 'sort-radio'}
              type='button'
              onClick={() => { radioButtons.isbnAsc.current?.click() }}
            >
              <BsSortAlphaUp size='2rem' />
            </button>
            <button
              className={whichRadioButtonsClicked.isIsbnDescClicked ? 'sort-radio clicked' : 'sort-radio'}
              type='button'
              onClick={() => { radioButtons.isbnDesc.current?.click() }}
            >
              <BsSortAlphaDown size='2rem' />
            </button>
          </div>
          <input
            style={{ display: 'none' }}
            type='radio'
            value='Isbn ASC'
            ref={radioButtons.isbnAsc}
            onClick={handleOnClickIsbnAscending}
          />
          <input
            style={{ display: 'none' }}
            type='radio'
            value='Isbn DESC'
            ref={radioButtons.isbnDesc}
            onClick={handleOnClickIsbnDescending}
          />
        </fieldset>
        <fieldset className="sort-radio-group">
          <legend>Publish Date</legend>
          <div className='sort-radio-options'>
            <button
              className={whichRadioButtonsClicked.isPublishDateAscClicked ? 'sort-radio clicked' : 'sort-radio'}
              type='button'
              onClick={() => { radioButtons.publishDateAsc.current?.click() }}
            >
              <BsSortAlphaUp size='2rem' />
            </button>
            <button
              className={whichRadioButtonsClicked.isPublishDateDescClicked ? 'sort-radio clicked' : 'sort-radio'}
              type='button'
              onClick={() => { radioButtons.publishDateDesc.current?.click() }}
            >
              <BsSortAlphaDown size='2rem' />
            </button>
          </div>
          <input
            style={{ display: 'none' }}
            type='radio'
            value='PublishDate ASC'
            ref={radioButtons.publishDateAsc}
            onClick={handleOnClickPublishDateAscending}
          />
          <input
            style={{ display: 'none' }}
            type='radio'
            value='PublishDate DESC'
            ref={radioButtons.publishDateDesc}
            onClick={handleOnClickPublishDateDescending}
          />
        </fieldset>
        <fieldset className="sort-radio-group">
          <legend>Description</legend>
          <div className='sort-radio-options'>
            <button
              className={whichRadioButtonsClicked.isDescriptionAscClicked ? 'sort-radio clicked' : 'sort-radio'}
              type='button'
              onClick={() => { radioButtons.descriptionAsc.current?.click() }}
            >
              <BsSortAlphaUp size='2rem' />
            </button>
            <button
              className={whichRadioButtonsClicked.isDescriptionDescClicked ? 'sort-radio clicked' : 'sort-radio'}
              type='button'
              onClick={() => { radioButtons.descriptionDesc.current?.click() }}
            >
              <BsSortAlphaDown size='2rem' />
            </button>
          </div>
          <input
            style={{ display: 'none' }}
            type='radio'
            value='Description ASC'
            ref={radioButtons.descriptionAsc}
            onClick={handleOnClickDescriptionAscending}
          />
          <input
            style={{ display: 'none' }}
            type='radio'
            value='Description DESC'
            ref={radioButtons.descriptionDesc}
            onClick={handleOnClickDescriptionDescending}
          />
        </fieldset>
        <div className='sort-button-group'>
          <button className='sort-button'>Apply sort</button>
        </div>
      </form>
    </>
  )
}

export default ModalSort
