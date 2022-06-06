import React, { useEffect, useState } from 'react'
import styles from './styles'

const WelcomeRegisterBox = ({
  title,
  onRegisterSuccess
}: Props) => {
  const c = styles()

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [validInput, setValidInput] = useState(false)

  function handleEmailChange (e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.currentTarget.value)
  }

  function handlePassChange (e: React.ChangeEvent<HTMLInputElement>) {
    setPass(e.currentTarget.value)
  }

  function validateInput () {
    // TODO:
    return true
  }

  async function registerUser () {
    // TODO:
    onRegisterSuccess()
  }

  async function handleEnter (e: KeyboardEvent) {
    if (e.key === 'Enter') {
      await handleSubmit()
    }
  }

  async function handleSubmit () {
    if (!validateInput()) {
      // TODO: Error message or animation
      return
    }
    console.log('Register User..')
    await registerUser()
  }

  useEffect(() => {
    document.getElementById('app').addEventListener('keydown', handleEnter)

    return () => {
      document.getElementById('app').removeEventListener('keydown', handleEnter)
    }
  }, [])

  useEffect(() => {
    const valid = Boolean(email && pass)
    setValidInput(valid)
  }, [email, pass])

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
        <input className={c.input} type={'password'} onChange={handlePassChange} value={pass}/>
      </div>
      {validInput &&
        <div className={c.inputBoxContainer}>
          <button className={c.submitButton} onClick={handleSubmit}>
            SUBMIT
          </button>
        </div>
      }
    </div>

  </div>
}

export default WelcomeRegisterBox

interface Props {
  onRegisterSuccess: () => boolean
  title: string
}

WelcomeRegisterBox.defaultProps = {
  title: 'WELCOME TO EXP'
}


