import { RefObject } from 'react'

import SortRadioButton from '../SortRadioButton/SortRadioButton'

interface SortRadioButtonsProps {
  value: string
  ascButtonRef: RefObject<HTMLInputElement>
  descButtonRef: RefObject<HTMLInputElement>
  handleOnClickSort: (value: string, sortProperty: string, isAsc: boolean) => void
}

const SortRadioButtons = ({ value, ascButtonRef, descButtonRef, handleOnClickSort }: SortRadioButtonsProps) => {
  return (
    <>
      <SortRadioButton
        value={`${value} ASC`}
        inputRef={ascButtonRef}
        sortProperty={value}
        isAsc={true}
        handleOnClickSort={handleOnClickSort}
      />
      <SortRadioButton
        value={`${value} DESC`}
        inputRef={descButtonRef}
        sortProperty={value}
        isAsc={false}
        handleOnClickSort={handleOnClickSort}
      />
    </>
  )
}

export default SortRadioButtons
