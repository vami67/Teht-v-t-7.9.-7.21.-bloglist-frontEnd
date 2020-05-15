import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'

const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(login({
      username, password
    }))
//try catch puuttuu eli kentät tyhjenee vaikka dispatch epäonnistuisi
    setUsername('')
    setPassword('')

  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
            <input
          id='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
            <input
          id='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login'>login</button>
    </form>
  )
}

export default LoginForm