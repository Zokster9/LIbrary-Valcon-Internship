import axios from 'axios'

import Book from '../models/Book'
import { baseUrl } from './AxiosConfiguration'

interface BooksResponse {
  Items: Book[],
  TotalCount: number
}

interface GetBooksProps {
  pageNumber: number,
  pageLength: number,
  search: string
}

interface Where {
  Field: string,
  Value: string,
  Operation: number
}

const createWhereArray = (search: string) => {
  const where: Where[] = []
  where.push({
    Field: 'Title',
    Value: search,
    Operation: 2
  })
  return where
}

const convertParamsToQueryString = ({ pageNumber, pageLength, search }: GetBooksProps) => {
  let result = '?'
  result += 'PageNumber=' + pageNumber.toString()
  result += '&PageLength=' + pageLength.toString()
  if (search) {
    const where: Where[] = createWhereArray(search)
    where.forEach((where) => {
      if (where.Value !== '' && where.Value != null) {
        result += `&where=${JSON.stringify(where)}`
      }
    })
  }
  // request.Order?.forEach((order) => {
  //   result += '&Order=' + order
  // })
  return result
}

export const getBooks = async ({ pageNumber, pageLength, search }: GetBooksProps) => {
  return axios.get<BooksResponse>(baseUrl + 'api/Books/paged' + convertParamsToQueryString(
    {
      pageNumber, pageLength, search
    }
  ))
}

export const addNewBook = async (formData: FormData) => {
  return axios.post(baseUrl + 'api/Books', formData)
}
