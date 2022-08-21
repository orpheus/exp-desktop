import React, { useState } from 'react'
import styles from './styles'
import TitleLogo from '../../../components/modules/TitleLogo/TitleLogo'
import HoloGlobe from '../../../components/library/HoloGlobe/HoloGlobe'
import { useAuth } from '../../../providers/AuthProvider/AuthProvider'
import FlexCenter from '../../../components/library/FlexCenter/FlexCenter'
import Button from '../../../components/library/Button/Button'
import Register from '../../../components/modules/Register/Register'
import Login from '../../../components/modules/Login/Login'
import { useNavigate } from 'react-router-dom'

const login = 'login'
const register = 'register'
type SignOnOption = 'login' | 'register' | null

const SignOnPage = () => {
  const c = styles()
  const auth = useAuth()
  const navigate = useNavigate();

  const [signOnOption, setSignOnOption] = useState<SignOnOption>(null)

  function SignOnButtons () {
    if (signOnOption) {
      return null
    }
    return <>
      <Button className={c.button} text={'Login'}
              handleOnClick={() => setSignOnOption(login)}/>
      <Button className={c.button} text={'Create Account'}
              handleOnClick={() => setSignOnOption(register)}/>
    </>
  }

  function navigateUserToHome() {
    navigate('/')
  }

  return <div className={c.root}>
    <FlexCenter>
      <TitleLogo
        title={'EXP'}
        topHeaderComp={<HoloGlobe width={200}/>}
      />
      <SignOnButtons/>
      {signOnOption == login &&
        <Login
          backout={() => setSignOnOption(null)}
          onLogin={navigateUserToHome}
        />
      }
      {signOnOption == register &&
        <Register
          backout={() => setSignOnOption(null)}
          onRegister={navigateUserToHome}
        />
      }
    </FlexCenter>
  </div>
}

export default SignOnPage


