import axios from 'axios'

import Token from '../models/Token'

export const baseUrl: string = process.env.REACT_APP_API_BASE_URL ? process.env.REACT_APP_API_BASE_URL : ''

export const configureAxiosRequestInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token')
      if (token) {
        const jsonToken: Token = JSON.parse(token) as Token
        config.headers['Authorization'] = `Bearer ${jsonToken.accessToken}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}
