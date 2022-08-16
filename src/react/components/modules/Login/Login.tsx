import TextInput from '../../library/TextInput/TextInput'
import Button from '../../library/Button/Button'
import React, { useState } from 'react'
import styles from './styles'
import { useAuth } from '../../../providers/AuthProvider/AuthProvider'
import { ILoginResponse, useLoginMutation } from '../../../apis/signon/login'

const style = {
  width: 200,
  marginBottom: 10,
}

function Login ({
  backout,
}: Props) {
  const c = styles()
  const auth = useAuth()

  const loginMutation = useLoginMutation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin () {
    await loginMutation.mutate({
      auth: {
        username,
        password
      }
    }, {
      onSuccess: async (data: ILoginResponse) => {
        auth.setLoginData({
          authorized: true,
          accessToken: data['accessToken'],
          user: data
        })
      },
      onError: async error => null,
    })
  }

  function handleBack () {
    backout()
  }

  const validInput = password && username

  return <>
    <TextInput
      style={style}
      onChange={(v) => setUsername(v)}
      label={'Username'}
      value={username}
      inputClass={c.inputClass}
    />
    <TextInput
      type={'password'}
      style={style}
      onChange={(v) => setPassword(v)}
      label={'Password'}
      value={password}
      inputClass={c.inputClass}
      onEnter={handleLogin}
    />
    <Button
      style={{ ...style, marginTop: 15 }}
      className={c.button}
      handleOnClick={handleLogin}
      text={'Login'}
      disabled={!validInput}
    />
    <Button
      style={style}
      className={c.button}
      handleOnClick={handleBack}
      text={'Back'}
      color={'#fff'}
    />
  </>
}

export default Login

interface Props {
  backout: () => void
}