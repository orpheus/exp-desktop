import React from 'react'
import styles from './styles'
import WelcomeRegisterBox from '../../../components/modules/WelcomeRegisterBox/WelcomeRegisterBox'

const HomePage = () => {
  const c = styles()

  function handleOnRegister (): boolean {
    return true
  }

  return <div className={c.root}>
    <WelcomeRegisterBox onRegisterSuccess={handleOnRegister}/>

  </div>
}

export default HomePage




