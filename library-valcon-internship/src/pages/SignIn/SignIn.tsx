import { FormEvent, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import './SignIn.css'

const SignIn = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const navigate = useNavigate()
  const handleOnChangeEmail = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    const newEmail = currentTarget.value
    setEmail(newEmail)
  }
  const handleOnChangePassword = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    const newPassword = currentTarget.value
    setPassword(newPassword)
  }
  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    localStorage.setItem('email', email)
    localStorage.setItem('password', password)
    navigate('/')
  }
  return (
    <div className='signIn'>
      <h1 className='title'>Sign in</h1>
      <form onSubmit={handleOnSubmit}>
        <div className='form-field'>
          <label className='label' htmlFor='email'>
            Email:
          </label>
          <input
            className='form-input'
            type='email'
            id='email'
            name='email'
            placeholder='Enter email...'
            value={email}
            onChange={handleOnChangeEmail}
          />
        </div>
        <div className='form-field'>
          <label className='label' htmlFor='password'>
            Password:
          </label>
          <input
            className='form-input'
            type='password'
            id='password'
            name='password'
            placeholder='Enter password...'
            value={password}
            onChange={handleOnChangePassword}
          />
        </div>
        <div className='form-field-button'>
          <button className='form-button'>Sign in</button>
        </div>
      </form>
    </div>
  )
}

export default SignIn
