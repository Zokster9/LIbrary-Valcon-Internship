import { FormEvent, RefObject } from 'react'

interface SortRadioButtonProps {
  value: string
  inputRef: RefObject<HTMLInputElement>
  sortProperty: string
  isAsc: boolean
  handleOnClickSort: (value: string, sortProperty: string, isAsc: boolean) => void
}

const SortRadioButton = ({ value, inputRef, sortProperty, isAsc, handleOnClickSort }: SortRadioButtonProps) => {
  return (
    <input
      style={{ display: 'none' }}
      type='radio'
      value={value}
      ref={inputRef}
      onClick={({ currentTarget }: FormEvent<HTMLInputElement>) => {
        handleOnClickSort(currentTarget.value, sortProperty, isAsc)
      }}
    />
  )
}

export default SortRadioButton
