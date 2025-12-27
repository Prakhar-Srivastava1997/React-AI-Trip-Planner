import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../service/firebaseConfig';
import styles from './myTrips.module.css';
import MyTripCard from './myTripCard';
import Button from '../button/button';
import NoResult from '../noResult/noResult';

const MyTrips = () => {
    const [userTripData, setUserTripData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUserTrips();
    }, [])

    const getUserTrips = async () => {
        setUserTripData([]);
        const userData = localStorage.getItem('loggedInUser');
        const parsedUserData = JSON.parse(userData);
        if (!userData || !parsedUserData) {
            navigate('/');
            return;
        }
        const q = query(collection(db, "AITrips"), where("userEmail", "==", parsedUserData?.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUserTripData((prevData) => [...prevData, doc.data()]);
        });
    }

    const handleCreateNewTrip = () => {
        navigate('/user-profile');
    }
    return (
        <div className={styles.myTripsContainer}>
            <header className={styles.headerSec}>
                <h2>My Trips</h2>
                <Button text={'+ Create New Trip'} onClick={handleCreateNewTrip} />
            </header>
            <div className={styles.tripsContainer}>
                {userTripData.length > 0 ? (
                    userTripData.map((trip, index) => {
                        return (
                            <div key={index}>
                                <MyTripCard trip={trip} />
                            </div>
                        )
                    })) : (
                    <NoResult
                        displayText={{
                            mainText: 'Sorry! No data found',
                            subText: 'You have not created any trips yet.'
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default MyTrips
