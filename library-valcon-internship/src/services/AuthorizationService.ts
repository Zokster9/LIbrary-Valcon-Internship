import axios, { AxiosResponse } from 'axios'

interface SignInResponse {
  accessToken: string,
  refreshToken: string,
  expiration: Date
}

const API_URL: string = process.env.REACT_APP_API_BASE_URL ? process.env.REACT_APP_API_BASE_URL : ''

export const login = async (email: string, password: string): Promise<AxiosResponse<SignInResponse>> => {
  const credentials = {
    email,
    password
  }
  return axios.post(API_URL + 'api/Auth/login', credentials)
}
