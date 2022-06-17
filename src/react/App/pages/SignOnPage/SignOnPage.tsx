import React, { useState } from 'react'
import styles from './styles'
import TitleLogo from '../../../components/modules/TitleLogo/TitleLogo'
import HoloGlobe from '../../../components/library/HoloGlobe/HoloGlobe'
import { useAuth } from '../../../providers/AuthProvider'
import FlexCenter from '../../../components/library/FlexCenter/FlexCenter'
import Button from '../../../components/library/Button/Button'
import Register from '../../../components/modules/Register/Register'

type SignOnOption = 'login' | 'register' | null

const SignOnPage = () => {
  const c = styles()
  const auth = useAuth()

  const [signOnOption, setSignOnOption] = useState<SignOnOption>(null)

  function SignOnButtons () {
    if (signOnOption) {
      return null
    }
    return <>
      <Button className={c.button} text={'Login'}
              handleOnClick={() => setSignOnOption('login')}/>
      <Button className={c.button} text={'Create Account'}
              handleOnClick={() => setSignOnOption('register')}/>
    </>
  }

  return <div className={c.root}>
    <FlexCenter>
      <TitleLogo
        title={'EXP'}
        topHeaderComp={<HoloGlobe width={200}/>}
      />
      <SignOnButtons/>
      {signOnOption == 'register' &&
        <Register
          backout={() => setSignOnOption(null)}
        />
      }
    </FlexCenter>
  </div>
}

export default SignOnPage


