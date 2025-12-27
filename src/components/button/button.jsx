import React from 'react'
import styles from './button.module.css'

const Button = ({ text="", onClick=() =>{}, isDisabled = false }) => {
  return (
    <button 
    type="button" 
    onClick={onClick} 
    className={isDisabled ? styles.buttonDisabled : styles.button}
    aria-label={`${text} button`}
    tabIndex={'0'}
    disabled={isDisabled}
    >
      {text}
    </button>
  )
}

export default Button
