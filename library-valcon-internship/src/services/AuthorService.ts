import axios from 'axios'

import Author from '../models/Author'
import { baseUrl } from './AxiosConfiguration'

export const getAllAuthors = async () =>
  axios.get<Author[]>(baseUrl + 'api/Authors')

export const addNewAuthor = async (firstName: string, lastName: string) => {
  return axios.post(baseUrl + 'api/Authors', { firstName, lastName })
}
