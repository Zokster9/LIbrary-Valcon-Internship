import { createRef, Dispatch, RefObject, SetStateAction, useState } from 'react'


import Sort from '../../models/Sort'
import SortIconButtons from '../SortIconButtons/SortIconButtons'
import SortRadioButtons from '../SortRadioButtons/SortRadioButtons'
import './SortForm.css'

interface SortFormProps {
  sortForm: Sort
  setSortForm: Dispatch<SetStateAction<Sort>>
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

const SortForm = ({ sortForm, setSortForm }: SortFormProps) => {

  const [ whichRadioButtonsClicked, setWhichRadioButtonsClicked ] = useState<RadioButtonsClicked>({
    isTitleAscClicked: sortForm.titleSort === 'Title ASC',
    isTitleDescClicked: sortForm.titleSort === 'Title DESC',
    isIsbnAscClicked: sortForm.isbnSort === 'Isbn ASC',
    isIsbnDescClicked: sortForm.isbnSort === 'Isbn DESC',
    isPublishDateAscClicked: sortForm.publishDateSort === 'PublishDate ASC',
    isPublishDateDescClicked: sortForm.publishDateSort === 'PublishDate DESC',
    isDescriptionAscClicked: sortForm.descriptionSort === 'Description ASC',
    isDescriptionDescClicked: sortForm.descriptionSort === 'Description DESC'
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

  const handleOnClickSort = (value: string, sortProperty: string, isAsc: boolean) => {
    let isButtonClicked = false
    switch(sortProperty) {
      case 'Title':
        isButtonClicked = sortForm.titleSort === value
        setSortForm(sortForm => {
          return {
            ...sortForm,
            titleSort: isButtonClicked ? '' : value
          }
        })
        setWhichRadioButtonsClicked(whichRadioButtonsClicked => {
          return {
            ...whichRadioButtonsClicked,
            isTitleAscClicked: isAsc && !isButtonClicked,
            isTitleDescClicked: !isAsc && !isButtonClicked
          }
        })
        break
      case 'Isbn':
        isButtonClicked = sortForm.isbnSort === value
        setSortForm(sortForm => {
          return {
            ...sortForm,
            isbnSort: isButtonClicked ? '' : value
          }
        })
        setWhichRadioButtonsClicked(whichRadioButtonsClicked => {
          return {
            ...whichRadioButtonsClicked,
            isIsbnAscClicked: isAsc && !isButtonClicked,
            isIsbnDescClicked: !isAsc && !isButtonClicked
          }
        })
        break
      case 'PublishDate':
        isButtonClicked = sortForm.publishDateSort === value
        setSortForm(sortForm => {
          return {
            ...sortForm,
            publishDateSort: isButtonClicked ? '' : value
          }
        })
        setWhichRadioButtonsClicked(whichRadioButtonsClicked => {
          return {
            ...whichRadioButtonsClicked,
            isPublishDateAscClicked: isAsc && !isButtonClicked,
            isPublishDateDescClicked: !isAsc && !isButtonClicked
          }
        })
        break
      case 'Description':
        isButtonClicked = sortForm.descriptionSort === value
        setSortForm(sortForm => {
          return {
            ...sortForm,
            descriptionSort: isButtonClicked ? '' : value
          }
        })
        setWhichRadioButtonsClicked(whichRadioButtonsClicked => {
          return {
            ...whichRadioButtonsClicked,
            isDescriptionAscClicked: isAsc && !isButtonClicked,
            isDescriptionDescClicked: !isAsc && !isButtonClicked
          }
        })
        break
      default:
        break
    }
  }
  return (
    <>
      <h1>Sort</h1>
      <form className='sort-form'>
        <div className="sort-radio-group">
          <label className='sort-radio-label'>Title</label>
          <div className='sort-radio-options'>
            <SortIconButtons
              isAscClicked={whichRadioButtonsClicked.isTitleAscClicked}
              isDescClicked={whichRadioButtonsClicked.isTitleDescClicked}
              ascInputRef={radioButtons.titleAsc}
              descInputRef={radioButtons.titleDesc}
            />
          </div>
          <SortRadioButtons
            value='Title'
            ascButtonRef={radioButtons.titleAsc}
            descButtonRef={radioButtons.titleDesc}
            handleOnClickSort={handleOnClickSort}
          />
        </div>
        <div className="sort-radio-group">
          <label className='sort-radio-label'>ISBN</label>
          <div className='sort-radio-options'>
            <SortIconButtons
              isAscClicked={whichRadioButtonsClicked.isIsbnAscClicked}
              isDescClicked={whichRadioButtonsClicked.isIsbnDescClicked}
              ascInputRef={radioButtons.isbnAsc}
              descInputRef={radioButtons.isbnDesc}
            />
          </div>
          <SortRadioButtons
            value='Isbn'
            ascButtonRef={radioButtons.isbnAsc}
            descButtonRef={radioButtons.isbnDesc}
            handleOnClickSort={handleOnClickSort}
          />
        </div>
        <div className="sort-radio-group">
          <label className='sort-radio-label'>Publish Date</label>
          <div className='sort-radio-options'>
            <SortIconButtons
              isAscClicked={whichRadioButtonsClicked.isPublishDateAscClicked}
              isDescClicked={whichRadioButtonsClicked.isPublishDateDescClicked}
              ascInputRef={radioButtons.publishDateAsc}
              descInputRef={radioButtons.publishDateDesc}
            />
          </div>
          <SortRadioButtons
            value='PublishDate'
            ascButtonRef={radioButtons.publishDateAsc}
            descButtonRef={radioButtons.publishDateDesc}
            handleOnClickSort={handleOnClickSort}
          />
        </div>
        <div className="sort-radio-group">
          <label className='sort-radio-label'>Description</label>
          <div className='sort-radio-options'>
            <SortIconButtons
              isAscClicked={whichRadioButtonsClicked.isDescriptionAscClicked}
              isDescClicked={whichRadioButtonsClicked.isDescriptionDescClicked}
              ascInputRef={radioButtons.descriptionAsc}
              descInputRef={radioButtons.descriptionDesc}
            />
          </div>
          <SortRadioButtons
            value='Description'
            ascButtonRef={radioButtons.descriptionAsc}
            descButtonRef={radioButtons.descriptionDesc}
            handleOnClickSort={handleOnClickSort}
          />
        </div>
      </form>
    </>
  )
}

export default SortForm
