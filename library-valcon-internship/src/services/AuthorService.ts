import axios, { AxiosResponse } from 'axios'

import Author from '../models/Author'

interface GetAuthorsResponse {
  authors: Author[]
}

const baseUrl: string = process.env.REACT_APP_API_BASE_URL ? process.env.REACT_APP_API_BASE_URL : ''

export const getAllAuthors = async (): Promise<AxiosResponse<GetAuthorsResponse>> =>
  axios.get(baseUrl + 'api/Authors')
