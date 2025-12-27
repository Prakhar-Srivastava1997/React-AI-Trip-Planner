import React, { useCallback } from 'react'
import styles from './footer.module.css'
import Button from '../button/button'
const Footer = () => {
    //optmized handleClick with useCallback to prevent unnecessary re-renders
    const handleClick = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    return (
        <div className={styles.footerContainer}>
            <p>Copyright © Xplori</p>
            <p>Terms of Service</p>
            <Button text="Back to Top " onClick={handleClick} />
        </div>
    )
}

export default Footer
