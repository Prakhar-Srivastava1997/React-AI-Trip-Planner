import React from 'react'
import styles from './card.module.css'

const Card = (
  { cardObj = { cardHeader: { isIcon: false, value: '' }, cardBody: [] },
    cardType = "",
    onClick = () => { },
    selected = false,
    cardStructure = 'portrait',
    onKeyDown = () => { }
  }
) => {

  const getCssClassName = (title) => {
    const obj = {
      'title': styles.hotelTitle,
      'address': styles.hotelAddress,
      'price': styles.hotelPrice,
      'rating': styles.hotelRating,
      'description': styles.placeDescription,
      'time': styles.placeVisitTime,
      'travelTime': styles.placeTravelTime
    }
    return obj[title]
  }

  const CardIconComponent = () => {
    return (
      <div
        className={`${styles.iconContainer} ${selected && styles.iconContainerActive}`}
        onClick={() => onClick({ key: cardType, value: cardObj?.cardBody[0]?.value })}
        onKeyDown={(e) => onKeyDown(e, { key: cardType, value: cardObj?.cardBody[0]?.value })}
        tabIndex={'0'}
        role='button'
      >
        <div className={styles.cardHeader}>
          {cardObj.cardHeader.value}
        </div>
        <div className={styles.cardBody}>
          {cardObj?.cardBody?.map((item, index) => {
            return (
              <div key={index} data-title={item.title}>
                {item.value}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const CardHotelComponent = () => {
    return (
      <div
        className={styles.imgContainer}
        onClick={() => onClick(cardObj.cardBody)}
        tabIndex={'0'}
        role='button'
        onKeyDown={(e) => onKeyDown(e, cardObj.cardBody)}
      >
        <img
          src={cardObj.cardHeader.value}
          alt='image'
          className={styles.cardImgHeader}
        />
        <div className={styles.cardImgBody}>
          {cardObj?.cardBody?.map((item, index) => {
            if (item.title === 'rating') {
              return (
                <div key={index} className={getCssClassName(item.title)}>
                  {item.value} ⭐
                </div>
              )
            }
            return (
              <div key={index} className={getCssClassName(item.title)}>
                {item.value}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const CardPlaceComponent = () => {
    return (
      <div 
      className={styles.placeContainer} 
      onClick={() => onClick(cardObj.cardBody)}
      tabIndex={'0'}
      role='button'
      onKeyDown={(e) => onKeyDown(e, cardObj.cardBody)}
      >
        <div className={styles.placeCardDetails}>
          <div className={styles.imgHeader}>
            <img
              src={cardObj.cardHeader.value}
              alt='image'
            />
          </div>
          <div className={styles.cardPlaceBody}>
            {cardObj?.cardBody?.map((item, index) => {
              if (item.title === 'travelTime') {
                return (
                  <div key={index} className={getCssClassName(item.title)}>
                    {item.value} hrs travel
                  </div>
                )
              }
              return (
                <div key={index} className={getCssClassName(item.title)}>
                  {item.value}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {cardObj.cardHeader.isIcon ? <CardIconComponent /> :
        cardStructure === 'portrait' ? <CardHotelComponent /> : <CardPlaceComponent />}
    </>
  )
}

export default Card
