import React, { ReactElement } from 'react'

import styles from './styles'

const TitleLogo = ({
  title,
  subtitle,
  topHeaderComp,
  botHeaderComp
}: Props) => {
  const c = styles()

  return <div className={c.root}>
    <div className={c.container}>
      {topHeaderComp}
      <h3 className={c.boxTitle}>
        {title}
      </h3>
      {subtitle && <div>
        {subtitle}
      </div>}
      {botHeaderComp}
    </div>
  </div>
}

export default TitleLogo

interface Props {
  title: string
  subtitle?: string
  topHeaderComp?: ReactElement | ReactElement[]
  botHeaderComp?: ReactElement | ReactElement[]
}

