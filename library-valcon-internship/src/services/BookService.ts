import axios from 'axios'

import { baseUrl } from './AxiosConfiguration'

export const addNewBook = async (formData: FormData) => {
  return axios.post(baseUrl + 'api/Books', formData)
}
