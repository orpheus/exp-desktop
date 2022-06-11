import React from 'react'
import styles from './styles'
import {
  IRegistrationData,
  useSignUpMutation,
} from '../../../apis/signon/signup'
import WelcomeRegisterBox
  from '../../../components/modules/WelcomeRegisterBox/WelcomeRegisterBox'

const HomePage = () => {
  const c = styles()
  const signUpMutation = useSignUpMutation()

  // const loginApi = loginApiMutation.make()

  async function registerNewUser ({ email, password }: IRegistrationData) {
    await signUpMutation.mutate({
      data: { email, password }
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




