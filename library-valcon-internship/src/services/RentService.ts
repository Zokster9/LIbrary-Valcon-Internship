import axios from 'axios'

import BookRentHistoryResponse from '../models/responses/BookRentHistoryResponse'
import TopBookRentalsResponse from '../models/responses/TopBookRentalsResponse'
import { baseUrl } from './AxiosConfiguration'

export const rentBook = async (bookId: string) => {
  return axios.post(`${baseUrl}api/Rental/rent/${bookId}`)
}

export const getBookRentHistory = async (bookId: string) => {
  return axios.get<BookRentHistoryResponse[]>(`${baseUrl}api/Rental/book-history/${bookId}`)
}

export const returnBook = async (bookRentId: number) => {
  return axios.post(`${baseUrl}api/Rental/return/${bookRentId}`)
}

export const getTopRentalBooks = async (count: number) => {
  return axios.get<TopBookRentalsResponse[]>(`${baseUrl}api/Rental/top/${count}`)
}
