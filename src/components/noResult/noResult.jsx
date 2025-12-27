import React from 'react'
import styles from './noResult.module.css';

const NoResult = ({ displayText = {mainText:'', subText:''}, resultType="No data"}) => {
    const NoDataFound = ({ text }) => {
        return(
            <div className={styles.noTextContainer}>
                <div className={styles.mainText}>{text.mainText}</div>
                <div className={styles.subText}>{text.subText}</div>
            </div>
        )
    }
  return (
    <>
      {resultType === "No data" && <NoDataFound text={displayText} /> }
    </>
  )
}

export default NoResult
