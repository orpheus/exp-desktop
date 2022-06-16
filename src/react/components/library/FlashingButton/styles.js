import { createUseStyles } from 'react-jss'

export default createUseStyles(theme => {
  // console.log("FlashingButton-Theme: ", theme)
  const primary = theme.color.primary
  const background = theme.color.background
  return {
    root: {},
    container: {},
    button: {
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
    }
  }
}, {name: "FlashingButton-styles"})