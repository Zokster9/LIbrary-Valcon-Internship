import axios, { AxiosResponse } from 'axios'

import { baseUrl } from './AxiosConfiguration'

interface SignInResponse {
  accessToken: string,
  refreshToken: string,
  expiration: Date
}

export const login = async (email: string, password: string): Promise<AxiosResponse<SignInResponse>> => {
  const credentials = {
    email,
    password
  }
  return axios.post(baseUrl + 'api/Auth/login', credentials)
}
