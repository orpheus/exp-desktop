import { createUseStyles } from 'react-jss'

export default createUseStyles(theme => {
  // console.log("WelcomeRegisterBox-Theme: ", theme)
  const primary = theme.color.primary
  const background = theme.color.background
  return {
    root: {},
    container: {
      position: 'absolute',
      height: 150,
      width: '100%',
      // border: `11px ${primary} double`,
      top: '50%',
      transform: 'translateY(-90%)',
      boxSizing: 'border-box',
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
    },
    submitButton: {
      background: '#000',
      color: primary,
      border: `1px ${primary} solid`,
      outline: 'none',
      marginTop: 20,
      animationName: '$blinker',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'cubic-bezier(.5, 0, 1, 1)',
      animationDuration: '.85s',
      '&:hover': {
        animation: 'none',
        background: primary,
        color: background,
        fontWeight: 'bold',
        cursor: 'pointer'
      }
    },
    '@keyframes blinker': {
      from: { background: primary, color: background },
      to: { background: background, color: primary }
    },
    hologlobe: {
      width: 200
    }
  }
}, { name: 'WelcomeRegisterBox-styles' })