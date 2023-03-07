import { FormEvent, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import axios, { AxiosError } from 'axios'

import { login } from '../../services/AuthorizationService'
import './SignIn.css'

const SignIn = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ emailError, setEmailError ] = useState(false)
  const [ passwordError, setPasswordError ] = useState(false)
  const [ invalidCredentials, setInvalidCredentials ] = useState(false)
  const navigate = useNavigate()
  const handleOnChangeEmail = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    const newEmail = currentTarget.value
    setEmail(newEmail)
  }
  const handleOnChangePassword = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    const newPassword = currentTarget.value
    setPassword(newPassword)
  }
  const handleOnBlurEmail = () => {
    if (email.trim() === '') {
      setEmailError(true)
      return
    }
  }
  const handleOnBlurPassword = () => {
    if (password.trim() === '') {
      setPasswordError(true)
      return
    }
  }
  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (email.trim() === '') {
      setEmailError(true)
      return
    }
    if (password.trim() === '') {
      setPasswordError(true)
      return
    }
    login(email, password)
      .then((response) => {
        localStorage.setItem('token', response.data.accessToken)
        navigate('/')
      })
      .catch((error: Error | AxiosError) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            setInvalidCredentials(true)
          }
        }
      })
  }
  return (
    <div className='signIn'>
      <h1 className='title'>Sign in</h1>
      <form className='form' onSubmit={handleOnSubmit}>
        <div>
          <div className='form-field'>
            <label className={emailError ? 'label error' : 'label'} htmlFor='email'>
              {!emailError ? 'Email:' : 'Please provide a valid email format'}
            </label>
            <input
              className={emailError ? 'form-input error' : 'form-input'}
              type='email'
              id='email'
              name='email'
              placeholder='Enter email...'
              aria-required={true}
              aria-invalid={true}
              value={email}
              onChange={handleOnChangeEmail}
              onBlur={handleOnBlurEmail}
              onFocus={() => setEmailError(false)}
            />
          </div>
          <div className='form-field'>
            <label className={passwordError ? 'label error' : 'label'} htmlFor='password'>
              {!passwordError ? 'Password:' : 'Please provide a valid password'}
            </label>
            <input
              className={passwordError ? 'form-input error' : 'form-input'}
              type='password'
              id='password'
              name='password'
              placeholder='Enter password...'
              value={password}
              onChange={handleOnChangePassword}
              onBlur={handleOnBlurPassword}
              onFocus={() => setPasswordError(false)}
            />
          </div>
        </div>
        <div className='form-field-button'>
          <div className={invalidCredentials ? 'error-signIn' : 'signIn-message'}>
            Wrong email or password!
          </div>
          <button className='form-button'>Sign in</button>
        </div>
      </form>
    </div>
  )
}

export default SignIn
