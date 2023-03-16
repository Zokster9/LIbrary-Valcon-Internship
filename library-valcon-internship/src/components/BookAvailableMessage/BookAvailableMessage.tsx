import { BsXCircleFill } from 'react-icons/bs'
import { VscPassFilled } from 'react-icons/vsc'
import './BookAvailableMessage.css'

interface BookAvailableMessageProps {
  isAvailable: boolean
}

const BookAvailableMessage = ({ isAvailable }: BookAvailableMessageProps) => {
  return (
    <>
      {isAvailable ?
        <div className='available-message available'>
          <VscPassFilled /> Book is available for renting!
        </div> :
        <div className='available-message unavailable'>
          <BsXCircleFill /> Book is not available for renting!
        </div>
      }
    </>
  )
}

export default BookAvailableMessage
