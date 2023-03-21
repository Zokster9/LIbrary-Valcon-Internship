import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { toast } from 'react-toastify'

import BookRentHistory from '../../models/BookRentHistory'
import { getBookRentHistory, returnBook } from '../../services/RentService'
import { convertBookHistoryResponseToBookHistory, convertDateToString } from '../../utils/Utils'
import './RentHistoryTable.css'

interface RentHistoryTableProps {
  bookId: string | undefined
  retrieveBook: boolean
  retrieveBookHistory: boolean
  setRetrieveBook: Dispatch<SetStateAction<boolean>>
}

const RentHistoryTable = ({ bookId, retrieveBook, retrieveBookHistory, setRetrieveBook }: RentHistoryTableProps) => {
  const [ bookRentHistories, setBookRentHistories ] = useState<BookRentHistory[]>([])

  const fetchBookRentHistory = () => {
    if (bookId) {
      getBookRentHistory(bookId)
        .then(response => {
          setBookRentHistories(convertBookHistoryResponseToBookHistory(response.data))
        })
        .catch(() => {
          toast.error('Rent history is not available!')
        })
    }
  }

  useEffect(() => {
    fetchBookRentHistory()
  }, [ retrieveBookHistory ])

  const handleReturnBook = (bookRentId: number) => {
    try {
      returnBook(bookRentId)
        .then(() => {
          toast.success('You have successfully returned a book!')
          fetchBookRentHistory()
          setRetrieveBook(!retrieveBook)
        })
        .catch(() => {
          toast.warn('You have already returned all books!')
        })
    } catch (error) {
      toast.warn('You have already returned all books!')
      return
    }
  }

  return (
    <div className='rent-history'>
      <h1>
        {bookRentHistories.length > 0 ? 'Rent history' : 'Book has never been rented before!'}
      </h1>
      {
        bookRentHistories.length > 0 &&
        <>
          <table className='rent-history-table'>
            <thead className='rent-history-table-headers'>
              <tr>
                <th className='rent-history-table-header' scope='col'>Rent date</th>
                <th className='rent-history-table-header' scope='col'>User email</th>
                <th className='rent-history-table-header' scope='col'>Status</th>
              </tr>
            </thead>
            <tbody>
              {
                bookRentHistories.map((bookRentHistory) => {
                  return (
                    <tr key={bookRentHistory.Id}>
                      <td className='rent-history-table-data'>
                        {convertDateToString(bookRentHistory.RentDate)}
                      </td>
                      <td className='rent-history-table-data'>
                        {bookRentHistory.User.Email}
                      </td>
                      {
                        bookRentHistory.IsReturned ?
                          <td className='rent-history-table-data'>
                            Returned
                          </td> :
                          (
                            <td className='rent-history-table-data'>
                              <button
                                type='button'
                                className='return-book-btn'
                                onClick={() => { handleReturnBook(bookRentHistory.Id) }}
                              >
                                Return a book
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
        </>
      }
    </div>
  )
}

export default RentHistoryTable
