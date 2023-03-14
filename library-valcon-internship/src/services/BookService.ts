import axios from 'axios'

import Book from '../models/Book'
import Where from '../models/Where'
import { baseUrl } from './AxiosConfiguration'

interface BooksResponse {
  Items: Book[],
  TotalCount: number
}

interface GetBooksProps {
  pageNumber: number,
  pageLength: number,
  search: string,
  filter: Where[]
}

const createWhereSearch = (search: string) => {
  return {
    Field: 'Title',
    Value: search,
    Operation: 2
  }
}

const convertParamsToQueryString = ({ pageNumber, pageLength, search, filter }: GetBooksProps) => {
  let result = '?'
  result += 'PageNumber=' + pageNumber.toString()
  result += '&PageLength=' + pageLength.toString()
  const where: Where[] = [ ...filter ]
  where.push(createWhereSearch(search))
  where.forEach((where) => {
    if (where.Value !== '' && where.Value != null) {
      result += `&where=${JSON.stringify(where)}`
    }
  })
  // request.Order?.forEach((order) => {
  //   result += '&Order=' + order
  // })
  return result
}

export const getBooks = async ({ pageNumber, pageLength, search, filter }: GetBooksProps) => {
  return axios.get<BooksResponse>(baseUrl + 'api/Books/paged' + convertParamsToQueryString(
    {
      pageNumber, pageLength, search, filter
    }
  ))
}

export const addNewBook = async (formData: FormData) => {
  return axios.post(baseUrl + 'api/Books', formData)
}
