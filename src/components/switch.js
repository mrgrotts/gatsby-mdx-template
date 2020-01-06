import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'grommet'

const Switch = ({ color, label, onClick, primary }) => (
  <Button color={color} label={label} onClick={onClick} primary={primary} />
)

Switch.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  primary: PropTypes.bool
}

Switch.defaultProps = {
  color: 'brand',
  label: 'Submit',
  onClick: () => {},
  primary: false
}

export default Switch
