import React, { useEffect, useState } from 'react'
import styles from './styles'

const WelcomeRegisterBox = ({
  title,
  onValidRegistration
}: Props) => {
  const c = styles()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validInput, setValidInput] = useState(false)

  function handleEmailChange (e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.currentTarget.value)
  }

  function handlePassChange (e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.currentTarget.value)
  }

  function validateInput () {
    // TODO:
    return true
  }

  async function handleEnter (e: KeyboardEvent) {
    if (e.key === 'Enter') {
      await handleRegister()
    }
  }

  async function handleRegister () {
    if (!validateInput()) {
      // TODO: Error message or animation
      return
    }
    await onValidRegistration({ email, password })
  }

  useEffect(() => {
    document.getElementById('app').addEventListener('keydown', handleEnter)

    return () => {
      document.getElementById('app').removeEventListener('keydown', handleEnter)
    }
  }, [])

  useEffect(() => {
    const valid = Boolean(email && password)
    setValidInput(valid)
  }, [email, password])

  return <div className={c.root}>
    <div className={c.container}>
      <h3 className={c.boxTitle}>
        {title}
      </h3>
      <div className={c.inputBoxContainer}>
        <label className={c.inputLabel}>email: </label>
        <input className={c.input} type={'input'} onChange={handleEmailChange} value={email}/>
      </div>
      <div className={c.inputBoxContainer}>
        <label className={c.inputLabel}>password: </label>
        <input className={c.input} type={'password'} onChange={handlePassChange} value={password}/>
      </div>
      {validInput &&
        <div className={c.inputBoxContainer}>
          <button className={c.submitButton} onClick={handleRegister}>
            SUBMIT
          </button>
        </div>
      }
    </div>

  </div>
}

export default WelcomeRegisterBox

interface Props {
  onValidRegistration: (registrationData: RegistrationData) => void
  title: string
}

export interface RegistrationData {
  email: string,
  password: string
}

WelcomeRegisterBox.defaultProps = {
  title: 'WELCOME TO EXP'
}


