import { RefObject } from 'react'

import { BsSortAlphaDown, BsSortAlphaUp } from 'react-icons/bs'
import './SortIconButton.css'

interface SortIconButtonProps {
  isClicked: boolean
  inputRef: RefObject<HTMLInputElement>
  isAsc: boolean
}

const SortIconButton = ({ isClicked, inputRef, isAsc }: SortIconButtonProps) => {
  return (
    <button
      className={isClicked ? 'sort-radio clicked' : 'sort-radio'}
      type='button'
      onClick={() => { inputRef.current?.click() }}
    >
      {isAsc ? <BsSortAlphaUp size='2rem' /> : <BsSortAlphaDown size='2rem' />}
    </button>
  )
}

export default SortIconButton
