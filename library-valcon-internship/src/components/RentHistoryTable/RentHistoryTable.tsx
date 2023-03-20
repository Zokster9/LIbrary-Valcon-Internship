import { useEffect, useState } from 'react'

import { toast } from 'react-toastify'

import BookRentHistory from '../../models/BookRentHistory'
import { getBookRentHistory } from '../../services/RentService'
import { convertBookHistoryResponseToBookHistory, convertDateToString } from '../../utils/Utils'
import './RentHistoryTable.css'

interface RentHistoryTableProps {
  bookId: string | undefined
}

const RentHistoryTable = ({ bookId }: RentHistoryTableProps) => {
  const [ bookRentHistories, setBookRentHistories ] = useState<BookRentHistory[]>([])

  useEffect(() => {
    if (bookId) {
      getBookRentHistory(bookId)
        .then(response => {
          setBookRentHistories(convertBookHistoryResponseToBookHistory(response.data))
        })
        .catch(() => {
          toast.error('Rent history is not available!')
        })
    }
  }, [ bookId ])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope='col'>Rent date</th>
            <th scope='col'>User email</th>
            <th scope='col' />
          </tr>
        </thead>
        <tbody>
          {
            bookRentHistories.map((bookRentHistory) => {
              return (
                <tr key={bookRentHistory.Id}>
                  <td>{convertDateToString(bookRentHistory.RentDate)}</td>
                  <td>{bookRentHistory.User.Email}</td>
                  {
                    bookRentHistory.IsReturned ?
                      <td>Returned</td> :
                      (
                        <td>
                          <button>
                            Return
                          </button>
                        </td>
                      )
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default RentHistoryTable
