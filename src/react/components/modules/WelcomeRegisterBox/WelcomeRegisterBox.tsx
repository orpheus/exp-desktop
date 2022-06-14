import React, { useCallback, useEffect, useState } from 'react'

import hologlobe from '../../../../../public/assets/blender/hologlobe.mp4'

import styles from './styles'
import {
  IRegistrationData,
} from '../../../apis/signon/signup'

const WelcomeRegisterBox = ({
  title,
  onValidRegistration,
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

  const handleRegister = useCallback(async () => {
    if (!validateInput()) {
      // TODO: Error message or animation
      return
    }
    await onValidRegistration({ email, password })
  }, [email, onValidRegistration, password])

  const handleEnter = useCallback(async (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      await handleRegister()
    }
  }, [handleRegister])

  useEffect(() => {
    const app = document.getElementById('app') as HTMLElement
    app.addEventListener('keydown', handleEnter)

    return () => {
      app.removeEventListener('keydown', handleEnter)
    }
  }, [handleEnter])

  useEffect(() => {
    const valid = Boolean(email && password)
    setValidInput(valid)
  }, [email, password])

  return <div className={c.root}>
    <div className={c.container}>
      <video
        autoPlay={true}
        loop={true}
        src={hologlobe}
        className={c.hologlobe}
      />
      <h3 className={c.boxTitle}>
        {title}
      </h3>
      <div className={c.inputBoxContainer}>
        <label className={c.inputLabel}>email: </label>
        <input className={c.input} type={'input'} onChange={handleEmailChange}
               value={email}/>
      </div>
      <div className={c.inputBoxContainer}>
        <label className={c.inputLabel}>password: </label>
        <input className={c.input} type={'password'} onChange={handlePassChange}
               value={password}/>
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
  onValidRegistration: (registrationData: IRegistrationData) => void
  title: string
}

WelcomeRegisterBox.defaultProps = {
  title: 'WELCOME TO EXP',
}


