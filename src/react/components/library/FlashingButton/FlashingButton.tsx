import React from 'react'
import styles from './styles'

const FlashingButton = ({
  handleOnClick,
  text
}: Props) => {
  const c = styles()
  return <div className={c.root}>
    <div className={c.container}>
      <button className={c.button} onClick={handleOnClick}>
        {text}
      </button>
    </div>
  </div>
}

export default FlashingButton

interface Props {
  handleOnClick: () => void
  text: string
}


