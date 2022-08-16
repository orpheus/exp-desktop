import TextInput from '../../library/TextInput/TextInput'
import Button from '../../library/Button/Button'
import React, { useState } from 'react'
import styles from './styles'
import { useSignUpMutation } from '../../../apis/signon/signup'
import { useAuth } from '../../../providers/AuthProvider/AuthProvider'

const style = {
  width: 200,
  marginBottom: 10,
}

function Register ({
  backout,
}: Props) {
  const c = styles()
  const auth = useAuth()

  const signUpMutation = useSignUpMutation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [username, setUsername] = useState('')

  async function handleOnRegister () {
    await signUpMutation.mutate({
      data: {
        email,
        password,
        username,
        roleName: 'admin'
      },
    }, {
      onSuccess: async data => null,
      onError: async error => null,
    })
  }

  function handleBack () {
      backout()
  }

  const validRegistration = email && password && (password === confirmedPassword) && username

  return <>
      <TextInput
        style={style}
        onChange={(v) => setEmail(v)}
        label={'Email'}
        value={email}
        inputClass={c.inputClass}
      />
      <TextInput
        type={'password'}
        style={style}
        onChange={(v) => setPassword(v)}
        label={'Password'}
        value={password}
        inputClass={c.inputClass}
      />
      <TextInput
        type={'password'}
        style={style}
        onChange={(v) => setConfirmedPassword(v)}
        label={'Confirm Password'}
        value={confirmedPassword}
        inputClass={c.inputClass}
      />
      <TextInput
        style={style}
        onChange={(v) => setUsername(v)}
        label={'Username'}
        value={username}
        inputClass={c.inputClass}
      />
      <Button
        style={{...style, marginTop: 15}}
        className={c.button}
        handleOnClick={handleOnRegister}
        text={'Register'}
        disabled={!validRegistration}
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

export default Register

interface Props {
  backout: () => void
}