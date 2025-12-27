import React from 'react'
import styles from './input.module.css'

const Input = ({ id="", type="text", placeholder="", value="", onChange=()=>{}}) => {
  return (
    <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.inputField}
    />
  )
}

export default Input
