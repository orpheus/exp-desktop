import React from 'react'
import styles from './styles'
import {
  IRegistrationData,
  useSignUpMutation,
} from '../../../apis/signon/signup'
import CredentialBox
  from '../../../components/modules/CredentialBox/CredentialBox'

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
    <CredentialBox onValidRegistration={registerNewUser}/>

  </div>
}

export default HomePage




