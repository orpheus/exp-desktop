import React from 'react'
import styles from './styles'
import TitleLogo from '../../../components/modules/TitleLogo/TitleLogo'
import HoloGlobe from '../../../components/library/HoloGlobe/HoloGlobe'
import { useAuth } from '../../../providers/AuthProvider'
import CredentialBox
  from '../../../components/modules/CredentialBox/CredentialBox'
import FlexCenter from '../../../components/library/FlexCenter/FlexCenter'

const SignOnPage = () => {
  const c = styles()
  const auth = useAuth()

  return <div className={c.root}>
    <FlexCenter>
      <TitleLogo
        title={'EXP'}
        topHeaderComp={<HoloGlobe width={200}/>}
      />
      <CredentialBox onValidRegistration={() => null}/>
    </FlexCenter>

  </div>
}

export default SignOnPage


