import axios from 'axios'

import BookRentHistoryResponse from '../models/responses/BookRentHistoryResponse'
import { baseUrl } from './AxiosConfiguration'

export const rentBook = async (bookId: string) => {
  return axios.post(baseUrl + `api/Rental/rent/${bookId}`)
}

export const getBookRentHistory = async (bookId: string) => {
  return axios.get<BookRentHistoryResponse[]>(baseUrl + `api/Rental/book-history/${bookId}`)
}

export const returnBook = async (bookId: string, userId: number) => {
  return axios.post(baseUrl + `api/Rental/return/${bookId}/${userId}`)
}
