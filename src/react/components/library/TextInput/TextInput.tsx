import React, {
  HTMLInputTypeAttribute,
  InputHTMLAttributes, Key, useCallback,
  useEffect,
  useState,
} from 'react'
import styles from './styles'
import clsx from 'clsx'

const TextInput = ({
  onChange,
  value,
  onBlur,
  errorMessage,
  placeholder,
  label,
  style,
  type,
  inputProps,
  inputClass,
  onEnter
}: Props) => {
  const c = styles()

  function handleOnChange (e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value)
  }

  function handleOnBlur (e: React.FocusEvent<HTMLInputElement>) {
    onBlur && onBlur(e.target.value)
  }

  function handleOnKeyUp (e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      onEnter && onEnter()
    }
  }

  return <div className={c.root}>
    {label && <label className={c.label}>
      {label}
    </label>
    }
    <input
      style={style}
      type={type || 'text'}
      value={value}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      onKeyUp={handleOnKeyUp}
      className={clsx(c.input, inputClass)}
      placeholder={placeholder}
      {...inputProps}
    />
    {errorMessage && <div className={c.errorMessageContainer}>
      <span className={c.errorMessage}>{errorMessage}</span>
    </div>}
  </div>
}

export default TextInput

interface Props {
  onBlur?: (value: string) => void
  onChange: (value: string) => void
  onEnter?: () => void
  value: string
  errorMessage?: string
  placeholder?: string
  label?: string
  inputClass?: string
  style?: React.CSSProperties
  type?: HTMLInputTypeAttribute
  inputProps?: InputHTMLAttributes<HTMLInputElement>
}


