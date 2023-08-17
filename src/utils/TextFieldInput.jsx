import { TextField } from '@mui/material'
import React from 'react'

const TextFieldInput = ({ label, variant, value, onChange, onBlur, error, name, helperText }) => {

  return (
    <TextField
      fullWidth
      variant='outlined'
      className='my-2'
      id={name}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      helperText={helperText}
      onBlur={onBlur}
      error={error}
    />
  )
}

export default TextFieldInput