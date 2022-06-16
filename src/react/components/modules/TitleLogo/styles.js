import { createUseStyles } from 'react-jss'

export default createUseStyles(theme => {
  // console.log("WelcomeRegisterBox-Theme: ", theme)
  const primary = theme.color.primary
  return {
    root: {},
    container: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    },
    boxTitle: {
      width: '100%',
      textAlign: 'center'
    },
    inputBoxContainer: {},
    inputLabel: {
      width: 70,
      display: 'inline-block'
    },
    input: {
      background: 'none',
      border: 'none',
      outline: 'none',
      borderBottom: `1px solid ${primary}`,
      color: primary,
      textTransform: 'uppercase',
      fontSize: 15
    }
  }
}, { name: 'WelcomeRegisterBox-styles' })