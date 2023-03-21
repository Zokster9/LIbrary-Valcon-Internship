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
          <Available /> Available for rent!
        </div> :
        <div className='available-message book-is-unavailable'>
          <NotAvailable /> Not available for rent!
        </div>
      }
    </>
  )
}

export default BookAvailableMessage
