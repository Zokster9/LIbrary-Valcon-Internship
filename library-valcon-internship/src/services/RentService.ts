import axios from 'axios'

import { baseUrl } from './AxiosConfiguration'

export const rentBook = async (bookId: string) => {
  return axios.post(baseUrl + `api/Rental/rent/${bookId}`)
}
