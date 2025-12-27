import React from 'react'
import styles from './itinerary.module.css';
import PlaceCard from '../placeCard/placeCard';

const PlacesToVisit = ({ places }) => {
    return (
        <div className={styles.placeListContainer}>
            {places?.map((place, index) => {
                return (
                    <div key={index} className={styles.cardContainer}>
                        <PlaceCard place={place}/>
                    </div>
                )
            })}
        </div>
    )
}

const Itinerary = ({ trip }) => {
    return (
        <div className={styles.itinContainer}>
            <h2 className={styles.header} tabIndex={'0'}>Places to visit</h2>
            <div className={styles.itinSec}>
                {trip?.tripData?.itinerary?.map((place, index) => {
                    return (
                        <div key={index}>
                            <p tabIndex={'0'}><strong>Day {place.day}:</strong></p>
                            <PlacesToVisit places={place.places} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Itinerary
