import React, { useEffect, useState } from 'react'
import styles from './Hotel.module.css';
import Card from '../../card/card';
import { getPlaceDetailsFromAPI } from '../../../service/globalAPI';
import { PHOTO_REF_URL } from '../../../service/globalAPI';
import Hotel from '../hotel/hotel';

const Hotels = ({ trip }) => {
    const [hotelList, setHotelList] = useState([]);
    useEffect(() => {
        if (trip) {
            setHotelList(trip?.tripData?.hotels);
        }
    }, [trip])

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Hotel Recommendation</h2>
            <div className={styles.hotelList}>
                {hotelList?.map((item, index) => {
                    return (
                        <div key={index}>
                            <Hotel hotel={item} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Hotels
