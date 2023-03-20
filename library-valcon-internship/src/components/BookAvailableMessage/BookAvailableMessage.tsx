import { BsXCircleFill as NotAvailable } from 'react-icons/bs'
import { VscPassFilled as Available } from 'react-icons/vsc'
import './BookAvailableMessage.css'

interface BookAvailableMessageProps {
  isAvailable: boolean
}

const BookAvailableMessage = ({ isAvailable }: BookAvailableMessageProps) => {
  return (
    <>
      {isAvailable ?
        <div className='available-message book-is-available'>
          <Available /> Book is available for renting!
        </div> :
        <div className='available-message book-is-unavailable'>
          <NotAvailable /> Book is not available for renting!
        </div>
      }
    </>
  )
}

export default BookAvailableMessage
