export default function setTheme(theme, callback) {
  if (theme) {
    console.log('current theme: ', theme)
    /* Grommet's default theme is the Light theme */
    if (theme === 'dark') {
      console.log('selected light theme')
      return callback('light')
      /* Grommet's dark theme is the Dark theme */
    } else if (theme === 'light') {
      console.log('selected dark theme')
      return callback('dark')
    } else {
      return callback('light')
    }
  } else {
    return callback('light')
  }
}
