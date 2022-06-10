import React from 'react'
import styles from './styles'
import {
  RegistrationData,
  signUpApiMutation,
} from '../../../apis/signon/signup'
import WelcomeRegisterBox
  from '../../../components/modules/WelcomeRegisterBox/WelcomeRegisterBox'
import { loginApiMutation } from '../../../apis/signon/login'

const HomePage = () => {
  const c = styles()
  const signUpApi = signUpApiMutation.make()
  const loginApi = loginApiMutation.make()

  async function registerNewUser ({ email, password }: RegistrationData) {
    await signUpApi.call({
      data: { email, password },
    }, {
      onSuccess: async data => null,
      onError: async error => null,
    })
  }

  return <div className={c.root}>
    <WelcomeRegisterBox onValidRegistration={registerNewUser}/>

  </div>
}

export default HomePage




