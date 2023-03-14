import axios from 'axios'

import Book from '../models/Book'
import { baseUrl } from './AxiosConfiguration'

interface BooksResponse {
  Items: Book[],
  TotalCount: number
}

export const getBooks = async (pageNumber: number, pageLength: number) => {
  return axios.get<BooksResponse>(baseUrl + 'api/Books/paged', {
    params: {
      where: null,
      order: null,
      pageNumber,
      pageLength
    }
  })
}

export const addNewBook = async (formData: FormData) => {
  return axios.post(baseUrl + 'api/Books', formData)
}
