import React from 'react'
import styles from './styles'
import WelcomeRegisterBox, { RegistrationData } from '../../../components/modules/WelcomeRegisterBox/WelcomeRegisterBox'
import { loginApiMutation, signUpApiMutation } from '../../../apis/signon'

const HomePage = () => {
  const c = styles()
  const signUpApi = signUpApiMutation.make()
  const loginApi = loginApiMutation.make()

  async function registerNewUser ({ email, password }: RegistrationData) {
    await signUpApi.call({
      data: { email, password }
    }, {
      onSuccess: data => null,
      onError: error => null
    })
  }

  return <div className={c.root}>
    <WelcomeRegisterBox onValidRegistration={registerNewUser}/>

  </div>
}


export default HomePage




