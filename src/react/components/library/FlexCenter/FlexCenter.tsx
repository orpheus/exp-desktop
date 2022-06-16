import React, { ReactElement } from 'react'
import styles from './styles'

const FlexCenter = ({ children, flexDirection }: Props) => {
  const c = styles()
  return <div className={c.root} style={{ flexDirection }}>
    {children}
  </div>
}

export default FlexCenter

FlexCenter.defaultProps = {
  flexDirection: 'column'
}

interface Props {
  children: ReactElement | ReactElement[]
  flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse'
}


