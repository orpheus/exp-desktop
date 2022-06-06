import { createUseStyles } from 'react-jss'

export default createUseStyles(theme => {
  console.log('HomePage-Theme: ', theme)
  const primary = theme.color.primary
  return {
    root: {
      height: '100%',
      width: '100%',
      backgroundColor: '#000',
      color: primary
    }
  }
}, { name: 'HomePage-styles' })