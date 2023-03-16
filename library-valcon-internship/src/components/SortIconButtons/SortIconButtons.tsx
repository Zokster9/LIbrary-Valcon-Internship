import { RefObject } from 'react'

import SortIconButton from '../SortIconButton/SortIconButton'

interface SortIconButtonsProps {
  isAscClicked: boolean
  isDescClicked: boolean
  ascInputRef: RefObject<HTMLInputElement>
  descInputRef: RefObject<HTMLInputElement>
}

const SortIconButtons = ({
  isAscClicked,
  isDescClicked,
  ascInputRef,
  descInputRef
}: SortIconButtonsProps) => {
  return (
    <>
      <SortIconButton isClicked={isAscClicked} inputRef={ascInputRef} isAsc={true} />
      <SortIconButton isClicked={isDescClicked} inputRef={descInputRef} isAsc={false} />
    </>
  )
}

export default SortIconButtons
