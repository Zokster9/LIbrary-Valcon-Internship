import axios, { AxiosResponse } from 'axios'

interface SignInResponse {
  accessToken: string,
  refreshToken: string,
  expiration: Date
}

const API_URL = 'https://library-practice-app.azurewebsites.net/'

export const login = async (email: string, password: string): Promise<AxiosResponse<SignInResponse>> => {
  const credentials = {
    email,
    password
  }
  return axios.post(API_URL + 'api/Auth/login', credentials)
}
